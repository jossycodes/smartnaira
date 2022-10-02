import {useState,useEffect} from 'react'
import Link from 'next/link'
import Spinner from '/components/spinner'
import TopNav from '/components/top-nav'
import numberFormat from '/lib/number-format'
import Success from '/components/success' 

export default function Amount2Invest() {
  const [button,setButton] = useState(false);  
  const [buttonValue,setButtonValue] = useState("save");  
  const loading = <Spinner /> 
  const balance = 1000; 
  const [amount,setAmount] = useState(balance); 
  const [investing,setInvesting] = useState(false);
  const [time,setTime] = useState(null)
  const [duration,setDuration] = useState(false);
  const rate = 0.7; 
  //if(duration)  setButton(false);
  const handleChange =(e)=> {
    setTime(e.target.value); 
    //if(button) setButton(false); 
  }
  const next =()=> {
    if(!investing) {
      setInvesting(amount);
   } else if(!duration) {
     setDuration(time);
   } 
  } 
  const prev = ()=> {
    if(duration) {
      setDuration(false);
      setTime(false); 
    } else if(investing) {
      setInvesting(false)
      setAmount(''); 
    }
  }
  const handleSubmit = (e)=> {
    e.preventDefault();
    setButton(true);
    setButtonValue(loading); 
  }
   return (
     <>
     <style jsx>{`
      .duration {
        border: 1px solid var(--primaryDark); 
        border-radius: 0.5rem; 
        /*background: linear-gradient(45deg,var(--primaryLight) 50%,white 50%); 
        color: white;*/
        font-weight: bold;  
      }
      input[type="radio"]:focus {
        border: none; 
      }
      input[type="radio"]:checked + label {
       background: #bfb !important; 
       border: #4c4;   
     }
    label {
    display: block;
    width: 100%; 
    font-family: sans-serif, Arial;
    }
    .prev {
      border: 1px solid var(--primaryDark);
    }
    .next {
      background: var(--primary);
      color: #000 !important;   
    }
    .uk-card {
      margin-top: 2rem; 
    }
    .gap {
      padding: 0.7rem 0;  
    }
    .grey { 
      background: #f5f5f5 !important; 
    } 
     `}</style>
     <TopNav name="Invest"/>
      <div className="uk-padding-small">
        
        <div className="flex-center">
        <form className="uk-width-1-2@s" onSubmit={handleSubmit}>{(!investing || !duration)?
        <div>{(!investing)? 
        <div>
        <h2 className="text-primary">Step 1</h2>
        <p>Enter an amount to save</p>  
        <div className="uk-padding-small uk-padding-remove-horizontal">
            <div className="uk-inline">
            <span className="uk-form-icon uk-text-lead">&#8358;</span> 
            <input onChange={(e)=> setAmount(e.target.value)} value={amount} className="uk-input uk-border-rounded uk-form-large" type="number" /> 
            </div>  
         </div>
         </div> : 
         
         <div>
          <h2 className="text-primary">Step 2</h2>
          <p>How long do you plan to save</p>
          <div className="uk-card">   
          <div className="gap">
           <label for="one" className="duration uk-padding-small">7 days <input onChange={handleChange}    className="uk-radio uk-float-right" type="radio" id="one" name="duration" data-duration="7" value="7"/></label> 
           </div>    
           <div className="gap">  
           <label for="two" className="duration uk-padding-small">30 days <input onChange={handleChange}    className="uk-radio uk-float-right" type="radio" id="two" name="duration" data-duration="30" value="30"/></label> 
           </div>
           <div className="gap"> 
           <label for="three" className="duration uk-padding-small">90 days <input onChange={handleChange}    className="uk-radio uk-float-right" type="radio" id="three" name="duration" data-duration="90" value="90"/></label> 
           </div>
           <div className="gap"> 
           <label for="four" className="duration uk-padding-small">365 days <input onChange={handleChange}    className="uk-radio uk-float-right" type="radio" id="four" name="duration" data-duration="365" value="365"/></label>   
           </div> 
         </div>
         </div>
         
         
         }</div> : 
         
         <div>
         <h2 className="text-primary">Step 3</h2>
          <p className="uk-text-muted">Almost there</p>
          <div className="uk-padding-small uk-padding-remove-horizontal">
           <div className="uk-card grey uk-border-rounded uk-padding-small">
           <div className="uk-grid uk-child-width-1-2">
            <div>Amount</div>
            <div className="uk-text-right">&#8358;{numberFormat(amount)}</div>
            <div>Interest Rate</div>
            <div className="uk-text-right">+225.5% p.a</div> 
           </div> 
          </div>
          
          <div className="uk-card grey uk-border-rounded uk-padding-small">
           <div className="uk-grid uk-child-width-1-2">
            <div>Duration</div>
            <div className="uk-text-right">{duration} days</div> 
            <div>Daily Income</div>
            <div className="uk-text-right">&#8358;{numberFormat((amount*rate)/100)}</div> 
            <div>Total Balance</div> 
            <div className="uk-text-right">&#8358;{numberFormat((((amount*rate)/100)*duration+(amount * 1)))}</div>   
           </div> 
          </div>  
          
          </div>
        </div> 
        }
         
         <div id="btns" className="uk-padding uk-padding-remove-horizontal uk-grid uk-child-width-1-2">  
         <div>{(investing)?
          <a onClick={prev}  className="uk-button uk-button-large uk-border-rounded  transparent prev"><span className="bi-chevron-left"></span> Back</a>
          : ''} 
         </div> 
       
          <div className="uk-text-right">{(investing && duration)?
          <button disabled={button} className="uk-button uk-button-large uk-border-rounded uk-width-expand">{buttonValue}</button>
          : 
          <a  onClick={next} className={`uk-button uk-button-large uk-border-rounded  next ${(!amount || (!amount && !time))? 'grey' : ''}`}>Next <span className="bi-chevron-right"></span></a>   
          }     
         </div>
         </div>
        </form>
        </div>
      </div>   
       
     </>  
     ) 
}  