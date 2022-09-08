import { useEffect, useState, useContext } from "react";
import CartProducts from "./CartProducts";
import { useDispatch } from 'react-redux'
import { fetchCakeById } from "../redux/slices/cakesSlice"
import { useCart } from "../hooks/useCart";


const Cart = () => {

    const [ cartEmpty, setCartEmpty ] = useState(true);
    const [ products, setProducts] = useState([]);
    const [ totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch()
    const { checkout } = useCart()

    useEffect(()=>{
        const order = JSON.parse(localStorage.getItem('order'))
        if (order && Object.keys(order).length>0){
            setCartEmpty(false);
            for (const cakeId in order){
                dispatch(fetchCakeById(cakeId))
                    .then(data=>data.payload)
                    .then(cake=>{
                        if (cake) {
                            setProducts(prevArr => [...prevArr, cake]);
                            setTotalPrice(prevPrice => prevPrice += cake.price*order[cakeId]);
                        }
                    })
            }
        }
        else setCartEmpty(true)
    }, [])

    return (
        <div className="cart">
            { cartEmpty ? 
                <h1 className="cart-empty">your cart is empty</h1>
            :
              <>
                <div>
                    <h1>CART</h1> 
                    <CartProducts {...{products, setProducts, setTotalPrice, setCartEmpty}}/>
                </div>
                <div className="cart-bottom">
                    <h3><pre>Total Price:   {totalPrice}₪</pre></h3>    
                    <button onClick={()=>checkout(totalPrice)}>Checkout</button>
                </div>
              </>
            }

        </div>
    );
}
 
export default Cart;
