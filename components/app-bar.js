import Link from 'next/link'
import {useState,useEffect} from 'react'
export default function AppBar(props) {
 useEffect(() => {
  if(props.dir) {
    document.getElementById(props.dir).classList.add('active');  
  } else {
    document.querySelector("#home").classList.add('active');
  }
 },[])
  return(
    <>
    <style jsx>{`
      #bar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.9) !important; 
         backdrop-filter: blur(15px) !important;
         background: white;  
      }
      a {
        color: grey !important; 
      }
      .active {
        color: var(--primaryDark); 
      }
    `}</style>
      <div id="bar" className="uk-grid uk-grid-collapse uk-child-width-1-3">  
        <Link href="../app/"><a><div className="flex-center uk-padding-small">
         <span id="home" className="bi-house-fill uk-text-large"></span> 
        </div></a></Link>    
        <Link href="../app/savings"><a><div className="flex-center uk-padding-small">
         <span id="savings" className="bi-box-fill uk-text-large"></span> 
        </div></a></Link>
        <Link href="../app/me"><a><div className="flex-center uk-padding-small"> 
         <span id="me" className="bi-person-fill uk-text-large"></span>
        </div></a></Link>       
      </div>
    </>
    )
} 