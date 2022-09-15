import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { validateToken } from '../redux/slices/currentUserSlice'
import { useLogin } from '../hooks/useLogin'
import { useSignup } from '../hooks/useSignup'
import logo from '../assets/img/logo.gif'  


const Navbar = () => {
    
    const { login, logout } = useLogin()
    const { signup } = useSignup()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser)

    useEffect(()=>{
        dispatch(validateToken(currentUser.userToken))
    }, [dispatch])


    return (
        <nav className="navbar">
            <Link className='link' to={{pathname: '/'}}>
            <img src={logo} alt='logo' />
            </Link>
            <div className="links">
                {!currentUser.userInfo ? 
                  <>
                    <Link to="#" onClick={login}>Login</Link>
                    <Link to="#" onClick={signup}>Signup</Link>
                  </>
                :
                  <>
                    <Link id="name" to={`/users/${currentUser.userInfo._id}`}> Hi, {currentUser.userInfo.name}!</Link>
                    <Link to="#" onClick={logout}>Logout</Link>
                  </>
                }
                <Link className='link' to={{pathname: '/'}}>Home</Link>
                <Link className='link' to={{pathname: '/cart'}}>Cart</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;
