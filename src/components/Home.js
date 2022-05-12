import { useContext, useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { ProductsContext } from '../contexts/ProductsContext'
import InfiniteScroll from 'react-infinite-scroll-component';


import { useSelector, useDispatch } from 'react-redux'
import { getCakes } from '../redux/slices/cakesSlice'

const Home = (props) => {

    let categories = [];
    const productsByCategory = [];  
    const { products, isLoading } = useContext(ProductsContext)

    const [someCakes, setSomeCakes] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [cake_i, setCake_i] = useState(5)

    
    // if(products){
    //     categories = [...new Set(products.map(product=>product.category))];
    //     categories.map(category=>{
    //         return productsByCategory.push(products.filter(product=>product.category===category));
    //     })
    // }

    const dispatch = useDispatch()
    const cakes = useSelector(state => state.cakes)

    useEffect(()=>{
        dispatch(getCakes())
    }, [dispatch])

    useEffect(()=>{
        setSomeCakes(Object.values(cakes).slice(0,5))
    },[cakes])
  
    if(Object.keys(cakes).length>0){
        categories = [...new Set(Object.values(cakes).map(product=>product.category))];
        categories.map(category=>{
            return productsByCategory.push(Object.values(cakes).filter(product=>product.category===category));
        })
    }

    const fetchData = () => {
        // alert('reached end of page')
        console.log('reached end of page')
        if (someCakes.length === Object.values(cakes).length)
            setHasMore(false)
        setSomeCakes([...someCakes, ...Object.values(cakes).slice(cake_i, cake_i+5)])
        // console.log(someCakes)
        setCake_i(cake_i+5)
    }

    return (
        <div className="home">
            { isLoading && <div className='loading'>Loading...</div>}    
            { categories.map(function(category, i){
            return( 
                productsByCategory[i] && <ProductPreview products={productsByCategory[i]} key={i} title={category}/>
                )})
            }

            <InfiniteScroll
            dataLength={someCakes.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            >
            {someCakes.map(cake=>{
                return (
                    <div key={cake.id}>
                        <br />
                        <br />
                        <br />
                        <div>{cake.title}</div>
                        <br />
                        <br />
                        <br />
                    </div>
                )
            })}
            </InfiniteScroll>
        </div>
    );
    
}
 
export default compose(withFirebase)(Home);
