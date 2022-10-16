import clientPromise from '/lib/mongodb';
import {
  ObjectId
} from 'mongodb'

export default async function(req, res) {
  const data = req.body;
  const client = await clientPromise;
  const db = client.db('smartsaver_data');

  /* if (req.method == 'POST') {
    const status = await db.collection('users').updateOne({
      phone: data.phone
      {
        $inc: {
          balance: data.amount
        }}
    })
    if(status.acknowledged) {
      res.status(200).json({ok: true})
    } else {
      res.json({ok: false})
    }
  }*/

  if (req.query['user']) {

    const checkExisting = await db.collection('users').findOne({
      _id: ObjectId(req.query['user'].toString())});

    if (checkExisting) {
      res.status(200).json({
        ok: true, balance: checkExisting.balance ?? 0, savings: checkExisting.savings 
      })
    } else {
      res.json({
        ok: false
      })
    } 
  }
}