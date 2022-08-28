import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {cakesReducer, cakeCategoriesReducer} from './slices/cakesSlice'
import  usersReducer from './slices/usersSlice'

const reducer = combineReducers({
    cakes: cakesReducer,
    cakeCategories: cakeCategoriesReducer,
    users: usersReducer
  });
  
export const store = configureStore({
  reducer,
})

