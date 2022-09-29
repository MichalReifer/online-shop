import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/navbar.css';
import './styles/cart.css';
import './styles/productPreview.css';
import './styles/productPage.css'
import './styles/userPage.css'
import './styles/search.css'
import './styles/userOrders.css'
import './styles/sweetAlert.css'
import './styles/scrollBar.css'
import App from './App';
import { store } from './redux/store'
import { Provider } from 'react-redux'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
