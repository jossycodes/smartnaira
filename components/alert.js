
export default function Alert(props) {
  let borderColor;
  if(props.type == 'danger') {
    borderColor = 'red'
  } else if(props.type == 'info') {
    borderColor = 'deepskyblue'
  } else if(props.type == 'warninig') {
    borderColor = 'yellow' 
  } else {
    borderColor = 'teal'
  } 
  return (
      <div className="uk-card uk-border-rounded uk-width-expand grey" style={{border: '1px solid transparent',borderLeft: `0.4rem solid ${borderColor}`}}>  
      <div></div> 
      <div className="uk-grid uk-grid-collapse uk-width-expand">
      <div className="uk-width-expand uk-padding-small">   
      <span>{props.message}</span>
      </div>
      {/*<div className="uk-width-1-6 flex-center"><span className={`bi-${(props.icon)? props.icon : 'info-circle'} `} style={{color: borderColor}}></span></div>*/} 
     </div>      
      </div>       
    ) 
}