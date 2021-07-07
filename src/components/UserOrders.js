import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useEffect, useState } from 'react';


const UserOrders = ({userOrders, firebase}) => {

    const [orders, setOrders] = useState(null);
    const [products, setProducts ] = useState(null);

    useEffect(async ()=>{
        setOrders(userOrders?.reverse());
    }, [userOrders])

    useEffect(async ()=>{
        if (orders && orders.length>0){
            const promises = orders.map(async order=>{
                const promises = Object.keys(order.products).map(async cakeId=>{
                    const product = await firebase.getProductByName(cakeId);
                    product['quantity'] = order.products[cakeId];    
                    return product;
                })
                const products = await Promise.all(promises);
                return products;
            })
            const products = await Promise.all(promises);
            setProducts(products);
        }
    }, [orders])

    return (
        <div className='user-orders'>
            {orders && orders.map((order, index)=>(
                <div className="order-preview" key={index}>
                    {/* <h3>Order {index+1}</h3> */}
                    <p>made on: {order.time}</p>
                    <p>total price: {order.total_price}</p>
                    <div className="products">
                        <h3>products:</h3>
                        {products && Object.keys(order.products).map((product, i)=>(
                            <div key={i}>
                                    <p>{products[index][i].title} : {order.products[product]}</p>
                            </div>
                            ))
                        }
                    </div>
                </div>
                )) 
            }
        </div>

    );
}
 
export default compose(withFirebase)(UserOrders);