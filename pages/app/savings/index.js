import {useState,useEffect} from 'react'
import Link from 'next/link'
import Spinner from '/components/spinner'
import TopNav from '/components/top-nav'
import AppBar from '/components/app-bar'
import {useSession,getSession} from "next-auth/react"
import {useRouter} from 'next/router'
import useSWR from 'swr' 
import numberFormat from '/lib/number-format'  

export default function Savings() {
  
  const { data: session, status } = useSession();
  
  const fetcher = async (url) => await fetch(url).then((res) => res.json());  
 const { data, error } = useSWR(`../api/actions/save?user=${(session)? session.user._id : ''}`,fetcher); 
 
 if(status === 'loading') return <div className="flex-center full-height"><Spinner /></div>;
  
  if(status === 'unauthenticated') return router.replace('/login');
  
  
 
 const Savings = ({savings})=> {
   if(!data) {
     return <div className="flex-center full-height"><Spinner /></div>;
   } else if(data.length < 1) {
     return <div className="flex-center expand-height">Your savings will appear here.</div>   
   }
   const items = [];
   savings.forEach((saving)=> {
     const date1 = new Date(saving.date);
     const date2 = new Date(); 
     date1.setDate(date1.getDate() + (saving.days*1));    
     const difference_in_time = date1.getTime() - date2.getTime(); 
     const daysLeft = Math.ceil(difference_in_time /(1000 * 3600 * 24)) + ' days';    
    
     let item = (<Link href={`/app/savings/${saving.ref}`}><a><div className="uk-card uk-border-rounded" style={{margin: '1.2rem 0', background: '#fff'}}>      
      <div style={{background: (saving.running)? 'var(--primaryDark)' : 'lightgrey', color: 'white', padding: '0.5rem', borderTopRightRadius: '0.5rem'}}   className='uk-text-right uk-text-small uk-text-bold'>{saving.running? 'Running' : 'Settled'}</div>     
      <div className="uk-padding-small uk-grid uk-child-width-1-2">  
       <div className="">
       <span className="uk-text-muted uk-text-small">Saved up</span>  
       <div>&#8358;{numberFormat(saving.amount + saving.intrest)}</div>
       </div>
       <div className="uk-text-right">  
        <span className="uk-text-muted uk-text-small">{(saving.running)?'Complete in' : ''}</span> 
        <div className="uk-text-right">{saving.running? (<div><span className="bi-clock"></span> <span>{daysLeft}</span></div>): <div>Completed</div>}</div>    
       </div>  
       
      </div>
      <div className="uk-text-center"><span className="bi-three-dots"></span></div>  
     </div></a></Link>)
     items.push(item) 
   })
   return items.reverse();   
 }
  
  return (
      <div className="uk-padding-small bottom-space grey"> 
        <style jsx>{`
        `}</style>
        <Savings savings={(data)?data.savings : false} /> 
        <AppBar dir="savings"/>    
       </div>  
    )
}