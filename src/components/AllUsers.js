import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../redux/slices/usersSlice'
import Loading from './Loading'


const AllUsers = ({allUsers}) => {

  const dispatch = useDispatch()
  const users = useSelector(state=>state.users).users
  const [isLoading, setIsLoading] = useState(true)
  const currentUser = useSelector(state => state.currentUser)

  useEffect(()=>{
    dispatch(fetchUsers({token: currentUser.userToken}))
      .then(data=>{
        setIsLoading(false)
        console.log(data)
      })
  }, [dispatch])


  return (
    <>
      <h2>All Users</h2>
      <div className='user-orders'>
        <Loading isLoading={isLoading} />
        {
          users.map(user=>
              <div key={user.email}>{user.name}</div>
          )
        }
      </div>
    </>
  );
}
 
export default AllUsers;