import { Rocket, Globe, Sprout } from 'lucide-react';

interface StoryIntroProps {
  onStart: () => void;
}

export default function StoryIntro({ onStart }: StoryIntroProps) {
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
              onClick={onStart}
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
