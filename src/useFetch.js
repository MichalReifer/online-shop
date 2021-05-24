import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCtrl = new AbortController();
 
        setTimeout(() => {
        fetch(url, { signal: abortCtrl.signal })  
        .then(res => {                
            // console.log(res);
            if (!res.ok){
                throw Error('could not fetch the data from that resourse');
            }
            return res.json();})   
        .then(d => {           
            // console.log(d);
            setData(d);
            setIsLoading(false);
            setError(null);})   
        .catch(err => {
            if (err.name === 'AbortError'){
                console.log('fetch abort')
            } else { 
            // console.log(err.message);
            setIsLoading(false);
            setError(err.message);
            }});
        }, 0);


        return () => abortCtrl.abort() ;
    }, [url]);

    return { data, isLoading, error };
}

export default useFetch;