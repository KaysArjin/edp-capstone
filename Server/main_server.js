import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { PythonShell } from 'python-shell';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const url = "mongodb://127.0.0.1:27017"
const db = 'user_messages';

//const user_collection = db.collection('users');
//const messages_collection = db.collection('messages');


//USER AUTHENTICATION
app.post("/api/authentication/register", async (req, res) => {
  //info is sent in the body
  const id = req.body;
  console.log(id)
  const client = await MongoClient.connect(url);
  const db = client.db('user_messages');
  const user_collection = db.collection('users');
  const users = await user_collection.findOne({ 'user_id': id.username });

  if (!users) {
    console.log("success")
    const result = await user_collection.insertOne({
      "user_id": id.username,
      "pass": id.password,
      "message_lst": []
    });
    console.log("post append")

    res.send(200)
    client.close();

  } else {
    console.log("failure")
    res.send(401)
    client.close();
  }
});

app.get("/api/authentication/login/:username/:password", async (req, res) => {
  //info is sent in the body
  const id = req.params;
  console.log(id)

  const client = await MongoClient.connect(url);
  const db = client.db('user_messages');
  const user_collection = db.collection('users');
  const users = await user_collection.findOne({ 'user_id': id.username, 'pass': id.password });
  console.log(users)
  if (!users) {
    res.send(401)
  } else {
    res.send(users)


  }
  client.close();
});



//MESSAGE GETTING AND SETTING
app.get("/api/message/:sender_id", async (req, res) => {
  // res.send(people);
  const id = req.params.sender_id;
  console.log(id)

  try {
    const client = await MongoClient.connect(url);
    const db = client.db('user_messages');
    const user_collection = db.collection('users');
    const messages_collection = db.collection('messages');
    const users = await user_collection.findOne({ 'user_id': id });

    console.log(users.message_lst)

    const message_list = await Promise.all(users.message_lst.map(
      message => messages_collection.findOne({ "msg_id": message })
    ));
    console.log(message_list)
    client.close();
    res.json(message_list);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/api/message/:sender_id/:reciever_id/:anonymous", async (req, res) => {
  const pars = req.params;
  const message = req.body.message;
  let pyshell = new PythonShell('./Server/Notebook/ps.py');
  pyshell.send(message);

  pyshell.on('message', async function (message_return) {
    //received a message sent from the Python script (a simple "print" statement)
    console.log(message_return)
    let prediction;
    if (message_return == 1) {
      prediction = "positive"
    } else {
      prediction = "negative"
    }
    console.log("prediction")
    console.log(prediction)

    const client = await MongoClient.connect(url);
    const db = client.db('user_messages');
    const user_collection = db.collection('users');
    const messages_collection = db.collection('messages');

    const n_id = [[pars.sender_id, pars.reciever_id].sort().join("-"), [pars.anonymous]]

    if (!(await messages_collection.findOne({ "msg_id": n_id })) && (await user_collection.findOne({ 'user_id': pars.reciever_id })) && (await user_collection.findOne({ 'user_id': pars.sender_id }))) {
      const n_id = [[pars.sender_id, pars.reciever_id].sort().join("-"), [pars.anonymous]]
      await user_collection.updateOne(
        { 'user_id': pars.reciever_id },
        { $push: { "message_lst": n_id } }
      );
      await user_collection.updateOne(
        { 'user_id': pars.sender_id },
        { $push: { "message_lst": n_id } }
      );
      await messages_collection.insertOne(
        {
          "msg_id": n_id,
          "messages": [pars.sender_id, prediction, req.body.message]
        }
      );
      res.send(200)

    } else {
      res.send(400)
    }
  });

});
//expects 3 params (sender_id, reciever_id, and anonymous) and 1 body
//

/*
app.post("/api/message/:sender_id/:reciever_id/:anonymous", async (req, res) => {
 

  let pyshell = new PythonShell('./Server/Notebook/ps.py');
  pyshell.send(message);

  const client = await MongoClient.connect(url);
  const db = client.db('user_messages');
  const user_collection = db.collection('users');
  const messages_collection = db.collection('messages');

  const n_id = [[pars.sender_id, pars.reciever_id].sort().join("-"), [pars.anonymous]]

  const message_exsts = await messages_collection.findOne({ "msg_id": n_id });
  const reciever = await user_collection.findOne({ 'user_id': pars.reciever_id });

  const sender = await user_collection.findOne({ 'user_id': pars.sender_id });

  let prediction;

  pyshell.on('message', async function (message_return) {
    //received a message sent from the Python script (a simple "print" statement)
    console.log(message_return)
    if (message_return == 1) {
      prediction = "positive"
    } else {
      prediction = "negative"
    }
    console.log("prediction")
    console.log(prediction)
  });

  if (!message_exsts && reciever && sender) {
    const n_id = [[pars.sender_id, pars.reciever_id].sort().join("-"), [pars.anonymous]]
    const reciever1 = await user_collection.updateOne(
      { 'user_id': pars.reciever_id },
      { $push: { "message_lst": n_id } }
    );
    const sender1 = await user_collection.updateOne(
      { 'user_id': pars.sender_id },
      { $push: { "message_lst": n_id } }
    );
    const message1 = await messages_collection.insertOne(
      {
        "msg_id": n_id,
        "messages": [pars.sender_id, prediction, req.body.message]
      }
    );
    res.send(200)

  } else {
    res.send(400)
  }
});

//*/
//app.put()

//const people = await collection.find().toArray();

app.use(express.static("public"));

app.use("/index.html", express.static("/public/dist/index.html"));

const port = 3550;
app.listen(port, () => console.log(`Listening on port ${port}.`));

