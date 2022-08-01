import { axiosReq } from "../../utils/apiCalls";
import {loginFailure, loginStart, loginSuccess} from './actions'

export const login = async (user,dispatch) =>{
    dispatch(loginStart());
    try {
        const res = await axiosReq.post("auth/login", {
            username: user.username,
            password: user.password
        });
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const register = async ({username, email, password,profilePicture}, dispatch) =>{
    dispatch(loginStart());
    try {
        const res = await axiosReq.post("auth/register", {
            username,
            email,
            password,
            profilePicture
        });
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}