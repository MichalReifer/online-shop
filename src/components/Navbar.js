import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { validateToken } from '../redux/slices/currentUserSlice'
import { useLogin } from '../hooks/useLogin'
import { useSignup } from '../hooks/useSignup'
import logo from '../assets/img/logo.gif' 
import HomeIcon from '@mui/icons-material/Home'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LoginIcon from '@mui/icons-material/Login'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

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
            <img src={logo} alt='logo' className='logo'/>
            </Link>
            <div className="links">

                {!currentUser.userInfo ? 
                  <div className='log' 
                    onMouseOver={e=>document.getElementById('drop-login').classList.remove('hidden')}
                    onMouseLeave={e=>document.getElementById('drop-login').classList.add('hidden')}
                  >
                    <Link to="#" style={{'alignItems': 'end'}}><LoginIcon className='icon'/></Link>
                    <div className='dropdown hidden' id="drop-login">
                      <div className='inner'>
                        <Link to="#" onClick={login}>Login</Link>
                        <Link to="#" onClick={signup}>Signup</Link>
                      </div>
                    </div>
                  </div>
                :
                  <>
                  <div id="nav-user-name"> Hi {currentUser.userInfo.name}</div>
                  <div className='log' 
                    onMouseOver={e=>document.getElementById('drop-account').classList.remove('hidden')}
                    onMouseLeave={e=>document.getElementById('drop-account').classList.add('hidden')}
                  >
                    <Link to="#" style={{'alignItems': 'end'}}><AccountCircleIcon className='icon'/></Link>
                    <div className='dropdown hidden' id="drop-account">
                      <div className='inner'>
                        <Link to={`/users/${currentUser.userInfo._id}`}>profile</Link>
                        <Link to="#" onClick={logout}>Logout</Link>
                      </div>
                    </div>
                  </div>
                  </>
                }

                <Link className='link' to={{pathname: '/'}}>
                  <HomeIcon className='icon'/>
                </Link>
                <Link className='link' to={{pathname: '/cart'}}>
                  <ShoppingCartIcon className='icon'/>
                </Link>
            </div>
        </nav>
    );
}
 
export default Navbar;
