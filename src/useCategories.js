import useFetch from "./useFetch";

const useCategories = () => {

    const productsUrl = 'http://localhost:8000/products';
    const allProducts = [];
    let categories = [];
    const { data: products, isLoading, error } = useFetch(productsUrl);
    
    if (products){
        categories = [...new Set(products.map(product=>product.category))];
        categories.map(category=>{
            return allProducts.push(products.filter(product=>product.category===category));
        })
    }

    return { categories, allProducts, isLoading, error };
}

export default useCategories;