import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchCakes = createAsyncThunk( 'cakes/fetchCakes', (params={page:0, limit:5, value:''}) => {
    params.value =  params.value ?? '' 
    // console.log('params', params)
    return fetch(`http://localhost:8081/cakes/sort-search-limit/?page=${params.page}&limit=${params.limit}&value=${params.value}`)
      .then(response=>response.json())
  }
)

export const cakesSlice = createSlice({
  name: 'cakes',
  initialState: 
  {
    loading: false,
    cakes: [],
    error: ''
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCakes.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchCakes.fulfilled, (state, action) => {
      state.loading = false
      state.cakes = action.payload
      state.error = ''
    })
    builder.addCase(fetchCakes.rejected, (state, action) => {
      state.loading = false
      state.cakes = []
      state.error = action.error.message
    })
  },
})


export const fetchCakeCategories = createAsyncThunk( 'cakes/fetchCategories', () => {
  return fetch('http://localhost:8081/cakes/all-categories')
    .then(response=>response.json())
})

export const cakeCategoriesSlice = createSlice({
  name: 'cakeCategories',
  initialState: 
  {
    loading: false,
    categories: [],
    error: ''
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCakeCategories.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchCakeCategories.fulfilled, (state, action) => {
      state.loading = false
      state.categories = action.payload
      state.error = ''
    })
    builder.addCase(fetchCakeCategories.rejected, (state, action) => {
      state.loading = false
      state.categories = []
      state.error = action.error.message
    })
  },
})


export const cakesReducer = cakesSlice.reducer
export const cakeCategoriesReducer = cakeCategoriesSlice.reducer