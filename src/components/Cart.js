import { useEffect, useState } from "react";
import CartProducts from "./CartProducts";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { preConfirmFunction } from "./utils";


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
    
    const checkout = async () => {

        const { value: details} = await Swal.fire({
            title: 'Enter Your Details',
            html:
              '<input id="name" class="swal2-input" type="name" placeholder="Name">' +
              '<input id="email" class="swal2-input" type="email" placeholder="Email">'+
              '<input id="address" class="swal2-input" type="address" placeholder="Delivary Address">',
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: async ()=> { 
                return await preConfirmFunction(props.firebase.getUserByUserEmail, totalPrice);
            }
        })
        
        if (details) {
        const [user, order] = details;
        props.firebase.setOrder(order);
        props.firebase.setUser(user);
        Swal.fire({
            title: 'order completed',
            text: 'an email is sent to you with the order details and a link for payment',
            icon: 'success'})
        localStorage.removeItem('order');
        history.push('/');
        }
    }

    let storage = localStorage.getItem('order');
    useEffect(async ()=>{
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
    }, [localStorage])


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
