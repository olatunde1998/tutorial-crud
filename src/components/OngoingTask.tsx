import {
  useDeleteTodoRequest,
  useGetTodosRequest,
  useTodoStatusRequest,
} from "src/services/todos-service/todo.request";
import type { Todo } from "src/types/todo";
import { Trash2 } from "lucide-react";

export default function OngoingTasks() {
  const { data: todosData, isLoading } = useGetTodosRequest();
  const { mutate: toggleTodoStatus } = useTodoStatusRequest();
  const { mutate: deleteTodo } = useDeleteTodoRequest();
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

  const ongoingTasks = todos.filter((t) => !t.isComplete);
  return (
    <>
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center text-white/60 py-8">Loading...</div>
        ) : ongoingTasks.length === 0 ? (
          <div className="text-center text-white/60 py-8">No tasks yet</div>
        ) : (
          ongoingTasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/25 transition-colors"
            >
              <button
                onClick={() => toggleTask(task)}
                className="w-10 h-10 border-2 border-white rounded-lg flex-shrink-0 hover:bg-white/10 transition-colors"
              />
              <span className="flex-1 text-white text-base">{task.title}</span>
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
    </>
  );
}
