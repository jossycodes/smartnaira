import {useSession,getSession} from "next-auth/react"
import {useRouter} from 'next/router'
import useSWR from 'swr' 
import numberFormat from '/lib/number-format' 
import TopNav from '/components/top-nav'
import Spinner from '/components/spinner'
import Alert from '/components/alert'
export default function() {
  const router = useRouter(); 
  const { pid } = router.query; 
  const { data: session, status } = useSession();
  const fetcher = async (url) => await fetch(url).then((res) => res.json());  
 const { data, error } = useSWR(`../../api/actions/save?user=${(session)? session.user._id : ''}`,fetcher);
  
 if(status === 'loading') return <div className="flex-center full-height"><Spinner /></div>;
  
  if(status === 'unauthenticated') return router.replace('/login');
  
    const Saving = ({savings})=> {
    if(savings == undefined || !savings) return <div className="flex-center full-height"><Spinner /></div>; 
    
     
    const saving =  savings.find(({ ref }) => ref == pid); 
    
     
    
    if(!saving) return <div className="flex-center full-height">No saving record found</div>;
    
    //alert(JSON.stringify(saving));
    
    let timeleft;
    let signature;
    
    const date1 = new Date(saving.date);
     const date2 = new Date(); 
     date1.setDate(date1.getDate() + (saving.days*1));    
     const difference_in_time = date1.getTime() - date2.getTime(); 
     const daysLeft = Math.ceil(difference_in_time /(1000 * 3600 * 24)); 
     
     if(daysLeft > 0) { 
       timeleft = daysLeft;
       signature = 'days'
     }
    
    
   return (
       <div className=""> 
       <style jsx>{`
        .x-big {
          font-size: 2rem;  
        }
        #break-btn {
          background: var(--primary);
        }
        .btn-con {
          margin-bottom: 1rem; 
        }
       `}</style>
        <div className="uk-card uk-card-default uk-border-rounded uk-padding-small"> 
         <div className="uk-text-center x-big"><span className={(saving.running)? 'bi-box' : 'bi-check-circle'}></span></div>  
         <div className="uk-text-center uk-text-lead">{(saving.running)? 'Running' : 'Completed'}</div>
         <div>{(saving.running)? <div><div className="uk-padding-small uk-padding-remove-bottom uk-padding-remove-horizontal">{/*<span className="bi-lock-fill uk-text-large"></span>&nbsp;&nbsp;*/}<p>This cube has been locked to prevent premature withdrawals.</p>
         <p>You can decide to break the cube and withdraw your cash.</p></div> 
         <div className="uk-padding-small uk-padding-remove-horizontal">
         <Alert type="danger" icon="exclamation-triangle-fill" message="Please know that breaking this cube before it's due date results in a 20% loss of all interests gained." /> 
         </div>  
          <div className=""> 
          <div></div>  
          <div className="uk-grid uk-grid-gap">
          <div className="uk-width-1-1 uk-width-1-2@s btn-con">
          <button className="uk-width-expand uk-button uk-button-large uk-border-rounded uk-text-muted" style={{border:'1px solid #303435',  fontWeight: 'light'}}>wait {timeleft} more {signature}</button>     
          </div>    
          <div className="uk-width-1-1 uk-width-1-2@s btn-con">  
          <button id="break-btn" className="uk-width-expand uk-button uk-button-large  uk-border-rounded">Break this cube</button>
          </div>
          </div>
          </div>      
         </div> : ''}</div>      
        </div>     
       </div>    
     ) 
  }
 
  return(
    <div>
    <TopNav name="Saving Record"/>
     <div className="uk-padding-small grey">
      <Saving savings={(data)?data.savings : null} />    
     </div> 
     </div> 
    )
}  