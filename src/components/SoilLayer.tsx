interface SoilLayerProps {
  organicMatter: number;
  health: number;
}

export default function SoilLayer({ organicMatter, health }: SoilLayerProps) {
  const soilColor = () => {
    if (organicMatter >= 3) return 'from-amber-900 via-yellow-900 to-amber-800';
    if (organicMatter >= 2) return 'from-yellow-900 via-amber-900 to-yellow-800';
    return 'from-gray-700 via-gray-800 to-gray-700';
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
      <div className={`w-full h-full bg-gradient-to-b ${soilColor()} relative`}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-black/20"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}

        {organicMatter >= 2 && Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`worm-${i}`}
            className="absolute w-1 h-3 bg-pink-300/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
      </div>
    </div>
  );
}
