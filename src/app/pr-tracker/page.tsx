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
  exercise: string;
  weight: number;
  date: string;
}

export default function PRTrackerPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [prs, setPrs] = useState<PR[]>([]);
  const [newPR, setNewPR] = useState<PR>({
    exercise: 'squat',
    weight: 0, // Set initial value to 0
    date: new Date().toISOString().split('T')[0] || '', // Default to today's date
  });

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    // TODO: Fetch user's PRs from database
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call to save PR
    setPrs([...prs, newPR]);
    setNewPR({
      ...newPR,
      weight: 0
    });
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
                  value={newPR.weight || ''} // Show empty string when weight is 0
                  placeholder="0"  // Add placeholder
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
            <h2 className="text-2xl font-semibold mb-4">Progress Chart</h2>
            {prs.length > 0 ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <p className="text-center text-gray-400">No PRs recorded yet</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}