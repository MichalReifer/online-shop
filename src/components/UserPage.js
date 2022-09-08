import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserById } from '../redux/slices/usersSlice'
import Swal from 'sweetalert2';
import UserOrders from './UserOrders';
import Loading from './Loading';
import PageNotFound from './PageNotFound';
import AllUsers from './AllUsers';


const UserPage = (props) => {

  const { userId: urlId } = useParams();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isAuthorized, setIsAuthorized ] = useState(false);
  const [ isMsgNoAccess, setIsMsgNoAccess] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(state => state.users).userInfo
  const currentUser = useSelector(state => state.currentUser).userInfo

  useEffect(()=>{
    if(currentUser)
      dispatch(fetchUserById(urlId))
        .then(data=>{
          if (data.error) 
            throw new Error(data.error.message)
          else if(!currentUser.admin && data.payload?._id !== currentUser._id){
            setIsMsgNoAccess(true)
            throw new Error('user not authorized')
          }
          else {
            console.log('user is authorized')
            setIsLoading(false)
            setIsAuthorized(true)
          }
        })
        .catch(err=>{
          console.log(err)
          setIsLoading(false)
          setIsAuthorized(false)
        })
  },[currentUser, urlId])

  // console.log(user)
  const changeUserDetails = async () => {
  }

  const changePassword = async () => {    
    Swal.fire({
      title: 'a password reset link is sent to your email address.',
      icon: 'success'
    })
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <PageNotFound isNotFound={(!isLoading && !isAuthorized)} msgNoAccess={isMsgNoAccess}/>

      { ((!isLoading&&isAuthorized) && user) && 
        <div className="user-page">

          <div style={{background: 'white', height: 660}}>
            <h1>{user.name}</h1>
            { user.admin && <h2>admin</h2> }
            <div className="name-and-address">
                <h4>{user?.email}</h4>
                <p>{user.address}</p>
            </div>
            <button onClick={changeUserDetails}>change details</button>
            <button onClick={changePassword}>change password</button>
          </div>
          
          <div style={{background: 'white'}}>
            { user.admin ?
              <AllUsers /> 
            : <UserOrders userId={user._id} />
            }
          </div>
            
        </div>
      }
    </>
  );
}
 

export default UserPage;
