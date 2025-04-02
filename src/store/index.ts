import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import taskReducer from './taskSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    tasks: taskReducer, // Add the task reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
