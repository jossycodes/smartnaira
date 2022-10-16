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
      .active div {
        //color: var(--primaryDark);
        display: inline-block; 
        background: #f5f5f5;
        border-radius: 0.5rem; 
      }
      .icon-house {
       padding: 0.2rem 0.5rem; 
      }
      .active div i {
        color: var(--primaryDark); 
      }
      span {
       display: none;
      }
      .active span {
        display: inline; 
      }
    `}</style>
      <div id="bar" className="uk-grid uk-grid-collapse uk-child-width-1-3">  
        <Link href="../app/"><a><div className="flex-center uk-padding-small" id="home">
         <div className="icon-house">
         <i  className="bi-house-fill uk-text-large"></i>&nbsp;&nbsp;<span><sup>Home</sup></span> 
         </div>
        </div></a></Link>    
        <Link href="../app/savings"><a><div className="flex-center uk-padding-small uk-padding-remove-horizontal" id="savings">  <div className="uk-text-center icon-house">  
         <i className="bi-box-fill uk-text-large"></i>&nbsp;&nbsp;<span><sup>Savings</sup></span>  
        </div> 
        </div></a></Link>
        <Link href="../app/me"><a><div className="flex-center uk-padding-small" id="me">
        <div className="icon-house">
         <i  className="bi-person-fill uk-text-large"></i>&nbsp;&nbsp;<span><sup>Me</sup></span>  
         </div>
        </div></a></Link>          
      </div>
    </>
    ) 
} 