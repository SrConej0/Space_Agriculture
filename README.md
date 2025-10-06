# Space Agriculture Simulator

An interactive React + TypeScript game that teaches sustainable agriculture by guiding a potato crop from soil preparation to harvest. Manage soil pH and nutrients, irrigation, temperature, and weather to keep plant health high and complete the mission.

## Features
- Action panel: irrigate, fertilize (N-P-K), add compost, adjust pH, cool/warm soil
- Real-time indicators: pH, humidity, temperature, plant health, nutrient balance
- Growth stages with progress tracking and performance analysis at the end
- Environmental effects: day/night cycle and occasional rain
- Smooth visuals and subtle audio feedback for actions

## Tech Stack
- React 18 + TypeScript
- Tailwind CSS for styling
- Vite for development and build
- Lucide React icons

## Quickstart
1. Clone the repository
   ```bash
   git clone https://github.com/SrConej0/Space_Agriculture.git
   cd Space_Agriculture
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Run the development server
   ```bash
   npm run dev
   ```
4. Open the app in your browser at the URL shown in the terminal (e.g., http://localhost:5173/)

## Scripts
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview the production build
npm run lint      # Run ESLint
npm run typecheck # Check TypeScript types
```

## How to Play
- Keep plant health above 80% by balancing soil conditions
- Use action buttons wisely; each affects soil parameters
- Monitor indicators for pH (5.5–6.5), humidity (60–80%), and temperature (15–22°C)
- Advance through stages via consistent management; review performance analysis at the end

## Project Structure
```
src/
├── components/      # UI components (actions, indicators, visuals)
├── hooks/           # Game logic (useGameLogic)
├── data/            # Growth stages and initial/optimal soil data
├── types/           # TypeScript definitions
└── App.tsx          # Main application entry
```

## Contributing
1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

## License
MIT License. See `LICENSE` for details.
