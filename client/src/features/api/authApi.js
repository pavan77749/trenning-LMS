import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

// Use environment variable with fallback to production URL
const AUTH_API = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/v1/user` 
  : "https://trenning-lms.onrender.com/api/v1/user";

// Create a custom base query with error handling
const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: AUTH_API,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  });
  
  const result = await baseQuery(args, api, extraOptions);
  
  // Handle 401 Unauthorized errors globally
  if (result.error && result.error.status === 401) {
    // Dispatch logout action
    api.dispatch(userLoggedOut());
  }
  
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query:(inputData) => ({
        url:"register",
        method:"POST",
        body:inputData
      })
    }),
    loginUser: builder.mutation({
      query:(inputData) => ({
        url:"login",
        method:"POST",
        body:inputData
      }),
      async onQueryStarted(_, {queryFulfilled,dispatch}) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({user:result.data.user}))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    logoutUser: builder.mutation({
      query:() => ({
        url:"logout",
        method:"GET"
      })  ,async onQueryStarted(_, {queryFulfilled,dispatch}) {
        try {
           dispatch(userLoggedOut())
        } catch (error) {
          console.log(error)
        }
      }
    }),
    loadUser: builder.query({
      query:() => ({
        url:"profile",
        method:"GET",
      }),
      async onQueryStarted(_, {queryFulfilled,dispatch}) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({user:result.data.user}))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    updateUser: builder.mutation({
      query:(formData) => ({
        url:"profile/update",
        method:"PUT"    ,
        body:formData,
        
      })
    })
  })
});

export const {useRegisterUserMutation,useLoginUserMutation,useLoadUserQuery,useUpdateUserMutation,useLogoutUserMutation} = authApi;