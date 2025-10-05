import { useState } from 'react';
import { Droplet, Beaker, Wind, Plus, Zap, Info } from 'lucide-react';
import { GameState } from '../types/game';
import EducationalTooltip from './EducationalTooltip';

interface ActionPanelProps {
  gameState: GameState;
  onAction: (action: string) => void;
  disabled: boolean;
}

export default function ActionPanel({ gameState, onAction, disabled }: ActionPanelProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleActionClick = (actionId: string) => {
    setSelectedAction(actionId);
    onAction(actionId);
    setTimeout(() => setSelectedAction(null), 500);
  };

  const educationalContent: Record<string, { details: string }> = {
    water: {
      details: 'Water is essential for nutrient transport and photosynthesis. Potatoes need consistent moisture, especially during tuber formation. Overwatering can cause rot, while underwatering reduces yield.'
    },
    fertilize_n: {
      details: 'Nitrogen (N) promotes leafy growth and chlorophyll production. Critical during vegetative stage. Excess nitrogen delays tuber formation and reduces storage quality.'
    },
    fertilize_p: {
      details: 'Phosphorus (P₂O₅) strengthens root systems and energy transfer. Essential for early growth and tuber development. Improves disease resistance and crop quality.'
    },
    fertilize_k: {
      details: 'Potassium (K₂O) regulates water uptake and starch synthesis. Improves disease resistance, drought tolerance, and storage quality. Most important during tuber bulking.'
    },
    compost: {
      details: 'Organic matter improves soil structure, water retention, and microbial activity. Provides slow-release nutrients and helps degraded soils recover. Critical for sustainable agriculture.'
    },
    adjust_ph: {
      details: 'Potatoes prefer slightly acidic soil (pH 5.5-6.5). pH affects nutrient availability and disease pressure. Too high pH increases scab disease, while too low reduces nutrient uptake.'
    },
    cool_soil: {
      details: 'Cooling the soil helps during hot weather. Potatoes prefer cool temperatures between 15-22°C. Cooling can reduce stress and improve tuber formation during hot periods.'
    },
    warm_soil: {
      details: 'Warming the soil can help during cold weather. While potatoes prefer cool temperatures, soil that is too cold (below 10°C) can slow growth and development.'
    }
  };

  const actions = [
    {
      id: 'water',
      icon: Droplet,
      label: 'Irrigate',
      description: 'Add water to maintain soil moisture',
      color: 'from-blue-600 to-blue-500',
      borderColor: 'border-blue-500/50',
      hoverColor: 'hover:border-blue-400'
    },
    {
      
      id: 'fertilize_n',
      icon: Beaker,
      label: 'Add Nitrogen',
      description: 'Boost vegetative growth',
      color: 'from-cyan-600 to-cyan-500',
      borderColor: 'border-cyan-500/50',
      hoverColor: 'hover:border-cyan-400'
    },
    {
      id: 'fertilize_p',
      icon: Beaker,
      label: 'Add Phosphorus',
      description: 'Strengthen root development',
      color: 'from-purple-600 to-purple-500',
      borderColor: 'border-purple-500/50',
      hoverColor: 'hover:border-purple-400'
    },
    {
      id: 'fertilize_k',
      icon: Beaker,
      label: 'Add Potassium',
      description: 'Improve disease resistance',
      color: 'from-orange-600 to-orange-500',
      borderColor: 'border-orange-500/50',
      hoverColor: 'hover:border-orange-400'
    },
    {
      id: 'compost',
      icon: Plus,
      label: 'Add Compost',
      description: 'Increase organic matter and improve soil structure',
      color: 'from-amber-700 to-amber-600',
      borderColor: 'border-amber-600/50',
      hoverColor: 'hover:border-amber-500'
    },
    {
      id: 'adjust_ph',
      icon: Wind,
      label: 'Adjust pH',
      description: 'Balance soil acidity',
      color: 'from-green-600 to-green-500',
      borderColor: 'border-green-500/50',
      hoverColor: 'hover:border-green-400'
    },
    {
      id: 'cool_soil',
      icon: Droplet,
      label: 'Cool Soil',
      description: 'Reduce soil temperature',
      color: 'from-blue-700 to-blue-600',
      borderColor: 'border-blue-600/50',
      hoverColor: 'hover:border-blue-500'
    },
    {
      id: 'warm_soil',
      icon: Zap,
      label: 'Warm Soil',
      description: 'Increase soil temperature',
      color: 'from-red-600 to-red-500',
      borderColor: 'border-red-500/50',
      hoverColor: 'hover:border-red-400'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 shadow-2xl">
      <h3 className="text-xl font-bold text-green-400 mb-4">Agricultural Actions</h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <div key={action.id} className="relative">
              <button
                onClick={() => handleActionClick(action.id)}
                disabled={disabled}
                className={`
                  relative overflow-hidden w-full
                  bg-gradient-to-br ${action.color}
                  border-2 ${action.borderColor} ${action.hoverColor}
                  rounded-lg p-4
                  transition-all duration-300
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl cursor-pointer'}
                  ${selectedAction === action.id ? 'scale-95 ring-4 ring-white/50' : ''}
                  group
                `}
              >
                {selectedAction === action.id && (
                  <div className="absolute inset-0 z-0">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"
                        style={{
                          animation: `explode 0.5s ease-out forwards`,
                          animationDelay: `${i * 0.05}s`,
                          transform: `rotate(${i * 45}deg)`
                        }}
                      />
                    ))}
                  </div>
                )}

                <div className="relative z-10 flex flex-col items-center text-center gap-2">
                  <Icon className={`w-6 h-6 text-white ${selectedAction === action.id ? 'animate-bounce' : ''}`} />
                  <div className="text-white font-semibold text-sm">{action.label}</div>
                  <div className="text-xs text-white/80 leading-tight">{action.description}</div>
                </div>

                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              </button>

              <div className="absolute top-2 right-2 z-20">
                <EducationalTooltip
                  title={action.label}
                  content={educationalContent[action.id].details}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm text-blue-300 font-semibold mb-1">Pro Tip</div>
            <div className="text-xs text-gray-300 leading-relaxed">
              Each action affects soil conditions and plant health. Click the
              <Info className="inline w-3 h-3 mx-1 text-blue-400" />
              icons to learn more about each action's effects and optimal usage timing.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes explode {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translateX(40px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
