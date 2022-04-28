import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/navbar.css';
import './styles/cart.css';
import './styles/productPreview.css';
import './styles/productPage.css'
import './styles/userPage.css'
import App from './components/App';
import Firebase, { FirebaseContext } from './firebase';


ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
  <App />
</FirebaseContext.Provider>,
  document.getElementById('root')
);
