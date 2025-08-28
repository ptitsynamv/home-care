"use client";

import Task from "@/app/_components/task/Task";

export default function TaskPage() {
  const onArchiveTask = (id: string) => { console.log('Archive ' + id) };
  const onPinTask = (id: string) => { console.log('Pin ' + id) };

  return (
    <>
      <div className="m-2">
        <Task task={{ id: "1", title: "First", state: "TASK_ARCHIVED" }} onArchiveTask={(e) => onArchiveTask(e)} onPinTask={(e) => onPinTask(e)} />
      </div>
      <div className="m-2">
        <Task task={{ id: "2", title: "Second", state: "TASK_INBOX" }} onArchiveTask={(e) => onArchiveTask(e)} onPinTask={(e) => onPinTask(e)} />
      </div>
      <div className="m-2">
        <Task task={{ id: "3", title: "Third", state: "TASK_PINNED" }} onArchiveTask={(e) => onArchiveTask(e)} onPinTask={(e) => onPinTask(e)} />
      </div>
    </>
  );
}
