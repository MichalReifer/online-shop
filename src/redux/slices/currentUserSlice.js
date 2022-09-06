import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const userToken = localStorage.getItem('cake-shop-jwt')
  ? localStorage.getItem('cake-shop-jwt')
  : null

export const validateToken = createAsyncThunk('users/validate-token', (token) => {
  return fetch('http://localhost:8081/users/validate-token', {
    method: 'POST',
    headers: {'Authorization': 'Bearer ' + token}
  })
  .then(res=>res.json())
  .then(res=> {
    if (res.error) throw new Error(res.error)
    else return res
  })
})

export const userLogin = createAsyncThunk( 'users/userLogin', (params={email:null, password:null}) => {
  const {email, password} = params
  return fetch('http://localhost:8081/users/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  })
    .then(res =>res.json())
    .then(res=> {
      console.log(res)
      if (res.error) throw new Error(res.error)
      else {
        localStorage.setItem('cake-shop-jwt', res.token)
        return res
      }
    })
  }
)

export const userSignup = createAsyncThunk('users/userSignup', (userDetails) => {
  // const {userDetails} = params
  console.log(userDetails)
  return fetch('http://localhost:8081/users/signup', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userDetails)
  })
  .then(res =>res.json())
  .then(res=> {
    if (res.error) throw new Error(res.error)
    else {
      localStorage.setItem('cake-shop-jwt', res.token)
      return res
    }
  })
})

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: ''
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    userLogout: state => {
      localStorage.removeItem('cake-shop-jwt')
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    }
  },
  extraReducers: {

    [validateToken.pending] : state => {
      state.loading = true
      state.error = ''
    },
    [validateToken.fulfilled]: (state, action) => {
      state.loading = false
      state.userInfo = action.payload
      state.error = ''
    },
    [validateToken.rejected]: (state, action) => {
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = action.error.message
    },

    [userLogin.pending]: state => {
      state.loading = true
      state.error = ''
    },
    [userLogin.fulfilled]: (state, action) => {
      const {token, ...user} = action.payload
      state.loading = false
      state.userInfo = user
      state.userToken = token
      state.error = ''
    },
    [userLogin.rejected]: (state, action) => {
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = action.error.message
    },

    [userSignup.pending]: state => {
      state.loading = true
      state.error = ''
    },
    [userSignup.fulfilled]: (state, action) => {
      const {token, ...user} = action.payload
      state.loading = false
      state.userInfo = user
      state.userToken = token
      state.error = ''
    },
    [userSignup.rejected]: (state, action) => {
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = action.error.message
    },

  },
})

export const {userLogout} = currentUserSlice.actions
export const currentUserReducer = currentUserSlice.reducer