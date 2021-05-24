import ProductPreview from "./ProductPreview";
import useCategories from "./useCategories";

const Home = () => {

    const { categories, allProducts, allLoadings, allErrors } = useCategories();
    // console.log(allErrors);

    return (
        <div className="home">
            { categories.map(function(category, i){
                // console.log(category, allErrors[i], allLoadings[i], allProducts[i]);
               return( 
                allErrors[i] && <div>{ allErrors[i] }</div>,
                allLoadings[i] && <div>Loading...</div>,    
                allProducts[i] && <ProductPreview products={allProducts[i]} key={category} title={category}/>)
                })
            }
            
        </div>
    );
}
 
export default Home;