import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
app.use(express.json());

const mongo_url = 'mongodb://127.0. 0.1:27017'
const db = 'user_messages';

//const user_collection = db.collection('users');
//const messages_collection = db.collection('messages');

app.get("/api/people", async (req, res) => {
    // res.send(people);
    
    try {
        console.log("pre client connect")
        const client = await MongoClient.connect(mongo_url);
        console.log("pre database connect")
        const db = client.db(db);
        const user_collection = db.collection('users');
        const messages_collection = db.collection('messages');
        const people = await user_collection.find().toArray();
        console.log(people)
        client.close();
        res.json(people);
    } catch (error) {
      res.status(500).json({error: error});
    }
  });

//const people = await collection.find().toArray();

const port = 3550;
app.listen(port, () => console.log(`Listening on port ${port}.`));

