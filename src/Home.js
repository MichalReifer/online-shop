import ProductPreview from "./ProductPreview";
import useCategories from "./useCategories";

const Home = () => {

    const { categories, allProducts, isLoading, error } = useCategories();

    return (
        <div className="home">
            { error && <div>{ error }</div> }
            { isLoading && <div>Loading...</div>}    
            { categories.map(function(category, i){
               return( 
                allProducts[i] && <ProductPreview products={allProducts[i]} key={category} title={category}/>)
                })
            }
            
        </div>
    );
}
 
export default Home;