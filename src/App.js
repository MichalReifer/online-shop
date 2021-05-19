import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cart from './Cart';
import ProductPage from './ProductPage';


function App() {

  const cartList = new Set();

  const addToCart = (id) => {
    cartList.add(id);
    console.log(cartList);
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
