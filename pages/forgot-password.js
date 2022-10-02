import Head from 'next/head'
import Image from 'next/future/image'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import Spinner from '/components/spinner'
import Confirmator from '/components/confirmator' 
export default function ForgotPassword() {
  const [button,setButton] = useState(false);
  const [buttonValue,setButtonValue] = useState("submit"); 
  const [vc,setVc] = useState(null);
  const loading = <Spinner /> 
  const [phone,setPhone] = useState('')
  const handleSubmit = (e)=> {
    e.preventDefault();
    setButton(true);
    setButtonValue(loading); 
  }
   return (
     <>
     <Head>
        <title>Forget Password</title>
        <meta name="description" content="" />
      </Head>
      <div className="uk-padding-small">
        <h2 className="text-primary">Recover your Password</h2>
        <p>Enter your phone number</p>
        <div className="flex-center">
        <form className="uk-width-1-2@s" onSubmit={handleSubmit}>{(!vc)?
        
        <div className="uk-padding-small uk-padding-remove-horizontal">
           <div className="uk-inline uk-width-expand">
           <span class="uk-form-icon uk-text-center uk-text-small">+234</span> 
            <input onChange={(e)=> setPhone(e.target.value)} value={phone}  style={{paddingLeft: "1rem"}} className="uk-input uk-border-rounded" type="number" placeholder="Phone number"/>     
           </div>      
         </div> : 
         
         <Confirmator /> 
        }
         
         <div className="uk-padding uk-padding-remove-horizontal">
          <button disabled={button} className="uk-button uk-button-large uk-border-rounded uk-width-expand">{buttonValue}</button>   
         </div>
        </form>
        </div>
      </div>
      
     </> 
     ) 
}