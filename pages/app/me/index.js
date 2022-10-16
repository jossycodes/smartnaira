import AppBar from '/components/app-bar'
import {useState} from 'react'
import Link from 'next/link'
import {signOut} from 'next-auth/react' 
import {useRouter} from 'next/router'
import Spinner from '/components/spinner'
import {useSession,getSession} from "next-auth/react" 

export default function Me() {
  
  const router = useRouter(); 
  
  const { data: session, status } = useSession();
    
  if(status === 'loading') return <div className="flex-center full-height"><Spinner /></div>;
  
  if(status === 'unauthenticated') return router.push('/login');
  
  const signout = async(e)=> {
    let signingOut = await signOut({callbackUrl: '/login'});   
    //useRouter().push('/login');    
  } 
  
  return (
     <>
     <style>{`
        .x-big {
          font-size: 1.8rem;  
          color: #fff; 
        }
        .img-* {
          display: inline-block; 
        }
        .img-name {
          padding-top: 0.6rem; 
        }
        .circle {
          background: var(--primaryDark);
          height: 2.5rem;
          width: 2.5rem; 
          border: 3px solid #f5f5f5; 
          border-radius: 50%; 
        }
        .uk-card .uk-grid div {
          padding-top: 0.6rem;  
        }
        #utils div{
          border-top: 1px solid #eee;
          color: grey; 
        }
        #utils div:last-child {
          border-bottom: 1px solid #eee;     
        }  
     `}</style>
     <div className="bottom-space">
      <div className="uk-grid  uk-padding-small">
      
      <div className="uk-width-expand">
      <Link href="/app/me/profile"><a>
       <div className="img-con">
        {(session.user.image)?  
          <div></div>
          :
          
          <span className="circle flex-center uk-float-left">  
           <span className="bi-person-fill x-big"></span> 
          </span>   
        }</div>
        <div className="img-name uk-text-muted">&nbsp;{session.user.phone}&nbsp;&nbsp;<span className="bi-chevron-right"></span></div> 
        </a></Link>
        </div>
        
        <div className="uk-text-right uk-width-1-6"> 
           <Link href="/app/me/settings"><a className="bi-gear uk-text-large uk-text-muted"></a></Link>  
        </div>  
       </div>
       
       <div className="bottom-space uk-padding-small">
        <div className="uk-card uk-border-rounded uk-padding-small uk-box-shadow-medium">  
          {/*<div className="uk-grid uk-child-width-1-2">  
            <div>First Name</div>
            <div>{session.user.fName}</div>
            <div>Last Name</div>
            <div>{session.user.lName}</div>
            <div>Phone Number</div>
            <div>{session.user.phone}</div> 
            <div>...</div>
            <div className="uk-text-right"><Link href="me/edit"><a className="bi-pencil-square text-primary"></a></Link></div>   </div>*/}       
        </div>
       </div>
       <div id="utils">
        <Link href="/app/me/transactions"><a><div className="uk-padding-small">Transaction details</div></a></Link>
        <Link href="/app/me/transactions"><a><div className="uk-padding-small">Help</div></a></Link>
        <div className="uk-padding-small">Report a problem</div>  
       </div> 
       <div className="uk-padding-small uk-margin uk-margin-remove-horizontal"> 
        <button onClick={()=>signout()} className="uk-button uk-button-large uk-border-rounded uk-width-expand bg-primary">Logout</button> 
       </div> 
     </div>
      <AppBar dir="me"/> 
     </> 
    )
} 