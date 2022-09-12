import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


export const fetchOrders = createAsyncThunk('orders/fetchOrders', name => {
  name = name ?? ''
  return fetch(`http://localhost:8081/orders/?name=${name}`)
    .then(res=>res.json())
})

export const fetchOrdersByUserId = createAsyncThunk('orders/fetchOrdersByUserId', userId => {
  return fetch(`http://localhost:8081/orders/by-userid/${userId}`)
    .then(res=>res.json())
    .then(res=> {
      if (res.error) throw new Error(res.error)
      else return res
    })
})


export const addNewOrder = createAsyncThunk('orders/addNewOrder', order => {
  return fetch('http://localhost:8081/orders',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
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
    [fetchOrders.pending] : state => {
      state.loading = true
      state.error = ''
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.loading = false
      state.info = action.payload
      state.error = ''
    },
    [fetchOrders.rejected]: (state, action) => {
      state.loading = false
      state.info = []
      state.error = action.error.message
    },

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