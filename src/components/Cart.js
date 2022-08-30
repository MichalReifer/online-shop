import { useEffect, useState, useContext } from "react";
import CartProducts from "./CartProducts";
import { useHistory } from "react-router";
import { checkout } from '../utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useDispatch } from 'react-redux'
import { fetchCakeById } from "../redux/slices/cakesSlice"


const Cart = (props) => {

    const { setStorageUser: setUser } = useContext(CurrentUserContext);
    const [ cartEmpty, setCartEmpty ] = useState(true);
    const [ products, setProducts] = useState([]);
    const [ totalPrice, setTotalPrice] = useState(0)
    const history = useHistory();
    const dispatch = useDispatch()

    const resetTotalPrice = (price)=>{
        setTotalPrice(price);
    }

    const emptyCart = (ans)=>{
        setCartEmpty(ans);
    }

    useEffect(()=>{
        const storage = localStorage.getItem('order');
        if (storage && storage!='{}'){
            setCartEmpty(false);
            let order = JSON.parse(storage);
            for (const cakeId in order){
                dispatch(fetchCakeById(cakeId))
                    .then(data=>data.payload)
                    .then(cake=>{
                        setProducts(prevArr => [...prevArr, cake]);
                        setTotalPrice(prevPrice => prevPrice += cake.price*order[cakeId]);
                    })
            }
        }
    }, [])

    return (
        <div className="cart">
            { cartEmpty && <h1 className="cart-empty">your cart is empty</h1>}
            { !cartEmpty && 
                <div>
                    <h1>CART</h1> 
                    <CartProducts cartProducts={products} resetTotalPrice={resetTotalPrice} emptyCart={emptyCart}/>
                </div>}

            { totalPrice!=0 &&
                <div className="cart-bottom">
                    <h3><pre>Total Price:   {totalPrice}₪</pre></h3>    
                    <button onClick={()=>checkout(props.firebase, history, totalPrice, setUser)}>Checkout</button>
                </div>
            }
        </div>
    );
}
 
export default Cart;
