import {
  useDeleteTodoRequest,
  useGetTodosRequest,
  useTodoStatusRequest,
} from "src/services/todos-service/todo.request";
import { useEffect, useState } from "react";
import type { Todo } from "src/types/todo";
import { Trash2 } from "lucide-react";

export default function CompletedTasks() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const { mutate: toggleTodoStatus } = useTodoStatusRequest();
  const { mutate: deleteTodo } = useDeleteTodoRequest();
  const { data: todosData } = useGetTodosRequest();
  // const { mutate: updateTodo } = useUpdateTodoRequest();

  const todos: Todo[] = todosData?.data || [];

  // Update Todo Status handler
  const toggleTask = (todo: Todo) => {
    toggleTodoStatus({ todoId: todo._id });
  };

  // Delete Todo handler
  const handleDelete = (id: string) => {
    deleteTodo({ todoId: id });
  };
  const completedTasks = todos.filter((t) => t.isComplete);

  const time = currentTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = currentTime
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/")
    .join(".");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <div className="backdrop-blur-lg bg-white/15 rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-1">
            To Do App
          </h1>
          <p className="text-center text-gray-800 text-base">completed task</p>
        </div>

        {/* <====== Time and Date =====> */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-5xl md:text-6xl font-bold text-gray-900">
            {time}
          </div>
          <div className="text-3xl md:text-4xl font-bold text-gray-900">
            {date}
          </div>
        </div>
        <hr className="border-white/30 mb-6" />
        {/* <====== Completed Tasks ======> */}
        <div className="space-y-4">
          {completedTasks.length === 0 ? (
            <div className="text-center text-white/60 py-8">
              No completed tasks
            </div>
          ) : (
            completedTasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/25 transition-colors"
              >
                <button
                  onClick={() => toggleTask(task)}
                  className="w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-white transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <span className="flex-1 text-white text-base">
                  {task.title}
                </span>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="w-10 h-10 bg-black/60 hover:bg-black/80 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                >
                  <Trash2 size={18} className="text-white" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
