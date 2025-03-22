import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Welcome to TrainSite
          </h1>
          
          <p className="text-xl text-gray-300 text-center max-w-2xl">
            Track your fitness journey, visualize your progress, and achieve your goals
          </p>

          <div className="relative w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="/gymkuv.jpg" 
              alt="Gym image" 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="space-x-4">
                <Link 
                  href="/register" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Progress tracker
                </Link>
                <Link
                  href="/ProgressPage"
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

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg hover:bg-gray-700/50 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
