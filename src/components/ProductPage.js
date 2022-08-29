import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { addToCart, zoomInOrOut, moveImageWithMouse, zoomOutWhenClickOutOfImage } from '../utils';
import PageNotFound from "./PageNotFound";
import { ColorRing } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { fetchCakeById } from "../redux/slices/cakesSlice";


const ProductPage = (props) => {
      
    const { cakeId } = useParams()
    const history = useHistory();
    const dispatch = useDispatch()
    const [cake, setCake] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(fetchCakeById(cakeId))
            .then(data=>{setCake(data.payload)})
            .then(()=>setIsLoading(false))  
    }, [dispatch])

    document.getElementsByClassName('product-image')[0]?.addEventListener("mousemove", e => moveImageWithMouse(e))
    document.addEventListener("click", e => zoomOutWhenClickOutOfImage(e));

    return (  
        <div className="product-page">
            { (!isLoading && !cake) && <PageNotFound /> }
            { isLoading &&
                <div style={{display:'flex'}}>
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{margin: 'auto', marginTop: 20}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
            }
            { cake && (
                <div className="product-content">
                    <h1>{cake.title}</h1>
                    <div className='details-container'>
                        <div className="details">
                            <p>{cake.description}</p>
                            <p>category: {cake.category}</p>
                            <p>price: {cake.price} ₪</p>
                            <button onClick={()=>addToCart(cakeId, history)}>Add To Cart</button>
                        </div>
                        <div className="image-container">
                        <img className="product-image zoom-out-image"  alt="cake" 
                            src={'data:image/png;base64,'+cake.image}
                            onClick={(e)=>zoomInOrOut(e)}
                        />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default ProductPage;