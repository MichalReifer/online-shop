import { useEffect, useState } from 'react';
import { showOrHideProducts } from '../utils';

import { useDispatch } from 'react-redux'
import { fetchCakeById } from "../redux/slices/cakesSlice"
import Loading from './Loading';


const UserOrders = ({userOrders, firebase}) => {

    const [orders, setOrders] = useState(null);
    const [products, setProducts ] = useState(null);

    const dispatch = useDispatch()

    useEffect(()=>{

    }, [dispatch])

    return (
      <>
        <h2>Orders</h2>
        <div className='user-orders'>
            {/* <Loading isLoading={!orders} /> */}
            {orders && orders.map((order, index)=>(
                <div className="order-preview" key={index} onClick={()=>{showOrHideProducts(index)}}>
                    <h3>made on: {order.time}</h3>
                    <p>total price: {order.total_price} ₪</p>
                    <div className="order-products">
                        {products && Object.keys(order.products).map((product, i)=>(
                            <div className="each-order" key={i}>
                                    <img src={products[index][i]?.image} alt="" />
                                    <p>{products[index][i]?.title} : {order.products[product]}</p>
                            </div>
                            ))
                        }
                    </div>
                </div>
                )) 
            }
        </div>
      </>
    );
}
 
export default UserOrders;