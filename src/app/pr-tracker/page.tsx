'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PR {
  id: number;
  exercise: string;
  weight: number;
  date: string;
}

export default function PRTrackerPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [prs, setPrs] = useState<PR[]>([]);
  const [newPR, setNewPR] = useState<PR>({
    id: 0,
    exercise: 'squat',
    weight: 0,
    date: new Date().toISOString().split('T')[0] || '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const user = JSON.parse(userData);
    setUser(user);

    const fetchPRs = async () => {
      try {
        const res = await fetch(`/api/prs?userId=${user.id}`);
        if (!res.ok) throw new Error('Failed to fetch PRs');
        const data = await res.json();
        setPrs(data);
      } catch (error) {
        console.error('Error fetching PRs:', error);
      }
    };

    fetchPRs();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/prs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          ...newPR
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to save PR');
      }

      const updatedRes = await fetch(`/api/prs?userId=${user.id}`);
      const updatedPRs = await updatedRes.json();
      setPrs(updatedPRs);

      setNewPR({
        ...newPR,
        weight: 0
      });

    } catch (error) {
      console.error('Error saving PR:', error);
    }
  };

  const handleDelete = async (prId: number) => {
    if (!window.confirm('Are you sure you want to delete this PR?')) {
      return;
    }

    try {
      const res = await fetch(`/api/prs?id=${prId}&userId=${user.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete PR');
      }

      const updatedRes = await fetch(`/api/prs?userId=${user.id}`);
      const updatedPRs = await updatedRes.json();
      setPrs(updatedPRs);
    } catch (error) {
      console.error('Error deleting PR:', error);
    }
  };

  const chartData = {
    labels: prs.filter(pr => pr.exercise === newPR.exercise).map(pr => pr.date),
    datasets: [
      {
        label: newPR.exercise.charAt(0).toUpperCase() + newPR.exercise.slice(1),
        data: prs.filter(pr => pr.exercise === newPR.exercise).map(pr => pr.weight),
        borderColor: 'rgb(147, 51, 234)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'PR Progress'
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Personal Records
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Add New PR</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Exercise</label>
                <select
                  value={newPR.exercise}
                  onChange={(e) => setNewPR({ ...newPR, exercise: e.target.value })}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
                >
                  <option value="squat">Squat</option>
                  <option value="deadlift">Deadlift</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={newPR.weight || ''}
                  placeholder="0"
                  onChange={(e) => setNewPR({ ...newPR, weight: Number(e.target.value) })}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={newPR.date}
                  onChange={(e) => setNewPR({ ...newPR, date: e.target.value })}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded transition-colors"
              >
                Add PR
              </button>
            </form>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Your PRs</h2>
            {prs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-gray-700">
                      <th className="py-2">Exercise</th>
                      <th className="py-2">Weight (kg)</th>
                      <th className="py-2">Date</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prs.map((pr: any) => (
                      <tr key={pr.id} className="border-b border-gray-700/50">
                        <td className="py-2">{pr.exercise}</td>
                        <td className="py-2">{pr.weight}</td>
                        <td className="py-2">{new Date(pr.date).toLocaleDateString()}</td>
                        <td className="py-2">
                          <button
                            onClick={() => handleDelete(pr.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                            title="Delete PR"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-400">No PRs recorded yet</p>
            )}
          </div>

          <div className="md:col-span-2 bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Progress Chart</h2>
            {prs.length > 0 ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <p className="text-center text-gray-400">No PRs to display in chart</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}