import { call, put } from 'redux-saga/effects'
import { setCakes, setCakeCategories } from '../../slices/cakesSlice'
import { requestGetCakes, requestGetCakesNoImage, requestGetCakesByCategory, requestGetCakeCategories } from '../requests/cakes'

export function* handleGetCakes(action) {
    try {
        const data = yield call(requestGetCakes)
        yield put(setCakes(data))
    } catch(err) 
        { console.log(err) }
}

export function* handleGetCakesNoImage(action) {
    try {
        const data = yield call(requestGetCakesNoImage)
        yield put(setCakes(data))
    } catch(err) 
        { console.log(err) }
}

export function* handleGetCakesByCategory(action) {
    try {
        const data = yield call(requestGetCakesByCategory, action.payload)
        yield put(setCakes(data))
    } catch(err) 
        { console.log(err) }
}

export function* handleGetCakeCategories(action) {
    try {
        const data = yield call(requestGetCakeCategories)
        yield put(setCakeCategories(data))
    } catch(err) 
        { console.log(err) }
}

