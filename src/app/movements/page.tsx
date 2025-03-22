'use client';

interface MovementInfo {
  name: string;
  videoUrl: string;
}

const MOVEMENT_CATEGORIES = {
  'Olympic Lifts': [
    { name: 'Snatch', videoUrl: 'https://www.youtube.com/watch?v=GhxhiehJcQY' },
    { name: 'Clean and Jerk', videoUrl: "https://www.youtube.com/watch?v=PjY1rH4_MOA" },
    { name: 'Clean', videoUrl: "https://www.youtube.com/watch?v=Ty14ogq_Vok" },
  ],
  'Gymnastics': [
    { name: 'Muscle-Up', videoUrl: "https://www.youtube.com/watch?v=OCg3UXgzftc" },
    { name: 'Handstand Push-Up', videoUrl: "https://www.youtube.com/watch?v=qbRbM6d5ddM" },
    { name: 'Ring Muscle-Up', videoUrl: "https://www.youtube.com/watch?v=G8W0BhzrWcs" },
    { name: 'Toes to Bar', videoUrl: "https://www.youtube.com/watch?v=6dHvTlsMvNY" },
    { name: 'Pull-Up', videoUrl: "https://www.youtube.com/watch?v=aAggnpPyR6E" },
    { name: "Chin-up", videoUrl: "https://www.youtube.com/watch?v=ByA4hEU3b24" },
    { name: 'Kipping pull-up', videoUrl: "https://www.youtube.com/watch?v=lzRo-4pq_AY" },
    { name: 'Basic Chest to Bar', videoUrl: "https://www.youtube.com/watch?v=p9Stan68FYM" },
    { name: 'Butterfly pull-up', videoUrl: "https://www.youtube.com/watch?v=OenVG15QMj8" },
    { name: 'Handstand Walk', videoUrl: "https://www.youtube.com/watch?v=FdgJ9jZIT-Q" },
    { name: 'Pistol Squat', videoUrl: "https://www.youtube.com/watch?v=qDcniqddTeE" }
  ],
  'Condition': [
    { name: 'Double-Unders', videoUrl: "https://www.youtube.com/watch?v=82jNjDS19lg" },
    { name: 'Box Jumps', videoUrl: "https://www.youtube.com/watch?v=NBY9-kTuHEk" },
    { name: 'Wall Balls', videoUrl: "https://www.youtube.com/watch?v=fpUD0mcFp_0" },
    { name: 'Bike Erg', videoUrl: "https://www.youtube.com/watch?v=nq9fnKhJMgg" },
    { name: 'Rowing', videoUrl: "https://www.youtube.com/watch?v=fxfhQMbATCw" },
    { name: 'Running', videoUrl: "https://www.youtube.com/watch?v=NBY6bKUCfcs" },
    { name: 'Ski Erg', videoUrl: "https://www.youtube.com/watch?v=P7qpoJmX91I" },
    { name: 'Echo Bike / Assault Bike', videoUrl: "https://www.youtube.com/watch?v=9xfUu652CMg" }
  ],
  'Weightlifting': [
    { name: 'Deadlift', videoUrl: "https://www.youtube.com/watch?v=op9kVnSso6Q" },
    { name: 'Back Squat', videoUrl: "https://www.youtube.com/watch?v=QmZAiBqPvZw" },
    { name: 'Front Squat', videoUrl: "https://www.youtube.com/watch?v=uYumuL_G_V0" },
    { name: 'Shoulder Press', videoUrl: "https://www.youtube.com/watch?v=5yWaNOvgFCM" },
    { name: 'Bench Press', videoUrl: "https://www.youtube.com/watch?v=SCVCLChPQFY" },
    { name: 'Thrusters', videoUrl: "https://www.youtube.com/watch?v=L219ltL15zk" },
    { name: 'Overhead Squat', videoUrl: "https://www.youtube.com/watch?v=pn8mqlG0nkE" }
  ],
  "Core": [
    { name: 'GHD Sit-ups', videoUrl: "https://www.youtube.com/watch?v=1pbZ8mX2D1U" },
    { name: "Sit-ups", videoUrl: "https://www.youtube.com/watch?v=_HDZODOx7Zw" },
  ]
} as const;

export default function MovementsPage() {
  const categoryColors = {
    'Olympic Lifts': 'from-red-600/90 to-red-800/90',
    'Gymnastics': 'from-blue-600/90 to-blue-800/90',
    'Condition': 'from-green-600/90 to-green-800/90',
    'Weightlifting': 'from-purple-600/90 to-purple-800/90',
    'Core': 'from-yellow-600/90 to-yellow-800/90'
  };

  const handleMovementClick = (videoUrl: string) => {
    window.open(videoUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-red-400">
          CrossFit Movements
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(MOVEMENT_CATEGORIES).map(([category, movements]) => (
            <div 
              key={category} 
              className={`bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors]} p-6 rounded-xl shadow-lg backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl`}
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                {category}
                <div className="h-1 flex-grow ml-4 bg-white/20 rounded"></div>
              </h2>
              <ul className="space-y-3">
                {movements.map(movement => (
                  <li 
                    key={movement.name} 
                    className="flex items-center space-x-2 p-2 rounded-lg bg-black/20 backdrop-blur-sm cursor-pointer hover:bg-black/30 transition-all duration-300"
                    onClick={() => handleMovementClick(movement.videoUrl)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleMovementClick(movement.videoUrl);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                  >
                    <span className="text-white/90">▶</span>
                    <span className="font-medium">{movement.name}</span>
                    <span className="text-xs text-white/70 ml-auto">Watch Demo</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}