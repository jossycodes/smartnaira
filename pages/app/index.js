import Head from 'next/head'
import Image from 'next/image'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Spinner from '/components/spinner'
import AppBar from '/components/app-bar'
import numberFormat from '/lib/number-format'
import {useSession,getSession} from "next-auth/react" 
import useSWR from 'swr' 
 
export default function Dash() {
  const { data: session, status } = useSession();
  const router = useRouter(); 
  const fetcher = async (url) => await fetch(url).then((res) => res.json());  
 const { data, error } = useSWR(`../api/actions/balance?user=${(session)? session.user._id : ''}`,fetcher);  
 
  const Top = ()=> {
    return (<div className="uk-padding-small uk-padding-remove-bottom">
    
    </div>)
   
  }
  
  if(status === 'loading') return <div className="flex-center full-height"><Spinner /></div>;
  
  if(status === 'unauthenticated') return router.replace('/login');  
  
  
  return (
    <div>
    <style jsx>{`
      #dash {
        background: #f5f5f5;   
        position: relative;
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
       font-size: 2rem;     
     }
     #dash2 {
      /* border: 1px solid var(--primaryDark);*/      
     }
     .save div {
       //color: #005cff;
     }
     .save div span {
       color: #063abe; 
     }
     .topup div {
       //color: #f300ff;
     }
     .topup div span {
       color: #bc04ab; 
     }
     .withdraw div {
       //color: #ff7c00;
     }
     .withdraw div span {
       color: #cb7912; 
     }
     .extra {
       min-height: 5rem !important;
       border: 1px solid #f5f5f5;
       position: relative;
     }
     .tag {
       display: inline-block;
       position: absolute;
       top: 0;
       right: 0; 
       color: white;
       font-weight: bold;
       padding: 0.1rem 0.25rem; 
       background: red;
       font-size: 0.7rem; 
       border-bottom-left-radius: 0.3rem;
     }
    `}</style>
      <div id="dash">
        <Top />
        <div className="uk-padding-small uk-padding-remove-vertical uk-grid uk-grid-collapse uk-child-width-1-2">
        <div>
          
        <div className="uk-padding-small uk-padding-remove-horizontal">
         <div className="">Balance <span ></span></div>  
         <div className="uk-text-lead">&#8358;{(data)? numberFormat(data.balance) : '0.00'}</div>  
         </div>         
         
         
        </div> 
         
         <div className="uk-text-right uk-padding-small uk-padding-remove-horizontal flex-center">  
            <div className="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-top"> 
         <div className="">Current Rates <span ></span></div>  
         <div className="uk-text-lead">+255.5% p.a</div> 
         </div> 
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
        <div className="uk-text-center topup">
         <Link href="app/topup"><a><div><span className="bi-credit-card-2-back-fill x-big"></span></div>
         <div className="uk-text-muted uk-text-small">Topup</div></a></Link>       
        </div>
        <div className="uk-text-center save"> 
         <Link href="app/save"><a><div><span className="bi-box-fill x-big"></span></div>   
         <div className="uk-text-muted uk-text-small">Save</div></a></Link>   
        </div> 
        <div className="uk-text-center withdraw">
         <Link href="app/withdrawal"><a><div><span className="bi-bag-fill x-big"></span></div>  
         <div className="uk-text-muted uk-text-small">Withdraw</div></a></Link>        
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
       
      <div className="bottom-space"> 
       <div className="uk-grid uk-grid-collapse uk-child-width-1-2 uk-padding uk-padding-remove-horizontal">  
        <div className="flex-center extra">
        <span className="tag">+10%</span> 
          <span className="bi-people-fill uk-text-lead"></span>&nbsp;&nbsp;<span>Refer friends</span>  
        </div>    
        <div className="flex-center extra">
          <span></span>&nbsp;&nbsp;<span>smart saving</span> 
        </div> 
        <div className="flex-center extra">
          <span></span>&nbsp;&nbsp;<span>smart saving</span>
        </div> 
       </div>
       </div>
       
      <AppBar />  
     </div> 
    )
} 