import React, { useState } from 'react';
import { IoAdd,IoCheckboxSharp, IoTimer, IoPencilSharp,IoCloseSharp,IoCheckmarkDoneSharp } from "react-icons/io5";

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Tiêu đề & Thống kê */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex justify-center items-center gap-2">
            Task Manager 
          </h1>
          <p className="text-gray-500 mb-6">Quản lý công việc cá nhân</p>

          <div className="flex justify-center gap-4">
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border-b-4 border-blue-500 w-32">
              <p className="text-xs text-gray-400 font-bold uppercase">Total</p>
              <p className="text-2xl font-black">3</p>
            </div>
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border-b-4 border-green-500 w-32">
              <p className="text-xs text-gray-400 font-bold uppercase">Done</p>
              <p className="text-2xl font-black text-green-600">1</p>
            </div>
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border-b-4 border-red-500 w-32">
              <p className="text-xs text-gray-400 font-bold uppercase">Late</p>
              <p className="text-2xl font-black text-red-600">1</p>
            </div>
          </div>
        </header>

       
        {/* Bảng hàng ngang (3 Cột) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Cột 1 */}
          <div className="bg-amber-100/50 p-4 rounded-2xl border border-amber-200">
            <h2 className="font-bold text-amber-600 mb-4 flex items-center gap-2 uppercase text-sm tracking-widest">
              <IoPencilSharp /> TODO
            </h2>
            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-amber-500">
              <h3 className="font-bold text-sm">Học React Context</h3>
              <p className="text-[10px] text-gray-400 mt-1">Hạn: 26/03/2026</p>
            </div>

             <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-amber-500">
              <h3 className="font-bold text-sm">Học React Context</h3>
              <p className="text-[10px] text-gray-400 mt-1">Hạn: 26/03/2026</p>
            </div>
          </div>

          {/* Cột 2 */}
          <div className="bg-blue-100/50 p-4 rounded-2xl border border-blue-100">
            <h2 className="font-bold text-blue-500 mb-4 flex items-center gap-2 uppercase text-sm tracking-widest">
             <IoTimer /> In Progress
            </h2>
            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-400">
              <h3 className="font-bold text-sm text-gray-800">Làm UI Kanban</h3>
              <p className="text-[10px] text-gray-400 mt-1">Hạn: 26/03/2026</p>
              <p className="text-[10px] text-amber-600 mt-1 font-bold italic underline">Sắp tới hạn!</p>
            </div>
          </div>

          {/* Cột 3 */}
          <div className="bg-green-100/50 p-4 rounded-2xl border border-green-100">
            <h2 className="font-bold text-green-500 mb-4 flex items-center gap-2 uppercase text-sm tracking-widest">
              <IoCheckboxSharp /> DONE
            </h2>
            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500 opacity-60">
              <h3 className="font-bold text-sm line-through">Cấu hình Vite</h3>
              <p className="flex items-center gap-1 text-[9px] text-green-600 mt-1 font-bold">Done <IoCheckmarkDoneSharp /></p>
            </div>
          </div>

       {/* 3. Thêm task*/}
        <div className=" flex ">
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-semibold transition-colors group"
          >
            <IoAdd />
            Add an item
          </button>
        </div>

        {/* 4. POPUP (MODAL) */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl border border-gray-200 animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Create New Task</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-black text-xl"><IoCloseSharp /></button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                  <input 
                    type="text" 
                    placeholder="E.g. Fix login bug" 
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 ring-blue-100 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Deadline</label>
                  <input 
                    type="datetime-local" 
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 ring-blue-100"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <button 
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md font-semibold text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    className="flex-1 px-4 py-2 bg-[#2da44e] text-white rounded-md font-semibold text-sm hover:bg-[#2c974b] shadow-sm"
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
    </div>
  );
}

export default App;