import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {cakesReducer, cakeCategoriesReducer} from './slices/cakesSlice'
import { currentUserReducer } from './slices/currentUserSlice'
import { usersReducer } from './slices/usersSlice';

const reducer = combineReducers({
    cakes: cakesReducer,
    cakeCategories: cakeCategoriesReducer,
    currentUser: currentUserReducer,
    users: usersReducer
  });
  
export const store = configureStore({
  reducer,
})

