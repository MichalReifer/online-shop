import { createContext, useEffect, useState } from 'react';
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';


export const CurrentUserContext = createContext();

const CurrentUserContextProvider = (props) => {

    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [ admin, setAdmin ] = useState(false);

    useEffect(async()=>{
        const dataUser = await props.firebase.getUserById(user?.uid);
        setAdmin(dataUser?.admin);
    }, [user])

    console.log(admin);

    return (
        <CurrentUserContext.Provider value={{ user, setUser, admin, setAdmin }} >
            {props.children}
        </CurrentUserContext.Provider>
    );
}
 
export default compose(withFirebase)(CurrentUserContextProvider);
