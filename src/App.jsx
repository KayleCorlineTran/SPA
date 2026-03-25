import React, { useState } from 'react';
import {  IoTimer, IoPencilSharp,IoSearchOutline, IoCheckboxSharp } from "react-icons/io5";
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Header from './components/Header'; // Nếu bạn muốn tách cả Header ra
import { useTasks } from './hook/useTasks';

export default function App() {
  const [showModal, setShowModal] = useState(false);
const { stats, searchQuery, setSearchQuery, filterStatus, setFilterStatus } = useTasks();

  const tabs = [
    { id: 'ALL', label: 'All', count: stats.total },
    { id: 'TODO', label: 'Todo', count: stats.todo },
    { id: 'IN_PROGRESS', label: 'Doing', count: stats.doing },
    { id: 'DONE', label: 'Done', count: stats.done },
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <Header />
{/* Tìm kiếm và lọc */}
<div className='flex mb-3 gap-4 flex-col md:flex-row items-center justify-between'>
<div className="max-w-md mx-auto relative">
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name..."
          className="w-full pl-6 pr-4 py-3 rounded-2xl border-none bg-white shadow-sm focus:ring-2 ring-blue-500/20 outline-none"
        />
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterStatus === tab.id 
                ? 'bg-green-800 text-white shadow-md scale-105' 
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskList title="TODO" status="TODO" icon={<IoPencilSharp />} colorClass="bg-amber-100/50 border-amber-200 text-amber-600" onAddClick={() => setShowModal(true)} />
          <TaskList title="In Progress" status="IN_PROGRESS" icon={<IoTimer />} colorClass="bg-blue-100/50 border-blue-100 text-blue-500" />
          <TaskList title="DONE" status="DONE" icon={<IoCheckboxSharp />} colorClass="bg-green-100/50 border-green-100 text-green-500" />
        </div>

        {showModal && <TaskForm setShowModal={setShowModal} />}
      </div>
    </div>
  );
}