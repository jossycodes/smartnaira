import Head from 'next/head'
import Image from 'next/future/image'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import Spinner from '/components/spinner'
import Confirmator from '/components/confirmator'
import {useRouter} from 'next/router' 
import {getCookie} from 'cookies-next' 
export default function ConfirmPhoneNumber(props) {
  const router = useRouter(); 
  const [button,setButton] = useState(false);
  const loading = <Spinner /> 
  const [buttonValue,setButtonValue] = useState("verify");  
  const [phone,setPhone] = useState(props.phone);  
  const handleSubmit = async(e)=> {
    e.preventDefault();
    setButton(true);
    setButtonValue(loading);
    
    const form = document.querySelector('form');
    
    const formData = new FormData(form);
    
    const obj = Object.fromEntries(formData);
    
    const response = await fetch(
		'api/auth/signup', 
		{
			method: 'POST',
			headers: {
                'Content-Type': 'application/json',
            },
      body: JSON.stringify(obj),
		}
	);
	const data = await response.json();
  
  if(data.complete) {
    router.push('/login'); 
  } else {
    setButtonValue('verify');
    setButton(false); 
  }
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

export function getServerSideProps({req,res}) {
  let data = getCookie('signingUp',{req,res});
  if(data) data = JSON.parse(data);     
  
  if(!data) {
  return {
    redirect: {
      permanent: false, 
      destination: "/signup",
     },
  props:{},
    } 
  } else {
      return { 
        props: {phone: data.phone} 
      } 
  } 
}  