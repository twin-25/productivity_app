import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query'
import { userApi } from './services/userApi';
import { taskApi } from './services/TaskApi';
import { tagApi } from './services/TagApi';
import { stickyNoteApi } from './services/StickyNoteApi';
import {calendarEventApi } from './services/CalendarEventApi';
import { chatbotApi } from './services/ChatbotApi';

export const store = configureStore({
  reducer:{
    [userApi.reducerPath] : userApi.reducer,
    [taskApi.reducerPath] : taskApi.reducer,
    [tagApi.reducerPath] : tagApi.reducer,
    [stickyNoteApi.reducerPath] : stickyNoteApi.reducer,
    [calendarEventApi.reducerPath]: calendarEventApi.reducer,
    [chatbotApi.reducerPath]: chatbotApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(taskApi.middleware).concat(tagApi.middleware).concat(stickyNoteApi.middleware).concat(calendarEventApi.middleware).concat(chatbotApi.middleware),

});

setupListeners(store.dispatch);