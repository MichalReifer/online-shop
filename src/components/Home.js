import { useContext, useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { ProductsContext } from '../contexts/ProductsContext'

import { useSelector, useDispatch } from 'react-redux'
import { getCakes } from '../redux/slices/cakesSlice'

const Home = (props) => {

    let categories = [];
    const productsByCategory = [];  
    const { products, isLoading } = useContext(ProductsContext)
    
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

    if(Object.keys(cakes).length>0){
        categories = [...new Set(Object.values(cakes).map(product=>product.category))];
        categories.map(category=>{
            return productsByCategory.push(Object.values(cakes).filter(product=>product.category===category));
        })
    }

    return (
        <div className="home">
            { isLoading && <div className='loading'>Loading...</div>}    
            { categories.map(function(category, i){
            return( 
                productsByCategory[i] && <ProductPreview products={productsByCategory[i]} key={i} title={category}/>
                )})
            }
        </div>
    );
    
}
 
export default compose(withFirebase)(Home);
