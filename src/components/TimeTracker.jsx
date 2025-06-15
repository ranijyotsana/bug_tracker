import { useDispatch, useSelector } from 'react-redux';
import { addTimeLog } from '../redux/timeSlice';
import { useState } from 'react';

export default function TimeTracker() {
  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const { timeLogs } = useSelector((state) => state.time);
  const dispatch = useDispatch();

  const [form, setForm] = useState({ taskId: '', hours: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.taskId || !form.hours) return alert('Fill all fields');
    dispatch(addTimeLog({ ...form, user: user.username, hours: Number(form.hours), date: new Date().toISOString().split('T')[0] }));
    setForm({ taskId: '', hours: '' });
  };

  const userLogs = user.role === 'manager' ? timeLogs : timeLogs.filter(log => log.user === user.username);

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-2">Time Tracker</h3>
      {user.role === 'developer' && (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
          <select name="taskId" value={form.taskId} onChange={handleChange} className="border p-1 rounded">
            <option value="">Select Task</option>
            {tasks.map(task => (
              <option key={task.id} value={task.id}>{task.title}</option>
            ))}
          </select>
          <input
            type="number"
            name="hours"
            placeholder="Hours spent"
            value={form.hours}
            onChange={handleChange}
            className="border p-1 rounded w-24"
          />
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Log Time</button>
        </form>
      )}

      <table className="min-w-full text-sm border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Task</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Hours</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {userLogs.map((log, index) => {
            const task = tasks.find(t => t.id === log.taskId);
            return (
              <tr key={index}>
                <td className="p-2 border">{task?.title || 'Unknown'}</td>
                <td className="p-2 border">{log.user}</td>
                <td className="p-2 border">{log.hours}</td>
                <td className="p-2 border">{log.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
