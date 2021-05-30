import { useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import useFetch from "./useFetch";
import useFirestore from "./useFirestore";

const Search = ({isJsonServer}) => {

    console.log(isJsonServer);
    const searchForm = document.querySelector('.search-form');

    //// Fetching from Json Server:
    const originalUrl = 'http://localhost:8000/products';
    const [url, setUrl] = useState(originalUrl);

    if (searchForm) {
        searchForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            const term = searchForm.term.value.trim();
            // console.log(term);
            if (term){ setUrl(originalUrl+ `?q=${term}`);}
            else {setUrl(originalUrl);}
        })
    }
    const { data: Jproducts, isLoading: JisLoading, Jerror } = useFetch(url);
    // console.log(url);
    

    ////// Fetching from Firestore:
    const { data: allProducts, isLoading: FisLoading, Ferror } = useFirestore('products');
    const [ Fproducts, setProducts] = useState(null);
    useEffect(()=>{
        setProducts(allProducts);
        if(searchForm){searchForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            const term = searchForm.term.value.trim();
            if (term || term===''){ 
                setProducts(allProducts.filter(product=>Object.values(product).join('').includes(term)));
            }})}
    }, [allProducts, searchForm])

    let products, isLoading, error = [];
    if(isJsonServer){[products, isLoading, error] = [Jproducts, JisLoading, Jerror] }
    else { [products, isLoading, error] = [Fproducts, FisLoading, Ferror]  };

    return (
        <div className="search">
            <form className="search-form">
                <label>search: </label>
                <input type="text" name="term"  />
            </form>
            { error && <div>{ error }</div> }
            { isLoading && <div>Loading...</div> }
            { products && <ProductPreview products={products} isJsonServer={isJsonServer}/>}

        </div>
    );
}
 
export default Search;