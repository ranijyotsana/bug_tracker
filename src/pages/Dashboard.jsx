import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskTable from '../components/TaskTable';
import TimeTracker from '../components/TimeTracker';
import Graph from '../components/Graph';

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="dashboard">
      <Navbar />

      <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>
        Welcome, {user?.username} ({user?.role})
      </h2>

      <div className="main-content" style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
        <div>
          {/* Both roles see TaskForm */}
          <TaskForm />

          {/* Only Developers see TimeTracker */}
          {user?.role === 'Developer' && <TimeTracker />}
        </div>

        <div>
          {/* Everyone sees task table */}
          <TaskTable />

          {/* Only Managers see Graph */}
          {user?.role === 'Manager' && <Graph />}
        </div>
      </div>
    </div>
  );
}
