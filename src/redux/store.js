import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cakesReducer } from './slices/cakesSlice'
import { currentUserReducer } from './slices/currentUserSlice'
import { allUsersReducer } from './slices/allUsersSlice';
import { ordersReducer } from './slices/ordersSlice';
import { userPageReducer } from './slices/userPageSlice';
import { cartReducer } from './slices/cartSlice';

const reducer = combineReducers({
    cakes: cakesReducer,
    cart: cartReducer,
    currentUser: currentUserReducer,
    user: userPageReducer,
    allUsers: allUsersReducer,
    orders: ordersReducer
  });
  
export const store = configureStore({
  reducer,
})

