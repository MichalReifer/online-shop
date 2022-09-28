import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchCakesByList = createAsyncThunk('cakes/fetchCakesByList', (cakeIdList) => {
  cakeIdList = cakeIdList.join('+')
  return fetch(`/cakes/by-cakeid-list/${cakeIdList}`)
    .then(response=>response.json())
    .then(res=> {
      if (res.error) throw new Error(res.error)
      else return res
    })
    .catch(err=>console.log(err))
  }
)

const initialState = {
  loading: false,
  cakes: [],
  error: ''
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: {
    [fetchCakesByList.pending]: state => {
      state.loading = true
    },
    [fetchCakesByList.fulfilled]: (state, action) => {
      state.loading = false
      state.cakes = action.payload
      state.error = ''
    },
    [fetchCakesByList.rejected]: (state, action) => {
      state.loading = false
      state.cakes = []
      state.error = action.error.message
    }
  }
})

export const cartReducer = cartSlice.reducer
