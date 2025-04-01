import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Replace hardcoded localhost URL with environment variable or direct deployment URL
const COURSE_API = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/v1/course` 
  : "https://trenning-lms.onrender.com/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "",
        method: "POST",
        body: { courseTitle, category },
      }),
    }),
    getCreatroCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    getPublishedCourse:builder.query({
      query:() => ({
        url:"/published-courses",
        method:"GET"
      })
    }),
    getSearchCourse:builder.query({
      query: ({searchQuery, categories, sortByPrice}) => {
        // Build qiery string
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`

        // append cateogry 
        if(categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`; 
        }

        // Append sortByPrice is available
        if(sortByPrice){
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`; 
        }

        return {
          url:queryString,
          method:"GET", 
        }
      }
    }),
    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getCourseLecture: builder.query({
      query:(courseId) => ({
        url:`/${courseId}/lecture`,
        method:"GET"
      })
    }),
    editLecture: builder.mutation({
      query:({courseId,lectureId ,lectureTitle,videoInfo, isPreviewFree}) => ({
        url:`/${courseId}/lecture/${lectureId}`,
        method:"POST",
        body: {lectureTitle,videoInfo, isPreviewFree}
      })
    }),
    removeLecture: builder.mutation({
      query:({lectureId }) => ({
        url:`/lecture/${lectureId}`,
        method:"DELETE"
      })
    }),
    getLectureById: builder.query({
      query:(lectureId ) => ({
        url:`/lecture/${lectureId}`,
        method:"GET"
      })
    }),
    publishCourse: builder.mutation({
      query:({courseId,query}) => ({
        url:`/${courseId}?publish=${query}`,
        method:"PATCH"
      })
    }),
    removeCourse: builder.mutation({
      query:({courseId})=>({
        url:`/${courseId}`,
        method:"DELETE"
      })
    })
  }),
});

export const {
  useCreateCourseMutation,
  useGetPublishedCourseQuery,
  useGetCreatroCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
  useRemoveCourseMutation,
  useGetSearchCourseQuery
} = courseApi;
