import { useEffect, useState } from 'react';
import { Sprout, Leaf, Sparkles } from 'lucide-react';

interface PlantVisualizationProps {
  stage: number;
  health: number;
}

export default function PlantVisualization({ stage, health }: PlantVisualizationProps) {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    setScale(0);
    setTimeout(() => setScale(1), 100);
  }, [stage]);

  const getPlantSize = () => {
    const baseSize = 20 + (stage * 30);
    return baseSize * (health / 100);
  };

  const getLeafCount = () => {
    return Math.min(stage + 2, 8);
  };

  const plantSize = getPlantSize();
  const leafCount = getLeafCount();

  return (
    <div className="relative w-full h-full flex items-end justify-center pb-12">
      {/* Particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-green-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Sun/light effect */}
      <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-yellow-400/20 blur-xl animate-pulse" />
      <div
        className="relative transition-all duration-1000 ease-out"
        style={{
          transform: `scale(${scale})`,
          opacity: scale
        }}
      >
        {stage < 3 && (
          <div className="flex flex-col items-center relative">
            <Sparkles className="absolute -top-8 text-yellow-400/50 w-6 h-6 animate-pulse" />
            <Sprout
              className="text-green-500 drop-shadow-[0_0_20px_rgba(125,216,125,0.9)] hover:scale-110 transition-transform cursor-pointer"
              style={{
                width: `${plantSize}px`,
                height: `${plantSize}px`,
                filter: `brightness(${health / 100 + 0.5})`
              }}
            />
          </div>
        )}

        {stage >= 3 && (
          <div className="relative flex flex-col items-center">
            <div className="relative">
              {Array.from({ length: leafCount }).map((_, i) => {
                const angle = (i * 45) - 180;
                const distance = 30 + (i % 2) * 15;
                return (
                  <Leaf
                    key={i}
                    className="absolute text-green-500 drop-shadow-[0_0_10px_rgba(125,216,125,0.5)]"
                    style={{
                      width: `${plantSize * 0.6}px`,
                      height: `${plantSize * 0.6}px`,
                      transform: `rotate(${angle}deg) translateY(-${distance}px)`,
                      transformOrigin: 'bottom center',
                      filter: `brightness(${health / 100 + 0.5})`,
                      animation: `sway ${2 + i * 0.3}s ease-in-out infinite`
                    }}
                  />
                );
              })}
            </div>

            <div
              className="w-3 bg-gradient-to-b from-green-600 to-green-800 rounded-t-lg"
              style={{
                height: `${plantSize * 1.2}px`,
                boxShadow: '0 0 20px rgba(125,216,125,0.4)'
              }}
            />
          </div>
        )}

        {stage >= 4 && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {Array.from({ length: Math.min(stage - 2, 4) }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-700 to-yellow-900 border-2 border-yellow-600"
                style={{
                  animation: `pulse ${1.5 + i * 0.2}s ease-in-out infinite`,
                  boxShadow: '0 0 15px rgba(234,179,8,0.5)'
                }}
              />
            ))}
          </div>
        )}

        <div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent rounded-full blur-sm"
        />
      </div>

      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(var(--rotation)) translateY(var(--distance)) rotate(-5deg); }
          50% { transform: rotate(var(--rotation)) translateY(var(--distance)) rotate(5deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
