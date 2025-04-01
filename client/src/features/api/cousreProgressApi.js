
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../authSlice";

const COURSE_PROGRESS_API = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/v1/progress` 
  : "https://trenning-lms.onrender.com/api/v1/progress";

// Create a custom base query with error handling
const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: COURSE_PROGRESS_API,
    credentials: "include",
  });
  
  const result = await baseQuery(args, api, extraOptions);
  
  // Handle 401 Unauthorized errors
  if (result.error && result.error.status === 401) {
    // Dispatch logout action
    api.dispatch(userLoggedOut());
    return { error: { status: 401, data: { message: "Please login to continue" } } };
  }
  
  return result;
};

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}/view`,
        method:"POST"
      }),
    }),

    completeCourse: builder.mutation({
        query:(courseId) => ({
            url:`/${courseId}/complete`,
            method:"POST"
        })
    }),
    inCompleteCourse: builder.mutation({
        query:(courseId) => ({
            url:`/${courseId}/incomplete`,
            method:"POST"
        })
    }),
    
  }),
});
export const {
useGetCourseProgressQuery,
useUpdateLectureProgressMutation,
useCompleteCourseMutation,
useInCompleteCourseMutation
} = courseProgressApi;
