import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


export const fetchOrdersByUserId = createAsyncThunk('orders/fetchOrdersByUserId', ({userId, token}) => {
  return fetch(
    `http://localhost:8081/orders/by-userid/${userId}`,
    { headers: {'Authorization': 'Bearer ' + token}}
    )
    .then(res=>res.json())
    .then(res=> {
      if (res.error) throw new Error(res.error)
      else return res
    })
})


export const addNewOrder = createAsyncThunk('orders/addNewOrder', ({order, token}) => {
  return fetch('http://localhost:8081/orders',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(order)
  })
  .then(res =>res.json())
  .then(res=> {
    if (res.error) throw new Error(res.error)
    else {
      localStorage.removeItem('order')
      return res
    }
  })
})


const initialState = {
  loading: false,
  info: [],
  error: ''
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: {

    [fetchOrdersByUserId.pending] : state => {
      state.loading = true
      state.error = ''
    },
    [fetchOrdersByUserId.fulfilled]: (state, action) => {
      state.loading = false
      state.info = action.payload
      state.error = ''
    },
    [fetchOrdersByUserId.rejected]: (state, action) => {
      state.loading = false
      state.info = []
      state.error = action.error.message
    },

    [addNewOrder.pending]: state => {
      state.loading = true
      state.error = ''
    },
    [addNewOrder.fulfilled]: (state) => {
      state.loading = false
      state.error = ''
    },
    [addNewOrder.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },

  }
})

export const ordersReducer = ordersSlice.reducer