import { useCreateTodoRequest } from "src/services/todos-service/todo.request";
import CompletedTasks from "./CompletedTasks";
import OngoingTasks from "./OngoingTask";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function TodoApp() {
  const [newTask, setNewTask] = useState<string>("");
  const { mutate: createTodo } = useCreateTodoRequest();

  // Create Todo handler
  const addTask = () => {
    if (!newTask.trim()) return;
    createTodo({
      title: newTask,
      description: "Some description about todo which is optional",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('src/assets/rocket-image.png')] bg-repeat bg-center bg-blend-multiply bg-cover">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {/* <======= Left Panel - Ongoing Tasks =========> */}
        <div className="backdrop-blur-lg bg-white/15 rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-1">
              To Do App
            </h1>
            <p className="text-center text-gray-800 text-base">ongoing task</p>
          </div>
          {/* <======= Input Field ======> */}
          <div className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Type Your Text In Here"
                className="flex-1 px-4 py-3 bg-white/90 text-gray-900 placeholder-gray-500 outline-none border-none rounded-l-xl"
              />
              <button
                onClick={addTask}
                className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 rounded-r-xl transition-colors"
              >
                <Plus size={28} strokeWidth={2.5} />
              </button>
            </div>
          </div>
          <hr className="border-white/30 mb-6" />
          {/* <======= Ongoing Tasks ======> */}
          <OngoingTasks />
        </div>

        {/* <======== Right Panel - Completed Tasks =======> */}
        <CompletedTasks />
      </div>
    </div>
  );
}
