import clientPromise from '/lib/mongodb';
import { hash } from 'bcryptjs';
import {getCookie} from 'cookies-next'
//import Cookies from 'cookies' 

async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
    
        //Getting phone and password from body
        let data = getCookie('signingUp',{req,res});
        
        if(data) data = JSON.parse(data);
        
        const {fName, lName, phone, password, token} = data;
        
        const {one,two,three,four} = req.body;
        
        const tokenEntered = `${one}${two}${three}${four}`
        
        if(token == tokenEntered) { 
       
        //Validate
        if (!lName || !fName || !phone || !password) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }
        
        const client = await clientPromise;
        
        const db = client.db('smartsaver_data');  
        //Check existing
        const checkExisting = await db
            .collection('users')
            .findOne({ phone: phone});
        //Send error response if duplicate user is found
        if (checkExisting) {
            res.status(422).json({ message: 'User already exists' });
            client.close();
            return;
        }
        //Hash password
        
        data.password = await hash(password,12);    
        
        const status = await db.collection('users').insertOne(data);
        
        console.log('added new user'); 
        //Send success response
        res.status(201).json({ message: 'User created', ...status , complete: true});
        //Close DB connection
        client.close();
        } else {
          console.log('imvalid code'); 
          res.status(400).json({message: 'Invalid code', complete: false}); 
        }
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid', complete: false});
    }
}

export default handler;   