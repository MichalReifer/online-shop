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
            <a href="/">
                <img src={"https://firebasestorage.googleapis.com/v0/b/cake-shop-19256.appspot.com/o/images%2Flogo.jpg?alt=media&token=843c82d0-a4ba-4c44-81ca-2a958ad36be7"} alt='logo' />
            </a>
            <div className="links">
                {!user && <a onClick={signMeUp}>Sign up</a>}
                { user &&
                    <div className="sign-out"> 
                        {admin && <p id='admin'>admin</p>}
                        <Link id="name" to={`/users/${user.uid}`}> Hi, {user.displayName}!</Link>
                        <a onClick={signOut}>Log out</a>
                    </div> }
                <a href="/">Home</a>
                <a href="/search">Search</a>
                <a href="/cart">Cart</a>
            </div>
        </nav>
    );
}
 
export default compose(withFirebase)(Navbar);
