import ProductPreview from "./ProductPreview";
import useFetch from "./useFetch";

const Search = () => {


    let originalUrl = 'http://localhost:8000/products';
    let url = originalUrl;

    let searchForm = document.querySelector('.search-form');
    console.log(searchForm);
    searchForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        let term = searchForm.term.value.trim();
        console.log(term);
        if (term){ url = originalUrl+ `?q=${term}`;}
        else {url = originalUrl;}
        console.log(url);
    })

    const { data: products, isLoading, error } = useFetch(url);
    console.log(url);

    return (
        <div className="search">
            <form className="search-form">
                <input type="text" name="term"  />
            </form>
            { error && <div>{ error }</div> }
            {isLoading && <div>Loading...</div> }
            {products && <ProductPreview products={products}/>}

        </div>
    );
}
 
export default Search;