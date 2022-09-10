import { useEffect, useState } from "react";
import CartProducts from "./CartProducts";
import { useDispatch } from 'react-redux'
import { fetchCakeById } from "../redux/slices/cakesSlice"
import { useCart } from "../hooks/useCart";
import Loading from "./Loading";


const Cart = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [ cartEmpty, setCartEmpty ] = useState(true);
    const [ products, setProducts] = useState([]);
    const [ totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch()
    const { checkout } = useCart()

    useEffect(async ()=>{
        const order = JSON.parse(localStorage.getItem('order'))
        if (order && Object.keys(order).length>0){
            setCartEmpty(false);
            for (const cakeId in order){
                await dispatch(fetchCakeById(cakeId))
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
        setIsLoading(false)
    }, [])

    return (
        <div className="cart">
            <h1>CART</h1> 
            <Loading {...{isLoading}}/>
            { !isLoading && 
                ( cartEmpty ? 
                    <h1 className="cart-empty">your cart is empty</h1>
                :
                  <>
                    <div>
                        <CartProducts {...{products, setProducts, setTotalPrice, setCartEmpty}}/>
                    </div>
                    <div className="cart-bottom">
                        <h3><pre>Total Price:   {totalPrice}₪</pre></h3>    
                        <button onClick={()=>checkout(totalPrice)}>Checkout</button>
                    </div>
                  </>
                )
            }
        </div>
    );
}
 
export default Cart;
