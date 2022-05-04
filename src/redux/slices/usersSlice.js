import { createSlice } from '@reduxjs/toolkit'


export const usersSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {
    getUsers() {},
    removeUsers() {return {}},
    setUsers(state, action) {
        const usersData = action.payload
        // keep the state as it was, then override the changes:
        return {...state, ...usersData}
    }
  },
})

export const { getUsers, setUsers, removeUsers } = usersSlice.actions

export default usersSlice.reducer