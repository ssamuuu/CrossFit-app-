'use client';

import { useState } from 'react';
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

const EXERCISE_TYPES = [
  'Squat',
  'Deadlift',
  'Bench Press',
  'Overhead Press',
  'Snatch',
  'Clean',
  'Clean & Jerk'
] as const;

interface MaxLiftData {
  date: string;
  exercise: typeof EXERCISE_TYPES[number];
  weight: number;
}

export default function TrackerPage() {
  const [maxLifts, setMaxLifts] = useState<MaxLiftData[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<typeof EXERCISE_TYPES[number]>(EXERCISE_TYPES[0]);
  const [formData, setFormData] = useState({
    date: '',
    weight: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMaxLifts([...maxLifts, {
      date: formData.date,
      exercise: selectedExercise,
      weight: Number(formData.weight)
    }]);
    setFormData({ date: '', weight: '' });
  };

  const getExerciseData = (exerciseType: string) => {
    return maxLifts
      .filter(lift => lift.exercise === exerciseType)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const currentExerciseData = getExerciseData(selectedExercise);
  const chartData = {
    labels: currentExerciseData.map(data => data.date),
    datasets: [{
      label: selectedExercise,
      data: currentExerciseData.map(lift => lift.weight),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">1RM Tracker</h1>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {EXERCISE_TYPES.map((exercise) => (
            <button
              key={exercise}
              onClick={() => setSelectedExercise(exercise)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedExercise === exercise 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }`}
            >
              {exercise}
            </button>
          ))}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Log New {selectedExercise} 1RM</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">1RM Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                  min="0"
                  step="0.5"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Log {selectedExercise} 1RM
            </button>
          </form>
        </div>

        {currentExerciseData.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{selectedExercise} Progress</h2>
            <div className="bg-white p-4 rounded">
              <Line 
                data={chartData}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: false,
                      title: {
                        display: true,
                        text: 'Weight (kg)'
                      }
                    }
                  }
                }}
              />
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">{selectedExercise} History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">1RM Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...currentExerciseData]
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((lift, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="p-2">{lift.date}</td>
                          <td className="p-2">{lift.weight} kg</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}