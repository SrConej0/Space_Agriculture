import { Rocket, Globe, Sprout } from 'lucide-react';
import { useState } from 'react';

interface StoryIntroProps {
  onStart: () => void;
}

export default function StoryIntro({ onStart }: StoryIntroProps) {
  const [showSelector, setShowSelector] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<string>('papa');

  const plantOptions = [
    { id: 'papa', name: 'Potato', available: true, emoji: '🥔' },
    { id: 'quinua', name: 'Quinoa', available: false, emoji: '🌾' },
    { id: 'lenteja', name: 'Lentil', available: false, emoji: '🫘' },
    { id: 'amaranto', name: 'Amaranth', available: false, emoji: '🌿' },
    { id: 'camote', name: 'Sweet Potato', available: false, emoji: '🍠' },
    { id: 'cebada', name: 'Barley', available: false, emoji: '🌾' },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900 animate-fadeIn">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Rocket className="w-12 h-12 text-blue-400 animate-bounce" />
            <Globe className="w-16 h-16 text-green-400 animate-pulse" />
            <Sprout className="w-12 h-12 text-green-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent animate-shimmer">
            History of Space Agriculture
          </h1>

          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p className="animate-slideUp" style={{ animationDelay: '0.3s' }}>
              The year is <span className="text-green-400 font-bold">2050</span>. Earth's soils are degraded, climate patterns have shifted, and humanity faces a critical challenge: feeding a growing population with diminishing resources.
            </p>

            <p className="animate-slideUp" style={{ animationDelay: '0.6s' }}>
              You are an agricultural specialist sent to restore a degraded plot of land using <span className="text-yellow-400 font-bold">sustainable potato cultivation</span> techniques. The potato, once saved Ireland from famine, now holds the key to humanity's survival in this new era.
            </p>

            <p className="animate-slideUp" style={{ animationDelay: '0.9s' }}>
              Your mission: Transform depleted soil into a thriving ecosystem using cutting-edge agricultural science, balanced nutrition management, and sustainable practices.
            </p>
          </div>

          <div className="pt-8 animate-slideUp" style={{ animationDelay: '1.2s' }}>
            <button
              onClick={() => setShowSelector(true)}
              className="
                px-8 py-4
                bg-gradient-to-r from-green-500 to-green-600
                hover:from-green-400 hover:to-green-500
                text-white font-bold text-xl rounded-lg
                transform hover:scale-105
                transition-all duration-300
                shadow-lg hover:shadow-green-500/50
                border-2 border-green-400/50
              "
            >
              Begin Your Mission
            </button>
          </div>
        </div>
      </div>

      {showSelector && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="w-full max-w-3xl bg-gray-900/90 border border-green-500/40 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-green-400 mb-4 text-center">Select your crop</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {plantOptions.map((opt) => (
                <div
                  key={opt.id}
                  className={`relative rounded-xl p-4 border ${
                    opt.available
                      ? 'border-green-500/40 hover:border-green-400/60 cursor-pointer'
                      : 'border-red-500/40 opacity-60 cursor-not-allowed'
                  } bg-gradient-to-br from-gray-800/70 to-gray-700/70 transition-all`}
                  onClick={() => opt.available && setSelectedPlant('papa')}
                >
                  <div className="text-4xl mb-2 select-none">{opt.emoji}</div>
                  <div className="font-semibold text-gray-200 select-none">{opt.name}</div>

                  {!opt.available && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-red-500 font-bold text-sm line-through bg-red-500/10 px-2 py-1 rounded">
                        Coming soon
                      </span>
                    </div>
                  )}

                  {opt.available && selectedPlant === 'papa' && (
                    <div className="absolute top-2 right-2 bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded">
                      Selected
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowSelector(false)}
                className="px-4 py-2 border border-gray-600/60 rounded-lg text-gray-300 hover:bg-gray-800/60 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowSelector(false); onStart(); }}
                disabled={selectedPlant !== 'papa'}
                className={`px-6 py-3 rounded-lg font-bold text-white transition-all ${
                  selectedPlant === 'papa'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 shadow-lg border-2 border-green-400/50'
                    : 'bg-gray-700/70 border border-gray-600/60 cursor-not-allowed opacity-70'
                }`}
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
