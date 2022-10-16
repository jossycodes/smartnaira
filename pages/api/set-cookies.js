//import Cookies from 'cookies'
import sms from '/lib/infobip'
import {setCookie,getCookie} from 'cookies-next'
import token from '/lib/token-maker'
export default function handler(req, res) {
  //const keys = ['you never can tell'];
  
  //const cookies = new Cookies(req,res);
  if (req.method === 'POST') {
  const data = {
    fName: req.body.fName.trim(),
    lName: req.body.lName.trim(),
    phone: '+234'+req.body.phone.trim(),
    password: req.body.password,
    token: `${Math.floor(1000 + Math.random() * 9000)}`,
    //text: `Your verification code is: ${token}`  
  } 
  
  setCookie('signingUp',JSON.stringify(data),{req,res});
  
  //let smsStatus = sms({phone: data.phone,text: data.text});  
  
  console.log(getCookie('signingUp',{req,res}))   
 
 res.status(200).json({message: 'done', ok: true}); 
  } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid', complete: false});
    }
}  