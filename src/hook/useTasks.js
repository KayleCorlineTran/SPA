import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

// Tạo Hook để sử dụng Context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
