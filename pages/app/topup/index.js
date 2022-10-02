import {useState,useEffect} from 'react'
import Link from 'next/link'
import Spinner from '/components/spinner'
import TopNav from '/components/top-nav'
export default function Amount2Topup(props) {
  const [button,setButton] = useState(false);
  const [buttonValue,setButtonValue] = useState("proceed"); 
  const loading = <Spinner /> 
  const [amount,setAmount] = useState('')
  const handleSubmit = (e)=> {
    e.preventDefault();
    setButton(true);
    setButtonValue(loading); 
  } 
   return (
     <>
     <TopNav name="Add Money"/>
      <div className="uk-padding-small">
        <h2 className="text-primary">Topup</h2> 
        <p>{(props.message)? props.message : 'Enter an amount to topup'}</p> 
        <div className="flex-center">
        <form className="uk-width-1-2@s" onSubmit={handleSubmit}>
        <div className="uk-padding-small uk-padding-remove-horizontal">
            <div className="uk-inline">
            <span className="uk-form-icon uk-text-lead">&#8358;</span> 
            <input onChange={(e)=> setAmount(e.target.value)} value={amount} className="uk-input uk-border-rounded uk-form-large" type="number" /> 
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