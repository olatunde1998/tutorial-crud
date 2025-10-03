import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  time: string;
  date: string;
}

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addTask = (): void => {
    if (newTask.trim()) {
      const now = new Date();
      const time = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = now
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .join(".");

      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
          time,
          date,
        },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const ongoingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

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

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('src/assets/rocket-image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {/* Left Panel - Ongoing Tasks */}
        <div className="backdrop-blur-lg bg-white/15 rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-1">
              To Do App
            </h1>
            <p className="text-center text-gray-800 text-base">ongoing task</p>
          </div>

          {/* Input Area */}
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

          {/* Ongoing Tasks */}
          <div className="space-y-4">
            {ongoingTasks.length === 0 ? (
              <div className="text-center text-white/60 py-8">No tasks yet</div>
            ) : (
              ongoingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/25 transition-colors"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="w-10 h-10 border-2 border-white rounded-lg flex-shrink-0 hover:bg-white/10 transition-colors"
                  />
                  <span className="flex-1 text-white text-base">
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="w-10 h-10 bg-black/60 hover:bg-black/80 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  >
                    <Trash2 size={18} className="text-white" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel - Completed Tasks */}
        <div className="backdrop-blur-lg bg-white/15 rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-1">
              To Do App
            </h1>
            <p className="text-center text-gray-800 text-base">
              completed task
            </p>
          </div>

          {/* Time and Date */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-5xl md:text-6xl font-bold text-gray-900">
              {time}
            </div>
            <div className="text-3xl md:text-4xl font-bold text-gray-900">
              {date}
            </div>
          </div>

          <hr className="border-white/30 mb-6" />

          {/* Completed Tasks */}
          <div className="space-y-4">
            {completedTasks.length === 0 ? (
              <div className="text-center text-white/60 py-8">
                No completed tasks
              </div>
            ) : (
              completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/25 transition-colors"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
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
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="w-10 h-10 bg-black/60 hover:bg-black/80 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  >
                    <Trash2 size={18} className="text-white" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
