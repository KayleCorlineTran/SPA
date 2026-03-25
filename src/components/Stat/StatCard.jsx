export const StatCard = ({ label, value, color }) => (
  <div className={`bg-white px-6 py-4 rounded-xl shadow-sm border-b-4 border-${color}-500 w-32`}>
    <p className="text-xs text-gray-400 font-bold uppercase">{label}</p>
    <p className={`text-2xl font-black ${color === 'green' ? 'text-green-600' : color === 'red' ? 'text-red-600' : ''}`}>{value}</p>
  </div>
);