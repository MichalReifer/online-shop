import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserById } from '../redux/slices/userPageSlice'
import UserOrders from '../components/UserOrders';
import Loading from '../components/Loading';
import PageNotFound from '../pages/PageNotFound';
import AllUsers from '../components/AllUsers';
import { useUserPage } from '../hooks/useUserPage';


const UserPage = (props) => {

  const { userId: urlId } = useParams();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isAuthorized, setIsAuthorized ] = useState(false);
  const { changeUserDetails, changePassword } = useUserPage()

  const dispatch = useDispatch()
  const user = useSelector(state => state.user).info
  const currentUser = useSelector(state => state.currentUser)

  useEffect(()=>{
    if(currentUser.userInfo)
      dispatch(fetchUserById({id: urlId, token: currentUser.userToken}))
        .then(data=>{
          if (data.error) 
            throw new Error(data.error.message)
          else if(!currentUser.userInfo.admin && data.payload?._id !== currentUser.userInfo._id)
            throw new Error('user not authorized')
          else 
            setIsAuthorized(true)
        })
        .catch(err=>{
          console.log(err)
          setIsAuthorized(false)
        })
        .finally(()=>setIsLoading(false))
    else if(currentUser.error) {
      setIsAuthorized(false)
      setIsLoading(false)
    }
  },[currentUser, urlId])


  return (
    <>
      <Loading isLoading={isLoading} />
      <PageNotFound isNotFound={(!isLoading && !isAuthorized)} msgNoAccess={true}/>

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
