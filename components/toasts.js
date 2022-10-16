import Swal from 'sweetalert2'
 
export default function Toast(props) {
const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: false, 
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
toast.fire({
  icon: props.icon || 'info', 
  title: props.title 
})  
}