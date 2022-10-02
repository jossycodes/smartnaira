import Head from 'next/head'
import Image from 'next/future/image'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import Spinner from '/components/spinner'
import Confirmator from '/components/confirmator' 
export default function ConfirmPhoneNumber() {
  const [button,setButton] = useState(false);
  const loading = <Spinner /> 
  const [buttonValue,setButtonValue] = useState("reset");   
  const [password,setPassword] = useState('')
  const [pswType,setPswType] = useState('password');
  const [pswIcon,setPswIcon] = useState('eye');
  const [phone,setPhone]= useState('');
  
  const changePswType = ()=> {
   if(pswType == 'text') {
     setPswType('password');
     setPswIcon('eye')
   } else {
      setPswType('text')
      setPswIcon('eye-slash'); 
   }
  } 
  
  const handleSubmit = (e)=> {
    e.preventDefault();
    setButton(true);
    setButtonValue(loading); 
  }  
   return (
     <>
     <Head>
        <title>Verify phone number</title>
        <meta name="description" content="" />
      </Head>
      <div className="uk-padding-small"> 
        <h2 className="text-primary">Reset your password</h2>
        <p>Enter a new password for {phone}</p>
        <div className="flex-center">
          <form className="uk-width-1-2@s" onSubmit={handleSubmit}>  
            <div className="uk-padding-small uk-padding-remove-horizontal">
            <div className="uk-inline uk-width-expand">
             <a onClick={changePswType} className={`uk-form-icon uk-form-icon-flip uk-text-muted bi-${pswIcon}`}></a>  
              <input onChange={(e)=> setPassword(e.target.value)} value={password} type={pswType} className="uk-input uk-border-rounded" placeholder="Password"/>
            </div> 
         </div> 
         <div className="uk-padding uk-padding-remove-horizontal">
          <button disabled={button} className="uk-button uk-button-large uk-border-rounded uk-width-expand">{buttonValue}</button>   
         </div>  
        </form> 
        </div>
      </div>
     </> 
     ) 
}