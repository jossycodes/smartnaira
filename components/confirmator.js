import {useState,useEffect} from 'react'

export default function Confirmator(props) {
  const type = props.type || 'number' 
  const handleChange = (e)=> {
    if(e.target.value.length > 0 && e.target.value !== ',') {
      let i; 
     for(i=1; i<5; i++) {
       let input = document.getElementById(''+i+'');  
       if(input.value.length > 0) {
         input.blur(); 
       } else {
         input.focus();
          
         break;
       }
     }
    }
    if(isNaN(e.target.value)) { 
      e.target.value = '' 
    }
    e.target.value = e.target.value.slice(0,1);      
  }
  
  const handleFocus = (e)=> {
    e.target.value = '' 
  }
  return (
    <div id={props.id} className="uk-padding uk-padding-remove-horizontal uk-grid uk-grid-collapse uk-child-width-1-4 uk-width-expand">  
          <div className="flex-center">
           <input id="1" onFocus={handleFocus} onChange={handleChange} className="verify-input" type={type} />  
          </div> 
          <div className="flex-center">
           <input id="2" onFocus={handleFocus} onChange={handleChange} className="verify-input" type={type} />
          </div>
          <div className="flex-center">
           <input id="3" onFocus={handleFocus} onChange={handleChange} type={type} className="verify-input"/> 
          </div>
          <div className="flex-center">
           <input id="4" onFocus={handleFocus} onChange={handleChange} type={type}  className="verify-input"/>
          </div>
     </div>  
    )
} 