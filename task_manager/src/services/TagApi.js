import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tagApi = createApi({
  reducerPath:'TagApi',
   tagTypes: ['Tag'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/',
    prepareHeaders: (headers) =>{
      const token = localStorage.getItem('token')
      if (token){
        headers.set('authorization', `Bearer ${token}`)
      }
      headers.set('content-type', 'application/json')
      return headers
    }
    
  }),
  endpoints: (builder) =>({
    getTags: builder.query({
      query: () =>'tags/',
      providesTags:['Tag']
    }),
    createTag: builder.mutation({
      query: (tagData) =>({
        url: 'tags/create/',
        method: 'POST',
        body: tagData,

      }),
      invalidatesTags:['Tag'],
    }),
    deleteTag: builder.mutation({
      query: (pk) =>({
        url:`tags/${pk}/delete/`,
        method: 'DELETE',

      }),
      invalidatesTags:['Tag'],
    })
    
  })

})

export const {
  useGetTagsQuery,
  useCreateTagMutation,
  useDeleteTagMutation,
} = tagApi
