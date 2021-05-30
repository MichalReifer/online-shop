import { useParams } from "react-router";
import useFetch from './useFetch';
import useFirestore from "./useFirestore";

const ProductPage = ({addToCart, isJsonServer}) => {
      
    console.log(isJsonServer);
    const { id } = useParams();    
    
    ///// Fetch from Json Server:
    const { data: Jproduct, JisLoading, Jerror } = useFetch('http://localhost:8000/products/'+id);

    //// Fetch from Firestore
    const { data: products, FisLoading, Ferror  } = useFirestore('products');
    let Fproduct = null;
    if (products){ Fproduct = products.find(product=>product.id==id)};

    //// Switching Firestore and Json server:
    let product = [];
    let isLoading, error = null;
    if(isJsonServer){[product, isLoading, error] = [Jproduct, JisLoading, Jerror] }
    else { [product, isLoading, error] = [Fproduct, FisLoading, Ferror]  };

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
                        {/* {!isJsonServer && <img src={product.image} alt="" />} */}
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default ProductPage;