import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-red-400">
            CrossFit Guide
          </h1>
          
          <p className="text-xl text-gray-300 text-center max-w-2xl">
            Discover CrossFit movements, essential equipment, and track your WOD progress
          </p>

          <div className="relative w-full max-w-7xl rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
            <img 
              src="/gymkuv.jpg" 
              alt="CrossFit gym" 
              className="w-full h-[400px] object-cover brightness-110 contrast-125 saturate-110"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20 flex items-center justify-center">
              <div className="space-y-8 backdrop-blur-[1px] p-8 rounded-2xl bg-black/10">
                <div className="space-x-6 flex justify-center">
                  <Link 
                    href="/movements" 
                    className="bg-blue-500/95 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-blue-500/20 text-lg"
                  >
                    Movements
                  </Link>
                  <Link
                    href="/equipment"
                    className="bg-emerald-500/95 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-emerald-500/20 text-lg"
                  >
                    Equipment
                  </Link>
                  <Link
                    href="/tracker"
                    className="bg-purple-500/95 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-purple-500/20 text-lg"
                  >
                    WOD Tracker
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <FeatureCard 
              title="CrossFit Movements"
              description="Learn proper form for Olympic lifts, gymnastics, and metabolic conditioning"
              icon="🏋️‍♂️"
              color="from-blue-600/90 to-blue-800/90"
            />
            <FeatureCard
              title="Essential Equipment"
              description="Explore the tools you need: barbells, kettlebells, rowers, and more"
              icon="⚡"
              color="from-emerald-600/90 to-emerald-800/90"
            />
            <FeatureCard
              title="Track WODs"
              description="Log your workouts of the day and monitor your CrossFit progress"
              icon="📊"
              color="from-purple-600/90 to-purple-800/90"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ 
  title, 
  description, 
  icon, 
  color 
}: { 
  title: string; 
  description: string; 
  icon: string;
  color: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-xl shadow-lg backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300`}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-200/90">{description}</p>
    </div>
  );
}
