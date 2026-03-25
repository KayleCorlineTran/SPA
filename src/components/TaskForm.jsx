import React, { useState} from 'react';
import { useTasks } from "../hook/useTasks";

export default function TaskForm({ setShowModal, taskToEdit }) {
// Khởi tạo giá trị ban đầu dựa trên taskToEdit
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
  const [deadline, setDeadline] = useState(taskToEdit ? taskToEdit.deadline : '');
  const { addTask, updateTask } = useTasks();

    const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Vui lòng nhập tiêu đề!");

    if (taskToEdit) {
      updateTask(taskToEdit.id, { title, deadline });
    } else {
      addTask(title, deadline);
    }
    
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-bold mb-6">
          {taskToEdit ? "Edit Task" : "New Project Item"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase">Title</label>
            <input 
              type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 ring-blue-500/20"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase">Deadline</label>
            <input 
              type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)}
              className="w-full mt-1 p-3 bg-gray-50 rounded-xl outline-none"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-gray-500 font-bold">Cancel</button>
            <button type="submit" className={`flex-1 py-3 text-white rounded-xl font-bold ${taskToEdit ? 'bg-blue-600' : 'bg-[#2da44e]'}`}>
              {taskToEdit ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}