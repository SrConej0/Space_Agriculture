import { useState } from 'react';
import { Info, X } from 'lucide-react';

interface EducationalTooltipProps {
  title: string;
  content: string;
  children?: React.ReactNode;
}

export default function EducationalTooltip({ title, content, children }: EducationalTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
      >
        {children}
        <Info className="w-4 h-4 animate-pulse" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-blue-500/50 rounded-xl p-6 shadow-2xl mx-4 animate-scaleIn">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  {title}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-300 leading-relaxed">{content}</p>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
