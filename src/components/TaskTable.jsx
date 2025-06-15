import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../redux/taskSlice';

export default function TaskTable() {
  const tasks = useSelector((state) => state.tasks.items);
  const dispatch = useDispatch();

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (task) => {
    setEditId(task.id);
    setEditData(task);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateTask(editData));
    setEditId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="overflow-x-auto mt-6">
      <div className="flex flex-col md:flex-row gap-2 mb-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search by title or assignee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <table className="table-auto w-full border text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Assignee</th>
            <th className="p-2">Priority</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id} className="border-t">
              {editId === task.id ? (
                <>
                  <td className="p-2">
                    <input
                      name="title"
                      value={editData.title}
                      onChange={handleChange}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      name="assignee"
                      value={editData.assignee}
                      onChange={handleChange}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="p-2">
                    <select
                      name="priority"
                      value={editData.priority}
                      onChange={handleChange}
                      className="border p-1 w-full"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <select
                      name="status"
                      value={editData.status}
                      onChange={handleChange}
                      className="border p-1 w-full"
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2">{task.title}</td>
                  <td className="p-2">{task.assignee}</td>
                  <td className="p-2"><span
    className={`px-2 py-1 rounded text-white text-xs ${
      task.priority === 'high'
        ? 'bg-red-600'
        : task.priority === 'medium'
        ? 'bg-yellow-500'
        : 'bg-green-600'
    }`}
  >
    {task.priority}
  </span>
</td>
                  <td className="p-2"><span
    className={`px-2 py-1 rounded text-white text-xs ${
      task.status === 'open'
        ? 'bg-blue-500'
        : task.status === 'in-progress'
        ? 'bg-purple-500'
        : 'bg-gray-600'
    }`}
  >
    {task.status}
  </span>
</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEditClick(task)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteTask(task.id))}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}