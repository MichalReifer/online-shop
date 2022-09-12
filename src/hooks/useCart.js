import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useSignup } from './useSignup'
import swal from 'sweetalert'
import Swal from "sweetalert2"
import { addNewOrder } from '../redux/slices/ordersSlice'

export const useCart = () => {

  const history = useHistory()
  const {signup} = useSignup()
  const user = useSelector(state => state.currentUser)
  const currentUser = user.userInfo
  const dispatch = useDispatch()

  const addToCart = (cakeId) => {
    let storage = localStorage.getItem('order');
    if (storage){
        if (!storage.includes(cakeId)) {
            let order = JSON.parse(storage);
            order[cakeId] = 1;
            storage = JSON.stringify(order);
            localStorage.setItem('order', storage);
            swal("Added To Cart!", { 
                icon: "success",
                buttons: ['Keep Shopping', 'Go To Cart']})
            .then(cart=> {
                if (cart){history.push("/cart")}
                else {history.push("/")}
            })
        }
        else{ swal('This item is already in cart.', {
            icon: 'error',
            buttons: ['Keep Shopping', 'Go To Cart']})
            .then(cart=> {
                if (cart){history.push("/cart")}
                else {history.push("/")}
            })
        }
    }
    else{
        localStorage.setItem('order', `{"${cakeId}": 1}`);
        swal("Added To Cart!", { 
            icon: "success",
            buttons: ['Keep Shopping', 'Go To Cart']})
        .then(cart=> {if (cart){history.push("/cart");}})
    }
  }

  const removeFromCart = (cakeId, setProducts, setOrder) => {
    swal({
      title: "Are you sure?",
      text: "This cake looks yummy!",
      icon: "warning",
      buttons: true,
      dangerMode: true,})
    .then((toDelete) => {
      if (toDelete) {
        let order = JSON.parse(localStorage.getItem('order'));
        delete order[cakeId];
        setOrder(order)
        setProducts(products=>products.filter(product=>product.cakeId!=cakeId))
        swal("Poof!", { icon: "success",})
      }
    })
    .catch(e=> console.log('error occured: ', e))
  }

  const checkout = async (totalPrice) => {
    if (currentUser)
      Swal.fire({
        title: `checkout as ${currentUser.name}?`,
        icon: 'question',
        showCancelButton: true,
        focusConfirm: false
      })
      .then(result=>{
        if(result.isConfirmed) 
          takeOrder(user.userToken, totalPrice)
      }) 
    else 
      signup()
      .then(data=>{
        if(data) takeOrder(data.value?.token, totalPrice)
        else console.error(data)
      })

  }

  const takeOrder = (token ,totalPrice) => {
    const order = {
      'products': JSON.parse(localStorage.getItem('order')),
      totalPrice
    }
    dispatch(addNewOrder({order, token}))
      .then(res=>{
        if (res.error) throw Error(res.error.message)
        else return
      })
      .then(()=>
        Swal.fire({
          title: 'order completed',
          text: 'an email is sent to you with the order details and a link for payment',
          icon: 'success'
        })
      )
      .then(()=>history.push('/'))
      .catch(err=>console.log(err))
  }
  

  return {addToCart, removeFromCart, checkout}

}