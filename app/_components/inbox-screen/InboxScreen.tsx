
import TaskList from '@/app/_components/task-list/TaskList';
import { AppDispatch, fetchTasks, RootState } from '@/app/_lib/store/store';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';


export default function InboxScreen() {
  const dispatch = useDispatch<AppDispatch>();
  // We're retrieving the error field from our updated store
  const { error } = useSelector((state: RootState) => state.taskbox);
  // The useEffect triggers the data fetching when the component is mounted
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  if (error) {
    return (
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Oh no!</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">Something went wrong</p>
      </div>
    );
  }
  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">Taskbox</h1>
      </nav>
      <TaskList />
    </div>
  );
}

