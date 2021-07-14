import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { removeFromCart } from './utils';


const CartProducts = ({cartProducts, resetTotalPrice, cartEmpty}) => {

    const [order, setOrder]  = useState(JSON.parse(localStorage.getItem('order')));
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        setProducts(cartProducts)
    }, [cartProducts])

    // update quantity of products in cart:
    useEffect(()=>{
        localStorage.setItem('order', JSON.stringify(order));
        let totalPrice = 0;
        products.map(product=>{
            totalPrice+=product.price*order[product.cakeId]})
        if(Object.keys(order).length===0){
            cartEmpty(true)
            resetTotalPrice(0)
        } else{
            resetTotalPrice(totalPrice)}
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
                        <img src={require(`${product.image}`).default} alt="" />
                    </Link>
                    {/* { <img src={product.image} alt="" />} */}
                    <h2>{product.title}</h2>
                    <p>{product.price} ₪</p>
                    <input type="number" id="quantity" name="quantity" min="1" max="5" value={order[product.cakeId]} 
                        onChange={e=>setOrder({...order, [product.cakeId]: parseInt(e.target.value)})}></input>   
                    <button onClick={()=>removeFromCart(product.cakeId, products, setProducts, setOrder)}>Remove</button>
                </div>
            ))}
        </div>
    );
}
 
export default CartProducts;
