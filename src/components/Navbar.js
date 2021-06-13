import logo from './images/logo.jpg';

const Navbar = () => {

    return (
        <nav className="navbar">
            <img src={logo} alt='logo' />
            <div className="links">
                <a href="/">Home</a>
                <a href="/search">Search</a>
                <a href="/cart">Cart</a>
            </div>
        </nav>
    );
}
 
export default Navbar;