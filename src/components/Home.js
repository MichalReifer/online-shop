import { useContext } from "react";
import ProductPreview from "./ProductPreview";
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { ProductsContext } from '../contexts/ProductsContext'

const Home = (props) => {

    const { products, isLoading } = useContext(ProductsContext)

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
            {/* { error && <div>{ error }</div> } */}
            { isLoading && <div>Loading...</div>}    
            { categories.map(function(category, i){
            return( 
                productsByCategory[i] && <ProductPreview products={productsByCategory[i]} key={i} title={category}/>
                )})
            }
        </div>
    );
    
}
 
export default compose(withFirebase)(Home);
