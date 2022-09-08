import { useDispatch } from 'react-redux'
import { userSignup } from '../redux/slices/currentUserSlice'
import Swal from 'sweetalert2'
import { useLogin } from './useLogin'

export const useSignup = ()=> {

  const dispatch = useDispatch()
  const {login} = useLogin()

  const emailValidate = (string) => {
    return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? 'valid' : 'invalid'
  }

  const passwordValidate = (string) => {
    return /^[a-zA-Z0-9.+_-]{5,24}$/.test(string) ? 'valid' : 'invalid'
  }

  const signup = async () => {
    return Swal.fire({
      title: 'Enter Your Details',
      html:
        '<input id="name" class="swal2-input" type="name" placeholder="Name">' +
        '<input id="email" class="swal2-input" type="email" placeholder="Email">'+
        '<input id="address" class="swal2-input" type="address" placeholder="Delivary Address">'+
        '<input id="password" class="swal2-input" type="password" placeholder="Password">',
      focusConfirm: false,
      showCancelButton: true,
      showDenyButton: true,
      denyButtonText: 'Sign In',
      denyButtonColor: '#7e02c5d5', 
      preConfirm: preConfirmSignUp,
      willOpen: ()=>{ 
          let actions = Swal.getActions()
          let footerDiv = document.createElement('div')
          let denyButton = Swal.getDenyButton()
          let p = document.createElement('p')
          p.innerHTML = 'already have an account? '
          footerDiv.appendChild(p)
          footerDiv.appendChild(denyButton)
          actions.appendChild(footerDiv)
          footerDiv.classList.add('footer-div')
      }
    })
    .then(result=>{
      if(result.isDenied) return login()
      else if (result.isConfirmed) return result
    })
  }

  const preConfirmSignUp = () => {

    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const address = document.getElementById('address')
    const password = document.getElementById('password')

    name.classList.remove("swal2-inputerror")
    email.classList.remove("swal2-inputerror")
    address.classList.remove("swal2-inputerror")
    password.classList.remove("swal2-inputerror")
    
    if (!name.value||!email.value||!address.value||!password.value){
        Swal.showValidationMessage('please fill in all fields')
        if (!name.value){name.classList.add("swal2-inputerror")}
        if (!email.value){email.classList.add("swal2-inputerror")}
        if (!address.value){address.classList.add("swal2-inputerror")}
        if (!password.value){password.classList.add("swal2-inputerror")}
    }
    else if (email.value && emailValidate(email.value)==='invalid') {
        Swal.showValidationMessage('email address is invalid')
        email.classList.add("swal2-inputerror")
        email.focus()
    } else if (password.value && passwordValidate(password.value)==='invalid') {
        Swal.showValidationMessage('password should have at least 5 characters of english letters, digits and/or meta characters.')
        password.classList.add("swal2-inputerror")
        password.focus()
    } else {
        const user = {'name': name.value, 'email': email.value, 'address': address.value, password: password.value}
        return dispatch(userSignup(user))
          .then(res=> {
            console.log(res)
            if(res.error){
              Swal.showValidationMessage(res.error.message)
              if (/email/i.test(res.error.message)) {
                email.classList.add("swal2-inputerror")
                email.focus()
              }
            }
            else return res.payload
          })
    }
  }
    
  return {signup}

}