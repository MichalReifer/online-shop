import { takeLatest } from 'redux-saga/effects'
import { handleGetCakes, handleGetCakesNoImage, handleGetCakesByCategory, handleGetCakeCategories } from './handlers/cakes'
import { getCakes, getCakesNoImage, getCakesByCategory, getCakeCategories } from '../slices/cakesSlice'
import { handleGetUsers } from './handlers/users'
import { getUsers } from '../slices/usersSlice' 


export function* watcherSaga() {
    yield takeLatest(getCakes.type, handleGetCakes)
    yield takeLatest(getCakesNoImage.type, handleGetCakesNoImage)
    yield takeLatest(getCakesByCategory.type, handleGetCakesByCategory)
    yield takeLatest(getCakeCategories.type, handleGetCakeCategories)
    yield takeLatest(getUsers.type, handleGetUsers)
}