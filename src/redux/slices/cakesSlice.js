import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchCakes = createAsyncThunk('cakes/fetchCakes', (params={page:0, limit:5, value:''}, {signal}) => {
    params.value =  params.value ?? '' 
    return fetch(`http://localhost:8081/cakes/?page=${params.page}&limit=${params.limit}&value=${params.value}`, {signal})
      .then(response=>response.json())
      .then(res=> {
        if (res.error) throw new Error(res.error)
        else return res
      })
      .catch(err=>console.log(err))
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


export const cakesReducer = cakesSlice.reducer
