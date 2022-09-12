import { useDispatch, useSelector } from 'react-redux'
import { userLogin, userLogout } from '../redux/slices/currentUserSlice'
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom'
import { fetchUserByEmail } from '../redux/slices/usersSlice';

export const useLogin = ()=> {

  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector(state => state.currentUser)

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

  const forgotPasswordHandler = async (firebase)=>{
    const email = document.getElementById('email')
    const link = document.getElementById('forgot-password')
    link.addEventListener('click', async event => { 
        if(!email.value){
          email.classList.add("swal2-inputerror")
          email.focus()
          Swal.showValidationMessage('please fill in your email address')
        }
        else
          dispatch(fetchUserByEmail({email: email.value, token: currentUser.userToken}))
          .then(data=>{
            if(data.payload) return //TODO: add function for reset password via email
            else {
              email.classList.add("swal2-inputerror")
              email.focus();
              Swal.showValidationMessage('email address is invalid')
              throw new Error('email is invalid')
            }
          })
          .then(()=>
            Swal.fire({
              title: 'a password reset link is sent to your email address.',
              icon: 'success'
            })
          )
          .catch(err=>{})

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