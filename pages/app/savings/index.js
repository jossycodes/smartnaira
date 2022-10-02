import TopNav from '/components/top-nav'
import AppBar from '/components/app-bar'
export default function Savings() {
  const savings = []
  return (
      <div className="full-height"> 
        {(savings.length < 1)? <div className="flex-center expand-height">Your savings will appear here.</div> : ''}
         <AppBar dir="savings"/>   
         </div>  
    )
}