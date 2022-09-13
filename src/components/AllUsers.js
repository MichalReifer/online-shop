import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../redux/slices/allUsersSlice'
import Loading from './Loading'


const AllUsers = () => {

  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const allUsers = useSelector(state=>state.allUsers).info

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
          allUsers.map(user=>
              <div key={user.email}>{user.name}</div>
          )
        }
      </div>
    </>
  );
}
 
export default AllUsers;