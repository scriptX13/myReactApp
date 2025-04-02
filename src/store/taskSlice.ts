import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Task = {
  id: string;
  name: string;
  completed: boolean;
};

type TaskState = {
  tasks: Task[];
  completedCount: number;
  incompleteCount: number;
  loading: boolean; // Add loading state
};

const initialState: TaskState = {
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  completedCount: 0,
  incompleteCount: 0,
  loading: true, // Initialize loading as true
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.completedCount = action.payload.filter((task) => task.completed).length;
      state.incompleteCount = action.payload.filter((task) => !task.completed).length;
      state.loading = false; // Set loading to false after tasks are fetched
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      if (action.payload.completed) {
        state.completedCount++;
      } else {
        state.incompleteCount++;
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        if (task.completed) {
          state.completedCount++;
          state.incompleteCount--;
        } else {
          state.completedCount--;
          state.incompleteCount++;
        }
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskIndex = state.tasks.findIndex((t) => t.id === action.payload);
      if (taskIndex !== -1) {
        const task = state.tasks[taskIndex];
        if (task.completed) {
          state.completedCount--;
        } else {
          state.incompleteCount--;
        }
        state.tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload; // Allow manual control of loading state
    },
  },
});

export const { setTasks, addTask, toggleTaskCompletion, deleteTask, setLoading } = taskSlice.actions;
export default taskSlice.reducer;
