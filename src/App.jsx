import React, { useState } from 'react';
import {  IoTimer, IoPencilSharp, IoCheckboxSharp } from "react-icons/io5";
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Header from './components/Header'; // Nếu bạn muốn tách cả Header ra

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <Header />

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