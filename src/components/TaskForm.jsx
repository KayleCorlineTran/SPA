import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { useTasks } from "../hook/useTasks"; 

export default function TaskForm({ setShowModal }) {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const { addTask } = useTasks();

  const handleCreate = (e) => {
    e.preventDefault(); // Chặn load lại trang
    if (!title.trim()) return alert("Vui lòng nhập tiêu đề!");
    
    addTask(title, deadline);
    setTitle('');
    setDeadline('');
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Create New Task</h2>
          <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-black text-2xl">
            <IoCloseSharp />
          </button>
        </div>
        
        <form onSubmit={handleCreate} className="space-y-5">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Task Title</label>
            <input 
              autoFocus
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Fix login bug" 
              className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 ring-blue-500/20"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deadline</label>
            <input 
              type="datetime-local" 
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl outline-none"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl">
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 bg-[#2da44e] text-white rounded-xl font-bold shadow-lg hover:bg-[#2c974b]"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}