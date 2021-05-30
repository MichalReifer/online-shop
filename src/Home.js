import ProductPreview from "./ProductPreview";
import useFetch from "./useFetch";
import useFirestore from "./useFirestore";


const Home = ({isJsonServer}) => {

    ////// Fetch from Json Server:
    const { data: Jproducts, isLoading: JisLoading, Jerror } = useFetch('http://localhost:8000/products');

    ////// Fetch from Firestore:
    const { data: Fproducts, isLoading: FisLoading, Ferror } = useFirestore('products');

    //// Switching Firestore and Json server:
    let products = [];
    let isLoading = true;
    let error = null;
    if(isJsonServer){[products, isLoading, error] = [Jproducts, JisLoading, Jerror] }
    else { [products, isLoading, error] = [Fproducts, FisLoading, Ferror]  };

    let categories = [];
    const productsByCategory = [];    
    if(products){
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
                productsByCategory[i] && <ProductPreview products={productsByCategory[i]} key={i} title={category} isJsonServer={isJsonServer}/>
                )})
            }
        </div>
    );
    
}
 
export default Home;