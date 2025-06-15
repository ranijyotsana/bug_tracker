import { createSlice } from '@reduxjs/toolkit';

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch {}
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: loadFromStorage().length > 0 ? loadFromStorage() : [
      {
        id: 1,
        title: 'Fix login bug',
        description: 'Login throws error when password is incorrect',
        priority: 'high',
        status: 'open',
        assignee: 'karuna',
        createdAt: '2025-06-13T10:00:00Z',
      },
      {
        id: 2,
        title: 'Update dashboard layout',
        description: 'Align cards and adjust responsiveness',
        priority: 'medium',
        status: 'in-progress',
        assignee: 'karuna',
        createdAt: '2025-06-14T12:00:00Z',
      },
    ],
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      state.items.push(newTask);
      saveToStorage(state.items);
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
      saveToStorage(state.items);
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        saveToStorage(state.items);
      }
    },
  },
});

export const { addTask, deleteTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
