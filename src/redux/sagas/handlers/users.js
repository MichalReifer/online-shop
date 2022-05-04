import { call, put } from 'redux-saga/effects'
import { setUsers } from '../../slices/usersSlice'
import { requestGetUsers } from '../requests/users'

export function* handleGetUsers(action) {
    try {
        const data = yield call(requestGetUsers)
        yield put(setUsers(data))
    } catch(err) 
        { console.log(err) }
}