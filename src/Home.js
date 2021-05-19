import ProductPreview from "./ProductPreview";
import useFetch from "./useFetch";

const Home = () => {

    const { data: products, isLoading, error } = useFetch('http://localhost:8000/products');
    return (
        <div className="home">
            { error && <div>{ error }</div> }
            {isLoading && <div>Loading...</div> }
            {products && <ProductPreview products={products} title="All Products"/>}
        </div>
    );
}
 
export default Home;