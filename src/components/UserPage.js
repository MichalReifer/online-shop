import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';


const UserPage = (props) => {

    const { userId } = useLocation().state;
    const [ user, setUser ]= useState(null);
    const [ userOrders, setUserOrders ] = useState([]);
    const [ showDetails, setShowDetails ] = useState(false);

    useEffect(async()=>{
        // setTimeout(async()=>{
            const user = await props.firebase.getUserById(userId);
            const userOrders = await props.firebase.getOrdersByEmail(user?.email);
            setUser(user);
            setUserOrders(userOrders);
            const currentUser = await props.firebase.getCurrentUser();
            if (currentUser?.uid===userId){
                setShowDetails(true)
            }
        // }, 1000)
    }, [userId])

    return (
        <div className="user-page">
            { (user&&showDetails) && (
                <div className='user-details'>
                    <h1>{user.name}</h1>
                    <h4>email: {user.email}</h4>
                    <p>address: {user.address}</p>
                    <h2>Orders</h2>
                    { userOrders.map((order, index)=>(
                        <div key={index}>
                            <h3>Order {index+1}</h3>
                            <p>made on: {order.time}</p>
                            <p>total price: {order.total_price}</p>
                            <h3>products:</h3>
                            {Object.keys(order.products).map(product=>(
                                <div key={product}>
                                    <p>{product} : {order.products[product]}</p>
                                </div>
                            ))}
                        </div>
                    )) 
                    } 
                </div>
            )}
            { (user&&!showDetails) && 
                <h2>you are not authorised to access this page.</h2>
            }
        </div>
    );
}
 

// export default UserPage;
export default compose(withFirebase)(UserPage);