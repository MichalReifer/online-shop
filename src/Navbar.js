import logo from './images/logo.jpg';

const Navbar = () => {

    // const newUser = (e) => {
    //     e.preventDefault();
    //     fetch('http://localhost:8000/users', {
    //         method: 'POST',
    //         headers: { "Content-Type": "application/json"},
    //         body: JSON.stringify({"cart-items": []})
    //         }).then((res)=>{
    //             // console.log('new user added')
    //             return res.json();
    //         }).then(data=>{
    //             // const myUser = data.id;
    //             // console.log("my user id: "+ myUser);
    //         })
    // }

    return (
        <nav className="navbar">
            {/* <h1>The Cake Shop</h1> */}
            <img src={logo} alt='logo' />
            {/* <h1>The Cake Shop</h1> */}
            <div className="links">
                {/* <a onClick={newUser} href="/">Start Shopping</a> */}
                <a href="/">Home</a>
                <a href="/search">Search</a>
                <a href="/cart">Cart</a>
            </div>
        </nav>
    );
}
 
export default Navbar;