import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cart from './Cart';
import ProductPage from './ProductPage';
import Search from './Search';
import firebase from './config/firebase'; 
import { useEffect, useState } from 'react';

function App() {

  const [ products, setProducts ] = useState([]);
  const ref = firebase.firestore().collection('products')
  console.log(ref);

  function getProducts(){
    ref.get().then(item=>{
      const items = item.docs.map(doc=>doc.data());
      setProducts(items);
    })
  }

  useEffect(()=>{
    getProducts();
  }, [])

  console.log(products);
  // products.map(product=>console.log(product.title));

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
