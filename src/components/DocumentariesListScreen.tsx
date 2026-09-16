import React from 'react';
import { DOCUMENTARIES } from '../data/mockData';
import { ViewScreen } from '../types';

interface DocumentariesListScreenProps {
  onNavigate: (screen: ViewScreen) => void;
}

export const DocumentariesListScreen: React.FC<DocumentariesListScreenProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 text-[#20201D]">
      {/* Pure series cards grid — No tagline, no button, no arrow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {DOCUMENTARIES.map((doc) => (
          <div 
            key={doc.id}
            onClick={() => onNavigate({ type: 'duo_feed', selectedDocId: doc.id })}
            id={`series-card-pure-${doc.id}`}
            className="group cursor-pointer bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] hover:border-[#C89B3C] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Cover Image with Title */}
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src={doc.coverImage}
                alt={doc.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#20201D]/90 via-[#20201D]/20 to-transparent" />
              
              {/* Title only */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight group-hover:text-[#D9AF52] transition-colors">
                  {doc.title}
                </h2>
              </div>
            </div>

            {/* Synopsis only */}
            <div className="p-6">
              <p className="text-sm text-[#68655D] leading-relaxed font-light">
                {doc.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
