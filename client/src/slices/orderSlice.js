import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name:'order',
    initialState:{
        orderDeatil:{},
        userOrders:[],
        adminOrders:[],
        loading:false,
        isOrderDeleted:false,
        isOrderUpdated:false
    },
    reducers : {
        createOrderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        createOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                orderDeatil:action.payload.order

            }
            

        },
        createOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload

            }
            

        },
        clearOrderError(state,action){
            return{
                ...state,
                error:null

            }
        },
        userOrdersRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        userOrdersSuccess(state,action){
            return{
                ...state,
                loading:false,
                userOrders:action.payload.orders

            }
            

        },
        userOrdersFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload

            }
            

        },
        orderDeatilRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        orderDeatilSuccess(state,action){
            return{
                ...state,
                loading:false,
                orderDetail:action.payload.order

            }
            

        },
        orderDeatilFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload

            }
            

        },
        adminOrderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        adminOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                adminOrders:action.payload.orders

            }
            

        },
        adminOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload

            }
            

        },
        deleteOrderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        deleteOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                isOrderDeleted:true

            }
            

        },
        deleteOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload

            }
            

        },
        updateOrderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        updateOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                isOrderUpdated:true

            }
            

        },
        updateOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload

            }
            

        },
        clearOrderDeleted(state,action){
            return{
                ...state,
                isOrderDeleted:false
            }
        },
        clearOrderUpdated(state,action){
            return{
                ...state,
                isOrderUpdated:false
            }
        }
    

        
        
    }
})

const {actions,reducer} = orderSlice;

export const {createOrderRequest,
                createOrderSuccess,
                createOrderFail,
                clearOrderError,
                userOrdersRequest,
                userOrdersSuccess,
                userOrdersFail,
                orderDeatilRequest,
                orderDeatilSuccess,
                orderDeatilFail,
                adminOrderRequest,
                adminOrderSuccess,
                adminOrderFail,
                updateOrderSuccess,
                updateOrderRequest,
                updateOrderFail,
                deleteOrderFail,
                deleteOrderRequest,
                deleteOrderSuccess,
                clearOrderDeleted,
                clearOrderUpdated
            } = actions;

export default reducer;