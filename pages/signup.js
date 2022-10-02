import Head from 'next/head'
import Image from 'next/future/image'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import Spinner from '/components/spinner'


export default function Signup() {
  const [fName,setFName] = useState('');
  const [lName,setLName] = useState('');
  const [phone,setPhone]= useState('');
  const [password,setPassword] = useState(''); 
  const [button,setButton] = useState(true); 
  const [buttonValue,setButtonValue] = useState("signup");
  const [pswType,setPswType] = useState('password');
  const [pswIcon,setPswIcon] = useState('eye');
  const [checked,setChecked] = useState(false); 
  
  const loading = <Spinner />
  
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
        <title>Smartnaira Signup</title>
        <meta name="description" content="Signup on smartnaira today" />
      </Head>
      <div className="uk-padding-small">
       <Image src="/smartnaira.png" width="250" height="25" alt="smartnaira" />
       <div className="top-space flex-center">  
        <form className="uk-width-1-2@s" onSubmit={handleSubmit}>
        
         <div className="uk-padding-small uk-padding-remove-horizontal">
            <input onChange={(e)=> setFName(e.target.value)} value={fName} className="uk-input uk-border-rounded" placeholder="First Name"/>   
         </div> 
         
         <div className="uk-padding-small uk-padding-remove-horizontal">
            <input onChange={(e)=> setLName(e.target.value)} value={lName}  className="uk-input uk-border-rounded" placeholder="Last Name"/>   
         </div>
         
         <div className="uk-padding-small uk-padding-remove-horizontal">
           <div className="uk-inline uk-width-expand">
           <span class="uk-form-icon uk-text-center uk-text-small">+234</span> 
            <input onChange={(e)=> setPhone(e.target.value)} value={phone}  style={{paddingLeft: "1rem"}} className="uk-input uk-border-rounded" type="number" placeholder="Phone number"/>     
           </div>      
         </div>
         
         <div className="uk-padding-small uk-padding-remove-horizontal">
            <div className="uk-inline uk-width-expand">
             <a onClick={changePswType} className={`uk-form-icon uk-form-icon-flip uk-text-muted bi-${pswIcon}`}></a>  
              <input onChange={(e)=> setPassword(e.target.value)} value={password} type={pswType} className="uk-input uk-border-rounded" placeholder="Password"/>
            </div> 
         </div> 
         
         <div className="uk-padding-small uk-padding-remove-horizontal uk-grid uk-grid-collapse uk-width-expand uk-child-width-1-2">
          <div><span className="uk-text-small"><input checked={checked} type="checkbox" className="uk-checkox" id="checkbox" onClick={(e)=> setChecked(e.target.checked)}  onChange={(e)=>(e.target.checked)? setButton(false) : setButton(true)}/><label for="checkbox"> I have read and agree to these </label><Link href="terms-and-conditions"><a>terms and conditions.</a></Link></span></div>     
          <div className="uk-text-right"><Link href="login"><a>login here.</a></Link></div>
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