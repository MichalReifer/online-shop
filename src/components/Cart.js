import { useEffect, useRef, useState } from "react";
import CartProducts from "./CartProducts";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';


const Cart = (props) => {

    const [ isLoading, setIsLoading ] = useState(true);
    const [ cartEmpty, setCartEmpty ] = useState(true);
    const [ products, setProducts] = useState([]);
    const [ totalPrice, setTotalPrice] = useState(0)
    
    const resetTotalPrice = (price)=>{
        setTotalPrice(price);
    }

    const isCartEmpty = (ans)=>{
        setCartEmpty(ans);
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
                <h3>Total Price: {totalPrice}</h3>    
            </div>   }
        </div>
    );
}
 
export default compose(withFirebase)(Cart);
