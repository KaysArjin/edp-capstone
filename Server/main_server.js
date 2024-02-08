import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
app.use(express.json());

const url = "mongodb://127.0.0.1:27017"
const db = 'user_messages';

//const user_collection = db.collection('users');
//const messages_collection = db.collection('messages');
app.post("/api/authentication/register", async (req, res) => {
  //info is sent in the body
  const id = req.body;
  console.log(id)
  const client = await MongoClient.connect(url);
  const db = client.db('user_messages');
  const user_collection = db.collection('users');
  const messages_collection = db.collection('messages');
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

app.get("/api/authentication/login", async (req, res) => {
  //info is sent in the body
  console.log("in get login")
  res.send(200)
});

app.get("/api/message/:sender_id", async (req, res) => {
  // res.send(people);
  const id = req.params.sender_id;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db('user_messages');
    const user_collection = db.collection('users');
    const messages_collection = db.collection('messages');
    const users = await user_collection.findOne({ 'user_id': id });

    client.close();


    const message_list = await Promise.all(users.message_lst.map(
      message => messages_collection.findOne({ "msg_id": message })
    ));

    res.json(message_list);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//const people = await collection.find().toArray();

app.use(express.static("public"));

app.use("/index.html", express.static("/public/dist/index.html"));

const port = 3550;
app.listen(port, () => console.log(`Listening on port ${port}.`));

