import { useState } from "react";
import { TaskContext } from "./TaskContext";
// Tạo Provider để bao bọc ứng dụng
export const TaskProvider = ({ children }) => {
  // Khởi tạo danh sách task trống 
  const [tasks, setTasks] = useState([]);
const stats = {
  total: tasks.length,
  todo: tasks.filter(t => t.status === 'TODO').length,
  doing: tasks.filter(t => t.status === 'IN_PROGRESS').length,
  done: tasks.filter(t => t.status === 'DONE').length,
  late: tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'DONE').length
};
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
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTaskStatus, stats }}>
      {children}
    </TaskContext.Provider>
  );
};

