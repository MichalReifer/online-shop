import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';


const UserOrders = (props) => {

    const userOrders = props.userOrders;
    console.log(props.userOrders)
    let orders = [];

    if (userOrders){
        userOrders.map(order=>{
            let orderProducts = [];
            Object.keys(order.products).map(async cakeId=>{
                const product = await props.firebase.getProductByName(cakeId);
                product['quantity'] = order.products[cakeId];    
                orderProducts.push(product)
            })
            orders.push(orderProducts)
        })
        console.log(orders)
    }

    return (
        <div className='cart-products'>
            {userOrders.map((order, index)=>(
                <div key={index}>
                    <h3>Order {index+1}</h3>
                    <p>made on: {order.time}</p>
                    <p>total price: {order.total_price}</p>
                    <h3>products:</h3>
                    {Object.keys(order.products).map(product=>(
                        <div key={product}>
                                <p>{product} : {order.products[product]}</p>
                        </div>
                        ))
                    }
                </div>
                )) 
            } 
        </div>

    );
}
 
// export default UserOrders;
export default compose(withFirebase)(UserOrders);