import { useHistory, useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import swal from 'sweetalert';


const ProductPage = (props) => {
      
    const { cakeId } = useParams()
    const { id } = useLocation().state;

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);

    useEffect( async ()=>{
        let data = await props.firebase.getProduct(id);
        setProduct(data);
        setIsLoading(false);
    }, [])
    
    const addToCart = (id) => {
        let storage = localStorage.getItem('order');
        if (storage){
            if (!storage.includes(cakeId)) {
                let order = JSON.parse(storage);
                order[cakeId] = 1;
                storage = JSON.stringify(order);
                localStorage.setItem('order', storage);
                swal("Added To Cart!", { 
                    icon: "success",
                    buttons: ['Keep Shopping', 'Go To Cart']})
                .then(cart=> {if (cart){history.push("/cart");}})
            }
            else{ swal('This item is already in cart.', {
                icon: 'error',
                buttons: ['Keep Shopping', 'Go To Cart']})
                .then(cart=> {if (cart){history.push("/cart");}})
            }
        }
        else{
            localStorage.setItem('order', `{"${cakeId}": 1}`);
            swal("Added To Cart!", { icon: "success ",});
        }
    }

    return (  
        <div className="product-details">
            { isLoading && <div>Loading...</div>}
            {/* { error && <div>{ error }</div>} */}
            { product && (
                <div>
                    <h1>{product.title}</h1>
                    <div className='details-container'>
                        <div className="details">
                            <h4>{product.category}</h4>
                            <p>{product.description}</p>
                            <p>price: {product.price} ₪</p>
                            <button onClick={()=>addToCart(id)}>Add To Cart</button>
                        </div>
                        <img src={require(`${product.image}`).default} alt="cake" />
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default compose(withFirebase)(ProductPage);