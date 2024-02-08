import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
app.use(express.json());

const url = "mongodb://127.0.0.1:27017"
const db = 'user_messages';

//const user_collection = db.collection('users');
//const messages_collection = db.collection('messages');

app.get("/api/message/:sender_id", async (req, res) => {
    // res.send(people);
    const id = req.params.sender_id;
    
    try {
      const client = await MongoClient.connect(url);
      const db = client.db('user_messages');
      const user_collection = db.collection('users');
      const messages_collection = db.collection('messages');
      const userss = await user_collection.find().toArray();
      const users = await user_collection.findOne({ 'user_id': id });


      const message_list =  await Promise.all(users.message_lst.map(
        message => messages_collection.findOne({"msg_id": message})
      ));

      res.json(message_list);
    } catch (error) {
      res.status(500).json({error: error});
    }
  });

//const people = await collection.find().toArray();

const port = 3550;
app.listen(port, () => console.log(`Listening on port ${port}.`));

