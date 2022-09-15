import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { fetchCakesByList } from "../redux/slices/cartSlice"
import { useCart } from "../hooks/useCart";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";


const Cart = () => {

    const [ isLoading, setIsLoading ] = useState(true)
    const [ isCartEmpty, setIsCartEmpty ] = useState(true);
    const [ products, setProducts ] = useState([]);
    const [ totalPrice, setTotalPrice ] = useState(0)
    const [ order, setOrder ]  = useState(JSON.parse(localStorage.getItem('order')));
    const { removeFromCart, checkout } = useCart()
    const dispatch = useDispatch()


    useEffect(async ()=>{
        const cakeList = order? Object.keys(order) : []
        if (cakeList.length){
            setIsCartEmpty(false)
            await dispatch(fetchCakesByList(cakeList))
                .then(data => {
                    if (data.error) throw Error(data.error)
                    else setProducts(data.payload)
                })
        }
        setIsLoading(false)
    }, [dispatch])

    useEffect(()=>{
        localStorage.setItem('order', JSON.stringify(order))
        const cakeList = order? Object.keys(order) : []
        let totalPrice = 0
        
        if (cakeList.length)
            products.forEach(product=>totalPrice+=product.price*order[product.cakeId])
        else setIsCartEmpty(true)

        setTotalPrice(totalPrice)
    }, [order, products])

    return (
        <div className="cart">
            <h1>CART</h1> 
            <Loading {...{isLoading}}/>
            { !isLoading && 
                ( isCartEmpty ? 
                    <h1 className="cart-empty">your cart is empty</h1>
                :
                  <>

                    <div className='cart-products'>
                        { products.map( product => (
                            <div className="cart-preview" key={product.id} >
                                <Link to={ `/products/${product.cakeId}`}>
                                    <img src={'data:image/png;base64,'+product.image} alt="" />
                                </Link>
                                <h2>{product.title}</h2>
                                <p>{product.price} ₪</p>
                                <input type="number" id="quantity" name="quantity" min="1" max="5" value={order[product.cakeId]} 
                                    onChange={e=>setOrder({...order, [product.cakeId]: parseInt(e.target.value)})}></input>   
                                <button onClick={()=>removeFromCart(product.cakeId, setProducts, setOrder)}>Remove</button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-bottom">
                        <h3><pre>Total Price:  {totalPrice}₪</pre></h3>    
                        <button onClick={()=>checkout(totalPrice)}>Checkout</button>
                    </div>

                  </>
                )
            }
        </div>
    );
}
 
export default Cart;
