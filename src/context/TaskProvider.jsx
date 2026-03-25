import { useState } from "react";
import { TaskContext } from "./TaskContext";
// Tạo Provider để bao bọc ứng dụng
export const TaskProvider = ({ children }) => {
  // Khởi tạo danh sách task trống 
  const [tasks, setTasks] = useState([
    { id: 1, title: "Học React Context", deadline: "2026-03-26T10:00", status: "TODO" },
    { id: 2, title: "Làm UI Kanban", deadline: "2026-03-25T15:00", status: "IN_PROGRESS" }
  ]);

  // Hàm thêm công việc mới
  const addTask = (title, deadline) => {
    const newTask = {
      id: Date.now(), // Tạo ID duy nhất bằng timestamp
      title,
      deadline,
      status: 'TODO'
    };
    setTasks([...tasks, newTask]);
  };

 // Hàm xóa task
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Hàm cập nhật trạng thái (Chuyển cột)
  const updateTaskStatus = (id, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };
  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

