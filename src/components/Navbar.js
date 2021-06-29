import logo from './images/logo.jpg';
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useEffect, useState } from 'react';
import {signUp} from './utils';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = (props) => {

    const [ user, setUser ]= useState(null);
    const history = useHistory();

    const signMeUp = async (firebase)=>{
        const userSignUp = await signUp(props.firebase);
        const user = await props.firebase.getUserByEmail(userSignUp?.email);
        setUser(user);
    }

    const signOut = ()=>{
        Swal.fire({
            title: 'sign out?',
            icon: 'question',
            showCancelButton: true
        }).then(result=>{
            if(result.isConfirmed){
                props.firebase.signOut();
                setUser(null);
                history.push('/');
            }
        })
    }

    useEffect(async()=>{
        setTimeout(async()=>{
            const userEmail = await props.firebase.getCurrentUser()?.email;
            const user = await props.firebase.getUserByEmail(userEmail);
            setUser(user);
        }, 1000)
    }, [])

    console.log(user)
    console.log(user?.name)

    return (
        <nav className="navbar">
            <a href="/"><img src={logo} alt='logo' /></a>
            <div className="links">
                {!user && <a onClick={signMeUp}>Sign Up</a>}
                { user && 
                    <div className="sign-out"> 
                        {/* <a href={`/users/${user.name}`}>Hi, {user.name}!</a> */}
                        <Link to={{
                            pathname: `/users/${user.name}`,
                            state : {userEmail : `${user.email}`}
                            }}> Hi, {user.name}!
                        </Link>
                        <a onClick={signOut}>Sign Out</a>
                    </div>}
                <a href="/">Home</a>
                <a href="/search">Search</a>
                <a href="/cart">Cart</a>
            </div>
        </nav>
    );
}
 
// export default Navbar;
export default compose(withFirebase)(Navbar);
