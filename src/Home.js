import ProductPreview from "./ProductPreview";
import useCategories from "./useCategories";

const Home = () => {

    const { categories, allProducts, allLoadings, allErrors } = useCategories();

    return (
        <div className="home">
            { categories.map(function(category, i){
               return( 
                allErrors[i] && <div>{ allErrors[i] }</div>,
                allLoadings[i] && <div>Loading...</div>,    
                allProducts[i] && <ProductPreview products={allProducts[i]} key={category} title={`${category} Cakes`}/>)
                })
            }
        </div>
    );
}
 
export default Home;