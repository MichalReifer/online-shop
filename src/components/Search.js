import { useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';


const Search = (props) => {

    const searchForm = document.querySelector('.search-form');
    const [isLoading, setIsLoading] = useState(true);
    const [allProducts, setAllProducts] = useState(null);
    const [products, setProducts] = useState(null);

    useEffect(async ()=>{
        let data = await props.firebase.getAllProducts()
        setAllProducts(data);
        setProducts(allProducts)
        setIsLoading(false)
        if(searchForm){searchForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            const term = searchForm.term.value.trim();
            if (term || term===''){ 
                setProducts(allProducts.filter(product=>Object.values(product).join('').includes(term)));
            }
        })}
    }, [searchForm])

    return (
        <div className="search">
            <form className="search-form">
                <label>search: </label>
                <input type="text" name="term"  />
            </form>
            {/* { error && <div>{ error }</div> } */}
            { isLoading && <div>Loading...</div> }
            { products && <ProductPreview products={products}/>}

        </div>
    );
}
 
export default compose(withFirebase)(Search);