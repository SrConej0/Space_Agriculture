import { useState, useEffect } from 'react';
import { SoilData } from '../types/game';
import { Droplets, Thermometer, Activity, Sprout, TrendingUp, TrendingDown, Minus, Snowflake, Sun } from 'lucide-react';
import EducationalTooltip from './EducationalTooltip';

interface IndicatorPanelProps {
  soil: SoilData;
  plantHealth: number;
  waterLevel: number;
}

export default function IndicatorPanel({ soil, plantHealth, waterLevel }: IndicatorPanelProps) {
  const [prevPh, setPrevPh] = useState(soil.ph);
  const [prevTemp, setPrevTemp] = useState(soil.temperature);
  const [phChanging, setPhChanging] = useState(false);
  const [tempChanging, setTempChanging] = useState(false);

  useEffect(() => {
    // Detect pH changes
    if (Math.abs(prevPh - soil.ph) > 0.1) {
      setPhChanging(true);
      setTimeout(() => setPhChanging(false), 1000);
      setPrevPh(soil.ph);
    }
    
    // Detect temperature changes
    if (Math.abs(prevTemp - soil.temperature) > 0.2) {
      setTempChanging(true);
      setTimeout(() => setTempChanging(false), 1000);
      setPrevTemp(soil.temperature);
    }
  }, [soil.ph, soil.temperature, prevPh, prevTemp]);

  const getStatusColor = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) return 'text-green-400';
    if (value < min * 0.7 || value > max * 1.3) return 'text-red-400';
    return 'text-yellow-400';
  };

  const getTrendIcon = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) return Minus;
    if (value < min) return TrendingDown;
    return TrendingUp;
  };

  // Get additional icon for temperature
  const getTempIcon = (temp: number) => {
    if (temp < 15) return Snowflake;
    if (temp > 22) return Sun;
    return null;
  };

  const indicators = [
    {
      icon: Activity,
      label: 'pH Level',
      value: soil.ph.toFixed(1),
      optimal: '5.5-6.5',
      color: getStatusColor(soil.ph, 5.5, 6.5),
      trendIcon: getTrendIcon(soil.ph, 5.5, 6.5),
      info: 'Soil pH affects nutrient availability. Potatoes thrive in slightly acidic conditions (5.5-6.5). Lower pH reduces disease risk.',
      isChanging: phChanging
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${soil.humidity.toFixed(0)}%`,
      optimal: '60-80%',
      color: getStatusColor(soil.humidity, 60, 80),
      trendIcon: getTrendIcon(soil.humidity, 60, 80),
      info: 'Soil moisture is critical for potato growth. Too little causes stress and small tubers. Too much leads to rot and disease.'
    },
    {
      icon: Thermometer,
      label: 'Temperature',
      value: `${soil.temperature.toFixed(1)}°C`,
      optimal: '15-22°C',
      color: getStatusColor(soil.temperature, 15, 22),
      trendIcon: getTrendIcon(soil.temperature, 15, 22),
      info: 'Potatoes prefer cool temperatures. Optimal range is 15-22°C. High temperatures reduce tuber formation and quality.',
      extraIcon: getTempIcon(soil.temperature),
      isChanging: tempChanging
    },
    {
      icon: Sprout,
      label: 'Plant Health',
      value: `${plantHealth.toFixed(0)}%`,
      optimal: '>80%',
      color: plantHealth >= 80 ? 'text-green-400' : plantHealth >= 50 ? 'text-yellow-400' : 'text-red-400',
      trendIcon: plantHealth >= 80 ? TrendingUp : plantHealth >= 50 ? Minus : TrendingDown,
      info: 'Overall plant vitality based on soil conditions, nutrients, and water. Maintain above 80% for optimal yield and quality.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 shadow-2xl">
      <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5" />
        Environmental Indicators
      </h3>

      <div className="space-y-4">
        {indicators.map((indicator) => {
          const Icon = indicator.icon;
          const TrendIcon = indicator.trendIcon;
          const ExtraIcon = indicator.extraIcon;
          
          return (
            <div 
              key={indicator.label} 
              className={`bg-gray-800/50 rounded-lg p-3 border ${
                indicator.isChanging 
                  ? 'border-blue-500/70 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                  : 'border-gray-700/50 hover:border-gray-600/50'
              } transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${indicator.color} ${indicator.isChanging ? 'animate-pulse' : ''}`} />
                  <span className="text-sm text-gray-300">{indicator.label}</span>
                  <EducationalTooltip title={indicator.label} content={indicator.info} />
                </div>
                <div className="flex items-center gap-2">
                  {ExtraIcon && <ExtraIcon className={`w-4 h-4 ${indicator.color} ${indicator.isChanging ? 'animate-bounce' : ''}`} />}
                  <TrendIcon className={`w-4 h-4 ${indicator.color}`} />
                  <span className={`text-lg font-bold ${indicator.color} ${
                    indicator.isChanging ? 'scale-110 transition-transform' : ''
                  }`}>{indicator.value}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">Optimal: {indicator.optimal}</div>
              
              {/* Barra de progreso para visualizar el valor en relación al óptimo */}
              {(indicator.label === 'pH Level' || indicator.label === 'Temperature') && (
                <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${indicator.color} transition-all duration-500 ${indicator.isChanging ? 'animate-pulse' : ''}`}
                    style={{ 
                      width: indicator.label === 'pH Level' 
                        ? `${Math.min(100, Math.max(0, (parseFloat(indicator.value) / 8) * 100))}%`
                        : `${Math.min(100, Math.max(0, (parseFloat(indicator.value.replace('°C', '')) / 30) * 100))}%`
                    }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}

        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50 mt-4 hover:border-gray-600/50 transition-colors">
          <div className="text-sm text-gray-300 mb-2 flex items-center gap-2">
            Nutrient Balance (NPK)
            <EducationalTooltip
              title="NPK Nutrients"
              content="N (Nitrogen) for leaves, P (Phosphorus) for roots and energy, K (Potassium) for disease resistance and tuber quality. Balance is essential for optimal potato growth."
            />
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-blue-400">N: {soil.nitrogen.toFixed(0)} kg/ha</span>
                <span className="text-gray-500">80-120</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${Math.min((soil.nitrogen / 120) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-purple-400">P₂O₅: {soil.phosphorus.toFixed(0)} kg/ha</span>
                <span className="text-gray-500">60-90</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-500"
                  style={{ width: `${Math.min((soil.phosphorus / 90) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-orange-400">K₂O: {soil.potassium.toFixed(0)} kg/ha</span>
                <span className="text-gray-500">100-150</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all duration-500"
                  style={{ width: `${Math.min((soil.potassium / 150) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Water Level</span>
            <span className="text-lg font-bold text-blue-400">{waterLevel.toFixed(0)}%</span>
          </div>
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500"
              style={{ width: `${waterLevel}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
