
import { IoTrashOutline, IoAdd } from "react-icons/io5";
import { useTasks } from "../hook/useTasks";
import TaskCard from "./TaskCard";
export default function TaskList({ status, title, icon, colorClass, onAddClick }) {
  const { tasks } = useTasks();
  
  const filteredTasks = tasks.filter(t => t.status === status);

  return (
    <div className={`${colorClass} p-4 rounded-2xl border min-h-[400px]`}>
      <h2 className="font-bold mb-4 flex items-center gap-2 uppercase text-sm tracking-widest">
        {icon} {title}
        
      </h2>
      
      <div className="space-y-3">
       
  {filteredTasks.map(task => (
    <TaskCard key={task.id} task={task} />
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