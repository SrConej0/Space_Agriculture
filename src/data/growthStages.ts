import { GrowthStage } from '../types/game';

export const growthStages: GrowthStage[] = [
  {
    id: 'preparation',
    name: 'Soil Preparation',
    duration: 15,
    description: 'Prepare degraded soil with organic matter and adjust pH levels for optimal potato growth.'
  },
  {
    id: 'planting',
    name: 'Planting Phase',
    duration: 10,
    description: 'Plant seed potatoes at the correct depth and spacing in the prepared soil.'
  },
  {
    id: 'vegetative',
    name: 'Vegetative Growth',
    duration: 30,
    description: 'Monitor foliage development, ensure proper irrigation, and apply balanced fertilization.'
  },
  {
    id: 'tuber',
    name: 'Tuber Formation',
    duration: 35,
    description: 'Critical phase where potatoes develop underground. Maintain consistent moisture and nutrients.'
  },
  {
    id: 'maturation',
    name: 'Maturation',
    duration: 20,
    description: 'Final stage where tubers reach full size. Reduce watering as harvest approaches.'
  },
  {
    id: 'harvest',
    name: 'Harvest',
    duration: 5,
    description: 'Carefully harvest mature potatoes and evaluate the success of your sustainable practices.'
  }
];

export const initialSoilData = {
  ph: 5.2,
  humidity: 35,
  temperature: 18,
  nitrogen: 40,
  phosphorus: 25,
  potassium: 30,
  organicMatter: 1.5,
  electricalConductivity: 0.8
};

export const optimalSoilData = {
  ph: { min: 5.5, max: 6.5 },
  humidity: { min: 60, max: 80 },
  temperature: { min: 15, max: 22 },
  nitrogen: { min: 80, max: 120 },
  phosphorus: { min: 60, max: 90 },
  potassium: { min: 100, max: 150 },
  organicMatter: { min: 3, max: 5 },
  electricalConductivity: { min: 1.0, max: 2.0 }
};
