import Head from 'next/head'
import Image from 'next/image'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import Spinner from '/components/spinner'
import AppBar from '/components/app-bar'
import numberFormat from '/lib/number-format' 
export default function Dash() {
  const [fName,setFName] = useState('');
  const balance = 500;   
  const Top = ()=> {
    return (<div className="uk-padding-small uk-padding-remove-bottom">
    
    </div>)    
  } 
  return (
    <div>
    <style jsx>{`
      #dash {
        background: #f5f5f5;   
        position: relative;
       /* border-bottom-left-radius: 5rem;
        border-bottom-right-radius: 5rem;*/ 
        min-height: 13rem;
        padding-bottom: 2rem; 
      }
      #dash-card {
        position: absolute;
        bottom: -0.7rem; 
        width: 92%;   
      }
     #invest {
       background: var(--primary);
       color: #000 !important; 
     }
     .x-big {
       font-size: 2.2rem;    
     }
     #dash2 {
      /* border: 1px solid var(--primaryDark);*/      
     }
     .save div {
       color: #005cff;
     }
     .save div span {
       color: #063abe; 
     }
     .topup div {
       color: #f300ff;
     }
     .topup div span {
       color: #bc04ab; 
     }
     .withdraw div {
       color: #ff7c00;
     }
     .withdraw div span {
       color: #cb7912; 
     }
     
    `}</style>
      <div id="dash">
        <Top />
        <div className="uk-padding-small uk-padding-remove-vertical uk-grid uk-grid-collapse uk-child-width-1-2">
        <div>
        <div className="uk-padding-small uk-padding-remove-horizontal">
         <div className="">Balance <span ></span></div>  
         <div className="uk-text-lead">&#8358;0.00</div>
         </div>
         
         <div className="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-top"> 
         <div className="">Current Rates <span ></span></div>  
         <div className="uk-text-lead">+255.5% p.a</div> 
         </div>
        </div> 
         
         <div className="uk-text-right uk-padding-small uk-padding-remove-horizontal flex-center">  
          <span>Auto invest is off</span> 
         </div>
         
         {/*<div className="uk-padding-small uk-padding-remove-horizontal">
        <div className="">Interest Rate (#)</div> 
         <div className="uk-text-lead">#500.67</div>
         </div>*/} 
        </div>   
        <div className="uk-padding-small "> 
         <div id="dash-card" className="uk-card uk-card-default uk-box-shadow-small uk-border-rounded uk-padding-small uk-grid uk-grid-collapse uk-child-width-1-2">   
          <div>
            <div className="uk-text-small uk-text-muted">Yesterday's Income</div>
             <div className="uk-text-bold">&#8358;{numberFormat(50070)}</div>      
          </div>
          <div className="uk-text-right">
            <div className="uk-text-small uk-text-muted">Total Income</div>
            <div className="uk-text-bold">&#8358;0.00</div>
          </div>  
         </div>
        </div>
      </div>
      <div className="uk-padding-small uk-padding-remove-vertical">  
      <div className="top-space"></div>
       <div id="dash2" className="uk-grid uk-grid-collapse uk-child-width-1-3">
        <div className="uk-text-center save"> 
         <Link href="app/save"><a><div><span className="bi-piggy-bank-fill x-big"></span></div>  
         <div>save</div></a></Link>  
        </div>
        <div className="uk-text-center topup">
         <Link href="app/topup"><a><div><span className="bi-credit-card-2-back-fill x-big"></span></div>
         <div>topup</div></a></Link>      
        </div>
        <div className="uk-text-center withdraw">
         <div><span className="bi-wallet-fill x-big"></span></div>
         <div>withdraw</div>        
        </div>
       </div> 
        {/*<div className="uk-padding-small">
        <div>
          <Link href={(balance < 500)? 'app/topup/' : 'app/save/'}><a id="invest" className="uk-button uk-button-large uk-width-expand uk-border-rounded">save</a></Link>
          </div> 
          <div className="uk-padding-small uk-padding-remove-horizontal uk-grid">           
           <div className="uk-text-center uk-border-rounded grey" style={{borderLeft: '0.5rem solid red'}}>        
            <Link href="app/topup"><a><div style={{color: 'red'}}><span className="bi-credit-card x-big"></span></div>   
            <div className="uk-text-center" style={{color: '#ee6666'}}>Add Money</div></a></Link>   
           </div> 
           
           <div>
            <div className="uk-text-center"><span className="bi-wallet x-big"></span></div>  
            <div className="uk-text-center">Withdraw</div>  
           </div> 
           
          </div>
        </div>}*/}
       </div>  
      <AppBar />  
     </div> 
    )
} 