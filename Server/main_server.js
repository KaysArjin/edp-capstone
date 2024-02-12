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
  console.log("registration")
  console.log(id)
  const client = await MongoClient.connect(url);
  const db = client.db('user_messages');
  const user_collection = db.collection('users');
  const users = await user_collection.findOne({ 'user_id': id.tempUsername });
  console.log(users)

  if (!users) {
    console.log("success")
    const result = await user_collection.insertOne({
      "user_id": id.tempUsername,
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
  console.log("in get message")
  console.log(id)

  try {
    const client = await MongoClient.connect(url);
    const db = client.db('user_messages');
    const user_collection = db.collection('users');
    const messages_collection = db.collection('messages');
    const users = await user_collection.findOne({ 'user_id': id });

    console.log("have obtained collections")
    console.log(users.message_lst)

    if (users.message_lst == 0) {
      console.log("fail")
      res.json([])
    } else {
      const message_list = await Promise.all(users.message_lst.map(
        message => messages_collection.findOne({ "msg_id": message })
      ));
      console.log(message_list)
      client.close();
      res.json(message_list);
    }




  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/api/message/:sender_id/:reciever_id/:anonymous", async (req, res) => {
  console.log("post")
  const pars = req.params;
  console.log(pars)
  const message = req.body.message;
  let option = {
    scriptPath: './Server/Notebook'
  }
  let pyshell = new PythonShell('./Server/Notebook/ps.py');
  pyshell.send(message);

  const client = await MongoClient.connect(url);
  const db = client.db('user_messages');
  const user_collection = db.collection('users');
  const messages_collection = db.collection('messages');

  pyshell.on('message', async function (message_return) {
    //received a message sent from the Python script (a simple "print" statement)
    let prediction;
    if (message_return == 1) {
      prediction = "positive"
    } else {
      prediction = "negative"
    }
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
      const returned_message = await messages_collection.insertOne(
        {
          "msg_id": n_id,
          "messages": [[pars.sender_id, prediction, req.body.message]]
        }
      );
      console.log(returned_message)
      res.send(await messages_collection.findOne({ "msg_id": n_id }))

    } else {
      if (await messages_collection.findOne({ "msg_id": n_id })) {
        console.log("message found")
        await messages_collection.updateOne(
          { "msg_id": n_id },
          { $push: { "messages": [pars.sender_id, prediction, req.body.message] } }
        );
        let found_messages = await messages_collection.findOne({ "msg_id": n_id });

        console.log(found_messages)
        res.send(found_messages)

      } else {
        res.send(400)
      }
    }
  });

});

app.put("/api/message/:sender_id/:reciever_id/:anonymous", async (req, res) => {
  console.log("put")
  const pars = req.params;
  const message = req.body.message;
  const n_id = [[pars.sender_id, pars.reciever_id].sort().join("-"), [pars.anonymous]]

  const client = await MongoClient.connect(url);
  const db = client.db('user_messages');
  const user_collection = db.collection('users');
  const messages_collection = db.collection('messages');

  console.log(n_id);

  let pyshell = new PythonShell('./Server/Notebook/ps.py');
  pyshell.send(message);

  pyshell.on('message', async function (message_return) {
    let prediction;
    if (message_return == 1) {
      prediction = "positive"
    } else {
      prediction = "negative"
    }
    console.log("prediction")
    console.log(prediction)


    let found_messages = await messages_collection.findOne({ "msg_id": n_id });
    if (found_messages) {
      console.log("message found")
      await messages_collection.updateOne(
        { "msg_id": n_id },
        { $push: { "messages": [pars.sender_id, prediction, req.body.message] } }
      );
      found_messages = await messages_collection.findOne({ "msg_id": n_id });

      console.log(found_messages)
      res.send(found_messages)

    } else {
      console.log("failed")
      res.send(400)
    }
  })
})

app.use(express.static("public"));

app.use("/index.html", express.static("/public/dist/index.html"));

const port = 3550;
app.listen(port, () => console.log(`Listening on port ${port}.`));

