import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath:'TaskApi',
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
      query:() =>'tasks/'
    }),
    getTodaysTasks:builder.query({
      query: () =>'tasks/today/'
    }),
    getTomorrowsTasks:builder.query({
      query: () =>'tasks/tomorrow/'
    }),
    getUpcommingTasks:builder.query({
      query: () =>'tasks/thisweek/'
    }),
  }),

  }
)

export const{
  useGetTasksQuery,
  useGetTodaysTasksQuery,
  useGetTomorrowsTasksQuery,
  useGetUpcommingTasksQuery,

} = taskApi