import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductPage';
import UserPage from './pages/UserPage';
import PageNotFound from './pages/PageNotFound';


function App() {

  return (
    <Router>
      <div className="App">
            <Navbar />
            <div className="white-container">
              <div className="content">
                <Switch>
                  <Route exact path="/" render={()=><Home />} />
                  <Route path="/cart" render={()=><Cart />} />
                  <Route path="/products/:cakeId" render={()=><ProductPage />} />
                  <Route path="/users/:userId" render={()=><UserPage />} />              
                  <Route path="*" render={()=><PageNotFound isNotFound={true}/>} />    
                </Switch>
              </div>  
            </div>
      </div>
    </Router>
  );
}

export default App;
