import logo from './images/logo.jpg';
import { withFirebase } from '../firebase/index';
import { compose } from 'recompose';
import { useEffect, useState } from 'react';
import {signUp} from './utils';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = (props) => {

    const [ user, setUser ]= useState(true);
    const history = useHistory();

    const signMeUp = async ()=>{
        const user = await signUp(props.firebase);
        setUser(user);
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
                history.push('/');
            }
        })
    }

    useEffect(async()=>{
        setTimeout(async()=>{ // in firebase "this.auth" is good but "".currentUser" takes about a half second after the page loads. before that its null.
            const user = await props.firebase.getCurrentUser();
            setUser(user);
        }, 1000)
    }, [])


    props.firebase.printCurrentUser();
    // useEffect(async()=>{
    //     props.firebase.changeAuth();
    // })


    return (
        <nav className="navbar">
            <a href="/"><img src={logo} alt='logo' /></a>
            <div className="links">
                {!user && <a onClick={signMeUp}>Sign up</a>}
                { (user&&user.displayName) && (user.uid &&
                    <div className="sign-out"> 
                        <Link to={{
                            pathname: `/users/${user.uid}_${user.displayName}`,
                            state : {userId : `${user.uid}`}
                            }}> Hi, {user.displayName}!
                        </Link>
                        <a onClick={signOut}>Log out</a>
                    </div>) }
                <a href="/">Home</a>
                <a href="/search">Search</a>
                <a href="/cart">Cart</a>
            </div>
        </nav>
    );
}
 
export default compose(withFirebase)(Navbar);
