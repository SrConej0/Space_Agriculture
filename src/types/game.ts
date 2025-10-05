export interface SoilData {
  ph: number;
  humidity: number;
  temperature: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  electricalConductivity: number;
}

export interface GrowthStage {
  id: string;
  name: string;
  duration: number;
  description: string;
}

export interface GameState {
  stage: number;
  score: number;
  soil: SoilData;
  plantHealth: number;
  waterLevel: number;
  achievements: string[];
  daysElapsed: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}
