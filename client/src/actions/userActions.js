import axios from "axios"
import { RegisterFail, RegisterRequest, RegisterSuccess, clearError, forgotPasswordFail, forgotPasswordRequest, forgotPasswordSuccess, loadUserFail, loadUserRequest, loadUserSuccess, loginFail, loginRequest, loginSuccess, logoutUserFail, logoutUserSuccess, resetPasswordFail, resetPasswordRequest, resetPasswordSuccess, updatePasswordFail, updatePasswordRequest, updatePasswordSuccess, updateProfileFail, updateProfileRequest, updateProfileSuccess } from "../slices/authslice"
import { deleteUserFail, deleteUserRequest, deleteUserSuccess, updateUserFail, updateUserRequest, updateUserSuccess, userFail, userRequest, userSuccess, usersFail, usersRequest, usersSuccess } from "../slices/userSlice";

export const login =(email,password) => async (dispatch) => {

    try {
        dispatch(loginRequest())
        const {data} =  await axios.post(`/api/v1/login`,{email,password});
        dispatch(loginSuccess(data))

    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }
}

export const clearAuthError=dispatch => {
    dispatch(clearError())

}

//register
export const register =(userData) => async (dispatch) => {

    try {
        dispatch(RegisterRequest())

        const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }
        const {data} =  await axios.post(`/api/v1/register`,userData,config);
        dispatch(RegisterSuccess(data))

    } catch (error) {
        dispatch(RegisterFail(error.response.data.message))
    }
}
//load user

export const loadUser = async (dispatch) => {

    try {
        dispatch(loadUserRequest())

        
        const {data} =  await axios.get(`/api/v1/myprofile`);
        dispatch(loadUserSuccess(data))

    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }
}
//logout
export const logout = async (dispatch) => {

    try {
        

        
         await axios.get(`/api/v1/logout`);
        dispatch(logoutUserSuccess())

    } catch (error) {
        dispatch(logoutUserFail)
    }
}
//update user profile

export const updateProfile =(userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())

        const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }
        const {data} =  await axios.put(`/api/v1/update`,userData,config);
        dispatch(updateProfileSuccess(data))

    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }
}
//update password 
export const updatePassword =(formData) => async (dispatch) => {

    try {
        dispatch(updatePasswordRequest())

        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        await axios.put(`/api/v1/password/change`,formData,config);
        dispatch(updatePasswordSuccess())

    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
    }
}
//forgot password
export const forgotPassword =(formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordRequest())

        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
       const {data}= await axios.post(`/api/v1/password/forgot`,formData,config);
        dispatch(forgotPasswordSuccess(data))

    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
    }
}
//reset password
export const resetPassword =(formData,token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest())

        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
       const {data}= await axios.post(`/api/v1/password/reset/${token}`,formData,config);
        dispatch(resetPasswordSuccess(data))

    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }
}

//get Users
export const getUsers = async (dispatch) => {

    try {
        dispatch(usersRequest())

        
        const {data} =  await axios.get(`/api/v1/admin/users`);
        dispatch(usersSuccess(data))

    } catch (error) {
        dispatch(usersFail(error.response.data.message))
    }
}
//getUser
export const getUser =id=> async (dispatch) => {

    try {
        dispatch(userRequest())

        
        const {data} =  await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data))

    } catch (error) {
        dispatch(userFail(error.response.data.message))
    }
}
//delete user
export const deleteUser =id=> async (dispatch) => {

    try {
        dispatch(deleteUserRequest())

        
        await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch(deleteUserSuccess())

    } catch (error) {
        dispatch(deleteUserFail(error.response.data.message))
    }
}
//update user
export const updateUser =(id,formData) => async (dispatch) => {

    try {
        dispatch(updateUserRequest())

        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        await axios.put(`/api/v1/admin/user/${id}`,formData,config);
        dispatch(updateUserSuccess())

    } catch (error) {
        dispatch(updateUserFail(error.response.data.message))
    }
}