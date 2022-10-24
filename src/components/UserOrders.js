import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCakes } from "../redux/slices/cakesSlice"
import Loading from './Loading';
import { fetchOrdersByUserId } from '../redux/slices/ordersSlice';
import { formatDistance } from 'date-fns';
import { useUserPage } from '../hooks/useUserPage';
import useConvert from '../hooks/useConvert';


const UserOrders = ({userId}) => {

    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders)
    const cakes = useSelector(state => state.cakes)
    const currentUser = useSelector(state => state.currentUser)
    const { showOrHideProducts } = useUserPage()
    const { arrayBufferToBase64 } = useConvert()

    useEffect(()=>{
        dispatch(fetchOrdersByUserId({userId, token: currentUser.userToken}))
            .then(data=>{
                if(data.payload?.length)
                    return dispatch(fetchCakes({limit:0})) // TODO: find a way to fetch order cakes without fetching all cakes. maybe infinite scroll
                else if (data.error) 
                    console.error(data.error)
            })
            .finally(()=>setIsLoading(false))
    }, [dispatch])

    return (
      <>
        <h2>Orders</h2>
        <div className='user-orders'>
            <Loading isLoading={isLoading} />
            { !isLoading && 
            (    !orders.info.length ? <h2>no orders were made yet</h2>
            :
                orders.info.map((order, index)=>(
                    <div className="order-preview" key={index} onClick={()=>{showOrHideProducts(index)}}>
                        <h3>{formatDistance(Date.parse(order.createdAt), new Date(), {addSuffix:true})}</h3>
                        <p>total price: {order.totalPrice} ₪</p>
                        <div className="order-products">
                            {Object.keys(order.products).map(product=>{
                                const cake = cakes.cakes?.filter(cake=>cake.cakeId===product)[0]
                                if (cake) 
                                    return (
                                        <div className="each-order" key={product}>
                                            <img src={arrayBufferToBase64(cake.image?.data?.data)} width='100px'></img>
                                            <p>{cake?.title} : {order.products[product]}</p>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                    )) 
            )}
        </div>
      </>
    );
}
 
export default UserOrders;