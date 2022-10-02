
export default function numberFormat(num) {
  let str = num + ''; 
  let arr = str.split(''); 
  let start;
  let pv;
  let nostops = false;
  for(let i=str.length; i>0; i--){ 
    if(str[i] == '.') {
      start = i;
      pv = start + 3;
      if(arr[pv]) arr = arr.splice(0,pv); 
    } 
  } 
  if(!start) {
    start = str.length;
    nostops = true
  }
  for(let i=start; i>0; i-=3) {
    if(i !== arr.length && arr[i] !== '.') arr.splice(i,0,',');     
  } 
  return (nostops)? arr.join('')+'.00' : arr.join('');  
}