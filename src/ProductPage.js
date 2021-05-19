import { useHistory, useParams } from "react-router";
import useFetch from './useFetch';

const ProductPage = () => {
    const { id } = useParams();
    const uri = 'http://localhost:8000/products/'+id;
    const { data: product, isLoading, error } = useFetch(uri);
    const history = useHistory();


    const addToCart = () => {
    }
    
    return (  
        <div className="product-details">
            { isLoading && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { product && (
                <div>
                    <h1>{product.title}</h1>
                    <div className='details-container'>
                        <div className="details">
                            <h4>{product.category}</h4>
                            <p>{product.description}</p>
                            <p>price: {product.price} ₪</p>
                            <button onClick={addToCart}>Add To Cart</button>
                        </div>
                        <img src={require(`${product.image}`).default} />
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default ProductPage;