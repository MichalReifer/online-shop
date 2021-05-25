import ProductPreview from "./ProductPreview";
import useFetch from "./useFetch";

const Home = () => {
    
    const productsUrl = 'http://localhost:8000/products';
    let categories = [];
    const productsByCategory = [];
    const { data: products, isLoading, error } = useFetch(productsUrl);
    
    if (products){
        categories = [...new Set(products.map(product=>product.category))];
        categories.map(category=>{
            return productsByCategory.push(products.filter(product=>product.category===category));
        })
    }

    return (
        <div className="home">
            { error && <div>{ error }</div> }
            { isLoading && <div>Loading...</div>}    
            { categories.map(function(category, i){
               return( 
                productsByCategory[i] && <ProductPreview products={productsByCategory[i]} key={i} title={category}/>
                )})
            }
        </div>
    );
}
 
export default Home;