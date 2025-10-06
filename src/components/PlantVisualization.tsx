import { useEffect, useState } from 'react';
import { Sprout, Leaf, Sparkles, Flower, Cloud, Droplets } from 'lucide-react';

interface PlantVisualizationProps {
  stage: number;
  health: number;
}

export default function PlantVisualization({ stage, health }: PlantVisualizationProps) {
  const [scale, setScale] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0.9);

  useEffect(() => {
    setScale(0);
    setTimeout(() => setScale(1), 100);
    
    // Add pulsating glow effect
    const glowInterval = setInterval(() => {
      setGlowIntensity(0.7 + Math.sin(Date.now() / 1000) * 0.3);
    }, 100);
    
    return () => clearInterval(glowInterval);
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
  const healthColor = health > 80 ? 'green-500' : health > 50 ? 'green-400' : health > 30 ? 'yellow-500' : 'red-400';

  return (
    <div className="relative w-full h-full flex items-end justify-center pb-4">
      {/* Enhanced environment */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating clouds */}
        {Array.from({ length: 3 }).map((_, i) => (
          <Cloud
            key={`cloud-${i}`}
            className="absolute text-blue-100/30"
            style={{
              width: `${40 + Math.random() * 30}px`,
              height: `${30 + Math.random() * 20}px`,
              left: `${10 + Math.random() * 80}%`,
              top: `${5 + Math.random() * 20}%`,
              animation: `float ${10 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        
        {/* Enhanced particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute rounded-full ${i % 3 === 0 ? 'bg-green-400/40' : i % 3 === 1 ? 'bg-yellow-300/30' : 'bg-blue-300/20'}`}
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Occasional water droplets */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Droplets
            key={`droplet-${i}`}
            className="absolute text-blue-400/30"
            style={{
              width: `${8 + Math.random() * 6}px`,
              height: `${8 + Math.random() * 6}px`,
              left: `${Math.random() * 100}%`,
              top: `${30 + Math.random() * 50}%`,
              animation: `dropFall ${2 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced sun with rays */}
      <div className="absolute top-8 right-8">
        <div className="w-20 h-20 rounded-full bg-yellow-400/30 blur-xl animate-pulse" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={`ray-${i}`}
            className="absolute bg-yellow-300/40 blur-sm"
            style={{
              width: '2px',
              height: '30px',
              left: '50%',
              top: '50%',
              transformOrigin: 'center bottom',
              transform: `translateX(-50%) translateY(-100%) rotate(${i * 45}deg)`,
              animation: `pulse ${2 + i * 0.2}s ease-in-out infinite`
            }}
          />
        ))}
      </div>
      
      <div
        className="relative transition-all duration-1000 ease-out"
        style={{
          transform: `translateY(-50px) scale(${scale})`,
          opacity: scale
        }}
      >
        {stage < 3 && (
          <div className="flex flex-col items-center relative">
            <Sparkles className="absolute -top-8 text-yellow-400/70 w-8 h-8 animate-pulse" />
            <Sprout
              className={`text-${healthColor} drop-shadow-[0_0_20px_rgba(125,216,125,0.9)] hover:scale-110 transition-transform cursor-pointer`}
              style={{
                width: `${plantSize}px`,
                height: `${plantSize}px`,
                filter: `brightness(${health / 100 + 0.5}) drop-shadow(0 0 ${5 * glowIntensity}px rgba(125,216,125,${glowIntensity}))`
              }}
            />
            
            {/* Small roots */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`root-${i}`}
                  className="absolute bg-gradient-to-b from-green-700 to-green-900"
                  style={{
                    width: '2px',
                    height: `${5 + i * 3}px`,
                    left: `${-5 + i * 5}px`,
                    transform: `rotate(${-20 + i * 20}deg)`,
                    transformOrigin: 'top center'
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {stage >= 3 && (
          <div className="relative flex flex-col items-center">
            <div className="relative">
              {/* Flowers for advanced stages (higher position) */}
              {stage >= 5 && Array.from({ length: Math.min(stage - 4, 3) }).map((_, i) => (
                <Flower
                  key={`flower-${i}`}
                  className="absolute text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                  style={{
                    width: `${plantSize * 0.44}px`,
                    height: `${plantSize * 0.44}px`,
                    left: `${-20 + i * 20}px`,
                    top: `${-plantSize * 0.2 + i * 8}px`, // Slightly lower above the stem
                    animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                    zIndex: 10 // Ensure flowers appear above other elements
                  }}
                />
              ))}
              
              {/* Enhanced leaves with color variation */}
              {Array.from({ length: leafCount }).map((_, i) => {
                const angle = (i * 45) - 180;
                const distance = 30 + (i % 2) * 15;
                const leafColor = i % 3 === 0 ? healthColor : i % 3 === 1 ? 'green-600' : 'green-400';
                
                return (
                  <Leaf
                    key={`leaf-${i}`}
                    className={`absolute text-${leafColor} drop-shadow-[0_0_10px_rgba(125,216,125,0.5)]`}
                    style={{
                      width: `${plantSize * 0.6}px`,
                      height: `${plantSize * 0.6}px`,
                      transform: `rotate(${angle}deg) translateY(-${distance}px)`,
                      transformOrigin: 'bottom center',
                      filter: `brightness(${health / 100 + 0.5}) hue-rotate(${i * 5}deg)`,
                      animation: `sway ${2 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                );
              })}
            </div>

            {/* Enhanced stem with texture */}
            <div
              className="w-3 bg-gradient-to-b from-green-600 to-green-800 rounded-t-lg relative overflow-hidden"
              style={{
                height: `${plantSize * 1.2}px`,
                boxShadow: `0 0 ${10 * glowIntensity}px rgba(125,216,125,${glowIntensity})`
              }}
            >
              {/* Stem texture */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`stem-texture-${i}`}
                  className="absolute w-1 bg-green-700/30 rounded-full"
                  style={{
                    height: `${plantSize * 0.2}px`,
                    left: i % 2 === 0 ? '0px' : '2px',
                    top: `${(plantSize * 1.2 / 5) * i}px`
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {stage >= 3 && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            {Array.from({ length: stage === 3 ? 5 : stage === 4 ? 3 : 8 }).map((_, i) => {
              // Create varied positioning for potatoes with more at higher levels
              let positions;
              
              if (stage === 3) {
                // Stage 3: 5 potatoes total (3 original + 2 higher)
                positions = [
                  { x: -20, y: 2 },    // Left, ground level slightly below
                  { x: 10, y: -6 },    // Right, slightly higher
                  { x: -5, y: -2 },    // Center, medium height
                  { x: -15, y: -13 },  // Higher left
                  { x: 15, y: -16 }    // Higher right
                ];
              } else if (stage === 4) {
                // Stage 4: 3 potatoes (original configuration)
                positions = [
                  { x: -20, y: 2 },    // Left, ground level slightly below
                  { x: 10, y: -6 },    // Right, slightly higher
                  { x: -5, y: -2 }     // Center, medium height
                ];
              } else {
                // Stage 5: 8 potatoes total (5 original + 3 higher)
                positions = [
                  { x: -20, y: 2 },    // Left, ground level slightly below
                  { x: 10, y: -6 },    // Right, slightly higher
                  { x: -5, y: -2 },    // Center, medium height
                  { x: 25, y: 0 },     // Far right, slightly elevated
                  { x: -35, y: -4 },   // Far left, higher
                  { x: 0, y: -18 },    // Center top
                  { x: -25, y: -20 },  // Left top
                  { x: 20, y: -23 }    // Right top
                ];
              }
              
              const pos = positions[i] || { x: 0, y: 0 };
              
              return (
                <div
                  key={i}
                  className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-yellow-700 to-yellow-900 border-2 border-yellow-600"
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    animation: `pulse ${1.5 + i * 0.2}s ease-in-out infinite`,
                    boxShadow: '0 0 15px rgba(234,179,8,0.5)'
                  }}
                />
              );
            })}
          </div>
        )}

        <div
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent rounded-full blur-sm"
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
        @keyframes dropFall {
          0% { transform: translateY(-10px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
