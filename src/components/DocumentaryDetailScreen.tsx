import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  Sparkles, 
  Play
} from 'lucide-react';
import { DOCUMENTARIES } from '../data/mockData';
import { ViewScreen } from '../types';

interface DocumentaryDetailScreenProps {
  documentaryId: string;
  onNavigate: (screen: ViewScreen) => void;
}

export const DocumentaryDetailScreen: React.FC<DocumentaryDetailScreenProps> = ({ 
  documentaryId, 
  onNavigate 
}) => {
  const doc = DOCUMENTARIES.find(d => d.id === documentaryId) || DOCUMENTARIES[0];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-between py-6 px-4 sm:px-6 max-w-4xl mx-auto text-[#20201D]">
      
      {/* 1. TOP BAR: Subtle Back Link & Understated Series Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E4DDCC] pb-3">
          <button
            onClick={() => onNavigate({ type: 'documentaries' })}
            className="text-xs font-semibold text-[#8B6845] hover:text-[#20201D] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Toutes les séries</span>
          </button>

          <button
            onClick={() => onNavigate({ type: 'duo_feed', selectedDocId: doc.id })}
            className="text-xs font-semibold text-[#C89B3C] hover:text-[#8B6845] flex items-center gap-1 transition-colors"
          >
            <span>Explorer les duos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Very Subtle Visual Style for Series Selection */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1">
          {DOCUMENTARIES.map((item) => {
            const isSelected = item.id === doc.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate({ type: 'documentary_detail', documentaryId: item.id })}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  isSelected
                    ? 'bg-[#20201D] text-[#FFFDF8] font-medium shadow-xs'
                    : 'text-[#68655D] hover:text-[#20201D] hover:bg-[#E4DDCC]/50 border border-transparent'
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. REFINED CORE CONTENT (STRIPPED OF ALL METADATA & EXTRA DETAILS) */}
      <div className="my-auto py-10 sm:py-16 text-center space-y-6 max-w-2xl mx-auto">
        
        {/* Core 'Focus' */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C89B3C]/12 border border-[#C89B3C]/30 text-[#8B6845] text-xs font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
          <span>Focus • {doc.centralQuestion}</span>
        </div>

        {/* Title */}
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#20201D]">
          {doc.title}
        </h1>

        {/* One-Sentence Tagline */}
        <p className="font-editorial italic text-lg sm:text-xl text-[#8B6845] max-w-xl mx-auto leading-relaxed">
          « {doc.subtitle} »
        </p>

        {/* Brief Synopsis */}
        <p className="text-sm sm:text-base text-[#68655D] leading-relaxed max-w-lg mx-auto font-light">
          {doc.description}
        </p>

        {/* Clean Action Button */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => onNavigate({ type: 'duo_feed', selectedDocId: doc.id })}
            className="px-6 py-2.5 rounded-2xl bg-[#C89B3C] hover:bg-[#B78A2E] text-[#FFFDF8] text-xs font-semibold flex items-center gap-2 transition-all shadow-md hover:scale-105 active:scale-95"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Accéder aux duos de cette série</span>
          </button>
        </div>
      </div>

      {/* 3. MINIMAL FOOTER ACCENT */}
      <div className="text-center text-[11px] text-[#8B6845]/70 pb-2">
        YONYWOOD • Récits d'humanité et de transmission
      </div>

    </div>
  );
};
