import { useParams } from "react-router";
import { useEffect, useState } from "react";
import PageNotFound from "./PageNotFound";
import { useDispatch } from 'react-redux'
import Loading from "./Loading";
import { useCart } from "../hooks/useCart";
import { useProductPage } from "../hooks/useProductPage";

const ProductPage = () => {
      
    const { cakeId } = useParams()
    const dispatch = useDispatch()
    const [cake, setCake] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const { addToCart } = useCart()
    const { zoomInOrOut, moveImageWithMouse, zoomOutWhenClickOutOfImage } = useProductPage()

    useEffect(() => {
        fetch(`http://localhost:8081/cakes/by-cakeid/${cakeId}`)
        .then(res =>res.json())
        .then(res=> {
            if (res.error) throw new Error(res.error)
            else setCake(res)
        })
        .finally(()=>setIsLoading(false))
        .catch(err=>console.log(err))
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