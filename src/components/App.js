import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cart from './Cart';
import ProductPage from './ProductPage';
import Search from './Search';
import UserPage from './UserPage';


function App(props) {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/search">
              <Search/>
            </Route>
            <Route path="/products/:cakeId" >
              <ProductPage/>
            </Route>
            <Route path="/users/:userId_userName">
              <UserPage/>
            </Route>            
          </Switch>
        </div>  
      </div>
    </Router>
  );
}

export default App;
