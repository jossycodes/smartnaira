import Head from 'next/head'
import Image from 'next/future/image'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import Spinner from '/components/spinner'

export default function Login() {
  const [button,setButton] = useState(false);
  const [buttonValue,setButtonValue] = useState("login");
  const loading = <Spinner /> 
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const handleSubmit = (e)=> {
    e.preventDefault();
    setButton(true);
    setButtonValue(loading); 
  }
  return (
    <div className="">
      <Head>
        <title>Smartnaira Login</title>
        <meta name="description" content="Logging to your smartnaira account" />
      </Head>
      <div className="uk-padding-small">
       <Image src="/smartnaira.png" width="250" height="25" alt="smartnaira" />
       <div className="top-space flex-center">  
        <form className="uk-width-1-2@s" onSubmit={handleSubmit}> 
         <div className="uk-padding-small uk-padding-remove-horizontal">
           <div className="uk-inline uk-width-expand">
           <span class="uk-form-icon uk-text-center uk-text-small">+234</span> 
            <input onChange={(e)=> setPhone(e.target.value)} value={phone}  style={{paddingLeft: "1rem"}} className="uk-input uk-border-rounded" type="number" placeholder="Phone number"/>     
           </div>      
         </div> 
         <div className="uk-padding-small uk-padding-remove-horizontal">
          <div className="uk-inline uk-width-expand">
           <span class="uk-form-icon bi-lock"></span>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className="uk-input uk-border-rounded" type="password" placeholder="Password"/>
           </div>  
         </div>
         <div className="uk-padding-small uk-padding-remove-horizontal uk-grid uk-grid-collapse uk-width-expand uk-child-width-1-2">
          <div><Link href="forgot-password"><a>forgot password?</a></Link></div>
          <div className="uk-text-right"><Link href="signup"><a>signup here.</a></Link></div>
         </div>   
         <div className="uk-padding uk-padding-remove-horizontal">
          <button disabled={button} className="uk-button uk-button-large uk-border-rounded uk-width-expand">{buttonValue}</button>   
         </div> 
        </form>
       </div>
      </div>
    </div>  
   )
} 