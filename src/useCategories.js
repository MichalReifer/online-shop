import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const useCategories = () => {

    const productsUrl = 'http://localhost:8000/products';
    const [categories, setCategories] = useState([]);

    const [data, setData] = useState(null);
    useEffect(() => {     
        fetch(productsUrl)  
        .then(res => res.json())
        .then(data => {           
            setData(data);
            // console.log(data);
            return data;})
        .then(data=>{
            setCategories([...new Set(data.map(it=>it.category))]);
            // console.log(categories)
            })
    }, [productsUrl]);              


    // // 1. hook in loop or depended on loop - doesn't work:
    // const [tempCategory, setTempCategory] = useState('');
    // const allProducts = [];
    // const allLoadings = [];
    // const allErrors = [];
    // categories.map((category) => {
    //     setTempCategory(category);
    // }) 

    // const { data: products, isLoading, error } = useFetch(productsUrl+'?category='+tempCategory);
    // allProducts.push(products);
    // allLoadings.push(isLoading);
    // allErrors.push(error);


    // // 2. no loop - hard coded categories (not good):
    // const { data: products0, isLoading: isLoading0, error: error0 } = useFetch(productsUrl+'?category='+categories[0]);
    // const { data: products1, isLoading: isLoading1, error: error1 } = useFetch(productsUrl+'?category='+categories[1]);
    // const { data: products2, isLoading: isLoading2, error: error2 } = useFetch(productsUrl+'?category='+categories[2]);
    // const { data: products3, isLoading: isLoading3, error: error3 } = useFetch(productsUrl+'?category='+categories[3]);
    // const { data: products4, isLoading: isLoading4, error: error4 } = useFetch(productsUrl+'?category='+categories[4]);
    
    // const allProducts = [products0, products1, products2, products3, products4];
    // const allLoadings = [isLoading0, isLoading1, isLoading2, isLoading3, isLoading4];
    // const allErrors = [error0, error1, error2, error3, error4];

    // return { categories, allProducts, allLoadings, allErrors };


    // 3. fetch all of data and then devide:
    const allProducts = [];
    const { data: products, isLoading, error } = useFetch(productsUrl);
    if (products){
        categories.map(category=>{
            allProducts.push(products.filter(product=>product.category==category));
        })
    }

    return { categories, allProducts, isLoading, error };
}

export default useCategories;