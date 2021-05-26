import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cart from './Cart';
import ProductPage from './ProductPage';
import Search from './Search';


function App() {

  const addToCart = (id) => {
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
          <Route exact path="/">
              <Home />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/products/:id">
              <ProductPage addToCart={addToCart}/>
            </Route>
          </Switch>
        </div>  
      </div>
    </Router>
  );
}

export default App;
