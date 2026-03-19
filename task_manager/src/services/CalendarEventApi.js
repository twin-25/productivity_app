import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const calendarEventApi = createApi({
  reducerPath: 'calendarEventApi',
  tagTypes: ['Event'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/',
    prepareHeaders:(headers) =>{
      const token = localStorage.getItem('token')
      if(token){
      headers.set('authorization', `Bearer ${token}`)
      }
      headers.set('content-type', 'application/json')
      return headers
    }
  }),
  endpoints: (builder) =>({
    getEvent: builder.query({
      query: () => 'calendarEvents/',
      providesTags: ['Event'],
    }),
    createEvent: builder.mutation({
      query: (eventData) =>({
        url: 'calendarEvents/create/',
        body:  eventData,
        method: 'POST',
      }),
      invalidatesTags: ['Event'],
    }),
    updateEvent: builder.mutation({
      query: ({pk, ...noteData}) =>({
        url: `calendarEvents/${pk}/update/`,
        body:  noteData,
        method: 'PUT',
      }),
      invalidatesTags: ['Event'],
    }),
    deleteEvent: builder.mutation({
      query: (pk) =>({
        url: `calendarEvents/${pk}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),
  }),
     
})

export const {
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation
} = calendarEventApi