import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
app.use(express.json());

const mongo_url = 'mongodb://localhost:27017'
const db = 'user_messsages';

//const user_collection = db.collection('users');
//const messages_collection = db.collection('messages');

//const people = await collection.find().toArray();

const port = 3500;
app.listen(port, () => console.log(`Listening on port ${port}.`));