import { useSelector } from 'react-redux';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useMemo } from 'react';

export default function Graph() {
  const { tasks } = useSelector((state) => state.tasks);

  const chartData = useMemo(() => {
    const countMap = {};
    tasks.forEach((task) => {
      const date = task.createdAt?.split('T')[0]; // format: YYYY-MM-DD
      if (date) {
        countMap[date] = (countMap[date] || 0) + 1;
      }
    });
    return Object.entries(countMap).map(([date, count]) => ({ date, count }));
  }, [tasks]);

  if (!chartData.length) return <p>No task trend data available.</p>;

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
