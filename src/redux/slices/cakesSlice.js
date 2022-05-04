import { createSlice } from '@reduxjs/toolkit'


export const cakesSlice = createSlice({
  name: 'cakes',
  initialState: {},
  reducers: {
    getCakes() {},
    removeCakes() {return {}},
    setCakes(state, action) {
        const cakeData = action.payload
        // keep the state as it was, then override the changes:
        return {...state, ...cakeData}
    }

  },
})

export const { getCakes, setCakes, removeCakes } = cakesSlice.actions

export default cakesSlice.reducer