import { useParams } from "react-router";
import useFetch from './useFetch';

const ProductPage = ({addToCart}) => {
    const { id } = useParams();
    const uri = 'http://localhost:8000/products/'+id;
    const { data: product, isLoading, error } = useFetch(uri);

    
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
                            <button onClick={()=>addToCart(id)}>Add To Cart</button>
                        </div>
                        <img src={require(`${product.image}`).default} alt="cake" />
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default ProductPage;