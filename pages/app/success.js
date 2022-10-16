import Lottie from 'lottie-react'
import {useState,useEffect,useRef} from 'react'
import * as animationData from '../../animations/success-check.json'
import Link from 'next/link'
import {useRouter} from 'next/router' 

export default function Success(props) {
 const lottieRef = useRef();
 const { query } = useRouter();
 const router = useRouter();
 //lottieRef.current.setSpeed(2);    
 const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }, 
  };
  
  useEffect(() => {
  if(!query.ref || !query.to) router.back(); 
  },[]); 
 
 
 return (
    <div id="box">
    <style jsx>{`
      #box {
        height: 100vh; 
        width: 100vw;
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
        <h2 className="uk-text-center">success</h2> 
        <p className="uk-text-center"><Link href={'/app/me/'+query.to+'/'+query.ref}><a className="text-primary">view details <span className="bi-chevron-right"></span></a></Link></p>   
    </div>     
   )
  

}  