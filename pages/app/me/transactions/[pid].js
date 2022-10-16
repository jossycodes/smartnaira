import Link from 'next/link'
import {useRouter} from 'next/router'
import {useSession,getSession} from "next-auth/react";
import {useState} from 'react'  
import Spinner from '/components/spinner'
import TopNav from '/components/top-nav'
import useSWR from 'swr' 

export default function (props) {
 const { data: session, status } = useSession();
 
 const router = useRouter();
 const { pid } = router.query; 
 const notFound = <div className="flex-center full-height uk-text-muted">No record for this transaction!</div>
 
 const fetcher = async (url) => await fetch(url).then((res) => res.json());  
 const { data, error } = useSWR('/api/actions/transactions?ref='+pid+'',fetcher);   
 
 const fullLoading = <div className="flex-center full-height"><Spinner /></div>; 
 

if(status === 'loading') return <div className="flex-center full-height"><Spinner /></div>;
  
if(status === 'unauthenticated') return router.push('/login');


const Transaction = ({transactions})=> {
  let trx =  transactions.find(({ reference }) => reference === pid);
  //alert(JSON.stringify(trx));
  if(!trx) return notFound;
  return (
  <div><li>{trx.status}</li></div> 
  ) 
} 


return (
   <div>
    <TopNav name="Transaction details"/>
    <div>{(data)? ((data.transactions)? <Transaction transactions={data.transactions} /> : notFound): fullLoading}</div>     
   </div>   
  ) 
}      