import { Trophy, Target, Award } from 'lucide-react';
import { GameState } from '../types/game';

interface ScorePanelProps {
  gameState: GameState;
}

export default function ScorePanel({ gameState }: ScorePanelProps) {
  const achievements = [
    { id: 'soil_master', title: 'Soil Master', condition: gameState.soil.organicMatter >= 3, icon: '🌱' },
    { id: 'water_wise', title: 'Water Wise', condition: gameState.waterLevel >= 60 && gameState.waterLevel <= 80, icon: '💧' },
    { id: 'balanced_nutrients', title: 'Nutrient Balance', condition:
      gameState.soil.nitrogen >= 80 && gameState.soil.phosphorus >= 60 && gameState.soil.potassium >= 100, icon: '⚗️' },
    { id: 'healthy_plant', title: 'Thriving Plant', condition: gameState.plantHealth >= 80, icon: '🌿' },
    { id: 'ph_perfect', title: 'pH Perfect', condition: gameState.soil.ph >= 5.5 && gameState.soil.ph <= 6.5, icon: '🎯' },
    { id: 'temp_control', title: 'Temperature Control', condition: gameState.soil.temperature >= 16 && gameState.soil.temperature <= 20, icon: '🌡️' },
    { id: 'efficiency', title: 'Efficient Farmer', condition: gameState.score > 500 && gameState.daysElapsed < 20, icon: '⏱️' },
    { id: 'master_gardener', title: 'Master Gardener', condition: gameState.plantHealth >= 90 && gameState.stage >= 3, icon: '👨‍🌾' }
  ];

  // Calculate performance metrics
  const performanceMetrics = [
    { 
      name: 'Growth Efficiency', 
      value: Math.min(100, Math.round((gameState.stage * 100) / Math.max(1, gameState.daysElapsed / 5))),
      description: 'How quickly your plant is growing'
    },
    { 
      name: 'Resource Management', 
      value: Math.min(100, Math.round((gameState.score / Math.max(1, gameState.daysElapsed * 5)))),
      description: "How efficiently you're using resources"
    },
    { 
      name: 'Soil Quality', 
      value: Math.min(100, Math.round((gameState.soil.organicMatter * 20) + 
        (gameState.soil.ph >= 5.5 && gameState.soil.ph <= 6.5 ? 30 : 0))),
      description: 'Overall soil health and balance'
    }
  ];

  const unlockedCount = achievements.filter(a => a.condition).length;

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-bold text-green-400">Mission Progress</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-yellow-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Score
            </span>
            <span className="text-3xl font-bold text-yellow-400">{gameState.score}</span>
          </div>
          <div className="text-xs text-gray-500">Based on soil health and plant growth</div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">Achievements</span>
            <span className="text-xs text-gray-500 ml-auto">{unlockedCount}/{achievements.length}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`
                  relative aspect-square rounded-lg border-2
                  flex items-center justify-center text-2xl
                  transition-all duration-500
                  ${achievement.condition
                    ? 'bg-green-900/50 border-green-500/50 scale-100'
                    : 'bg-gray-800/30 border-gray-700/30 scale-95 grayscale opacity-50'}
                `}
                title={achievement.title}
              >
                {achievement.icon}
                {achievement.condition && (
                  <div className="absolute inset-0 bg-green-400/20 rounded-lg animate-ping" style={{ animationDuration: '2s' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Performance Metrics</span>
          </div>
          
          <div className="space-y-3">
            {performanceMetrics.map((metric) => (
              <div key={metric.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">{metric.name}</span>
                  <span className="text-xs font-semibold text-blue-400">{metric.value}%</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      metric.value >= 80 ? 'bg-green-500' : 
                      metric.value >= 50 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
          <div className="text-xs text-gray-400">
            Days elapsed: <span className="text-green-400 font-semibold">{gameState.daysElapsed}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
