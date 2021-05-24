import ProductPreview from "./ProductPreview";
import useCategories from "./useCategories";

const Home = () => {

    const { categories, allProducts, allLoadings, allErrors } = useCategories();

    allErrors.map((error, i)=>{
        if (error){
            console.log(error, i);
        }
    })

    return (
        <div className="home">
            {allLoadings[0] && <div>Loading...</div>}    
            { categories.map(function(category, i){
                // console.log(category, allErrors[i], allLoadings[i], allProducts[i]);
               return( 
                allProducts[i] && <ProductPreview products={allProducts[i]} key={category} title={category}/>)
                })
            }
            
        </div>
    );
}
 
export default Home;