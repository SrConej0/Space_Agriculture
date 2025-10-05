import { growthStages } from '../data/growthStages';

interface ProgressBarProps {
  currentStage: number;
  daysInStage: number;
}

export default function ProgressBar({ currentStage, daysInStage }: ProgressBarProps) {
  const stage = growthStages[currentStage];
  const progress = (daysInStage / stage.duration) * 100;

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-green-400">
          Stage {currentStage + 1}: {stage.name}
        </h3>
        <span className="text-sm text-gray-400">
          Day {daysInStage} of {stage.duration}
        </span>
      </div>

      <div className="mb-4">
        <div className="h-4 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-shimmer" />
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-300 leading-relaxed">{stage.description}</p>

      <div className="mt-4 flex gap-2">
        {growthStages.map((s, i) => (
          <div
            key={s.id}
            className={`
              flex-1 h-2 rounded-full transition-all duration-500
              ${i < currentStage ? 'bg-green-500' : i === currentStage ? 'bg-green-400 animate-pulse' : 'bg-gray-700'}
            `}
          />
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
