import logo from './images/logo.jpg';
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useContext } from 'react';
import {signUp} from './utils';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Navbar = (props) => {

    const { user, setUser } = useContext(CurrentUserContext)
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
                localStorage.removeItem('currentUser');
                history.push('/');
            }
        })
    }

    return (
        <nav className="navbar">
            <a href="/"><img src={logo} alt='logo' /></a>
            <div className="links">
                {!user && <a onClick={signMeUp}>Sign up</a>}
                { user&&
                    <div className="sign-out"> 
                        <Link to={`/users/${user.uid}`}> Hi, {user.displayName}!</Link>
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
