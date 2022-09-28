import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchUserById = createAsyncThunk( 'users/fetchUsersById', ({id, token}) => {
  return fetch(
    `/users/by-id/${id}`,
    { headers: {'Authorization': 'Bearer ' + token}}
    )
    .then(res =>res.json())
    .then(res=> {
      if (res.error) throw new Error(res.error)
      else return res
    })
  }
)

const initialState = {
  loading: false,
  info: null,
  error: ''
}

export const userPageSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [fetchUserById.pending]: state => {
      state.loading = true
      state.error = ''
    },
    [fetchUserById.fulfilled]: (state, action) => {
      state.loading = false
      state.info = action.payload
      state.error = ''
    },
    [fetchUserById.rejected]: (state, action) => {
      state.loading = false
      state.info = null
      state.error = action.error.message
    }
  }
})

export const userPageReducer = userPageSlice.reducer