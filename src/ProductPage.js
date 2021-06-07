import { useHistory, useParams } from "react-router";
import useFetch from './useFetch';
import useFirestore from "./useFirestore";
import swal from 'sweetalert';

const ProductPage = ({isJsonServer}) => {
      
    const { id } = useParams();  
    const history = useHistory();
    
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


    
    const addToCart = (id) => {
        let userProducts = localStorage.getItem('products');
        if (localStorage.getItem('products')){
            if (!userProducts.includes(','+id+',')) {
                userProducts+=id+",";
                localStorage.setItem('products', userProducts);
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
            localStorage.setItem('products', ','+id+',');
            swal("Added To Cart!", { icon: "success",})
        }
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