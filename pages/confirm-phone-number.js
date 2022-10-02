import Head from 'next/head'
import Image from 'next/future/image'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import Spinner from '/components/spinner'
import Confirmator from '/components/confirmator' 
export default function ConfirmPhoneNumber() {
  const [button,setButton] = useState(false);
  const loading = <Spinner /> 
  const [buttonValue,setButtonValue] = useState("verify");  
  const [phone,setPhone] = useState('')
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
        <h2 className="text-primary">Verify your phone number</h2>
        <p>Enter the verification code sent to {phone}</p>
        <div className="flex-center">
          <form className="uk-width-1-2@s" onSubmit={handleSubmit}>  
            <Confirmator id="confirmator" />
            <div className="uk-padding uk-padding-remove-horizontal">
          <button disabled={button} className="uk-button uk-button-large uk-border-rounded uk-width-expand">{buttonValue}</button>   
         </div>  
        </form> 
        </div>
      </div>
     </>
     ) 
}