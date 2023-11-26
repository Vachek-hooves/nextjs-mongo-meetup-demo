// this file URL = /api/new-meetup
// POST - /api/new-meetup
import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://Viacheslav:MongoKopa@cluster0.xkwrg0d.mongodb.net/meetups-project?retryWrites=true&w=majority'
    ); // connect() return the promise

    const db = client.db();

    const meetupsCollection = db.collection('meetups collection');

    const result = await meetupsCollection.insertOne( data );

    console.log(result); // result will be an object with automatically generated id

    client.close();

    res.status(201).json({ message: 'Meetup inserted' });
  }
}
export default handler