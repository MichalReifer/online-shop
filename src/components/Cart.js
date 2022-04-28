import { useEffect, useState, useContext } from "react";
import { ProductsContext } from '../contexts/ProductsContext'
import CartProducts from "./CartProducts";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useHistory } from "react-router";
import { checkout } from '../utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


const Cart = (props) => {

    const { dataProducts: allProducts, isLoadingData, setIsLoadingData } = useContext(ProductsContext)
    const { setStorageUser: setUser } = useContext(CurrentUserContext);
    const [ cartEmpty, setCartEmpty ] = useState(true);
    const [ products, setProducts] = useState([]);
    const [ totalPrice, setTotalPrice] = useState(0)
    const history = useHistory();

    const resetTotalPrice = (price)=>{
        setTotalPrice(price);
    }

    const emptyCart = (ans)=>{
        setCartEmpty(ans);
    }

    useEffect(async ()=>{
        const storage = localStorage.getItem('order');
        if (storage && storage!='{}'){
            setCartEmpty(false);
            let order = JSON.parse(storage);
            if(allProducts){
                for (const cakeId in order){
                    const data = allProducts.filter(product=>product.cakeId===cakeId)[0];
                    setProducts(prevArr => [...prevArr, data]);
                    setTotalPrice(prevPrice => prevPrice += data.price*order[cakeId]);
                }
            }
        } else{
            setIsLoadingData(false);
        }
    }, [allProducts])

    return (
        <div className="cart">
            { cartEmpty && <h1 className="cart-empty">your cart is empty</h1>}
            { !cartEmpty && 
                <div>
                    <h1>CART</h1> 
                    <CartProducts cartProducts={products} resetTotalPrice={resetTotalPrice} emptyCart={emptyCart}/>
                </div>}
            { isLoadingData && <div>Loading...</div> }
            { totalPrice!=0 &&
            <div className="cart-bottom">
                <h3><pre>Total Price:   {totalPrice}₪</pre></h3>    
                <button onClick={()=>checkout(props.firebase, history, totalPrice, setUser)}>Checkout</button>
            </div>   }
        </div>
    );
}
 
export default compose(withFirebase)(Cart);
