import React from 'react'
import { useTasks } from '../hook/useTasks';
import { StatCard } from './Stat/StatCard';
export default function Header() {
    const { stats } = useTasks();

  return (
    <header className="text-center mb-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Manager</h1>
      <div className="flex justify-center gap-4 mt-6">
        <StatCard label="Total" value={stats.total} color="blue" />
        <StatCard label="Done" value={stats.done} color="green" />
        <StatCard label="Late" value={stats.late} color="red" />
      </div>
    </header>
  );
}
