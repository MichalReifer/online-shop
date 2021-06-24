import { useHistory, useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { addToCart } from './utils';


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
                            <button onClick={()=>addToCart(cakeId, history)}>Add To Cart</button>
                        </div>
                        <img src={require(`${product.image}`).default} alt="cake" />
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default compose(withFirebase)(ProductPage);