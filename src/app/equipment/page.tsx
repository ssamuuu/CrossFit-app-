'use client';

const EQUIPMENT_LIST = [
  {
    name: 'Barbells, plates and collars',
    description: 'Essential for Olympic lifts and strength training',
    icon: '🏋️‍♂️'
  },
  {
    name: 'Kettlebells',
    description: 'Used for swings, cleans, etc',
    icon: '⚫'
  },
  {
    name: 'Dumbbells',
    description: 'Can be used for several things for example db snatch or benchpress etc',
    icon: '🔨'
  },
  {
    name: 'Different machines',
    description: 'Bike erg, rower, ski erg, assault/echo bike',
    icon: '🚴‍♂️'
  },
  {
    name: 'Gymnastics Rings',
    description: 'For muscle-ups, dips, and ring work',
    icon: '⭕'
  },
  {
    name: 'Jump Rope',
    description: 'For double-unders and conditioning',
    icon: '➰'
  },
  {
    name: 'Box',
    description: 'For box jumps and step-ups',
    icon: '📦'
  },
  {
    name: 'Gymnastic bar / Squat rack',
    description: 'For pull-ups, chest to bars, muscle-ups, and squats',
    icon: '🏋️'
  },
  {
    name: 'GHD Machine',
    description: 'For GHD sit-ups and back extensions',
    icon: '🔄'
  },
  {
    name: 'Medicine Ball',
    description: 'For wall balls and other conditioning exercises',
    icon: '⚽'
  },
  {
    name: 'Climbing Rope',
    description: 'For rope climbs and grip strength',
    icon: '🪢'
  },
  {
    name: 'AbMats',
    description: 'For sit-ups and handstand push-ups',
    icon: '🟦'
  },
  {
    name: 'Timers',
    description: 'For timing workouts and intervals',
    icon: '⏱️'
  },
  {
    name: 'Benches',
    description: 'For benchpress and other exercises',
    icon: '🛋️'
  },
  {
    name: 'Resistance Bands',
    description: 'For mobility and assistance exercises',
    icon: '✨'
  },
  {
    name: 'Sled',
    description: 'For sled pushes and pulls',
    icon: '🛷'
  },
  {
    name: 'Sandbags',
    description: 'For sandbag carries, cleans, and squats',
    icon: '💼'
  },
  {
    name: 'Extras',
    description: '-Hand grips, wrist wraps, knee sleeves, weight belts, chalk, etc',
    icon: '🎯'
  }
];

export default function EquipmentPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-400 to-emerald-400 pb-2">
          CrossFit Equipment
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EQUIPMENT_LIST.map((item, index) => (
            <div 
              key={item.name} 
              className={`relative overflow-hidden bg-gradient-to-br ${
                index % 3 === 0 ? 'from-green-600/90 to-green-800/90' :
                index % 3 === 1 ? 'from-emerald-600/90 to-emerald-800/90' :
                'from-teal-600/90 to-teal-800/90'
              } p-6 rounded-xl shadow-lg`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10 transform translate-x-8 -translate-y-8">
                {item.icon}
              </div>
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{item.icon}</span>
                <h2 className="text-xl font-bold">{item.name}</h2>
              </div>
              <p className="text-gray-200/90 text-sm leading-relaxed border-t border-white/10 pt-3">
                {item.description}
              </p>
              <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-emerald-400/80 text-sm">
            Essential equipment for your CrossFit journey
          </p>
        </div>
      </div>
    </main>
  );
}