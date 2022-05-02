import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import UserOrders from './UserOrders';
import { changeDetails } from '../utils';
import Swal from 'sweetalert2';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


const UserPage = (props) => {

    const { setStorageUser, admin, authUser, isLoading } = useContext(CurrentUserContext);
    const { userId: urlId } = useParams();
    const [ userDetails, setUserDetails ] = useState(null);
    const [ userOrders, setUserOrders ] = useState(null);
    const [ noAccess, setNoAccess ] = useState(false);

    useEffect(async()=>{
        // reset in case urlId is changed
        setNoAccess(false);
        setUserOrders(null);
        // after authUser is loaded from firebase:
        if(!isLoading){
            if (authUser?.uid===urlId){
                setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
                const userOrders = await props.firebase.getOrdersByEmail(authUser?.email);
                setUserOrders(userOrders);
            }
            else {
                setNoAccess(true);
            }
        }
    }, [urlId, isLoading, authUser])

    const changeUserDetails = async () => {
        await changeDetails(props.firebase);
        setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
        setStorageUser(JSON.parse(localStorage.getItem('currentUser')));
    }

    const changePassword = async () => {    
        await props.firebase.changePassword(authUser?.email);
        Swal.fire({
            title: 'a password reset link is sent to your email address.',
            icon: 'success'
        })
    }

    return (
        <div>
            { isLoading && <div>Loading...</div>}
            { noAccess && <h2 className='no-access'>you are not authorised to access this page.</h2>}
            { (!isLoading&&!noAccess) && 
                <div className="user-page">
                    <div className='user-details-container'>
                            <h1>{authUser?.displayName}</h1>
                            { admin && <h2>admin</h2> }
                            { admin && <a id='admin' href="/all_users">see all users</a>}
                            <div className="name-and-address">
                                <h4>{authUser?.email}</h4>
                                { userDetails && <p>{userDetails.address}</p>}
                            </div>
                            <button onClick={changeUserDetails}>change details</button>
                            <button onClick={changePassword}>change password</button>
                    </div>
                    <div className="user-orders-container">
                        <h2>Orders</h2>
                        {!userOrders && <p>Loading...</p> }
                        {userOrders?.length==0 && <h3>no orders were made</h3> }
                        <UserOrders userOrders={userOrders}/>
                    </div>
                </div>
            }
        </div>
    );
}
 

export default compose(withFirebase)(UserPage);
