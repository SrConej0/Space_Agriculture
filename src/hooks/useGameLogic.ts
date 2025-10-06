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
  const [environmentalEffects, setEnvironmentalEffects] = useState({


    isRaining: false,
    isDayTime: true
  });

  const calculatePlantHealth = useCallback((soil: typeof initialSoilData, waterLevel: number) => {
    let health = 60; // Start with higher base health

    // More forgiving pH range
    if (soil.ph >= 5.0 && soil.ph <= 7.0) health += 15;
    else if (soil.ph >= 4.5 && soil.ph <= 7.5) health += 8;
    
    // More forgiving humidity range
    if (soil.humidity >= 50 && soil.humidity <= 90) health += 12;
    else if (soil.humidity >= 40 && soil.humidity <= 95) health += 6;
    
    // More forgiving temperature range
    if (soil.temperature >= 12 && soil.temperature <= 25) health += 12;
    else if (soil.temperature >= 10 && soil.temperature <= 28) health += 6;
    
    // Lower nutrient requirements
    if (soil.nitrogen >= 60) health += 8;
    if (soil.phosphorus >= 40) health += 8;
    if (soil.potassium >= 80) health += 8;
    if (soil.organicMatter >= 2) health += 12;
    
    // More forgiving water level
    if (waterLevel >= 50 && waterLevel <= 90) health += 12;
    else if (waterLevel >= 40 && waterLevel <= 95) health += 6;

    // Less harsh penalties
    if (soil.ph < 4.0 || soil.ph > 8.0) health -= 10;
    if (soil.humidity < 30 || soil.humidity > 95) health -= 8;
    if (waterLevel < 25) health -= 10;

    return Math.max(0, Math.min(100, health));
  }, []);

  const calculateScore = useCallback((soil: typeof initialSoilData, health: number, stage: number) => {
    let score = 0;

    // More generous base score from plant health
    if (health >= 80) score += health * 3;
    else if (health >= 60) score += health * 2.5;
    else if (health >= 40) score += health * 2;
    else score += health * 1.5;

    // Organic matter (still important but more achievable)
    score += soil.organicMatter * 12;
    
    // Stage progression (more rewarding)
    score += stage * 60;

    // More forgiving pH balance
    if (soil.ph >= 5.0 && soil.ph <= 7.0) score += 30; // Good range
    else if (soil.ph >= 4.5 && soil.ph <= 7.5) score += 15; // Acceptable range
    else if (soil.ph >= 4.0 && soil.ph <= 8.0) score += 5; // Minimal range

    // More achievable nutrient balance
    if (soil.nitrogen >= 70 && soil.phosphorus >= 50 && soil.potassium >= 90) score += 40; // Good
    else if (soil.nitrogen >= 60 && soil.phosphorus >= 40 && soil.potassium >= 80) score += 25; // Acceptable
    else if (soil.nitrogen >= 50 && soil.phosphorus >= 30 && soil.potassium >= 70) score += 10; // Minimal
    
    // More forgiving temperature bonus/penalty
    if (soil.temperature >= 12 && soil.temperature <= 25) score += 15; // Good range
    else if (soil.temperature < 8 || soil.temperature > 30) score -= 10; // Only penalize extreme temperatures

    return Math.floor(score);
  }, []);

  // Function to add random variation to values
  const addRandomVariation = useCallback((value: number, min: number, max: number, variationAmount: number) => {
    const variation = (Math.random() * 2 - 1) * variationAmount; // Variation between -variationAmount and +variationAmount
    return Math.max(min, Math.min(max, value + variation));
  }, []);
  
  // Function to simulate weather changes
  const simulateWeatherChanges = useCallback(() => {
    // 20% chance of weather change
    if (Math.random() < 0.2) {
      const weatherType = Math.random();
      if (weatherType < 0.33) {
        // Hot weather
        return { tempChange: 3, humidityChange: -5, name: "hot" };
      } else if (weatherType < 0.66) {
        // Cold weather
        return { tempChange: -3, humidityChange: 0, name: "cold" };
      } else {
        // Rainy weather
        return { tempChange: -1, humidityChange: 10, name: "rainy" };
      }
    }
    return null;
  }, []);

  // Function to handle environmental effects
  const handleEnvironmentalChange = useCallback((isRaining: boolean, isDayTime: boolean) => {
    setEnvironmentalEffects({ isRaining, isDayTime });
    
    // Apply environmental effects to soil
    setGameState(prev => {
      const newSoil = { ...prev.soil };
      
      if (isRaining) {
        // Rain increases humidity and water level, slightly decreases temperature
        newSoil.humidity = Math.min(100, newSoil.humidity + 5);
        newSoil.temperature = Math.max(5, newSoil.temperature - 1);
        return {
          ...prev,
          soil: newSoil,
          waterLevel: Math.min(100, prev.waterLevel + 10)
        };
      }
      
      if (!isDayTime) {
        // Night decreases temperature
        newSoil.temperature = Math.max(5, newSoil.temperature - 2);
      } else {
        // Day increases temperature
        newSoil.temperature = Math.min(35, newSoil.temperature + 1);
      }
      
      return { ...prev, soil: newSoil };
    });
  }, []);

  const handleAction = useCallback((action: string) => {
    setIsProcessing(true);

    setGameState(prev => {
      const newState = { ...prev };
      const soil = { ...prev.soil };

      // Simulate weather changes
      const weatherChange = simulateWeatherChanges();
      if (weatherChange) {
        soil.temperature = Math.max(10, Math.min(30, soil.temperature + weatherChange.tempChange));
        soil.humidity = Math.max(0, Math.min(100, soil.humidity + weatherChange.humidityChange));
        console.log(`Weather change: ${weatherChange.name}!`);
      }

      // Add natural variation to pH and temperature with each action (more pronounced)
      soil.ph = addRandomVariation(soil.ph, 4.0, 8.0, 0.3);
      soil.temperature = addRandomVariation(soil.temperature, 10, 30, 0.8);

      switch (action) {
        case 'water':
          newState.waterLevel = Math.min(100, prev.waterLevel + 20);
          soil.humidity = Math.min(100, soil.humidity + 10);
          // Water can slightly affect pH and lower temperature
          soil.ph = addRandomVariation(soil.ph, 4.0, 8.0, 0.1);
          soil.temperature = Math.max(10, soil.temperature - 0.5);
          break;

        case 'fertilize_n':
          soil.nitrogen = Math.min(150, soil.nitrogen + 20);
          soil.electricalConductivity = Math.min(3, soil.electricalConductivity + 0.2);
          // Fertilizers can acidify the soil slightly
          soil.ph = Math.max(4.0, soil.ph - 0.1);
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
          // Compost can slightly increase soil temperature
          soil.temperature = Math.min(30, soil.temperature + 0.3);
          break;

        case 'adjust_ph':
          const targetPh = 6.0;
          const diff = targetPh - soil.ph;
          soil.ph = soil.ph + (diff * 0.3);
          break;
          
        case 'cool_soil':
          // New action to cool the soil
          soil.temperature = Math.max(10, soil.temperature - 2);
          break;
          
        case 'warm_soil':
          // New action to warm the soil
          soil.temperature = Math.min(30, soil.temperature + 2);
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

        soil.humidity = Math.max(0, soil.humidity - 3);
        newState.waterLevel = Math.max(0, prev.waterLevel - 4);
        soil.nitrogen = Math.max(0, soil.nitrogen - 2);
        soil.phosphorus = Math.max(0, soil.phosphorus - 1.5);
        soil.potassium = Math.max(0, soil.potassium - 2);

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
    handleAction,
    handleEnvironmentalChange
  };
}
