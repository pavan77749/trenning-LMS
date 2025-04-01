import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use environment variable with fallback to production URL
const PROGRESS_API = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/v1/progress` 
  : "https://trenning-lms.onrender.com/api/v1/progress";

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PROGRESS_API,
    credentials: "include",
  }),
  // Rest of your course progress API code
});