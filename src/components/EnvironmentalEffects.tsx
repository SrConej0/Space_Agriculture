import { useEffect, useState } from 'react';
import { Cloud, Sun, Moon } from 'lucide-react';

interface EnvironmentalEffectsProps {
  daysElapsed: number;
  onWeatherChange: (isRaining: boolean, isDayTime: boolean) => void;
}

export default function EnvironmentalEffects({ daysElapsed, onWeatherChange }: EnvironmentalEffectsProps) {
  const [isRaining, setIsRaining] = useState(false);
  const [isDayTime, setIsDayTime] = useState(true);
  const [rainDrops, setRainDrops] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  // Ciclo día/noche cada 10 segundos (5 segundos día, 5 segundos noche)
  useEffect(() => {
    const dayNightInterval = setInterval(() => {
      setIsDayTime(prev => !prev);
    }, 5000);

    return () => clearInterval(dayNightInterval);
  }, []);

  // Lluvia aleatoria cada 15-30 segundos
  useEffect(() => {
    const rainInterval = setInterval(() => {
      const shouldRain = Math.random() < 0.3; // 30% probabilidad
      setIsRaining(shouldRain);
      
      if (shouldRain) {
        // Crear gotas de lluvia
        const drops = Array.from({ length: 20 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 2
        }));
        setRainDrops(drops);
        
        // Parar la lluvia después de 3-7 segundos
        setTimeout(() => {
          setIsRaining(false);
          setRainDrops([]);
        }, 3000 + Math.random() * 4000);
      }
    }, 15000 + Math.random() * 15000);

    return () => clearInterval(rainInterval);
  }, []);

  // Notificar cambios al componente padre
  useEffect(() => {
    onWeatherChange(isRaining, isDayTime);
  }, [isRaining, isDayTime, onWeatherChange]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Overlay de día/noche */}
      <div 
        className={`absolute inset-0 transition-all duration-2000 ${
          isDayTime 
            ? 'bg-gradient-to-b from-blue-200/10 to-transparent' 
            : 'bg-gradient-to-b from-indigo-900/30 to-purple-900/20'
        }`}
      />

      {/* Icono de sol/luna */}
      <div className="absolute top-4 left-4 z-10">
        {isDayTime ? (
          <Sun className="w-8 h-8 text-yellow-400 animate-pulse" />
        ) : (
          <Moon className="w-8 h-8 text-blue-200 animate-pulse" />
        )}
      </div>

      {/* Efectos de lluvia */}
      {isRaining && (
        <>
          {/* Icono de nube */}
          <div className="absolute top-4 left-16 z-10">
            <Cloud className="w-8 h-8 text-gray-400 animate-bounce" />
          </div>

          {/* Gotas de lluvia */}
          {rainDrops.map((drop) => (
            <div
              key={drop.id}
              className="absolute w-0.5 h-8 bg-gradient-to-b from-blue-300 to-transparent opacity-70"
              style={{
                left: `${drop.left}%`,
                top: '-2rem',
                animation: `fall 1s linear infinite`,
                animationDelay: `${drop.delay}s`
              }}
            />
          ))}
        </>
      )}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}