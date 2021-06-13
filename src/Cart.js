import { useEffect, useState } from "react";
import CartProducts from "./CartProducts";
import { withFirebase } from './firebase/index';
import { compose } from 'recompose';


const Cart = (props) => {

    let selectedIds = null;
    const [ isLoading, setIsLoading ] = useState(true);
    const [ cartEmpty, setCartEmpty ] = useState(true);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(async ()=>{
        if (localStorage.getItem('products')){
            setCartEmpty(false);
            selectedIds = localStorage.getItem('products').slice(1, -1).split(',');
            for (let id =0; id<selectedIds.length; id++){
                let data = await props.firebase.getProduct(selectedIds[id])
                setProducts(prevArr => [...prevArr, data]);
                setTotalPrice(prevPrice => prevPrice += data.price);
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
                    <CartProducts products={products} isJsonServer={props.isJsonServer}/>
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
