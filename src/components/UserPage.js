import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import UserOrders from './UserOrders';
import { changeDetails } from './utils';
import Swal from 'sweetalert2';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


const UserPage = (props) => {

    const { user: currentUser, setUser: setCurrentUser, admin, setAdmin } = useContext(CurrentUserContext);
    const { userId } = useParams();
    const [ user, setUser ]= useState(null);
    const [ userDetails, setUserDetails ] = useState(null);
    const [ userOrders, setUserOrders ] = useState([]);
    const [ showDetails, setShowDetails ] = useState(false);

    useEffect(async()=>{
            setUser(true);
            setShowDetails(false);
            if (currentUser?.uid===userId){
                setUser(currentUser);
                setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
                setShowDetails(true);
                const userOrders = await props.firebase.getOrdersByEmail(currentUser.email);
                setUserOrders(userOrders);
            }
    }, [userId])

    const changeUserDetails = async () => {
        await changeDetails(props.firebase);
        setUserDetails(await JSON.parse(localStorage.getItem('userDetails')));
        setUser(await JSON.parse(localStorage.getItem('currentUser')));
        setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
    }

    const changePassword = async () => {
        await props.firebase.changePassword(user.email);
        Swal.fire({
            title: 'a password reset link is sent to your email address.',
            icon: 'success'
        })
    }

    return (
        <div>
            {!user && <div>Loading...</div>}
            {(user&&!showDetails)&&<h2>you are not authorised to access this page.</h2>}
            { (user&&showDetails) && (
                <div className="user-page">
                    <div className='user-details-container'>
                        <div className="user-name-container">
                            <h1>{user.displayName}</h1>
                            { admin && <h2>admin</h2> }
                        </div>
                        <div className="user-details">
                            <div>
                                <h4>{user.email}</h4>
                                <p>{userDetails.address}</p>
                            </div>
                            <button onClick={changeUserDetails}>change details</button>
                            <button onClick={changePassword}>change password</button>
                        </div>
                    </div>
                    <div className="user-orders-container">
                        <h2>Orders</h2>
                        <UserOrders userOrders={userOrders}/>
                    </div>
                </div>
            )}
        </div>
    );
}
 

export default compose(withFirebase)(UserPage);
