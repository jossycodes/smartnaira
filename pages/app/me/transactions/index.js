import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {useSession,getSession} from "next-auth/react";
import Spinner from '/components/spinner'
import TopNav from '/components/top-nav'
import useSWR from 'swr' 
export default function Success(props) {
 const { data: session, status } = useSession();
 const router = useRouter();
 const [transactions,seTransactions] = useState(null);
 const fetcher = async (url) => await fetch(url).then((res) => res.json());  
 const { data, error } = useSWR(`../../api/actions/transactions?user=${(session)? session.user._id : ''}`,fetcher);         
 
 const Transactions = ({transactions}) => {
   
   if(!transactions) return <div className="flex-center full-height"><Spinner /></div>;
   
   if(transactions.length < 1) return <div className="flex-center full-height uk-text-muted">Nothing to see here.</div>;
   
   return ( 
   <div>{transactions[0].status}</div>
   )  
 } 
 


if(status === 'loading') return <div className="flex-center full-height"><Spinner /></div>;
  
if(status === 'unauthenticated') return router.push('/login');
  

if(!data)  return <div className="flex-center full-height"><Spinner /></div>;  

return (
   <div>
    <TopNav name="Transactions"/>
    <div>
     <Transactions  transactions={data.transactions}  />   
    </div>  
   </div>
  ) 
} 