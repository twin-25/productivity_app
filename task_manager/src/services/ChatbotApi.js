import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatbotApi = createApi({
  reducerPath:'ChatbotApi',
  tagTypes:['ChatMessages'],
  baseQuery: fetchBaseQuery({
      baseUrl: 'http://127.0.0.1:8000/api/',
      prepareHeaders : (headers) =>{
        const token = localStorage.getItem('token')
        headers.set('authorization', `Bearer ${token}`)
        headers.set('content-type', 'application/json')
      },
  }),
  endpoints:(builder) =>({
    sendMessage: builder.mutation({
      query: (data) =>({
      url: 'api/chatbot/',
      method:'POST',
      body: data
      }),
    }),
  }),
})

export const {
  useSendMessagesMutation
} = chatbotApi
