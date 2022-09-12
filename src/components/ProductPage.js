import { useParams } from "react-router";
import { useEffect, useState } from "react";
import PageNotFound from "./PageNotFound";
import { useDispatch } from 'react-redux'
import { fetchCakeById } from "../redux/slices/cakesSlice";
import Loading from "./Loading";
import { useCart } from "../hooks/useCart";
import { useProductPage } from "../hooks/useProductPage";

const ProductPage = (props) => {
      
    const { cakeId } = useParams()
    const dispatch = useDispatch()
    const [cake, setCake] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const { addToCart } = useCart()
    const { zoomInOrOut, moveImageWithMouse, zoomOutWhenClickOutOfImage } = useProductPage()

    useEffect(() => {
        dispatch(fetchCakeById(cakeId))
            .then(data=>{setCake(data.payload)})
            .then(()=>setIsLoading(false))  
    }, [dispatch])

    document.getElementsByClassName('product-image')[0]?.addEventListener("mousemove", e => moveImageWithMouse(e))
    document.addEventListener("click", e => zoomOutWhenClickOutOfImage(e));

    return (  
        <div className="product-page">
            <Loading isLoading={isLoading} />
            <PageNotFound isNotFound={(!isLoading && !cake)} />
            { cake && (
                <div className="product-content">
                    <h1>{cake.title}</h1>
                    <div className='details-container'>
                        <div className="details">
                            <p>{cake.description}</p>
                            <p>category: {cake.category}</p>
                            <p>price: {cake.price} ₪</p>
                            <button onClick={()=>addToCart(cakeId)}>Add To Cart</button>
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