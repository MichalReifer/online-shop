import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserOrders from './UserOrders';
import { changeDetails } from './utils';


const UserPage = (props) => {

    const { userId } = useLocation().state;
    const [ user, setUser ]= useState(null);
    const [ userDetails, setUserDetails ] = useState(null);
    const [ userOrders, setUserOrders ] = useState([]);
    const [ showDetails, setShowDetails ] = useState(false);

    useEffect(async()=>{
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            setUser(true);
            if (currentUser?.uid===userId){
                setUser(currentUser);
                setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
                setShowDetails(true);
                const userOrders = await props.firebase.getOrdersByEmail(currentUser.email);
                setUserOrders(userOrders);
            }
    }, [])

    const changeUserDetails = async () => {
        await changeDetails(props.firebase);
        console.log('change done.')
        setUserDetails(await JSON.parse(localStorage.getItem('userDetails')));
        setUser(await JSON.parse(localStorage.getItem('currentUser')));
        console.log('set current user done.')
    }

    return (
        <div>
            {!user && <div>Loading...</div>}
            {(user&&!showDetails)&&<h2>you are not authorised to access this page.</h2>}
            { (user&&showDetails) && (
                <div className="user-page">
                    <div className='user-details-container'>
                        <h1>{user.displayName}</h1>
                        <div className="user-details">
                            <div>
                                <h4>email: {user.email}</h4>
                                <p>address: {userDetails.address}</p>
                            </div>
                            <button onClick={changeUserDetails}>change details</button>
                            <button>change password</button>
                        </div>
                    </div>
                    <h2>Orders</h2>
                    <UserOrders userOrders={userOrders}/>
                </div>
            )}
        </div>
    );
}
 

// export default UserPage;
export default compose(withFirebase)(UserPage);