import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchUsers = createAsyncThunk( 'users/fetchUsers', (params={page:0, limit:5, value:'', token:''}) => {
  params.value =  params.value ?? '' 
  return fetch(
    `http://localhost:8081/users/?page=${params.page}&limit=${params.limit}&value=${params.value}`,
    { headers: {'Authorization': 'Bearer ' + params.token}}
    ).then(response=>response.json())
  }
)

export const fetchUserById = createAsyncThunk( 'users/fetchUsersById', ({id, token}) => {
  return fetch(
    `http://localhost:8081/users/by-id/${id}`,
    { headers: {'Authorization': 'Bearer ' + token}}
    )
    .then(res =>res.json())
    .then(res=> {
      if (res.error) throw new Error(res.error)
      else return res
    })
  }
)

export const fetchUserByEmail = createAsyncThunk('users/fetchUserByEmail', ({email, token}) => {
  return fetch(
    `http://localhost:8081/users/by-email/${email}`,
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
  userInfo: null,
  users: [],
  error: ''
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {

    [fetchUsers.pending] : state => {
      state.loading = true
      state.error = ''
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message
    },

    [fetchUserById.pending]: state => {
      state.loading = true
      state.error = ''
    },
    [fetchUserById.fulfilled]: (state, action) => {
      state.loading = false
      state.userInfo = action.payload
      state.error = ''
    },
    [fetchUserById.rejected]: (state, action) => {
      state.loading = false
      state.userInfo = null
      state.error = action.error.message
    },

    [fetchUserByEmail.pending]: state => {
      state.loading = true
      state.error = ''
    },
    [fetchUserByEmail.fulfilled]: (state, action) => {
      state.loading = false
      state.userInfo = action.payload
      state.error = ''
    },
    [fetchUserByEmail.rejected]: (state, action) => {
      state.loading = false
      state.userInfo = null
      state.error = action.error.message
    }
 

  },
})


export const usersReducer = usersSlice.reducer