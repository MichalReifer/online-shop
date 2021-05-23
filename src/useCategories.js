import useFetch from "./useFetch";

const useCategories = () => {

    const categories = ["Classic", "Crazy", "Chocolate", "Cookies", "Cream"];

    const { data: products0, isLoading0, error0 } = useFetch('http://localhost:8000/products?category='+categories[0]+' Cakes');
    const { data: products1, isLoading1, error1 } = useFetch('http://localhost:8000/products?category='+categories[1]+' Cakes');
    const { data: products2, isLoading2, error2 } = useFetch('http://localhost:8000/products?category='+categories[2]+' Cakes');
    const { data: products3, isLoading3, error3 } = useFetch('http://localhost:8000/products?category='+categories[3]+' Cakes');
    const { data: products4, isLoading4, error4 } = useFetch('http://localhost:8000/products?category='+categories[4]+' Cakes');
    
    const allProducts = [products0, products1, products2, products3, products4];
    const allLoadings = [isLoading0, isLoading1, isLoading2, isLoading3, isLoading4];
    const allErrors = [error0, error1, error2, error3, error4];

    return { categories, allProducts, allLoadings, allErrors };
}
 
export default useCategories;