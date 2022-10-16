import TopNav from '/components/top-nav'
import Select from 'react-select'
import {useState} from 'react'
import Spinner from '/components/spinner'
import useSWR from 'swr' 
import {useSession,getSession} from "next-auth/react"
import {useRouter} from 'next/router'
import Toast from '/components/toasts'

export default function Withdraw() {
  const { data: session, status } = useSession();
  const fetcher = async (url) => await fetch(url).then((res) => res.json());  
 const { data, error } = useSWR(`../api/actions/balance?user=${(session)? session.user._id : ''}`,fetcher);   
 
  const [button,setButton] = useState(false); 
  const loading = <Spinner /> 
  const [buttonValue,setButtonValue] = useState('Withdraw'); 
  const [accNum,setAccNum] = useState('');
  const [amount,setAmount] = useState(''); 
  const [accNumError,setAccNumError] = useState('');
  const [amountError,setAmountError] = useState('');
  const [withdrawing,setWithdrawing] = useState(false); 
  
  
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
   
  const styles = {
    option: (provided, state) => ({
      ...provided, 
      color: state.isSelected ? "#fff" : "#000",
      backgroundColor: (state.isSelected) ? "#32cb00" : "#fff",
    }),
    input: (provided, state) => ({
      ...provided,
      border: state.isFocused ? '2px solid green' : "grey", 
      paddingTop: "0.6rem",
      paddingBottom: "0.6rem",  
    }), 
    singleValue: (provided, state) => ({
      ...provided,
      fontSize: "1.1rem", 
      color: "grey"  
    })
  };
  
  const handleAmountChanage = (e)=> {
    setAmount(e.target.value);
    
    //alert(e.target.value + ' ' + data.balance); 
    if(e.target.value > data.balance) { setAmountError('Amount cannot exceed available balance');
     setButton(true);
     return null; 
    }
    setAmountError(''); 
    return setButton(false); 
}  
  
  const handleSubmit = (e)=> {
    e.preventDefault();
    setButton(true);
    setButtonValue(loading);
    setWithdrawing(true);
    
    
  }
  
  if(status === 'loading') return <div className="flex-center full-height"><Spinner /></div>;
  
  if(status === 'unauthenticated') return router.replace('/login'); 
  
  return (
     <>
     <style jsx>{`
     `}</style>  
      <TopNav name="Withdrawal"/>
      <form onSubmit={handleSubmit}>
       <div className="uk-padding-small">
        <div className="uk-padding-small uk-padding-remove-horizontal">
        <Select 
         dafault={selectedOption}
         options={options}
         onChange={setSelectedOption}
         placeholder="Select bank..."
         className=""
         styles={styles} 
         />     
         </div>
         <div className="uk-padding-small uk-padding-remove-horizontal">
          <input onChange={(e)=> {setAccNum(e.target.value)
            setAccNumError('')
          }} value={accNum} className="uk-input  uk-border-rounded" type="number" placeholder="Account number" />
          <small style={{color: 'red'}}>{accNumError}</small>
         </div>
         <div className="uk-padding-small uk-padding-remove-horizontal">
          <input onChange={handleAmountChanage} value={amount} className="uk-input  uk-border-rounded" type="number" placeholder="Amount" /> 
          <small style={{color: 'red'}}>{amountError}</small>
         </div> 
         <div  className="uk-padding uk-padding-remove-horizontal">
          <button disabled={(!data || withdrawing)? true: button} className="uk-button uk-button-large uk-border-rounded uk-width-expand">{buttonValue}</button>   
         </div>
       </div>
      </form>  
     </>  
    )
}    

