
import { IoTrashOutline, IoAdd } from "react-icons/io5";
import { useTasks } from "../hook/useTasks";

export default function TaskList({ status, title, icon, colorClass, onAddClick }) {
  const { tasks, deleteTask, updateTaskStatus } = useTasks();
  
  const filteredTasks = tasks.filter(t => t.status === status);

  return (
    <div className={`${colorClass} p-4 rounded-2xl border min-h-[400px]`}>
      <h2 className="font-bold mb-4 flex items-center gap-2 uppercase text-sm tracking-widest">
        {icon} {title}
        
      </h2>
      
      <div className="space-y-3">
        {filteredTasks.map(task => (
          <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 group relative">
            <h3 className={`font-bold text-sm ${status === 'DONE' ? 'line-through opacity-50' : ''}`}>
              {task.title}
            </h3>
            
            {/*Nút bấm chuyển trạng thái */}
            <div className="flex justify-end gap-2 mt-3">
              {status === 'TODO' && (
               <button onClick={() => updateTaskStatus(task.id, 'IN_PROGRESS')} className="text-blue-500 text-xs font-bold hover:underline">Start</button>
   
              )}
              {status === 'IN_PROGRESS' && (
                <button onClick={() => updateTaskStatus(task.id, 'DONE')} className="text-green-600 text-xs font-bold hover:underline">Finish</button>
              )}
              <button onClick={() => deleteTask(task.id)} className="text-gray-300 hover:text-red-500">
                <IoTrashOutline />
              </button>
            </div>
          </div>
        ))}
      </div>
      {onAddClick && (
          <button 
            onClick={onAddClick}
            className="p-1 mt-2 hover:bg-white/50 rounded-full transition-colors text-lg"
            title="Add task to this column"
          >
            <IoAdd /> 
          </button>
        )}
    </div>
  );
}