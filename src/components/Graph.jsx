import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import dayjs from 'dayjs';

export default function Graph() {
  const tasks = useSelector((state) => state.tasks.items);

  // Group tasks by date
  const taskCountByDate = tasks.reduce((acc, task) => {
    const date = dayjs(task.createdAt).format('YYYY-MM-DD');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(taskCountByDate).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div className="my-6 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">📊 Task Trend (Created Per Day)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
