import clientPromise from '/lib/mongodb';
import {ObjectId} from 'mongodb'
export default async(req, res) => {
  let data = req.body
    const client = await clientPromise;
    const db = client.db('smartsaver_data'); 
    
  if(req.method == 'POST') {
    
    if(data.amount && !isNaN(data.amount)) {
      data.amount*=1;  
      const status = await db.collection('users').updateOne(
        {
          phone: data.phone
        },
        {
          $push: {
            "savings": data
          },
          $inc: {
          balance: -data.amount 
        }
        }
      )
      
      console.log(status);  

      if (status.acknowledged && status.modifiedCount > 0) { 
        res.status(201).json({
          ok: true, ...status, ref: data.ref
        });   
      } else {
        res.status(201).json({
          ok: false, ...status
        });
      }
    } else {
      res.json({ok: false, message: 'no amount set'}) 
    }
  } else {
    //console.log(req.query['ref'].toString()); 
    let checkExisting;
    if(req.query['ref']) { 
       checkExisting = await db.collection('users').findOne({
        savings: {$elemMatch:{reference: req.query['ref'].toString()}}});
    } else if(req.query['user']) {
      //let o_id = new mongo.; 
      checkExisting = await db.collection('users').findOne({_id: ObjectId(req.query['user'].toString())});  
    }  /*else {
      res.status(200).json({}); 
    }*/   
      if(checkExisting) {
      if(!checkExisting.savings) {
        res.status(200).json({ok: true, savings: []}); 
      } else {
      console.log(checkExisting.savings); 
      res.status(200).json({savings: checkExisting.savings, ok: true})
      } 
      } else {
      res.json({ok:false}); 
     }
     
   }
} 
