import Head from 'next/head'
import Image from 'next/future/image'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import Spinner from '/components/spinner'
import {useRouter} from 'next/router'
import {signIn,getCsrfToken,getSession} from "next-auth/react" 
//import Toast from '/components/toasts'
import Alert from '/components/alert'

export default function Login({csrfToken}) {
  const router = useRouter(); 
  const [errorSeen,setErrorSeen] = useState(false);
  const [phoneError,setPhoneError] = useState('');
  const [passwordError,setPasswordError] = useState('');
  const [button,setButton] = useState(false);
  const [buttonValue,setButtonValue] = useState("login");
  const spinner = <Spinner /> 
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');

   
  const handleSubmit = async(e)=> {
    
    e.preventDefault();
  
    if(phone.length < 1) {
      return setPhoneError('Enter your phone Number')
    } else if(phone.length < 10 || phone.length > 11){
      return setPhoneError('Invalid phone number'); 
    } else if(password.length < 1) {
      return setPasswordError('password cannot be empty');  
    }
    
   
    setButton(true);
    setButtonValue(spinner);
    setErrorSeen(false);
    
    const form = document.querySelector('form');
    
    const formData = new FormData(form);
    
    const obj = Object.fromEntries(formData);
    
    const result = await signIn("credentials", { phone: '+234'+obj.phone, password: ''+obj.password, redirect: false, callbackUrl: '/app'});   
    
    if(!result.ok) {
      setErrorSeen(true);
    } else {
      router.push('/app'); 
    }
    
    setButton(false);
    setButtonValue('login');   
}

const [loading, setLoading] = useState(true);
    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.replace('/app');
            } else {
                setLoading(false);
            }
        });
  }, []);
 if (loading) { 
   return <div className="flex-center full-height"><Spinner /></div>;
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
        <div>{(errorSeen)? <Alert message="wrong phone number or password" type="danger" />:  ''}</div> 
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
         <div className="uk-padding-small uk-padding-remove-horizontal">
           <div className="uk-inline uk-width-expand">
           <span class="uk-form-icon uk-text-center uk-text-small">+234</span> 
            <input onChange={(e)=> {setPhone(e.target.value)
              setPhoneError('');
            }} value={phone}  style={{paddingLeft: "1rem"}} className="uk-input uk-border-rounded" name="phone" type="number" placeholder="Phone number"/>     
           </div>
           <small style={{color: 'red'}}>{phoneError}</small> 
         </div> 
         <div className="uk-padding-small uk-padding-remove-horizontal">
          <div className="uk-inline uk-width-expand">
           <span class="uk-form-icon bi-lock"></span>
            <input onChange={(e)=>{setPassword(e.target.value)
              setPasswordError(''); 
            }} name="password" value={password} className="uk-input uk-border-rounded" type="password" placeholder="Password"/>
           </div>
           <small style={{color: 'red'}}>{passwordError}</small>
         </div> 
         <div className="uk-padding-small uk-padding-remove-horizontal uk-grid uk-grid-collapse uk-width-expand uk-child-width-1-2">
          <div><Link href="forgot-password"><a>forgot password?</a></Link></div>
          <div className="uk-text-right"><Link href="signup"><a>signup here.</a></Link></div>
         </div>    
         <div className="uk-padding uk-padding-remove-horizontal">
          <button type="submit" disabled={button} className="uk-button uk-button-large uk-border-rounded uk-width-expand">{buttonValue}</button>   
         </div> 
        </form>
       </div>
      </div>
    </div>  
   )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}