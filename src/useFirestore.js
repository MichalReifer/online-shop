import firebase from './config/firebase'; 
import { useEffect, useState } from "react";

const useFirestore = (collection) => {

    const [ data, setData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const ref = firebase.firestore().collection(collection)
  
    // function getData(){
    //     ref.get().then(item=>{
    //     const items = item.docs.map(doc=>doc.data());
    //     setData(items);
    //     setIsLoading(false);
    //     })
    // }
  
    function getData(){
      ref.onSnapshot(query=>{
        const items = [];
        query.forEach(doc=>items.push(doc.data()));
        setData(items);
        setIsLoading(false);
      })
    }
  
    useEffect(()=>{
        getData();
    }, [])
  
    const error = null; 

    return { data, isLoading, error };
    
}
 
export default useFirestore;