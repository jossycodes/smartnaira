import UIkit from 'uikit/dist/js/uikit.js'
import {useEffect} from 'react'
export default function Spinner() {
  useEffect(() => {
    UIkit.spinner('#spinner'); 
  },[]);
  return (
     <div id="spinner"></div>
    )  
}