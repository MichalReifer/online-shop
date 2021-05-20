import ProductPreview from "./ProductPreview";
import useFetch from "./useFetch";

const Home = () => {

    // fetch('http://localhost:8000/products/')
    // .then(res=>res.json())
    // .then(data=>console.log(data))

    const categories = ["Classic", "Crazy", "Chocolate", "Cookies", "Cream"];
    
    const { data: products0, isLoading0, error0 } = useFetch('http://localhost:8000/products?category='+categories[0]+' Cakes');
    const { data: products1, isLoading1, error1 } = useFetch('http://localhost:8000/products?category='+categories[1]+' Cakes');
    const { data: products2, isLoading2, error2 } = useFetch('http://localhost:8000/products?category='+categories[2]+' Cakes');
    const { data: products3, isLoading3, error3 } = useFetch('http://localhost:8000/products?category='+categories[3]+' Cakes');
    const { data: products4, isLoading4, error4 } = useFetch('http://localhost:8000/products?category='+categories[4]+' Cakes');
    

    return (
        <div className="home">

            { error0 && <div>{ error0 }</div> }
            {isLoading0 && <div>Loading...</div> }
            {products0 && <ProductPreview products={products0} title={`${categories[0]} Cakes`}/>}

            { error1 && <div>{ error1 }</div> }
            {isLoading1 && <div>Loading...</div> }
            {products1 && <ProductPreview products={products1} title={`${categories[1]} Cakes`}/>}

            { error2 && <div>{ error2 }</div> }
            {isLoading2 && <div>Loading...</div> }
            {products2 && <ProductPreview products={products2} title={`${categories[2]} Cakes`}/>}

            { error3 && <div>{ error3 }</div> }
            {isLoading3 && <div>Loading...</div> }
            {products3 && <ProductPreview products={products3} title={`${categories[3]} Cakes`}/>}

            { error4 && <div>{ error4 }</div> }
            {isLoading4 && <div>Loading...</div> }
            {products4 && <ProductPreview products={products4} title={`${categories[4]} Cakes`}/>}
        </div>
    );
}
 
export default Home;