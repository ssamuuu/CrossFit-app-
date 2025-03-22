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

          <div className="relative w-full max-w-7xl rounded-xl overflow-hidden shadow-xl">
            <img 
              src="/gymkuv.jpg" 
              alt="CrossFit gym" 
              className="w-full h-[400px] object-cover brightness-110 contrast-125 saturate-110"
              loading="eager"
              priority="true"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/20 flex items-center justify-center">
              <div className="p-8 rounded-2xl bg-black/10">
                <div className="space-x-6 flex justify-center">
                  <Link 
                    href="/movements" 
                    className="bg-blue-500/95 text-white px-8 py-4 rounded-lg font-semibold shadow-lg text-lg"
                  >
                    Movements
                  </Link>
                  <Link
                    href="/equipment"
                    className="bg-emerald-500/95 text-white px-8 py-4 rounded-lg font-semibold shadow-lg text-lg"
                  >
                    Equipment
                  </Link>
                  <Link
                    href="/tracker"
                    className="bg-purple-500/95 text-white px-8 py-4 rounded-lg font-semibold shadow-lg text-lg"
                  >
                    WOD Tracker
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "CrossFit Movements",
                description: "Learn proper form for Olympic lifts, gymnastics, and metabolic conditioning",
                icon: "🏋️‍♂️",
                color: "from-blue-600/90 to-blue-800/90"
              },
              {
                title: "Essential Equipment",
                description: "Explore the tools you need: barbells, kettlebells, rowers, and more",
                icon: "⚡",
                color: "from-emerald-600/90 to-emerald-800/90"
              },
              {
                title: "Track WODs",
                description: "Log your workouts of the day and monitor your CrossFit progress",
                icon: "📊",
                color: "from-purple-600/90 to-purple-800/90"
              }
            ].map((card) => (
              <div
                key={card.title}
                className={`bg-gradient-to-br ${card.color} p-6 rounded-xl shadow-lg`}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-200/90">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
