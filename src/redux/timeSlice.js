// redux/timeSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Initial state contains all time logs
const initialState = {
  timeLogs: []
};

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    // Action to add a new time log
    addTimeLog: (state, action) => {
      state.timeLogs.push(action.payload);
    },
  },
});

// ✅ Export the action so it can be used in components
export const { addTimeLog } = timeSlice.actions;

// ✅ Export the reducer to add to the store
export default timeSlice.reducer;
