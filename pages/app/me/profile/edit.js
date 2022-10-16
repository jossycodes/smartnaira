import TopNav from '/components/top-nav'
import {useState} from 'react'
import Spinner from '/components/spinner'
 import {useSession,getSession} from "next-auth/react" 
 
export default function EditUser() { 
  const [email,setEmail] = useState(''); 
  const [button,setButton] = useState(false);  
  const [buttonValue,setButtonValue] = useState("submit");
  const loading = <Spinner /> 
  const handleSubmit = (e)=> {
    e.preventDefault();
    setButton(true);
    setButtonValue(loading); 
  }
  
  const { data: session, status } = useSession();
    
  if(status === 'loading') return <div className="flex-center full-height"><Spinner /></div>;
  
  if(status === 'unauthenticated') return router.push('/login');
  
  return (
      <div>
        <TopNav name="Edit profile" /> 
        <form onSubmit={handleSubmit}>
          <div className="uk-padding-small">
            <label>First Name</label>
            <input value={session.user.fName} disabled={(session.user.fName)? true : false} className="uk-input uk-width-expand uk-border-rounded"/>
          </div> 
          <div className="uk-padding-small">
            <label>Last Name</label>
            <input value={session.user.lName} disabled={(session.user.fName)? true : false} className="uk-input uk-width-expand uk-border-rounded"/> 
          </div> 
          <div className="uk-padding-small">
            <label>Phone Number</label>
            <input value={session.user.phone} disabled={(session.user.phone)? true : false} className="uk-input uk-width-expand uk-border-rounded"/>  
          </div>
          <div className="uk-padding-small">
            <label>Email Address</label>
            <input value={(session.user.email && !email)? session.value.email : email} onChange={(e)=> {setEmail(e.target.value)}} className="uk-input uk-width-expand uk-border-rounded"/> 
          </div> 
          {/*<div className="uk-padding-small">
            <div>Gender</div>
            <input id="male" name="gender" type="radio" className="uk-radio"/>
            <label for="male">Male</label>&nbsp;&nbsp;
            <input id="female" name="gender" type="radio" className="uk-radio"/>
            <label for="female">Female</label>  
          </div>*/}  
          <div className="uk-padding-small">
            <button className="uk-button uk-button-large uk-width-expand uk-border-rounded" disabled={button}>{buttonValue}</button>   
          </div>  
        </form>
      </div>
    ) 
}