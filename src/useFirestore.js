import firebase from './config/firebase'; 
import { useEffect, useState } from "react";

const useFirestore = (collection) => {

    const [ data, setData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const ref = firebase.firestore().collection(collection);

    // // 1. get() method: not real time changing:
    // function getData(){
    //     ref.get().then(rawItems=>{
    //     // console.log(rawItems.docs[0].id);
    //     const items = rawItems.docs.map(doc=>doc.data());
    //     setData(items);
    //     setIsLoading(false);
    //     })
    // }
    
    // 2. onSnapshot() method: real time changing 
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