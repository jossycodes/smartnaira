import {useState,useEffect} from 'react'
import Link from 'next/link'
import Spinner from '/components/spinner'
import TopNav from '/components/top-nav'
import numberFormat from '/lib/number-format' 
import useSWR from 'swr' 
import {useSession,getSession} from "next-auth/react"
import {useRouter} from 'next/router'
import Toast from '/components/toasts'
import Select from 'react-select' 

export default function Amount2Invest() {
  const { data: session, status } = useSession();
  const fetcher = async (url) => await fetch(url).then((res) => res.json());  
 const { data, error } = useSWR(`../api/actions/balance?user=${(session)? session.user._id : ''}`,fetcher);  
  const [button,setButton] = useState(false);  
  const [buttonValue,setButtonValue] = useState("save");  
  const loading = <Spinner /> 
  
  const [amount,setAmount] = useState(''); 
  const [investing,setInvesting] = useState(false);
  const [time,setTime] = useState(null)
  const [duration,setDuration] = useState(false);
  const[amountError,setAmountError] = useState('');
  const[balance,setBalance] = useState(false);
  
  
  const router = useRouter(); 
  
  const rate = 0.7; 
  
  const handleAmtChange = (e)=> { 
    setAmount(e.target.value);
    
    if(e.target.value <= data.balance && e.target.value > 0) {
    setAmountError(''); 
    } else {
      if(e.target.value < 1) return setAmountError('Amount needs to be greater than 0');  
      setAmountError("Amount has exceeded available balance");
    }
  } 
  
  const handleChange =(e)=> {
    setTime(e.target.value); 
    //if(button) setButton(false); 
  }
  const next =()=> {
   if(!amountError && data) { 
    if(!investing) {
      setInvesting(amount);
   } else if(!duration) {
     setDuration(time);
   }
   } 
  } 
  const prev = ()=> {
    if(duration) {
      setDuration(false);
      setTime(false); 
    } else if(investing) {
      setInvesting(false)
      setAmount('');
      setDuration(false);
      setTime(false);  
    }
  }
  
  
  
  const handleSubmit = async(e)=> {
    e.preventDefault();
    setButton(true);
    setButtonValue(loading); 
    
   /* if(amount*1 > data.balance*1) {
      setInvesting(false)
      setAmount('');
      setDuration(false);
      setTime(false);
      setButton(false);
      setButtonValue('save');  
      return ''; 
    }*/  
    
    const transactionObj = {phone: session.user.phone, amount: amount, intrest: 0, saved: amount + 0, days: time, dailyIcome: numberFormat((amount*rate)/100), expectedAmount: numberFormat((((amount*rate)/100)*duration+(amount * 1))), date: new Date(), ref: Math.floor(100000000000000 + Math.random() * 90000000000000), running: true}  
       
    const response = await fetch(
		'../api/actions/save', 
		{ 
			method: 'POST',
			headers: {
                'Content-Type': 'application/json',
            },
      body: JSON.stringify(transactionObj),  
		}
	);
	const data = await response.json(); 
	
	if(data.ok) {
	  return router.push(`/app/success?to=savings&ref=${data.ref}`); 
	}
	return <Toast title="Couldn't start saving" icon="error"/> 
}

if(!balance && data) {
  setBalance(true);
  setAmount(data.balance);   
}
  
  
  if(status === 'loading') return <div className="flex-center full-height"><Spinner /></div>;
  
  if(status === 'unauthenticated') return router.replace('/login');  
  
   return (
     <>
     <style jsx>{`
      .duration {
        position: relative; 
        padding: 5px;
      }
      input[type="radio"] {
        position: absolute;
        opacity: 0; 
      }
      input[type="radio"]:focus {
        border: none; 
      }
     input[type="radio"]:checked + label {
       background: #bfb !important; 
       border: 2px solid #4c4;   
     }
    label {
    display: block;
    width: 100%;
    padding: 1.2rem 0.5rem !important;
    border-radius: 0.5rem;   
    font-family: sans-serif, Arial;
    border: 3px solid #f5f5f5; 
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
     <TopNav name="save"/> 
      <div className="uk-padding-small">
        
        <div className="flex-center">
        <form className="uk-width-1-2@s form" onSubmit={handleSubmit}>{(!investing || !duration)?
        <div>{(!investing)? 
        <div className="">
        <h2 className="text-primary">Step 1</h2>
        <p>Enter an amount to save</p>  
        <div className="uk-padding-small uk-padding-remove-horizontal">
            <div className="uk-inline">
            <span className="uk-form-icon uk-text-lead">&#8358;</span> 
            <input onChange={handleAmtChange} value={amount} className="uk-input uk-border-rounded uk-form-large" type="number" />
            </div>
            <small style={{color: 'red'}}>{amountError? amountError:''}</small> 
         </div>
         
         {/*<div className="uk-padding-small uk-padding-remove-horizontal">
         <div>What's your GOAL (optional)</div> 
         <Select 
         dafault={selectedOption}
         options={options}
         onChange={setSelectedOption}
         placeholder="Why are you saving"
         style={styles}
         className=""
         />
            <textarea className=" uk-border-rounded" placeholder="What are you saving for (optional)"></textarea> 
         </div>*/} 
         </div> : 
         
         <div className="">
          <h2 className="text-primary">Step 2</h2>
          <p>How long do you plan to save</p>
          <div className="uk-card uk-grid uk-child-width-1-2 uk-grid-collapse">  
          <div className="duration">
          <input onChange={handleChange}    className="uk-radio" type="radio" id="one" name="duration" data-duration="7" value="7"/> 
           <label for="one" className="duration uk-padding-small">1 week</label>  
           </div>      
           <div className="duration">
           <input onChange={handleChange}    className="uk-radio uk-float-right" type="radio" id="two" name="duration" data-duration="30" value="30"/>
           <label for="two" className="duration uk-padding-small">1 month</label> 
           </div> 
           <div className="duration">
           <input onChange={handleChange}    className="uk-radio uk-float-right" type="radio" id="three" name="duration" data-duration="90" value="90"/>
           <label for="three" className="duration uk-padding-small">3 months</label> 
           </div>
           <div className="duration">
           <input onChange={handleChange}    className="uk-radio uk-float-right" type="radio" id="four" name="duration" data-duration="180" value="180"/>
           <label for="four" className="duration uk-padding-small">6 months</label> 
           </div>
           <div className="duration">
           <input onChange={handleChange}    className="uk-radio uk-float-right" type="radio" id="five" name="duration" data-duration="270" value="270"/>
           <label for="five" className="duration uk-padding-small">9 months</label>  
           </div>
           <div className="duration">
           <input onChange={handleChange}    className="uk-radio uk-float-right" type="radio" id="six" name="duration" data-duration="365" value="365"/> 
           <label for="six" className="duration uk-padding-small">1 year</label>   
           </div>  
         </div>
         </div> 
         
         
         }</div> : 
         
         <div className="">
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
        
        <div id="btns">   
         <div className="uk-padding uk-padding-remove-horizontal uk-grid uk-child-width-1-2">  
         <div>{(investing)?
          <a onClick={prev}  className="uk-button uk-button-large uk-border-rounded  transparent prev"><span className="bi-chevron-left"></span> Back</a>
          : ''} 
         </div> 
       
          <div className="uk-text-right">{(investing && duration)?
          <button disabled={button} className="uk-button uk-button-large uk-border-rounded uk-width-expand">{buttonValue}</button>
          : 
          <a  onClick={next} className={`uk-button uk-button-large uk-border-rounded  next ${(!amount || amountError || !data)? 'grey' : ''} ${(!time && investing)? 'grey' : ''}`}>{(data)? <span>Next <span className="bi-chevron-right"></span></span> : loading}</a>      
          }           
         </div>
         </div>
         </div>
        </form>
        </div>
      </div>   
       
     </>  
     ) 
}  