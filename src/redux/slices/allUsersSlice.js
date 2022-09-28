import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchUsers = createAsyncThunk( 'users/fetchUsers', (params={page:0, limit:5, value:'', token:''}) => {
  params.value =  params.value ?? '' 
  return fetch(
    `/users/?page=${params.page}&limit=${params.limit}&value=${params.value}`,
    { headers: {'Authorization': 'Bearer ' + params.token}}
    ).then(response=>response.json())
  }
)

const initialState = {
  loading: false,
  info: [],
  error: ''
}

export const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  extraReducers: {

    [fetchUsers.pending] : state => {
      state.loading = true
      state.error = ''
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false
      state.info = action.payload
      state.error = ''
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false
      state.info = []
      state.error = action.error.message
    }
  }
})

export const allUsersReducer = allUsersSlice.reducer