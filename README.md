# 🌱 Plant Growing Game

An interactive educational game about sustainable agriculture where players learn to grow plants from seeds to harvest, managing factors like soil pH, nutrients, water, and environmental conditions.

## 🎮 Project Description

This is a web game developed in **React + TypeScript** that realistically and educationally simulates the plant growing process. Players must make decisions about plant care, learning about:

- **Soil management**: pH, nutrients (N-P-K), organic matter
- **Irrigation**: Water levels and humidity
- **Environmental conditions**: Temperature and weather effects
- **Growth stages**: From seed to harvest with potatoes and flowers

## ✨ Main Features

### 🎯 Game Mechanics
- **5 progressive growth stages**
- **Scoring system** based on plant health
- **Dynamic environmental effects** (rain, sun, wind)
- **Detailed educational feedback** at game end

### 🎨 Visualization
- **Smooth animations** with CSS and JavaScript
- **Realistic visual representation** of plants, potatoes, and flowers
- **Particle effects** and environmental elements
- **Responsive interface** adaptable to different screens

### 📊 Management System
- **Action panel** for watering, fertilizing, and adjustments
- **Real-time indicators** of health and conditions
- **Visual progress** with bars and metrics
- **Performance analysis** upon game completion

## 🛠️ Technologies Used

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint

## 🚀 Installation and Setup

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **Git**

### Steps to run the project

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/plant-growing-game.git
   cd plant-growing-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The game will be available at: `http://localhost:5173/`

### Available Commands

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code quality
npm run lint         # Run ESLint
npm run typecheck    # Check TypeScript types
```

## 🎯 How to Play

1. **Start**: Begin with a seed at stage 1
2. **Management**: Use the action panel to:
   - 💧 Water the plant
   - 🧪 Add fertilizers (N-P-K)
   - 🌿 Add compost
   - ⚖️ Adjust soil pH
   - 🌡️ Control temperature
3. **Monitoring**: Watch health and condition indicators
4. **Progress**: Advance through 5 growth stages
5. **Harvest**: Complete the cycle and receive detailed feedback

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── PlantVisualization.tsx    # Main plant visualization
│   ├── ActionPanel.tsx           # Player action panel
│   ├── IndicatorPanel.tsx        # Status indicators
│   ├── ScorePanel.tsx            # Score panel
│   └── ...
├── hooks/              # Custom hooks
│   └── useGameLogic.ts           # Main game logic
├── types/              # TypeScript type definitions
│   └── game.ts                   # Game types
├── data/               # Game data
│   └── growthStages.ts           # Stage configuration
└── ...
```

## 🎓 Educational Value

This game teaches important concepts of sustainable agriculture:
- **Soil chemistry** and nutrient balance
- **Water management** and conservation
- **Plant growth cycles**
- **Environmental factors** affecting crops
- **Decision making** in agriculture

## 🤝 Contributing

Contributions are welcome! If you want to improve the game:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT License. See the `LICENSE` file for more details.

---

**Enjoy learning about sustainable agriculture! 🌱🎮**