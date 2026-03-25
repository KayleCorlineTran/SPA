import React from 'react'
import { useTasks } from '../hook/useTasks';

export default function Header() {
    // Lấy dữ liệu và hàm từ Context
    const { tasks} = useTasks();
  
    // Logic tính toán thống kê
    const totalTasks = tasks.length;
    const doneTasks = tasks.filter(t => t.status === 'DONE').length;
    
    // Tính Late: Những task chưa DONE và đã quá hạn so với thời điểm hiện tại
    const lateTasksCount = tasks.filter(t => 
      t.deadline && 
      new Date(t.deadline) < new Date() && 
      t.status !== 'DONE'
    ).length;

  return (
    
       
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Manager</h1>
          <p className="text-gray-500 mb-6">Quản lý công việc cá nhân</p>

          <div className="flex justify-center gap-4 mt-6">
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border-b-4 border-blue-500 w-32">
              <p className="text-xs text-gray-400 font-bold uppercase">Total</p>
              <p className="text-2xl font-black">{totalTasks}</p>
            </div>
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border-b-4 border-green-500 w-32">
              <p className="text-xs text-gray-400 font-bold uppercase">Done</p>
              <p className="text-2xl font-black text-green-600">{doneTasks}</p>
            </div>
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border-b-4 border-red-500 w-32">
              <p className="text-xs text-gray-400 font-bold uppercase">Late</p>
              <p className="text-2xl font-black text-red-600">{lateTasksCount}</p>
            </div>
          </div>
        </header>

  )
}
