import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserOrders from './UserOrders';


const UserPage = (props) => {

    const { userId } = useLocation().state;
    const [ user, setUser ]= useState(null);
    const [ userOrders, setUserOrders ] = useState([]);
    const [ showDetails, setShowDetails ] = useState(false);

    useEffect(async()=>{
            const user = await props.firebase.getUserById(userId);
            setUser(user);
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser?.uid===userId){
                setShowDetails(true)
                const userOrders = await props.firebase.getOrdersByEmail(user?.email);
                setUserOrders(userOrders);
            }
    }, [userId])

    return (
        <div className="user-page">
            {!user && <div>Loading...</div>}
            {(user&&!showDetails)&&<h2>you are not authorised to access this page.</h2>}
            { (user&&showDetails) && (
                <div className='user-details'>
                    <h1>{user.displayName}</h1>
                    <h4>email: {user.email}</h4>
                    <p>address: {user.address}</p>
                    <h2>Orders</h2>
                    <UserOrders userOrders={userOrders}/>
                </div>
            )}
        </div>
    );
}
 

// export default UserPage;
export default compose(withFirebase)(UserPage);