import logo from './images/logo.jpg';
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useState } from 'react';
import {signUp} from './utils';

const Navbar = (props) => {

    const [ user, setUser ]= useState(null);

    setTimeout(()=>{
        setUser(props.firebase.getCurrentUser()?.email)
    }, 500)
    
    const signMeUp = async (firebase)=>{
        const user = await signUp(props.firebase);
        setUser(user?.email);

    }

    const signOut = ()=>{
        props.firebase.signOut();
        setUser(null);
    }

    return (
        <nav className="navbar">
            <a href="/"><img src={logo} alt='logo' /></a>
            <div className="links">
                {!user && <a onClick={signMeUp}>Sign Up</a>}
                { user && 
                    <div className="sign-out"> 
                        <p>Hi, {user}!</p>
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
