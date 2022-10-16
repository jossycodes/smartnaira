import {getCookie} from 'cookies-next'

export default function handler(req,res) {
  
  
const https = require('node:https'); 
  
const {phone, message} = getCookie('signingUp',{req,res}); 

var options = {
    'method': 'POST',
    'hostname': '89y8vd.api.infobip.com',
    'path': '/sms/2/text/advanced',
    'headers': {
        'Authorization': process.env.MSG_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    'maxRedirects': 20
};


var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });

    res.on("error", function (error) {
        console.error(error);
    });
});

var postData = JSON.stringify({
    "messages": [
        {
            "destinations": [
                {
                    "to": phone
                }
            ],
            "from": "InfoSMS",
            "text": message
        }
    ]
});

req.write(postData);

req.end();

}