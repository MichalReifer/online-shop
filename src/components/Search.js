import { useEffect, useState } from "react";
import { sortProducts } from "./utils";
import ProductPreview from "./ProductPreview";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';


const Search = (props) => {

    const searchForm = document.querySelector('.search-form');
    const [isLoading, setIsLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState(null);

    useEffect(async ()=>{
        let allProducts = await props.firebase.getAllProducts()
        allProducts = sortProducts(allProducts, 'cakeId');
        setFilteredProducts(allProducts)
        setIsLoading(false)
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
            { isLoading && <div>Loading...</div> }
            { filteredProducts && <ProductPreview products={filteredProducts}/>}

        </div>
    );
}
 
export default compose(withFirebase)(Search);