import { takeLatest } from 'redux-saga/effects'
import { handleGetCakes } from './handlers/cakes'
import { getCakes } from '../slices/cakesSlice'
import { handleGetUsers } from './handlers/users'
import { getUsers } from '../slices/usersSlice' 


export function* watcherSaga() {
    yield takeLatest(getCakes.type, handleGetCakes)
    yield takeLatest(getUsers.type, handleGetUsers)
}