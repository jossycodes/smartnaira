import InfoBip from 'infobip-nodejs' 

export default function sms(props) {
//Initialize the client

let APIKEY = '7aea2277eaf7585aa9af9a419a48fb11-fc0d764d-600e-4311-8754-1e22ffd717ce';
const environment = process.env.NODE_ENV
const isProduction = (environment === 'development') 

const infobip = new InfoBip(APIKEY, isProduction, {
  authType:'basic',
  username:'jossylee', // Infobip Username used for registration
  password:'Josiahadeniyi1@', // Infobip Password used for registration
  encrypted:false,
  baseHost: '89y8vd.api.infobip.com'
}) 

/* 
  Send SMS to two mobile numbers  
  
  - NB: make sure the Sender ID is registred with infobip before use
*/
const promise = infobip.sendSMS({
  messages: [{
    from: "", // Sender ID
    /*destinations: [
      //{ to: '+2348164422256' },  // MTN Numbers
      { to: '+2349073264844'}
    ],*/
    to: '+2349073264844',
    text: 'hello' 
  }],
  //bulkId: "BULK-ID-awq6545pOu7ye6" // Auto-generated with prefix: "BULK-ID-"
}) 

promise.then( response => {
 const { body } = response
 console.log('response body: ', body)
}).catch( error => {
  console.error(error)
})
} 