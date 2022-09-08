import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useCart } from "../hooks/useCart";


const CartProducts = ({products, setProducts, setTotalPrice, setCartEmpty}) => {

    const [order, setOrder]  = useState(JSON.parse(localStorage.getItem('order')));
    const { removeFromCart } = useCart()

    // update total price:
    useEffect(()=>{
        localStorage.setItem('order', JSON.stringify(order));

        if(Object.keys(order).length===0){
            setCartEmpty(true)
            setTotalPrice(0)
        } 
        else {
            let totalPrice = 0;
            products.map(product=>{
                totalPrice+=product.price*order[product.cakeId]
            })
            setTotalPrice(totalPrice)
        }
    }, [order, products])

    return (
        <div className='cart-products'>
            {products.map((product) => (
                <div className="cart-preview" key={product.id}>
                    <Link to={{
                            pathname: `/products/${product.cakeId}`,
                            state : {
                                id: `${product.id}`
                            }
                            }}>
                        {/* <img src={product.image} alt="" /> */}
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
    );
}
 
export default CartProducts;
