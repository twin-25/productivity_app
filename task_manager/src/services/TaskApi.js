import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath:'TaskApi',
  tagTypes: ['Task'],
  baseQuery:fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
    prepareHeaders: (headers) =>{
      const token = localStorage.getItem('token')
      if(token){
        headers.set('authorization', `Bearer ${token}`)
      }
      headers.set('content-Type', 'application/json')
      return headers
    },
  }),
  endpoints: (builder) =>({
    getTasks: builder.query({
      query:() =>'tasks/',
      providesTags: ['Task']
    }),
    getTodaysTasks:builder.query({
      query: () =>'tasks/today/',
      providesTags: ['Task']
    }),
    getTomorrowsTasks:builder.query({
      query: () =>'tasks/tomorrow/',
      providesTags: ['Task']
    }),
    getUpcommingTasks:builder.query({
      query: () =>'tasks/thisweek/',
      providesTags: ['Task']
    }),
    getTask: builder.query ({
      query: (pk) => `tasks/${pk}/`,
      providesTags: ['Task']
    }),
    createTask: builder.mutation({
      query:(taskData) =>({
        url: `tasks/create/`,
        method: 'POST',
        body: taskData,
      }) ,
      invalidatesTags:['Task'],
    }),
    updateTask : builder.mutation({
      query: ({pk, ...taskData}) =>({
        url: `tasks/${pk}/update/`,
        method: 'PUT',
        body: taskData,
      }),
      invalidatesTags: ['Task']
    }),
    deleteTask : builder.mutation({
      query: (pk) =>({
        url: `tasks/${pk}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task']
    }),
  }),

  }
)

export const{
  useGetTasksQuery,
  useGetTodaysTasksQuery,
  useGetTomorrowsTasksQuery,
  useGetUpcommingTasksQuery,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,

} = taskApi