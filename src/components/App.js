import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cart from './Cart';
import ProductPage from './ProductPage';
import Search from './Search';
import UserPage from './UserPage';
import CurrentUserContextProvider from '../contexts/CurrentUserContext';
import ProductsContextProvider from '../contexts/ProductsContext';
import AllUsers from './AllUsers';
import PageNotFound from './PageNotFound';


function App(props) {

  return (
    <Router>
      <div className="App">
        <ProductsContextProvider>
          <CurrentUserContextProvider>
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
                <Route path="/users/:userId">
                  <UserPage/>
                </Route>                      
                <Route path="/all_users">
                  <AllUsers/>
                </Route>
                <Route path="*">
                  <PageNotFound />
                </Route>       
              </Switch>
            </div>  
          </CurrentUserContextProvider>
        </ProductsContextProvider>
      </div>
    </Router>
  );
}

export default App;
