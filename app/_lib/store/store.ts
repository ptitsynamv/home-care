import { TaskData } from '@/app/_lib/interfaces/task';
import { configureStore, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';

export type TaskLoadingStatus = 'idle' | 'loading' | 'failed' | 'succeeded';
interface Store {
  tasks: TaskData[];
  status: TaskLoadingStatus;
  error: string | null;
  pinTask: (id: string) => void;
  archiveTask: (id: string) => void;
}

export const useTaskStore = create<Store>()((set) => ({
  tasks: [],
  status: 'idle',
  error: null,
  pinTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, state: 'TASK_PINNED' } : task)),
    })),
  archiveTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, state: 'TASK_ARCHIVED' } : task,
      ),
    })),
}));

export function useTasks() {
  return useQuery<TaskData[]>({
    queryKey: ['tasks'],
    queryFn: async (): Promise<TaskData[]> => {
      useTaskStore.setState({ tasks: [], status: 'loading', error: null });

      const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1');
      if (!response.ok) {
        useTaskStore.setState({ tasks: [], error: 'Failed to fetch data', status: 'failed' });
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();

      const result = data.map((task: { id: number; title: string; completed: boolean }) => ({
        id: `${task.id}`,
        title: task.title,
        state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
      }));
      useTaskStore.setState({ tasks: result, status: 'succeeded', error: null });
      return result;
    },
  });
}

interface TaskBoxState {
  tasks: TaskData[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

const TaskBoxData: TaskBoxState = {
  tasks: [],
  status: 'idle',
  error: null,
};

export const fetchTasks = createAsyncThunk('taskbox/fetchTasks', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1');
  const data = await response.json();
  const result = data.map((task: { id: number; title: string; completed: boolean }) => ({
    id: `${task.id}`,
    title: task.title,
    state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
  }));
  return result;
});

const TasksSlice = createSlice({
  name: 'taskbox',
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (
      state,
      action: PayloadAction<{ id: string; newTaskState: TaskData['state'] }>,
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.state = action.payload.newTaskState;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        // Add any fetched tasks to the array
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Something went wrong';
        state.tasks = [];
      });
  },
});
const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
