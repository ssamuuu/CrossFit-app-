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

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            TrainSite
          </h1>
          
          <div className="relative w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="/gymkuv.jpg" 
              alt="Gym interior with equipment" 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="space-x-4">
                <Link 
                  href="/register" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="/tracker"
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <FeatureCard 
              title="Track Progress"
              description="Log your workouts and monitor your improvements over time"
              icon="📊"
            />
            <FeatureCard
              title="Visualize Data"
              description="See your progress through beautiful charts and graphs"
              icon="📈"
            />
            <FeatureCard
              title="Set Goals"
              description="Set and achieve your fitness goals with our tracking tools"
              icon="🎯"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ title, description, icon }: Readonly<{ title: string; description: string; icon: string }>) {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg hover:bg-gray-700/50 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export function ProgressPage() {
  const [workoutData, setWorkoutData] = useState<{
    date: string;
    exercise: string;
    weight: number;
    reps: number;
  }[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newData = {
      date: formData.get('date') as string,
      exercise: formData.get('exercise') as string,
      weight: Number(formData.get('weight')),
      reps: Number(formData.get('reps')),
    };
    setWorkoutData([...workoutData, newData]);
    e.currentTarget.reset();
  };

  const chartData = {
    labels: workoutData.map(d => d.date),
    datasets: [
      {
        label: 'Weight (kg)',
        data: workoutData.map(d => d.weight),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Track Your Progress
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Log Workout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  className="w-full bg-gray-700 rounded-md p-2 text-white"
                />
              </div>
              <div>
                <label htmlFor="exercise" className="block text-sm font-medium mb-1">Exercise</label>
                <select
                  id="exercise"
                  name="exercise"
                  required
                  className="w-full bg-gray-700 rounded-md p-2 text-white"
                >
                  <option value="bench">Bench Press</option>
                  <option value="squat">Squat</option>
                  <option value="deadlift">Deadlift</option>
                </select>
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium mb-1">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  required
                  className="w-full bg-gray-700 rounded-md p-2 text-white"
                />
              </div>
              <div>
                <label htmlFor="reps" className="block text-sm font-medium mb-1">Reps</label>
                <input
                  type="number"
                  id="reps"
                  name="reps"
                  required
                  className="w-full bg-gray-700 rounded-md p-2 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
              >
                Log Workout
              </button>
            </form>
          </div>

          {/* Progress Chart */}
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Progress Chart</h2>
            {workoutData.length > 0 ? (
              <Line 
                data={chartData}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      },
                      ticks: {
                        color: 'white'
                      }
                    },
                    x: {
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      },
                      ticks: {
                        color: 'white'
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white'
                      }
                    }
                  }
                }}
              />
            ) : (
              <div className="text-center text-gray-400 py-12">
                No workout data yet. Start logging your workouts!
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}