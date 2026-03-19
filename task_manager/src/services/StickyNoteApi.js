import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const stickyNoteApi = createApi({
  reducerPath: 'StickyNoteApi',
  tagTypes: ['Notes'],
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
    getNotes: builder.query({
      query: () => 'stickyNotes/',
      providesTags: ['Notes'],
    }),
    createNote: builder.mutation({
      query: (noteData) =>({
        url: 'stickyNotes/create/',
        body:  noteData,
        method: 'POST',
      }),
      invalidatesTags: ['Notes'],
    }),
    updateNote: builder.mutation({
      query: ({pk, ...noteData}) =>({
        url: `stickyNotes/${pk}/update/`,
        body:  noteData,
        method: 'PUT',
      }),
      invalidatesTags: ['Notes'],
    }),
    deleteNote: builder.mutation({
      query: (pk) =>({
        url: `stickyNotes/${pk}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notes'],
    }),
  }),
     
})

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation
} = stickyNoteApi