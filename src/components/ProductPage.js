import { useHistory, useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { addToCart, zoomInOrOut, moveImageWithMouse, zoomOutWhenClickOutOfImage } from '../utils';
import { ProductsContext } from '../contexts/ProductsContext'
import PageNotFound from "./PageNotFound";


const ProductPage = (props) => {
      
    const { products } = useContext(ProductsContext)
    const { cakeId } = useParams()
    const history = useHistory();
    const [product, setProduct] = useState(null);
    const [ isLoading, setIsLoading] = useState(true)

    useEffect( async ()=>{
        if (products){
            const data = await products?.filter(product=>product.cakeId===cakeId)[0];
            setProduct(data);
            setIsLoading(false);
        }
    }, [products])   
    

    document.getElementsByClassName('product-image')[0]?.addEventListener("mousemove", e => moveImageWithMouse(e))
    document.addEventListener("click", e => zoomOutWhenClickOutOfImage(e));

    return (  
        <div className="product-page">
            { isLoading && <div>Loading...</div>}
            { (!isLoading&&!product) && <PageNotFound /> }
            { product && (
                <div>
                    <h1>{product.title}</h1>
                    <div className='details-container'>
                        <div className="details">
                            <p>{product.description}</p>
                            <p>category: {product.category}</p>
                            <p>price: {product.price} ₪</p>
                            <button onClick={()=>addToCart(cakeId, history)}>Add To Cart</button>
                        </div>
                        <div className="image-container">
                        <img className="product-image zoom-out-image" src={product.image} alt="cake" onClick={(e)=>zoomInOrOut(e)}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default compose(withFirebase)(ProductPage);