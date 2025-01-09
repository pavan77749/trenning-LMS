import { authApi } from "@/features/api/authApi"
import authReducer from "../features/authSlice.js"
import { combineReducers } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    auth:authReducer
});
export default rootReducer;