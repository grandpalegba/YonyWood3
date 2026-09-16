import React from 'react';
import { 
  ArrowLeft, 
  Play, 
  Sparkles, 
  MapPin, 
  Compass, 
  TreePine, 
  Share2, 
  Quote,
  Clock,
  ArrowRight
} from 'lucide-react';
import { DUOS, PROTAGONISTS } from '../data/mockData';
import { ViewScreen, Duo } from '../types';

interface DuoScreenProps {
  duoId: string;
  onNavigate: (screen: ViewScreen) => void;
}

export const DuoScreen: React.FC<DuoScreenProps> = ({ duoId, onNavigate }) => {
  const duo = DUOS.find(d => d.id === duoId) || DUOS[0];

  return (
    <div className="min-h-screen bg-[#F3E9D2]/40 pb-20">
      
      {/* 1. CLAIRIÈRE TOP BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Navigation back and switch duos */}
        <div className="flex items-center justify-between border-b border-[#E4DDCC] pb-4">
          <button
            onClick={() => onNavigate({ type: 'documentary_detail', documentaryId: duo.documentaryId })}
            className="text-xs font-semibold text-[#8B6845] hover:text-[#20201D] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à la série {duo.documentaryTitle}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#68655D] hidden sm:inline">Autre clairière :</span>
            <select
              value={duo.id}
              onChange={(e) => onNavigate({ type: 'duo_detail', duoId: e.target.value })}
              className="text-xs bg-[#FFFDF8] border border-[#E4DDCC] rounded-lg px-2.5 py-1.5 text-[#20201D]"
            >
              {DUOS.map(item => (
                <option key={item.id} value={item.id}>
                  {item.documentaryTitle} — {item.protagonistA.name.split(' ')[0]} × {item.protagonistB.name.split(' ')[0]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Glade Header */}
        <div className="py-8 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-xs font-bold text-[#8B6845]">
            <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
            NIVEAU 2 : LA CLAIRIÈRE ÉDITORIALE • {duo.episodeNumber}
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#20201D]">
            {duo.protagonistA.name} <span className="text-[#C89B3C] font-light">×</span> {duo.protagonistB.name}
          </h1>

          <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E4DDCC] shadow-card mt-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B6845] block mb-1">
              La Question Commune
            </span>
            <p className="font-editorial italic text-lg sm:text-xl text-[#20201D] leading-snug">
              « {duo.centralQuestion} »
            </p>
          </div>
        </div>

      </div>

      {/* 2. THE TWO FACING UNIVERSES (CONTRASTED CLAIRIÈRE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
          
          {/* Central Intersection Golden Token for Desktop */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-[#FFFDF8] border-2 border-[#C89B3C] shadow-lg items-center justify-center text-[#8B6845] font-editorial text-lg font-bold">
            ×
          </div>

          {/* ================= PROTAGONIST A ================= */}
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] overflow-hidden shadow-card flex flex-col justify-between">
            <div>
              {/* Universe Header Banner */}
              <div className="p-4 bg-[#F5F1E8] border-b border-[#E4DDCC] flex items-center justify-between text-xs">
                <span className="font-bold text-[#C89B3C] uppercase tracking-wider">
                  UNIVERS {duo.protagonistA.universeTag}
                </span>
                <span className="text-[#68655D] flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#8B6845]" />
                  {duo.protagonistA.territory} {duo.protagonistA.flag}
                </span>
              </div>

              {/* Portrait & Media Teaser */}
              <div className="p-6 space-y-6">
                
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0">
                    <img
                      src={duo.protagonistA.photoUrl}
                      alt={duo.protagonistA.name}
                      className="w-full h-full object-cover rounded-2xl shadow-sm border-2 border-[#C89B3C]/40"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#FFFDF8] border border-[#E4DDCC] shadow flex items-center justify-center text-sm">
                      {duo.protagonistA.flag}
                    </div>
                  </div>

                  <div className="text-center sm:text-left space-y-0.5 font-sans">
                    <h3 className="text-lg sm:text-xl font-bold text-[#20201D] tracking-tight">
                      {duo.protagonistA.name.split(' ')[0]}
                    </h3>
                    {duo.protagonistA.age && (
                      <p className="text-xs sm:text-sm text-[#8B6845] font-normal">
                        {duo.protagonistA.age} ans
                      </p>
                    )}
                    <button
                      onClick={() => onNavigate({ type: 'protagonist_profile', protagonistId: duo.protagonistA.id })}
                      className="inline-flex items-center gap-1 text-xs text-[#C89B3C] hover:underline pt-1 font-semibold"
                    >
                      <TreePine className="w-3.5 h-3.5" />
                      Voir son arbre vivant
                    </button>
                  </div>
                </div>

                {/* Direct Quote Excerpt */}
                <div className="p-5 rounded-2xl bg-[#F5F1E8] border-l-4 border-[#C89B3C] space-y-2">
                  <Quote className="w-5 h-5 text-[#C89B3C] opacity-70" />
                  <p className="font-editorial italic text-base text-[#20201D] leading-relaxed">
                    {duo.quoteA}
                  </p>
                </div>

                {/* Video Story Meta */}
                <div className="p-4 rounded-xl bg-[#FFFDF8] border border-[#E4DDCC] space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#68655D]">
                    <span className="font-bold text-[#20201D]">
                      Histoire : {duo.storyA.title}
                    </span>
                    <span className="flex items-center gap-1 text-[#8B6845]">
                      <Clock className="w-3.5 h-3.5" />
                      {duo.storyA.duration}
                    </span>
                  </div>
                  <p className="text-xs text-[#68655D] leading-relaxed">
                    {duo.storyA.summary}
                  </p>
                </div>

              </div>
            </div>

            {/* CTA Immersion A */}
            <div className="p-6 pt-0">
              <button
                onClick={() => onNavigate({
                  type: 'video_player',
                  story: duo.storyA,
                  protagonist: duo.protagonistA,
                  duoId: duo.id,
                  documentaryTitle: duo.documentaryTitle
                })}
                className="w-full py-3.5 rounded-xl bg-[#20201D] hover:bg-[#0E0D0B] text-[#FFFDF8] font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2.5 group"
                id="duo-watch-a-btn"
              >
                <div className="w-6 h-6 rounded-full bg-[#C89B3C] flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Regarder l'histoire de {duo.protagonistA.name.split(' ')[0]}</span>
              </button>
            </div>
          </div>

          {/* ================= PROTAGONIST B ================= */}
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] overflow-hidden shadow-card flex flex-col justify-between">
            <div>
              {/* Universe Header Banner */}
              <div className="p-4 bg-[#F5F1E8] border-b border-[#E4DDCC] flex items-center justify-between text-xs">
                <span className="font-bold text-[#8B6845] uppercase tracking-wider">
                  UNIVERS {duo.protagonistB.universeTag}
                </span>
                <span className="text-[#68655D] flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#8B6845]" />
                  {duo.protagonistB.territory} {duo.protagonistB.flag}
                </span>
              </div>

              {/* Portrait & Media Teaser */}
              <div className="p-6 space-y-6">
                
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0">
                    <img
                      src={duo.protagonistB.photoUrl}
                      alt={duo.protagonistB.name}
                      className="w-full h-full object-cover rounded-2xl shadow-sm border-2 border-[#8B6845]/40"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#FFFDF8] border border-[#E4DDCC] shadow flex items-center justify-center text-sm">
                      {duo.protagonistB.flag}
                    </div>
                  </div>

                  <div className="text-center sm:text-left space-y-0.5 font-sans">
                    <h3 className="text-lg sm:text-xl font-bold text-[#20201D] tracking-tight">
                      {duo.protagonistB.name.split(' ')[0]}
                    </h3>
                    {duo.protagonistB.age && (
                      <p className="text-xs sm:text-sm text-[#8B6845] font-normal">
                        {duo.protagonistB.age} ans
                      </p>
                    )}
                    <button
                      onClick={() => onNavigate({ type: 'protagonist_profile', protagonistId: duo.protagonistB.id })}
                      className="inline-flex items-center gap-1 text-xs text-[#C89B3C] hover:underline pt-1 font-semibold"
                    >
                      <TreePine className="w-3.5 h-3.5" />
                      Voir son arbre vivant
                    </button>
                  </div>
                </div>

                {/* Direct Quote Excerpt */}
                <div className="p-5 rounded-2xl bg-[#F5F1E8] border-l-4 border-[#8B6845] space-y-2">
                  <Quote className="w-5 h-5 text-[#8B6845] opacity-70" />
                  <p className="font-editorial italic text-base text-[#20201D] leading-relaxed">
                    {duo.quoteB}
                  </p>
                </div>

                {/* Video Story Meta */}
                <div className="p-4 rounded-xl bg-[#FFFDF8] border border-[#E4DDCC] space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#68655D]">
                    <span className="font-bold text-[#20201D]">
                      Histoire : {duo.storyB.title}
                    </span>
                    <span className="flex items-center gap-1 text-[#8B6845]">
                      <Clock className="w-3.5 h-3.5" />
                      {duo.storyB.duration}
                    </span>
                  </div>
                  <p className="text-xs text-[#68655D] leading-relaxed">
                    {duo.storyB.summary}
                  </p>
                </div>

              </div>
            </div>

            {/* CTA Immersion B */}
            <div className="p-6 pt-0">
              <button
                onClick={() => onNavigate({
                  type: 'video_player',
                  story: duo.storyB,
                  protagonist: duo.protagonistB,
                  duoId: duo.id,
                  documentaryTitle: duo.documentaryTitle
                })}
                className="w-full py-3.5 rounded-xl bg-[#20201D] hover:bg-[#0E0D0B] text-[#FFFDF8] font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2.5 group"
                id="duo-watch-b-btn"
              >
                <div className="w-6 h-6 rounded-full bg-[#C89B3C] flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Regarder l'histoire de {duo.protagonistB.name.split(' ')[0]}</span>
              </button>
            </div>
          </div>

        </div>

        {/* 3. EDITORIAL DIALOGUE REFLECTION & TRANSMISSION BRIDGE */}
        <div className="mt-12 p-8 rounded-3xl bg-[#FFFDF8] border border-[#E4DDCC] shadow-card space-y-4 text-center max-w-4xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-wider text-[#8B6845]">
            La Passerelle Humaine
          </span>
          <p className="font-editorial italic text-base sm:text-lg text-[#20201D] leading-relaxed">
            « {duo.editorialReflection} »
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-semibold">
            <button
              onClick={() => onNavigate({ type: 'transmission_detail', protagonistId: duo.protagonistA.id, transmissionId: 't-1' })}
              className="px-4 py-2 rounded-xl bg-[#F5F1E8] hover:bg-[#E4DDCC] text-[#20201D] transition-colors flex items-center gap-1.5"
            >
              <span>Explorer la transmission de {duo.protagonistA.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            
            <button
              onClick={() => onNavigate({ type: 'protagonist_profile', protagonistId: duo.protagonistB.id })}
              className="px-4 py-2 rounded-xl bg-[#F5F1E8] hover:bg-[#E4DDCC] text-[#20201D] transition-colors flex items-center gap-1.5"
            >
              <span>Ouvrir l'arbre de {duo.protagonistB.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
