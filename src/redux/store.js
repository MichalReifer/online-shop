import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {cakesReducer, cakeCategoriesReducer} from './slices/cakesSlice'
import  usersReducer from './slices/usersSlice'
// redux saga:
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";


const reducer = combineReducers({
    cakes: cakesReducer,
    cakeCategories: cakeCategoriesReducer,
    users: usersReducer
  });

const sagaMiddleware = createSagaMiddleware();
  
export const store = configureStore({
  reducer,
  middleware: (defaultMiddleware) => defaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(watcherSaga);
