import React, { useState, useEffect } from 'react';
import { TaskContext } from "./TaskContext";
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    // Kiểm tra xem trong kho đã có dữ liệu chưa
    const saved = localStorage.getItem('my_kanban_tasks');
    
    // Nếu có, biến chuỗi thành mảng. Nếu không, trả về mảng rỗng []
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Lỗi đọc dữ liệu từ LocalStorage:", error);
        return [];
      }
    }
    return [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL', 'TODO', 'IN_PROGRESS', 'DONE'
const filteredTasks = tasks.filter(task => {
  const matchSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
  const matchStatus = filterStatus === 'ALL' || task.status === filterStatus;
  return matchSearch && matchStatus;
});
  // Lưu dữ liệu mỗi khi tasks có sự thay đổi
  useEffect(() => {
    localStorage.setItem('my_kanban_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Hàm thêm task
  const addTask = (title, deadline) => {
    const newTask = {
      id: Date.now(), // Dùng timestamp làm ID duy nhất
      title,
      deadline,
      status: 'TODO',
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };
// Thêm vào trong TaskProvider
const updateTask = (id, updatedData) => {
  setTasks(tasks.map(t => 
    t.id === id ? { ...t, ...updatedData } : t
  ));
};
  // Hàm xóa task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Hàm cập nhật trạng thái (TODO -> IN_PROGRESS -> DONE)
  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  // Thống kê (Stats)
  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'DONE').length,
    todo: tasks.filter(t => t.status === 'TODO').length,
    doing: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    late: tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'DONE').length
  };

  return (
    <TaskContext.Provider value={{ 
    tasks: filteredTasks, 
    searchQuery, 
    setSearchQuery, 
    filterStatus, 
    setFilterStatus, // Trả về hàm này để Header sử dụng
    addTask, 
    updateTask,
    deleteTask, 
    updateTaskStatus, 
    stats 
  }}>
    {children}
  </TaskContext.Provider>
)};