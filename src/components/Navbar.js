import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useContext } from 'react';
import {signUp} from '../utils';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Navbar = (props) => {

    const { storageUser: user, setStorageUser: setUser, admin, setAdmin } = useContext(CurrentUserContext)
    const history = useHistory();

    const signMeUp = async ()=>{
        await signUp(props.firebase);
        setUser(JSON.parse(localStorage.getItem('currentUser')));
    }

    const signOut = ()=>{
        Swal.fire({
            title: 'log out?',
            icon: 'question',
            showCancelButton: true
        }).then(result=>{
            if(result.isConfirmed){
                props.firebase.signOut();
                setUser(null)
                setAdmin(null);
                localStorage.removeItem('currentUser');
                localStorage.removeItem('userDetails');
                history.push('/');
            }
        })
    }

    return (
        <nav className="navbar">
            <Link className='link' to={{pathname: '/'}}>
            <img src={"https://firebasestorage.googleapis.com/v0/b/cake-shop-19256.appspot.com/o/images%2Flogo.gif?alt=media&token=45c05622-859f-451d-97f2-da7b4f68cf55"} alt='logo' />
            </Link>
            <div className="links">
                {!user && <a onClick={signMeUp}>Sign up</a>}
                { user &&
                    <div className="sign-out"> 
                        {admin && <p id='admin'>admin</p>}
                        <Link id="name" to={`/users/${user.uid}`}> Hi, {user.displayName}!</Link>
                        <a onClick={signOut}>Log out</a>
                    </div> }
                <Link className='link' to={{pathname: '/'}}>Home</Link>
                <Link className='link' to={{pathname: '/search'}}>Search</Link>
                <Link className='link' to={{pathname: '/cart'}}>Cart</Link>
            </div>
        </nav>
    );
}
 
export default compose(withFirebase)(Navbar);
