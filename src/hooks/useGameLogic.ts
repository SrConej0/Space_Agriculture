import { useState, useEffect, useCallback } from 'react';
import { GameState } from '../types/game';
import { initialSoilData, growthStages } from '../data/growthStages';

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>({
    stage: 0,
    score: 0,
    soil: initialSoilData,
    plantHealth: 50,
    waterLevel: 35,
    achievements: [],
    daysElapsed: 0
  });

  const [daysInStage, setDaysInStage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const calculatePlantHealth = useCallback((soil: typeof initialSoilData, waterLevel: number) => {
    let health = 50;

    if (soil.ph >= 5.5 && soil.ph <= 6.5) health += 10;
    if (soil.humidity >= 60 && soil.humidity <= 80) health += 10;
    if (soil.temperature >= 15 && soil.temperature <= 22) health += 10;
    if (soil.nitrogen >= 80) health += 5;
    if (soil.phosphorus >= 60) health += 5;
    if (soil.potassium >= 100) health += 5;
    if (soil.organicMatter >= 3) health += 10;
    if (waterLevel >= 60 && waterLevel <= 80) health += 10;

    if (soil.ph < 5.0 || soil.ph > 7.0) health -= 15;
    if (soil.humidity < 40 || soil.humidity > 90) health -= 10;
    if (waterLevel < 30) health -= 15;

    return Math.max(0, Math.min(100, health));
  }, []);

  const calculateScore = useCallback((soil: typeof initialSoilData, health: number, stage: number) => {
    let score = 0;

    score += health * 2;
    score += soil.organicMatter * 10;
    score += stage * 50;

    if (soil.ph >= 5.5 && soil.ph <= 6.5) score += 20;
    if (soil.nitrogen >= 80 && soil.phosphorus >= 60 && soil.potassium >= 100) score += 30;

    return Math.floor(score);
  }, []);

  const handleAction = useCallback((action: string) => {
    setIsProcessing(true);

    setGameState(prev => {
      const newState = { ...prev };
      const soil = { ...prev.soil };

      switch (action) {
        case 'water':
          newState.waterLevel = Math.min(100, prev.waterLevel + 20);
          soil.humidity = Math.min(100, soil.humidity + 10);
          break;

        case 'fertilize_n':
          soil.nitrogen = Math.min(150, soil.nitrogen + 20);
          soil.electricalConductivity = Math.min(3, soil.electricalConductivity + 0.2);
          break;

        case 'fertilize_p':
          soil.phosphorus = Math.min(120, soil.phosphorus + 15);
          soil.electricalConductivity = Math.min(3, soil.electricalConductivity + 0.15);
          break;

        case 'fertilize_k':
          soil.potassium = Math.min(180, soil.potassium + 20);
          soil.electricalConductivity = Math.min(3, soil.electricalConductivity + 0.15);
          break;

        case 'compost':
          soil.organicMatter = Math.min(6, soil.organicMatter + 0.5);
          soil.nitrogen = Math.min(150, soil.nitrogen + 10);
          soil.phosphorus = Math.min(120, soil.phosphorus + 5);
          soil.potassium = Math.min(180, soil.potassium + 10);
          break;

        case 'adjust_ph':
          const targetPh = 6.0;
          const diff = targetPh - soil.ph;
          soil.ph = soil.ph + (diff * 0.3);
          break;
      }

      newState.soil = soil;
      newState.plantHealth = calculatePlantHealth(soil, newState.waterLevel);
      newState.score = calculateScore(soil, newState.plantHealth, newState.stage);

      return newState;
    });

    setTimeout(() => setIsProcessing(false), 300);
  }, [calculatePlantHealth, calculateScore]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => {
        const newState = { ...prev };
        const soil = { ...prev.soil };

        soil.humidity = Math.max(0, soil.humidity - 2);
        newState.waterLevel = Math.max(0, prev.waterLevel - 3);
        soil.nitrogen = Math.max(0, soil.nitrogen - 1);
        soil.phosphorus = Math.max(0, soil.phosphorus - 0.5);
        soil.potassium = Math.max(0, soil.potassium - 1);

        newState.soil = soil;
        newState.plantHealth = calculatePlantHealth(soil, newState.waterLevel);
        newState.score = calculateScore(soil, newState.plantHealth, newState.stage);
        newState.daysElapsed = prev.daysElapsed + 1;

        return newState;
      });

      setDaysInStage(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [calculatePlantHealth, calculateScore]);

  useEffect(() => {
    if (daysInStage >= growthStages[gameState.stage].duration) {
      if (gameState.stage < growthStages.length - 1) {
        setGameState(prev => ({
          ...prev,
          stage: prev.stage + 1
        }));
        setDaysInStage(0);
      }
    }
  }, [daysInStage, gameState.stage]);

  return {
    gameState,
    daysInStage,
    isProcessing,
    handleAction
  };
}
