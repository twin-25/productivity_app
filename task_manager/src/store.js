import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query'
import { userApi } from './services/userApi';
import { taskApi } from './services/TaskApi';

export const store = configureStore({
  reducer:{
    [userApi.reducerPath] : userApi.reducer,
    [taskApi.reducerPath] : taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(taskApi.middleware),

});

setupListeners(store.dispatch);