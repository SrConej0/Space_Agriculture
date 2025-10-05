import { useState } from 'react';
import CosmicBackground from './components/CosmicBackground';
import StoryIntro from './components/StoryIntro';
import ProgressBar from './components/ProgressBar';
import PlantVisualization from './components/PlantVisualization';
import IndicatorPanel from './components/IndicatorPanel';
import ActionPanel from './components/ActionPanel';
import ScorePanel from './components/ScorePanel';
import SoilLayer from './components/SoilLayer';
import EnvironmentalEffects from './components/EnvironmentalEffects';
import { useGameLogic } from './hooks/useGameLogic';
import { Rocket, BookOpen } from 'lucide-react';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const { gameState, daysInStage, isProcessing, handleAction, handleEnvironmentalChange } = useGameLogic();

  if (!gameStarted) {
    return (
      <>
        <CosmicBackground />
        <StoryIntro onStart={() => setGameStarted(true)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900/10 to-gray-900 relative overflow-hidden">
      <CosmicBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="mb-8 text-center relative">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Rocket className="w-8 h-8 text-green-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
              History of Space Agriculture
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Sustainable Potato Cultivation - Year 2050</p>

          <button
            onClick={() => setShowTutorial(!showTutorial)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-lg text-blue-300 hover:bg-blue-600/30 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            {showTutorial ? 'Hide' : 'Show'} Tutorial
          </button>

          {showTutorial && (
            <div className="mt-4 mx-auto max-w-3xl bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/30 rounded-xl p-6 text-left animate-slideDown">
              <h3 className="text-xl font-bold text-blue-400 mb-4">How to Play</h3>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">
                  <span className="text-green-400 font-semibold">Goal:</span> Guide your potato plant through all growth stages by maintaining optimal soil conditions.
                </p>
                <p className="leading-relaxed">
                  <span className="text-green-400 font-semibold">Actions:</span> Use the action buttons to irrigate, fertilize, add compost, or adjust pH. Each action affects soil parameters.
                </p>
                <p className="leading-relaxed">
                  <span className="text-green-400 font-semibold">Monitoring:</span> Watch the indicators panel for pH, humidity, temperature, and plant health. Keep values in optimal ranges.
                </p>
                <p className="leading-relaxed">
                  <span className="text-green-400 font-semibold">Learn:</span> Click the info icons to learn about each parameter and action's effects.
                </p>
                <p className="leading-relaxed">
                  <span className="text-green-400 font-semibold">Time:</span> Soil conditions degrade over time. Monitor and adjust regularly to maintain plant health above 80%.
                </p>
              </div>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-3">
            <ProgressBar currentStage={gameState.stage} daysInStage={daysInStage} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-green-500/30 rounded-lg shadow-2xl overflow-hidden hover:border-green-400/50 transition-colors">
              <div className="h-96 relative bg-gradient-to-b from-sky-900/30 via-blue-900/20 to-gray-900 border-b border-green-500/30">
                <SoilLayer organicMatter={gameState.soil.organicMatter} health={gameState.plantHealth} />
                <PlantVisualization stage={gameState.stage} health={gameState.plantHealth} />
                <EnvironmentalEffects 
                  daysElapsed={gameState.daysElapsed} 
                  onWeatherChange={handleEnvironmentalChange} 
                />

                <div className="absolute top-4 left-4 bg-gray-900/80 border border-green-500/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="text-xs text-gray-400">Growth Stage</div>
                  <div className="text-lg font-bold text-green-400">{gameState.stage + 1}/6</div>
                </div>

                <div className="absolute top-4 right-4 bg-gray-900/80 border border-blue-500/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="text-xs text-gray-400">Health</div>
                  <div className={`text-lg font-bold ${
                    gameState.plantHealth >= 80 ? 'text-green-400' :
                    gameState.plantHealth >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {gameState.plantHealth.toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>

            <ActionPanel
              gameState={gameState}
              onAction={handleAction}
              disabled={isProcessing}
            />
          </div>

          <div className="space-y-6">
            <IndicatorPanel
              soil={gameState.soil}
              plantHealth={gameState.plantHealth}
              waterLevel={gameState.waterLevel}
            />
            <ScorePanel gameState={gameState} />
          </div>
        </div>

        {gameState.stage === 5 && (
          <div className={`mt-8 backdrop-blur-sm border-2 rounded-lg p-6 shadow-2xl text-center animate-slideUp ${
            gameState.score >= 800 && gameState.plantHealth >= 85 
              ? 'bg-gradient-to-br from-green-900/90 to-green-800/90 border-green-500/50'
              : gameState.score >= 600 && gameState.plantHealth >= 70
              ? 'bg-gradient-to-br from-yellow-900/90 to-yellow-800/90 border-yellow-500/50'
              : gameState.score >= 400 && gameState.plantHealth >= 50
              ? 'bg-gradient-to-br from-orange-900/90 to-orange-800/90 border-orange-500/50'
              : 'bg-gradient-to-br from-red-900/90 to-red-800/90 border-red-500/50'
          }`}>
            <h2 className={`text-3xl font-bold mb-4 ${
              gameState.score >= 800 && gameState.plantHealth >= 85 
                ? 'text-green-400'
                : gameState.score >= 600 && gameState.plantHealth >= 70
                ? 'text-yellow-400'
                : gameState.score >= 400 && gameState.plantHealth >= 50
                ? 'text-orange-400'
                : 'text-red-400'
            }`}>
              {gameState.score >= 800 && gameState.plantHealth >= 85 
                ? '¡Misión Completada Perfectamente!'
                : gameState.score >= 600 && gameState.plantHealth >= 70
                ? '¡Casi lo Logras!'
                : gameState.score >= 400 && gameState.plantHealth >= 50
                ? 'Resultado Mediocre'
                : 'Misión Fallida'}
            </h2>
            <p className="text-gray-300 text-lg mb-4">
              {gameState.score >= 800 && gameState.plantHealth >= 85 
                ? 'Has completado exitosamente el ciclo completo de crecimiento con prácticas sostenibles excepcionales.'
                : gameState.score >= 600 && gameState.plantHealth >= 70
                ? 'Has logrado un buen crecimiento, pero hay margen de mejora en tus técnicas agrícolas.'
                : gameState.score >= 400 && gameState.plantHealth >= 50
                ? 'La planta sobrevivió, pero tus técnicas necesitan mucho trabajo.'
                : 'La planta no logró desarrollarse adecuadamente. Necesitas estudiar más sobre agricultura sostenible.'}
            </p>
            <p className={`text-2xl font-bold ${
              gameState.score >= 800 ? 'text-green-400' :
              gameState.score >= 600 ? 'text-yellow-400' :
              gameState.score >= 400 ? 'text-orange-400' : 'text-red-400'
            }`}>
              Puntuación Final: {gameState.score}
            </p>
            <p className="text-gray-400 mt-2">
              {gameState.score >= 600 
                ? 'Tu conocimiento de agricultura sostenible ayudará a alimentar a la humanidad en 2050.'
                : 'Necesitas más práctica antes de poder ayudar a salvar la agricultura del futuro.'}
            </p>
          </div>
        )}
      </div>

      <style>{`
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
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
