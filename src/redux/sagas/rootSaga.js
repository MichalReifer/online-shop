import { takeLatest } from 'redux-saga/effects'
import { handleGetCakes } from './handlers/cakes'
import { getCakes } from '../slices/cakesSlice'


export function* watcherSaga() {
    yield takeLatest(getCakes.type, handleGetCakes)
}