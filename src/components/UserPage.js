import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


const UserPage = (props) => {

    const { userName } = useParams()
    const { userEmail } = useLocation().state;
    const [ user, setUser ]= useState(null);
    const [ userOrders, setUserOrders ] = useState([]);

    console.log(userName);
    console.log(userEmail)

    useEffect(async()=>{
        setTimeout(async()=>{
            const user = await props.firebase.getUserByEmail(userEmail);
            const userOrders = await props.firebase.getOrdersByEmail(userEmail);
            setUser(user);
            setUserOrders(userOrders);
        }, 1000)

    }, [])

    console.log(user)
    console.log(userOrders)


//
    return (
        <div className="user-page">
            {/* { isLoading && <div>Loading...</div>} */}
            {/* { error && <div>{ error }</div>} */}
            { user && (
                <div>
                    <h1>{user.name}</h1>
                    <div className='user-page'>
                        <div className="details">
                            <h4>email: {user.email}</h4>
                            <p>address: {user.address}</p>
                            <h2>Orders</h2>
                            { userOrders.map((order, index)=>(
                                <div>
                                    <h3>Order {index+1}</h3>
                                    <p>made on: {order.time}</p>
                                    <p>total price: {order.total_price}</p>
                                    <h3>products:</h3>
                                    {Object.keys(order.products).map(product=>(
                                        <div>
                                            <p>{product} : {order.products[product]}</p>
                                        </div>
                                    ))}
                                </div>
                            )) 
                            } 
                            {/* <button onClick={()=>addToCart(cakeId, history)}>Add To Cart</button> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
 

// export default UserPage;
export default compose(withFirebase)(UserPage);