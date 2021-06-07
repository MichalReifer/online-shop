import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import useFirestore from "./useFirestore";
import firebase from './config/firebase'; 
import CartProducts from "./CartProducts";

const Cart = ({isJsonServer}) => {


    // const handleDelete = (id) => {
    //     const uri = 'http://localhost:8000/products/'+id;
    //     fetch(uri, {
    //         method: 'DELETE'
    //     }).then(()=>{
    //             history.push('/');
    //     })
    // }

    // const myUser = 1;
    // const uri = 'http://localhost:8000/users/' + myUser;

    // const { data: user, isLoading, error } = useFetch(uri);

    const [ isLoading, setIsLoading ] = useState(true);
    const [ cartEmpty, setCartEmpty ] = useState(false);
    const [products, setProducts] = useState(null);
    let tempProducts = new Set();
    let selectedIds = null;
   
    if (localStorage.getItem('products')){
        selectedIds = localStorage.getItem('products').slice(1, -1).split(',');
    }
    
    useEffect(()=>{
        if (selectedIds){
            selectedIds.map(id =>{
                firebase.database().ref('products').child(id).get().then(snapshot=>{
                    setIsLoading(false);
                    if(snapshot.exists()){
                        tempProducts.add(snapshot.val());
                        setProducts(Array.from(tempProducts));  
                    }else {console.log('no snapshot available');}
            })})
        } else {
            setIsLoading(false);
            setCartEmpty(true);
        }
    }, [])

    return (
        <div className="cart">
            { cartEmpty && <h1>Your cart is empty.</h1>}
            { isLoading && <div>Loading...</div> }
            { products && <CartProducts products={products} isJsonServer={isJsonServer}/>}
            { products &&
            <div className="cart-bottom">
                <p>Total Price: </p>    
            </div>   }
        </div>
    );
}
 
export default Cart;