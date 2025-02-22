import { authApi } from "@/features/api/authApi"
import authReducer from "../features/authSlice.js"
import { combineReducers } from "@reduxjs/toolkit"
import { courseApi } from "@/features/api/cousreApi.js";
import { purchaseApi } from "@/features/api/purchaseApi.js";
import { courseProgressApi } from "@/features/api/cousreProgressApi.js";

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    auth:authReducer
});
export default rootReducer;