import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1/course";

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
  useGetCreatroCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
  useRemoveCourseMutation
} = courseApi;
