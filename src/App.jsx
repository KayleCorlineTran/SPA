import React, { useState } from 'react';
import { 
  IoAdd, 
  IoCheckboxSharp, 
  IoTimer, 
  IoPencilSharp, 
  IoCloseSharp, 
  IoCheckmarkDoneSharp, 
  IoTrashOutline 
} from "react-icons/io5";
import { useTasks } from "./hook/useTasks"; 

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  // 1. Lấy dữ liệu và hàm từ Context
  const { tasks, addTask} = useTasks();

  // 2. Logic tính toán thống kê
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === 'DONE').length;
  
  // Tính Late: Những task chưa DONE và đã quá hạn so với thời điểm hiện tại
  const lateTasksCount = tasks.filter(t => 
    t.deadline && 
    new Date(t.deadline) < new Date() && 
    t.status !== 'DONE'
  ).length;

  // 3. Hàm xử lý nghiệp vụ
  const handleCreate = () => {
    if (!title.trim()) return alert("Vui lòng nhập tiêu đề!");
    addTask(title, deadline);
    setTitle('');
    setDeadline('');
    setShowModal(false);
  };

  const getTasksByStatus = (status) => tasks.filter(t => t.status === status);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER & STATS --- */}
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

        {/* --- KANBAN BOARD --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CỘT TODO */}
          <div className="bg-amber-100/50 p-4 rounded-2xl border border-amber-200 min-h-[400px]">
            <h2 className="font-bold text-amber-600 mb-4 flex items-center gap-2 uppercase text-sm tracking-widest">
              <IoPencilSharp /> TODO
            </h2>
            <div className="space-y-3">
              {getTasksByStatus('TODO').map(task => (
                <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-amber-500 group relative">
                  <h3 className="font-bold text-sm">{task.title}</h3>
                  <p className="text-[10px] text-gray-400 mt-1">Hạn: {task.deadline ? new Date(task.deadline).toLocaleString() : '---'}</p>
                  
                  {/* Cảnh báo nếu trễ */}
                  {task.deadline && new Date(task.deadline) < new Date() && (
                    <p className="text-[10px] text-red-600 font-bold italic">Quá hạn!</p>
                  )}

                 
                </div>
              ))}
            </div>
          </div>

          {/* CỘT IN PROGRESS */}
          <div className="bg-blue-100/50 p-4 rounded-2xl border border-blue-100 min-h-[400px]">
            <h2 className="font-bold text-blue-500 mb-4 flex items-center gap-2 uppercase text-sm tracking-widest">
              <IoTimer /> In Progress
            </h2>
            <div className="space-y-3">
              {getTasksByStatus('IN_PROGRESS').map(task => (
                <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-400">
                  <h3 className="font-bold text-sm">{task.title}</h3>
                  
                </div>
              ))}
            </div>
          </div>

          {/* CỘT DONE */}
          <div className="bg-green-100/50 p-4 rounded-2xl border border-green-100 min-h-[400px]">
            <h2 className="font-bold text-green-500 mb-4 flex items-center gap-2 uppercase text-sm tracking-widest">
              <IoCheckboxSharp /> DONE
            </h2>
            <div className="space-y-3">
              {getTasksByStatus('DONE').map(task => (
                <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500 opacity-60">
                  <h3 className="font-bold text-sm line-through">{task.title}</h3>
                  
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- NÚT ADD ITEM --- */}
        <div className="flex justify-center mt-10">
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-all p-3 rounded-xl hover:bg-blue-50"
          >
            <IoAdd className="text-2xl" /> Add an item
          </button>
        </div>

        {/* --- POPUP MODAL --- */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Create New Task</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-black text-2xl transition-colors"><IoCloseSharp /></button>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Task Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g. Fix login bug" 
                    className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 ring-blue-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deadline</label>
                  <input 
                    type="datetime-local" 
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 ring-blue-500/20"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                  <button 
                    onClick={handleCreate}
                    className="flex-1 py-3 bg-[#2da44e] text-white rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-[#2c974b] active:scale-95 transition-all"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}