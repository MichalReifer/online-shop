import { useContext, useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { ProductsContext } from '../contexts/ProductsContext'
import InfiniteScroll from 'react-infinite-scroll-component';


import { useSelector, useDispatch } from 'react-redux'
import { getCakeCategories, getCakes, getCakesNoImage} from '../redux/slices/cakesSlice'

const Home = (props) => {

    let categories = [];
    const productsByCategory = [];  

    const [hasMore, setHasMore] = useState(true)
    const [someCategoris, setSomeCategories] = useState([])
    const [categ_i, setCateg_i] = useState(2)


    const dispatch = useDispatch()
    const cakes = useSelector(state => state.cakes)

    useEffect(()=>{
        dispatch(getCakesNoImage())
        dispatch(getCakeCategories())
    }, [dispatch])

    useEffect(()=>{
        setSomeCategories(categories.slice(0,2))
        console.log(someCategoris)
    }, [])

    if(Object.keys(cakes).length>0){
        categories = [...new Set(Object.values(cakes).map(product=>product.category))];
        categories.map(category=>{
            return productsByCategory.push(Object.values(cakes).filter(product=>product.category===category));
        })
    }

    const fetchData = () => {
        console.log('reached end of page')
        if (someCategoris.length === categories.length)
            setHasMore(false)
        setSomeCategories([...someCategoris, ...categories.slice(categ_i, categ_i+1)])
        setCateg_i(categ_i+1)
    }
    return (
        <div className="home">
            <InfiniteScroll
            dataLength={someCategoris.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            >
            { someCategoris.map(function(category, i){
                return( 
                    productsByCategory[i] && <ProductPreview products={productsByCategory[i]} key={i} title={category}/>
            )})}
            </InfiniteScroll>
        </div>
    );
    
}
 
export default compose(withFirebase)(Home);
