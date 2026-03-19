import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query'
import { userApi } from './services/userApi';
import { taskApi } from './services/TaskApi';
import { tagApi } from './services/TagApi';
import { stickyNoteApi } from './services/StickyNoteApi';

export const store = configureStore({
  reducer:{
    [userApi.reducerPath] : userApi.reducer,
    [taskApi.reducerPath] : taskApi.reducer,
    [tagApi.reducerPath] : tagApi.reducer,
    [stickyNoteApi.reducerPath] : stickyNoteApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(taskApi.middleware).concat(tagApi.middleware).concat(stickyNoteApi.middleware),

});

setupListeners(store.dispatch);