import Lottie from 'lottie-react'
import {useState,useEffect,useRef} from 'react'
import * as animationData from '../animations/success-check.json'
import Link from 'next/link'

export default function Success(props) {
 const lottieRef = useRef();
 //lottieRef.current.setSpeed(2);    
 const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }, 
  };
 
 
 return (
    <div id="box">
    <style jsx>{`
      #box {
        position: fixed; 
        height: 100%; 
        width: 100vw;
        top: 0;
        left: 0;
        background: white;
      }
      #container {
        min-height: 35vh;    
      }
    `}</style>
   <div id="container">
     <Lottie
        //options={defaultOptions}  
        loop={true} 
        autoplay={true} 
        animationData={animationData}
        height={300}
        width={300}
        lottieRef={lottieRef}
        />
       </div>
        <p className="uk-text-lead uk-text-center">success</p>
        <p className="uk-text-center"><Link href=""><a>view details <span className="bi-chevron-rigt"></span></a></Link></p>
    </div>   
   )
  

}   