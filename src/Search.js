import { useState } from "react";
import ProductPreview from "./ProductPreview";
import useFetch from "./useFetch";

const Search = () => {
    
    const originalUrl = 'http://localhost:8000/products';
    const [url, setUrl] = useState(originalUrl);
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            const term = searchForm.term.value.trim();
            // console.log(term);
            if (term){ setUrl(originalUrl+ `?q=${term}`);}
            else {setUrl(originalUrl);}
        })
    }

    const { data: products, isLoading, error } = useFetch(url);
    // console.log(url);

    return (
        <div className="search">
            <form className="search-form">
                <label>search: </label>
                <input type="text" name="term"  />
            </form>
            { error && <div>{ error }</div> }
            { isLoading && <div>Loading...</div> }
            { products && <ProductPreview products={products}/>}

        </div>
    );
}
 
export default Search;