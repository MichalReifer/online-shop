import { createContext, useState } from 'react';


export const CurrentUserContext = createContext();

const CurrentUserContextProvider = (props) => {

    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('currentUser')));

    return (
        <CurrentUserContext.Provider value={{user, setUser}} >
            {props.children}
        </CurrentUserContext.Provider>
    );
}
 
export default CurrentUserContextProvider;