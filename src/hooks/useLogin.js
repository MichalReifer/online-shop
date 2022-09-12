import { useDispatch } from 'react-redux'
import { userLogin, userLogout } from '../redux/slices/currentUserSlice'
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom'

export const useLogin = ()=> {

  const dispatch = useDispatch()
  const history = useHistory()

  const emailValidate = (string) => {
    return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string)
  }

  const login = () => {
    return Swal.fire({
        title: 'Enter Your Details',
        html:
          '<input id="email" class="swal2-input" type="email" placeholder="Email">'+
          '<input id="password" class="swal2-input" type="password" placeholder="Password">',
        focusConfirm: false,
        showCancelButton: true,
        allowEnterKey: true,
        footer: '<div class="forgot-password-footer">'+
        '<a id="forgot-password">forgot password?</a>'+
        '</div>',
        preConfirm: preConfirmLogin,
        didRender: forgotPasswordHandler
      }
    )
  }

  const preConfirmLogin = () => {

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    email.classList.remove("swal2-inputerror");
    password.classList.remove("swal2-inputerror");

    if (!email.value){email.classList.add("swal2-inputerror")}
    if (!password.value){password.classList.add("swal2-inputerror");}
  
    return dispatch(
      userLogin({email: email.value, password: password.value}))
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
        else return res.payload
      })

  }

  const forgotPasswordHandler = async ()=>{
    const email = document.getElementById('email')
    const link = document.getElementById('forgot-password')
    link.addEventListener('click', async event => { 
        if(!email.value){
          email.classList.add("swal2-inputerror")
          email.focus()
          Swal.showValidationMessage('please fill in your email address')
        }
        else if (!emailValidate(email.value)){
          email.classList.add("swal2-inputerror")
          email.focus();
          Swal.showValidationMessage('email is invalid')
        }
        else {
          //  TODO: function that sends an email to reset password  
          Swal.fire({
            title: 'a password reset link is sent to your email address.',
            icon: 'success'
          })   
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