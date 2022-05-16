import { createSlice } from '@reduxjs/toolkit'


export const cakesSlice = createSlice({
  name: 'cakes',
  initialState: {},
  reducers: {
    getCakes() {},
    getCakesNoImage() {},
    getCakesByCategory(state, action) {},
    removeCakes() {return {}},
    setCakes(state, action) {
        const cakesData = action.payload
        // keep the state as it was, then override the changes:
        return {...state, ...cakesData}
    }
  },
})

export const cakeCategoriesSlice = createSlice({
  name: 'cakeCategories',
  initialState: [],
  reducers: {
    getCakeCategories() {},
    removeCakeCategories() {return []},
    setCakeCategories(state, action) {
        const cakesCategorisData = action.payload
        return [...new Set([...state, ...cakesCategorisData])]
    }
  },
})

export const { getCakes, getCakesNoImage, getCakesByCategory, setCakes, removeCakes } = cakesSlice.actions

export const { getCakeCategories, setCakeCategories, removeCakeCategories } = cakeCategoriesSlice.actions


export const cakesReducer = cakesSlice.reducer
export const cakeCategoriesReducer = cakeCategoriesSlice.reducer