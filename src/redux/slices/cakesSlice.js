import { createSlice } from '@reduxjs/toolkit'


export const cakesSlice = createSlice({
  name: 'cakes',
  initialState: {},
  reducers: {
    getCakes() {},
    removeCakes() {return {}},
    setCakes(state, action) {
        const cakesData = action.payload
        // keep the state as it was, then override the changes:
        return {...state, ...cakesData}
    }

  },
})

export const { getCakes, setCakes, removeCakes } = cakesSlice.actions

export default cakesSlice.reducer