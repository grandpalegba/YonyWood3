import React from 'react';
import { 
  ArrowLeft, 
  TreePine, 
  Sparkles, 
  Quote, 
  ArrowRight, 
  Compass, 
  Link2,
  Users
} from 'lucide-react';
import { PROTAGONISTS, DOCUMENTARIES } from '../data/mockData';
import { ViewScreen } from '../types';

interface TransmissionScreenProps {
  protagonistId: string;
  transmissionId: string;
  onNavigate: (screen: ViewScreen) => void;
}

export const TransmissionScreen: React.FC<TransmissionScreenProps> = ({
  protagonistId,
  transmissionId,
  onNavigate
}) => {
  const protagonist = PROTAGONISTS.find(p => p.id === protagonistId) || PROTAGONISTS[0];
  const transmission = protagonist.tree.transmissions.find(t => t.id === transmissionId) || protagonist.tree.transmissions[0];
  const connectedProtagonist = transmission.connectedProtagonistId 
    ? PROTAGONISTS.find(p => p.id === transmission.connectedProtagonistId)
    : PROTAGONISTS.find(p => p.id !== protagonist.id);

  return (
    <div className="min-h-screen pb-20">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Navigation back */}
        <button
          onClick={() => onNavigate({ type: 'protagonist_profile', protagonistId: protagonist.id })}
          className="text-xs font-semibold text-[#8B6845] hover:text-[#20201D] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'arbre de {protagonist.name}</span>
        </button>

        {/* Transmission Conceptual Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-xs font-bold text-[#8B6845]">
            <Link2 className="w-3.5 h-3.5 text-[#C89B3C]" />
            ÉCRAN 07 : EXPLORER UNE TRANSMISSION
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#20201D]">
            De Racine en Racine : Le Fil Vivant
          </h1>

          <p className="text-sm sm:text-base text-[#68655D] max-w-2xl mx-auto leading-relaxed">
            Dans YonyWood, aucune histoire n'existe en autarcie. Chaque récit prend racine dans une transmission antérieure et ouvre un chemin vers une nouvelle rencontre.
          </p>
        </div>

        {/* The Connection Card Between Two Beings */}
        <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 sm:p-10 shadow-card space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#E4DDCC] pb-8">
            
            {/* Origin Protagonist */}
            <div className="text-center space-y-2">
              <img
                src={protagonist.photoUrl}
                alt={protagonist.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover mx-auto shadow-md border-2 border-[#C89B3C]"
              />
              <h3 className="font-editorial font-bold text-base text-[#20201D]">
                {protagonist.name}
              </h3>
              <p className="text-xs text-[#8B6845]">{protagonist.role}</p>
            </div>

            {/* Connecting Bridge Motif */}
            <div className="text-center space-y-2 px-4">
              <div className="w-12 h-12 rounded-full bg-[#F5F1E8] border border-[#C89B3C] mx-auto flex items-center justify-center text-[#8B6845]">
                <TreePine className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C89B3C] block">
                Lignée & Transmission
              </span>
              <p className="font-editorial italic text-sm text-[#20201D]">
                « {transmission.title} »
              </p>
            </div>

            {/* Destination Protagonist / Connected Lineage */}
            {connectedProtagonist && (
              <div className="text-center space-y-2">
                <img
                  src={connectedProtagonist.photoUrl}
                  alt={connectedProtagonist.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover mx-auto shadow-md border-2 border-[#8B6845]"
                />
                <h3 className="font-editorial font-bold text-base text-[#20201D]">
                  {connectedProtagonist.name}
                </h3>
                <p className="text-xs text-[#8B6845]">{connectedProtagonist.role}</p>
              </div>
            )}

          </div>

          {/* Details of the lineage */}
          <div className="space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#F5F1E8] border border-[#E4DDCC] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B6845] block">
                Source de la Transmission
              </span>
              <h4 className="font-editorial text-xl font-semibold text-[#20201D]">
                Transmis par : {transmission.ancestorOrMentor}
              </h4>
              <p className="text-sm text-[#68655D] leading-relaxed">
                {transmission.description}
              </p>
            </div>

            {/* Direct Philosophical Quote */}
            <div className="p-6 rounded-2xl bg-[#FFFDF8] border-l-4 border-[#C89B3C] shadow-xs space-y-2">
              <Quote className="w-6 h-6 text-[#C89B3C] opacity-70" />
              <p className="font-editorial italic text-base sm:text-lg text-[#20201D] leading-relaxed">
                {protagonist.quote}
              </p>
            </div>

            {/* Exploration CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              {connectedProtagonist && (
                <button
                  onClick={() => onNavigate({ type: 'protagonist_profile', protagonistId: connectedProtagonist.id })}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#C89B3C] hover:bg-[#B78A2E] text-white font-medium text-sm transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explorer cette connexion ({connectedProtagonist.name})</span>
                </button>
              )}

              <button
                onClick={() => onNavigate({ type: 'documentaries' })}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#FFFDF8] hover:bg-[#F5F1E8] border border-[#E4DDCC] text-xs font-semibold text-[#20201D] transition-colors"
              >
                Poursuivre la marche dans la forêt
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
