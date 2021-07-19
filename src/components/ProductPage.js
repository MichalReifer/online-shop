import { useHistory, useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { addToCart, zoomInOrOut, moveImageWithMouse, zoomOutWhenClickOutOfImage } from './utils';
import { ProductsContext } from '../contexts/ProductsContext'


const ProductPage = (props) => {
      
    const { products, isLoading } = useContext(ProductsContext)
    const { cakeId } = useParams()
    const history = useHistory();
    const [product, setProduct] = useState(null);

    useEffect( async ()=>{
        const data = await products?.filter(product=>product.cakeId===cakeId)[0];
        setProduct(data);
    }, [products])     

    document.getElementsByClassName('product-image')[0]?.addEventListener("mousemove", e => moveImageWithMouse(e))
    document.addEventListener("click", e => zoomOutWhenClickOutOfImage(e));

    return (  
        <div className="product-page">
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
                        <div className="image-container">
                            <img className="product-image zoom-out-image" src={require(`${product.image}`).default} alt="cake" onClick={(e)=>zoomInOrOut(e)}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default compose(withFirebase)(ProductPage);