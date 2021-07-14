import { createContext, useEffect, useState } from 'react';
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';


export const ProductsContext = createContext();

const ProductsContextProvider = (props) => {

    const [ isLoading, setIsLoading] = useState(true);
    const [ isLoadingData, setIsLoadingData] = useState(true);
    const [ dataProducts, setDataProducts] = useState(null);
    const [ products, setProducts] = useState(null);    

    useEffect(async()=>{
        const data = await props.firebase.getAllProducts();
        setDataProducts(data);
        setIsLoadingData(false)
    }, [])

    useEffect(async ()=>{
        const storage = localStorage.getItem('allProducts');
        if(!storage&&dataProducts){
            localStorage.setItem('allProducts', JSON.stringify(dataProducts))
            setProducts(dataProducts);
            setIsLoading(false)
        } else if (storage) {
            setProducts(JSON.parse(localStorage.getItem('allProducts')));
            setIsLoading(false)
        }
    }, [dataProducts])

    return (
        <ProductsContext.Provider value={{products, dataProducts, isLoading, isLoadingData, setIsLoadingData}}>
            {props.children}
        </ProductsContext.Provider>
    );
}
 
export default compose(withFirebase)(ProductsContextProvider);
