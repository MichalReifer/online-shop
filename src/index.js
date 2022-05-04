import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/navbar.css';
import './styles/cart.css';
import './styles/productPreview.css';
import './styles/productPage.css'
import './styles/userPage.css'
import './styles/search.css'
import App from './components/App';
import Firebase, { FirebaseContext } from './firebase';
import { store } from './redux/store'
import { Provider } from 'react-redux'


ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
  <Provider store={store}>
    <App />
  </Provider>
</FirebaseContext.Provider>,
  document.getElementById('root')
);
