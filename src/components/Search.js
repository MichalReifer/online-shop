import { useContext, useEffect, useState } from "react";
import { sortProducts } from "../utils";
import ProductPreview from "./ProductPreview";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { ProductsContext } from '../contexts/ProductsContext'


const Search = (props) => {

    let { products: allProducts, isLoading } = useContext(ProductsContext)
    const searchForm = document.querySelector('.search-form');
    const [filteredProducts, setFilteredProducts] = useState(null);

    useEffect(async ()=>{
        allProducts = sortProducts(allProducts, 'cakeId');
        setFilteredProducts(allProducts)
        if(searchForm){searchForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            const term = searchForm.term.value.trim().toLowerCase();
            if (term || term===''){ 
                setFilteredProducts(allProducts.filter(product=>Object.values(product).join('').toLocaleLowerCase().includes(term)));
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
            { isLoading && <div className='loading'>Loading...</div> }
            { filteredProducts && <ProductPreview products={filteredProducts}/>}

        </div>
    );
}
 
export default compose(withFirebase)(Search);