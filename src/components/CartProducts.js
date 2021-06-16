import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';


const CartProducts = ({cartProducts, resetTotalPrice, cartEmpty}) => {

    const [order, setOrder]  = useState(JSON.parse(localStorage.getItem('order')));
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        setProducts(cartProducts)
    }, [cartProducts])

    useEffect(()=>{
        localStorage.setItem('order', JSON.stringify(order));
        let totalPrice = 0;
        products.map(product=>{
            totalPrice+=product.price*order[product.cakeId];
        })  
        if(Object.keys(order).length===0){
            cartEmpty(true)
            resetTotalPrice(0)
        } else{
            resetTotalPrice(totalPrice)}
    }, [order, products])

    const removeFromCart = (cakeId) => {
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
                localStorage.setItem('order', JSON.stringify(order));
                setProducts(products.filter(product=>product.cakeId!=cakeId))
              swal("Poof!", { icon: "success",})
            }})
        .catch(e=> console.log('error occured: ', e))
    }

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
                        <button onClick={()=>removeFromCart(product.cakeId)}>Remove</button>
                </div>
            ))}
        </div>
    );
}
 
export default CartProducts;
