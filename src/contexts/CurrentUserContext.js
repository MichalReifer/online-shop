import { createContext, useEffect, useState } from 'react';
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';


export const CurrentUserContext = createContext();

const CurrentUserContextProvider = (props) => {

    const [ isLoading, setIsLoading ] = useState(true);
    const [ authUser, setAuthUser ] = useState(null);
    const [ storageUser, setStorageUser ] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [ admin, setAdmin ] = useState(false);
    const [ isLoadingAdmin, setIsLoadingAdmin ] = useState(true);

    useEffect(()=>{
        props.firebase.getCurrentUser(
            // if current user
            user=>{
                setAuthUser({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                signedIn: new Date(parseInt(user.metadata.a)),
                lastSignedIn: new Date(parseInt(user.metadata.b))
                })
                setIsLoading(false);
            },
            // if no current user
            ()=>{
                setAuthUser(null);
                setIsLoading(false);
                setIsLoadingAdmin(false);
            }
        )
    },[storageUser])

    useEffect(async()=>{
        if(authUser){
            const dataUser = await props.firebase.getUserById(authUser.uid);
            setAdmin(dataUser?.admin);
            setIsLoadingAdmin(false);
        }
    }, [authUser])

    return (
        <CurrentUserContext.Provider value={{ storageUser, setStorageUser, admin, authUser, setAdmin, isLoading, isLoadingAdmin }} >
            {props.children}
        </CurrentUserContext.Provider>
    );
}
 
export default compose(withFirebase)(CurrentUserContextProvider);
