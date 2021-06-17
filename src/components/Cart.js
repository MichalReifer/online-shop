import { useEffect, useRef, useState } from "react";
import CartProducts from "./CartProducts";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useHistory } from "react-router";
import Swal from "sweetalert2";


const Cart = (props) => {

    const [ isLoading, setIsLoading ] = useState(true);
    const [ cartEmpty, setCartEmpty ] = useState(true);
    const [ products, setProducts] = useState([]);
    const [ totalPrice, setTotalPrice] = useState(0)
    const history = useHistory();

    const resetTotalPrice = (price)=>{
        setTotalPrice(price);
    }

    const isCartEmpty = (ans)=>{
        setCartEmpty(ans);
    }

    const emailValidate = (string) => {
        return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? 'valid' : 'invalid'
    }

    const checkout = async () => {
        const { value: details} = await Swal.fire({
            title: 'Enter Your Details',
            html:
              '<input id="name" class="swal2-input" type="name" placeholder="Name">' +
              '<input id="email" class="swal2-input" type="email" placeholder="Email">'+
              '<input id="address" class="swal2-input" type="address" placeholder="Delivary Address">',
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {

                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const address = document.getElementById('address');
                name.classList.remove("swal2-inputerror");
                email.classList.remove("swal2-inputerror");
                address.classList.remove("swal2-inputerror");

                if (!name.value||!email.value||!address.value){
                    Swal.showValidationMessage('please fill in all fields');
                    if (!name.value){name.classList.add("swal2-inputerror");}
                    if (!email.value){email.classList.add("swal2-inputerror");}
                    if (!address.value){address.classList.add("swal2-inputerror");}
                }
                else if (email.value && emailValidate(email.value)==='invalid') {
                    Swal.showValidationMessage('email address is invalid');
                    email.classList.add("swal2-inputerror");
                } else {
                    const orderID = Math.random().toString(36).substr(2, 9);
                    return [
                        {'name': name.value, 'email': email.value, 'address': address.value, 'orders': [orderID]},
                        {'orderID': orderID,'total-price': totalPrice, 'products': JSON.parse(localStorage.getItem('order')),
                         'time': new Date().toLocaleString()}
                    ]
                }
            }
          })          
          if (details) {
            const [user, order] = details;
            console.log('user: ',user);
            console.log('order: ', order);
            Swal.fire({
                title: 'order completed',
                text: 'an email is sent to you with the order details and a link for payment',
                icon: 'success'})
          }
    }

    useEffect(async ()=>{
        let storage = localStorage.getItem('order');
        if (storage && storage!='{}'){
            setCartEmpty(false);
            let order = JSON.parse(storage);
            for (const cakeId in order){
                let data = await props.firebase.getProductByName(cakeId).then(result=>result);
                setProducts(prevArr => [...prevArr, data]);
                setTotalPrice(prevPrice => prevPrice += data.price*order[cakeId]);
            }
        }
        setIsLoading(false)
    }, [])


    return (
        <div className="cart">
            { cartEmpty && <h1>Your cart is empty.</h1>}
            { !cartEmpty && 
                <div>
                    <h1>Cart</h1> 
                    <CartProducts cartProducts={products} resetTotalPrice={resetTotalPrice} cartEmpty={isCartEmpty}/>
                </div>}
            { isLoading && <div>Loading...</div> }
            { totalPrice!=0 &&
            <div className="cart-bottom">
                <h2><pre>Total Price:   {totalPrice}₪</pre></h2>    
                <button onClick={checkout}>Checkout</button>
            </div>   }
        </div>
    );
}
 
export default compose(withFirebase)(Cart);
