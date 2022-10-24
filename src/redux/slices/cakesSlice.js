import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'

export const CAKES_IN_LINE = 5
export const LINES_ON_START = 3
export let previousSearch = false

export const fetchCakes = createAsyncThunk('cakes/fetchCakes', (params={page:0, limit:5, searchValue:''}) => {
    let { page, limit, searchValue } = params
    previousSearch = searchValue ?  true: false
    searchValue =  searchValue ?? '' 
    return fetch(`/cakes/?page=${page}&limit=${limit}&value=${searchValue}`)
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
    page: LINES_ON_START-1, 
    hasMore: true,
    cakes: [],
    error: ''
  },
  reducers: {
    deleteCakes: state => {
      state.page = LINES_ON_START-1
      state.hasMore = true
      state.cakes = []
    },
    deleteCakeById: (state, action) => {
      let order = JSON.parse(localStorage.getItem('order'))
      state.cakes = current(state.cakes).filter(cake=>{
        if (cake._id!==action.payload) return true
        else {
          if (order) delete order[cake.cakeId]
          localStorage.setItem('order', JSON.stringify(order))
          return false
        }
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCakes.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchCakes.fulfilled, (state, action) => {
      state.loading = false
      if (action.payload.length < CAKES_IN_LINE)
        state.hasMore = false
      state.cakes = [...state.cakes, ...action.payload]
      state.page = state.page+1
      state.error = ''
    })
    builder.addCase(fetchCakes.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export const {deleteCakes, deleteCakeById} = cakesSlice.actions
export const cakesReducer = cakesSlice.reducer
