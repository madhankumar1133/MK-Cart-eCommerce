import axios from "axios"
import { adminOrderFail, adminOrderRequest, adminOrderSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, orderDeatilFail, orderDeatilRequest, orderDeatilSuccess, updateOrderFail, updateOrderRequest, updateOrderSuccess, userOrdersFail, userOrdersRequest, userOrdersSuccess } from "../slices/orderSlice"

export const createOrder=order=>async(dispatch)=>{
    try {
        dispatch(createOrderRequest())
        const {data}=await axios.post(`/api/v1/order/new`,order)
        dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}
export const userOrders=async(dispatch)=>{
    try {
        dispatch(userOrdersRequest())
        const {data}=await axios.get(`/api/v1/myorders`)
        dispatch(userOrdersSuccess(data))
    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message))
    }
}
export const orderDetail=id=>async(dispatch)=>{
    try {
        dispatch(orderDeatilRequest())
        const {data}=await axios.get(`/api/v1/order/${id}`)
        dispatch(orderDeatilSuccess(data))
    } catch (error) {
        dispatch(orderDeatilFail(error.response.data.message))
    }
}
export const adminOrders=async(dispatch)=>{
    try {
        dispatch(adminOrderRequest())
        const {data}=await axios.get(`/api/v1/admin/orders`)
        dispatch(adminOrderSuccess(data))
    } catch (error) {
        dispatch(adminOrderFail(error.response.data.message))
    }
}

export const deleteOrder=(id)=>async(dispatch)=>{
    try {
        dispatch(deleteOrderRequest())
        await axios.delete(`/api/v1/admin/order/${id}`)
        dispatch(deleteOrderSuccess())
    } catch (error) {
        dispatch(deleteOrderFail(error.response.data.message))
    }
}
export const updateOrder=(id,orderData)=>async(dispatch)=>{
    try {
        dispatch(updateOrderRequest())
        const {data}=await axios.put(`/api/v1/admin/order/${id}`,orderData)
        dispatch(updateOrderSuccess(data))
    } catch (error) {
        dispatch(updateOrderFail(error.response.data.message))
    }
}