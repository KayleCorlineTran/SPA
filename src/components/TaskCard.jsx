import { IoTrashOutline, IoTimeOutline, IoAlertCircleOutline } from "react-icons/io5";
import { useTasks } from "../hook/useTasks";

export default function TaskCard({ task }) {
  const { deleteTask, updateTaskStatus } = useTasks();
  
  if (!task.deadline) return null; // Hoặc xử lý nếu không có deadline

  const now = new Date();
  const deadline = new Date(task.deadline);
  
  // 1. Tính khoảng cách thời gian (miliseconds)
  const diffInMs = deadline - now;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  // 2. Định nghĩa các trạng thái
  const isOverdue = diffInMs < 0 && task.status !== 'DONE'; // Đã quá hạn
  const isUpcoming = diffInMinutes <= 60 && diffInMinutes > 0 && task.status !== 'DONE'; // Sắp hết hạn (trong vòng 60p)

  return (
    <div className={`bg-white p-4 rounded-xl shadow-sm border-l-4 transition-all duration-300 group ${
      isOverdue ? 'border-red-500 bg-red-50' : 
      isUpcoming ? 'border-amber-500 bg-amber-50 animate-pulse' : 
      'border-blue-400'
    }`}>
      <h3 className={`font-bold text-sm ${task.status === 'DONE' ? 'line-through opacity-50 text-gray-400' : 'text-gray-800'}`}>
        {task.title}
      </h3>
      
      <div className="mt-2 space-y-1">
        <p className={`text-[10px] flex items-center gap-1 font-medium ${
          isOverdue ? 'text-red-600' : 
          isUpcoming ? 'text-amber-600' : 
          'text-gray-400'
        }`}>
          <IoTimeOutline /> {deadline.toLocaleString('vi-VN')}
        </p>

        {/* Hiển thị cảnh báo 1 tiếng */}
        {isUpcoming && (
          <p className="text-[10px] text-red-600 font-bold flex items-center gap-1">
            <IoAlertCircleOutline className="animate-bounce" /> 
            Upcoming ( {diffInMinutes} minutes left!)
          </p>
        )}

        {/* Hiển thị cảnh báo quá hạn */}
        {isOverdue && (
          <p className="text-[10px] text-red-600 font-black uppercase tracking-tighter">
            Overdue!
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        {task.status === 'TODO' && (
          <button onClick={() => updateTaskStatus(task.id, 'IN_PROGRESS')} className="text-blue-500 text-xs font-bold hover:bg-blue-100 px-2 py-1 rounded">Start</button>
        )}
        {task.status === 'IN_PROGRESS' && (
          <button onClick={() => updateTaskStatus(task.id, 'DONE')} className="text-green-600 text-xs font-bold hover:bg-green-100 px-2 py-1 rounded">Finish</button>
        )}
        <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-red-500 p-1">
          <IoTrashOutline size={16} />
        </button>
      </div>
    </div>
  );
}