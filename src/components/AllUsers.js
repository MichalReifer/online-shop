import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


const AllUsers = (props) => {

    const { admin, isLoadingAdmin } = useContext(CurrentUserContext);
    const [ isLoading, setIsLoading] = useState(true);
    const [ dataUsers, setDataUsers] = useState(null);
    const [ noAccess, setNoAccess ] = useState(false);


    useEffect(async()=>{
        const data = await props.firebase.getAllUsers();
        setDataUsers(data);
        setIsLoading(false)
    }, [])

    useEffect(()=>{
        setNoAccess(false);
        if(!isLoadingAdmin){
            if(!admin){
                console.log('not admin')
                setNoAccess(true);
            }
        }
    },[isLoadingAdmin])

    return (
        <div className="all-users">
            { isLoadingAdmin && <p className='loading'>Loading...</p> }
            { noAccess && <h2 className='no-access'>you are not authorised to access this page.</h2> }
            { (!isLoadingAdmin&&!noAccess) && 
                <div>
                    <h1>Users</h1>
                    <div className="cart-preview" >
                        <p>name</p>
                        <p>email</p>
                        <p>address</p>
                        <p style={{width: 100 +"px"}}>admin</p>
                    </div>
                    { isLoading && <div className='loading'>Loading...</div>}
                    { dataUsers && dataUsers.map((user, index)=>(
                        <div className={"cart-preview " + (user.admin? 'admin':'')} key={index}>
                            <p>{user.displayName}</p>
                            <p>{user.email}</p>
                            <p>{user.address}</p>
                            {user.admin && <p style={{width: 100 +"px"}}>admin</p> }
                            {!user.admin && <button>make admin</button>}
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}
 
export default compose(withFirebase)(AllUsers);
