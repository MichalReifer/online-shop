import { useParams } from "react-router";
import { useEffect, useState } from "react";
import PageNotFound from "../pages/PageNotFound";
import { useDispatch, useSelector } from 'react-redux'
import Loading from "../components/Loading";
import { useCart } from "../hooks/useCart";
import { useProductPage } from "../hooks/useProductPage";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import EditCakeModule from "../components/EditCakeModule";

const ProductPage = () => {
      
    const { cakeId } = useParams()
    const dispatch = useDispatch()
    const [cake, setCake] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const currentUser = useSelector(state => state.currentUser)

    const { addToCart } = useCart()
    const { zoomInOrOut, moveImageWithMouse, zoomOutWhenClickOutOfImage } = useProductPage()

    const openPopup = () => {
        const popUp = document.getElementById('edit-cake-popup')
        popUp?.classList.add('popup-container-color')
        popUp?.classList.remove('hidden')
        popUp?.firstChild.classList.add("module-show")
        popUp?.firstChild.classList.remove("module-hide")
        popUp.getElementsByTagName('form')[0].firstChild.focus()
      }

    useEffect(() => {
        fetch(`/cakes/by-cakeid/${cakeId}`)
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

                    <EditCakeModule {...{cake, setCake}} />
                    { currentUser?.userInfo?.admin && 
                        <Link to="#" onClick={()=>openPopup()} title="edit cake">
                            <EditIcon className="icon"/>
                        </Link>
                    }

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