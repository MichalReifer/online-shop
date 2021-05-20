import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cart from './Cart';
import ProductPage from './ProductPage';
import Search from './Search';


function App() {

  // const cartList = new Set();

  // const user = 'http://localhost:8000/users/' + 3;
  const addToCart = (id) => {
  //   fetch(user, {
  //       method: 'PUT',
  //       headers: { "Content-Type": "application/json"},
  //       body: JSON.stringify({"items": [id]})
  //   })
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
