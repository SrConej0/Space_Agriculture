import { useState, useEffect } from 'react';
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
  const [showEndModal, setShowEndModal] = useState(false);
  const { gameState, daysInStage, isProcessing, handleAction, handleEnvironmentalChange } = useGameLogic();

  useEffect(() => {
    if (gameState.stage === 5) {
      setShowEndModal(true);
    }
  }, [gameState.stage]);

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
              <div className="h-[32rem] relative bg-gradient-to-b from-sky-900/30 via-blue-900/20 to-gray-900 border-b border-green-500/30">
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

        {/* End-game modal as automatic alert */}
        {showEndModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className={`relative max-w-2xl w-full mx-4 rounded-lg border-2 p-6 shadow-2xl text-center animate-slideUp ${
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
                  ? 'Mission Completed Perfectly!'
                  : gameState.score >= 600 && gameState.plantHealth >= 70
                  ? 'Almost There!'
                  : gameState.score >= 400 && gameState.plantHealth >= 50
                  ? 'Mediocre Result'
                  : 'Mission Failed'}
              </h2>
              <p className="text-gray-300 text-lg mb-4">
                {gameState.score >= 800 && gameState.plantHealth >= 85 
                  ? 'You have successfully completed the full growth cycle with exceptional sustainable practices.'
                  : gameState.score >= 600 && gameState.plantHealth >= 70
                  ? 'You achieved good growth, but there is room for improvement in your agricultural techniques.'
                  : gameState.score >= 400 && gameState.plantHealth >= 50
                  ? 'The plant survived, but your techniques need much work.'
                  : 'The plant failed to develop properly. You need to study more about sustainable agriculture.'}
              </p>

              <div className="bg-gray-800/50 rounded-lg p-4 mb-4 text-left">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Performance Analysis:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">What you did well:</h4>
                    <ul className="space-y-1 text-gray-300">
                      {gameState.plantHealth >= 70 && <li>✓ Maintained good plant health ({gameState.plantHealth.toFixed(0)}%)</li>}
                      {gameState.soil.ph >= 5.0 && gameState.soil.ph <= 7.0 && <li>✓ Kept pH in optimal range ({gameState.soil.ph.toFixed(1)})</li>}
                      {gameState.soil.organicMatter >= 2 && <li>✓ Built up organic matter ({gameState.soil.organicMatter.toFixed(1)}%)</li>}
                      {gameState.waterLevel >= 50 && <li>✓ Managed water levels well ({gameState.waterLevel.toFixed(0)}%)</li>}
                      {gameState.soil.nitrogen >= 60 && <li>✓ Adequate nitrogen levels ({gameState.soil.nitrogen.toFixed(0)})</li>}
                      {gameState.daysElapsed <= 25 && <li>✓ Efficient time management ({gameState.daysElapsed} days)</li>}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-400 mb-2">Areas for improvement:</h4>
                    <ul className="space-y-1 text-gray-300">
                      {gameState.plantHealth < 70 && <li>× Plant health too low ({gameState.plantHealth.toFixed(0)}% - aim for 70%+)</li>}
                      {(gameState.soil.ph < 5.0 || gameState.soil.ph > 7.0) && <li>× pH out of range ({gameState.soil.ph.toFixed(1)} - aim for 5.0-7.0)</li>}
                      {gameState.soil.organicMatter < 2 && <li>× Low organic matter ({gameState.soil.organicMatter.toFixed(1)}% - aim for 2%+)</li>}
                      {gameState.waterLevel < 50 && <li>× Insufficient watering ({gameState.waterLevel.toFixed(0)}% - aim for 50%+)</li>}
                      {gameState.soil.nitrogen < 60 && <li>× Low nitrogen levels ({gameState.soil.nitrogen.toFixed(0)} - aim for 60+)</li>}
                      {gameState.soil.phosphorus < 40 && <li>× Low phosphorus levels ({gameState.soil.phosphorus.toFixed(0)} - aim for 40+)</li>}
                      {gameState.soil.potassium < 80 && <li>× Low potassium levels ({gameState.soil.potassium.toFixed(0)} - aim for 80+)</li>}
                      {gameState.daysElapsed > 30 && <li>× Took too long ({gameState.daysElapsed} days - aim for under 30)</li>}
                    </ul>
                  </div>
                </div>
              </div>
              <p className={`text-2xl font-bold ${
                gameState.score >= 800 ? 'text-green-400' :
                gameState.score >= 600 ? 'text-yellow-400' :
                gameState.score >= 400 ? 'text-orange-400' : 'text-red-400'
              }`}>
                Final Score: {gameState.score}
              </p>
              <p className="text-gray-400 mt-2">
                {gameState.score >= 600 
                  ? 'Your knowledge of sustainable agriculture will help feed humanity in 2050.'
                  : 'Study more about soil management, nutrient balance, and sustainable farming practices.'}
              </p>

              <div className="mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-5 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-semibold border border-red-500/70 shadow focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Finish
                </button>
              </div>
            </div>
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
