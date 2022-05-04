import { call, put } from 'redux-saga/effects'
import { setCakes } from '../../slices/cakesSlice'
import { requestGetCakes } from '../requests/cakes'

export function* handleGetCakes(action) {
    try {
        const data = yield call(requestGetCakes)
        yield put(setCakes(data))
    } catch(err) 
        { console.log(err) }
}