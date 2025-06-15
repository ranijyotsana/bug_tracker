import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice';
import timeReducer from './timeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    time: timeReducer,
  },
});

export default store;
