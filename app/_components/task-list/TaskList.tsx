import Task from "@/app/_components/task/Task";
import { useTaskStore } from "@/app/_lib/store/store";

export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const status = useTaskStore((state) => state.status);

  const pinTask = (id: string) => {
    useTaskStore.getState().pinTask(id);
  };
  const archiveTask = (id: string) => {
    useTaskStore.getState().archiveTask(id);
  };

  const LoadingRow = (
    <div role="status" className="space-y-2.5 animate-pulse max-w-lg m-4">
      <div className="flex items-center w-full m-4">
        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-6"></div>
        <div className="h-6 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-30"></div>
        <div className="h-6 ms-20 bg-gray-300 rounded-full dark:bg-gray-600 w-6"></div>
      </div>
    </div>
  );
  if (status === "loading") {
    return (
      <div data-testid="loading" key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div key={"empty"} data-testid="empty">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">You have no tasks</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">Sit back and relax</p>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ].filter(
    (t) => t.state === "TASK_INBOX" || t.state === 'TASK_PINNED'
  );

  return (
    <div>
      {tasksInOrder.map((task) => (
        <div key={task.id} className="m-2">
          <Task
            key={task.id}
            task={task}
            onPinTask={pinTask}
            onArchiveTask={archiveTask}
          />
        </div>
      ))}
    </div>
  );
}
