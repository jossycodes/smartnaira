import {useState,useEffect} from 'react'
import Link from 'next/link'
import Spinner from '/components/spinner'
import TopNav from '/components/top-nav'
import { usePaystackPayment } from 'react-paystack';
import {useSession,getSession} from "next-auth/react"; 
import {useRouter} from 'next/router'
 
export default function Amount2Topup(props) {
  const { data: session, status } = useSession();
  const [amount,setAmount] = useState()
 const router = useRouter(); 
 
  
  const onSuccess = async(reference) => {
    const transactionObj = {phone: session.user.phone, amount: amount, description: 'topup', date: new Date(),...reference,added: true} 
    const response = await fetch(
		'../api/actions/transactions', 
		{ 
			method: 'POST',
			headers: {
                'Content-Type': 'application/json',
            },
      body: JSON.stringify(transactionObj),  
		}
	);
	const data = await response.json(); 
  
  //alert(JSON.stringify(data)); 
  
  if(data.ok) router.push(`/app/success?ref=${reference.reference}&to=transactions`); 
  
}; 

 
  const onClose = () => {
   
  }

  const PaystackButton = () => {
    const config = {
      reference: (new Date()).getTime().toString(),
      email: `0${session.user.phone.slice(4, session.user.phone.length)}@smartnaira.com`, 
      amount: amount * 100, 
      publicKey: 'pk_test_12a7b28485f138d3e34cb80895a446662fe83cc5' 
  };  
    const initializePayment = usePaystackPayment(config);
      return (
        <div className="uk-padding uk-padding-remove-horizontal">
            <button className="bg-primary uk-button uk-button-large uk-border-rounded uk-width-expand" onClick={() => {
                initializePayment(onSuccess, onClose)
            }}>Add</button> 
        </div>
      );
  };
  
  if(status === 'loading') return <div className="flex-center full-height"><Spinner /></div>;
  
  if(status === 'unauthenticated') return router.push('/login');
  
  
   return (
     <>
     <TopNav name="Add Money"/>
      <div className="uk-padding-small">
        <h2 className="text-primary">Topup</h2> 
        <p>{(props.message)? props.message : 'Enter an amount to topup'}</p> 
        <div className="flex-center">
        <div className="uk-width-1-2@s">
        <div className="uk-padding-small uk-padding-remove-horizontal">
            <div className="uk-inline">
            <span className="uk-form-icon uk-text-lead">&#8358;</span> 
            <input onChange={(e)=> setAmount(e.target.value)} value={amount} className="uk-input uk-border-rounded uk-form-large" type="number" /> 
            </div> 
         </div>
         
        <PaystackButton /> 
         
         </div>
        </div>
      </div>  
      
     </> 
     ) 
}   