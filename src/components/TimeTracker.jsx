import { useSelector } from 'react-redux';
import TaskForm from '../components/TaskForm';
import TaskTable from '../components/TaskTable';
import Graph from '../components/Graph';
import TimeTracker from '../components/TimeTracker';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user.username} ({user.role})
      </h1>

      {user.role === 'developer' && <TaskForm />}

      <TaskTable />

      {/* 📊 Show Graph only for Manager */}
      {user.role === 'manager' && <Graph />}

      {/* ⏱️ Time tracker for both */}
      <TimeTracker />
    </div>
  );
}
