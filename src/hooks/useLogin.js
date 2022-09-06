import { useDispatch } from 'react-redux'
import { userLogin, userLogout } from '../redux/slices/currentUserSlice'
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom'

export const useLogin = ()=> {

  const dispatch = useDispatch()
  const history = useHistory()

  const login = async () => {
    await Swal.fire({
        title: 'Enter Your Details',
        html:
          '<input id="email2" class="swal2-input" type="email" placeholder="Email">'+
          '<input id="password2" class="swal2-input" type="password" placeholder="Password">',
        focusConfirm: false,
        showCancelButton: true,
        allowEnterKey: true,
        preConfirm: preConfirmLogin
      }
    )
  }

  const preConfirmLogin = async () => {

    const email = document.getElementById('email2');
    const password = document.getElementById('password2');

    email.classList.remove("swal2-inputerror");
    password.classList.remove("swal2-inputerror");

    if (!email.value){email.classList.add("swal2-inputerror")}
    if (!password.value){password.classList.add("swal2-inputerror");}
  
    await dispatch(userLogin({email: email.value, password: password.value}))
      .then(res=> {
        if(res.error){
          Swal.showValidationMessage(res.error.message)
          if (/email/i.test(res.error.message)) {
            email.classList.add("swal2-inputerror");
            email.focus()
          }
          else if (/password/i.test(res.error.message)) {
            password.classList.add("swal2-inputerror");
            password.focus()
          } 
        }
      })

  }

  const logout = ()=>{
    Swal.fire({
        title: 'log out?',
        icon: 'question',
        showCancelButton: true
    }).then(result=>{
        if(result.isConfirmed) {
          dispatch(userLogout())
          history.push('/')
        }
    })
  }
    
  return {login, logout}

}