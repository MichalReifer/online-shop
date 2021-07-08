import { createContext, useEffect, useState } from 'react';
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';


export const ProductsContext = createContext();

const ProductsContextProvider = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [ products, setProducts] = useState(null);

    useEffect(async ()=>{
        const storage = localStorage.getItem('allProducts');
        if(!storage){
            const data = await props.firebase.getAllProducts();
            localStorage.setItem('allProducts', JSON.stringify(data))
            setProducts(data);
            console.log('not storage')
        } else {
            setProducts(JSON.parse(localStorage.getItem('allProducts')));
            console.log('storage')
        }
        setIsLoading(false)
    }, [])

    return (
        <ProductsContext.Provider value={{products, isLoading}}>
            {props.children}
        </ProductsContext.Provider>
    );
}
 
export default compose(withFirebase)(ProductsContextProvider);
