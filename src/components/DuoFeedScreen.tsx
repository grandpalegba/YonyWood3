import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Tv, 
  Shuffle, 
  User, 
  Link2,
  EyeOff
} from 'lucide-react';
import { DUOS, DOCUMENTARIES } from '../data/mockData';
import { ViewScreen, Duo } from '../types';
import { RemoteControlModal } from './RemoteControlModal';

interface DuoFeedScreenProps {
  onNavigate: (screen: ViewScreen) => void;
  initialDocId?: string;
  initialDuoId?: string;
  initialDuoIndex?: number;
  allowedSeriesIds?: string[];
}

export const DuoFeedScreen: React.FC<DuoFeedScreenProps> = ({
  onNavigate,
  initialDocId,
  initialDuoId,
  initialDuoIndex = 0,
  allowedSeriesIds
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string | null>(initialDocId || null);
  const [isRemoteOpen, setIsRemoteOpen] = useState(false);

  // Compute starting duo index if initialDuoId is provided
  const startingIndex = initialDuoId
    ? Math.max(0, DUOS.findIndex(d => d.id === initialDuoId))
    : initialDuoIndex;

  const [currentIndex, setCurrentIndex] = useState(startingIndex);
  const [isQuestionRevealed, setIsQuestionRevealed] = useState(false);

  // Swipe / Drag state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  // Filter duos based on user's profile series filter AND active series selector
  const baseFilteredDuos = allowedSeriesIds && allowedSeriesIds.length > 0
    ? DUOS.filter(d => allowedSeriesIds.includes(d.documentaryId))
    : DUOS;

  const filteredDuos = selectedDocId
    ? baseFilteredDuos.filter(d => d.documentaryId === selectedDocId)
    : baseFilteredDuos;

  const safeIndex = filteredDuos.length > 0 ? (currentIndex % filteredDuos.length) : 0;
  const currentDuo: Duo | undefined = filteredDuos[safeIndex];

  const activeDoc = selectedDocId 
    ? DOCUMENTARIES.find(d => d.id === selectedDocId) 
    : (currentDuo ? DOCUMENTARIES.find(d => d.id === currentDuo.documentaryId) : undefined);

  // Reset question revealed state when duo changes
  const handleNext = () => {
    setIsQuestionRevealed(false);
    setCurrentIndex(prev => (prev + 1) % filteredDuos.length);
  };

  const handlePrev = () => {
    setIsQuestionRevealed(false);
    setCurrentIndex(prev => (prev - 1 + filteredDuos.length) % filteredDuos.length);
  };

  const handleShuffle = () => {
    if (filteredDuos.length <= 1) return;
    setIsQuestionRevealed(false);
    let nextIdx = Math.floor(Math.random() * filteredDuos.length);
    if (nextIdx === safeIndex) {
      nextIdx = (nextIdx + 1) % filteredDuos.length;
    }
    setCurrentIndex(nextIdx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredDuos.length]);

  // Touch Swipe Handling
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    if (touchStartX !== null) {
      const diff = e.targetTouches[0].clientX - touchStartX;
      setSwipeOffset(Math.max(-80, Math.min(80, diff * 0.4)));
    }
  };

  const onTouchEnd = () => {
    setSwipeOffset(0);
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  // Desktop Mouse Drag Swipe Handling
  const onMouseDown = (e: React.MouseEvent) => {
    // Only if left click and not clicking a button/link
    if ((e.target as HTMLElement).closest('button, a')) return;
    setIsMouseDown(true);
    setMouseStartX(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || mouseStartX === null) return;
    const diff = e.clientX - mouseStartX;
    setSwipeOffset(Math.max(-80, Math.min(80, diff * 0.4)));
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown || mouseStartX === null) return;
    setIsMouseDown(false);
    const distance = mouseStartX - e.clientX;
    setSwipeOffset(0);
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  const onMouseLeave = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
      setSwipeOffset(0);
    }
  };

  if (!currentDuo) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <p className="font-editorial text-2xl text-[#20201D]">Aucun duo dans cette sélection.</p>
        <button 
          onClick={() => setSelectedDocId(null)}
          className="mt-4 px-5 py-2.5 rounded-xl bg-[#C89B3C] text-[#FFFDF8] font-medium text-xs shadow-xs"
        >
          Afficher tous les duos
        </button>
      </div>
    );
  }

  const pA = currentDuo.protagonistA;
  const pB = currentDuo.protagonistB;

  // Derive the 2 thematic terms for this duo
  const themeA = pA.universeTag || (activeDoc ? activeDoc.universes[0]?.name : 'POLE A');
  const themeB = pB.universeTag || (activeDoc ? activeDoc.universes[1]?.name : 'POLE B');

  return (
    <div 
      className="min-h-[calc(100vh-5rem)] pb-28 pt-2 px-3 sm:px-6 max-w-6xl mx-auto flex flex-col justify-between select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {/* 1. TOP SUBTLE BAR: Subtle series indicator with TV choice icon & duo counter */}
      <div className="relative flex items-center justify-between py-2 border-b border-[#E4DDCC]/70 mb-3">
        {/* Subtle series switch button with TV icon */}
        <div className="flex items-center gap-1.5 z-10">
          <button
            onClick={() => setIsRemoteOpen(true)}
            id="open-series-choice-btn"
            title="Changer de série ou voir toutes les séries"
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] hover:bg-[#F5F1E8] border border-[#E4DDCC] hover:border-[#C89B3C] transition-all shadow-xs cursor-pointer"
          >
            <Tv className="w-3.5 h-3.5 text-[#C89B3C] group-hover:scale-110 transition-transform" />
            <span className="font-sans text-xs sm:text-sm font-medium text-[#20201D]">
              {selectedDocId 
                ? (activeDoc?.title || currentDuo.documentaryTitle)
                : 'Tous'
              }
            </span>
            {selectedDocId && (
              <span className="w-2 h-2 rounded-full bg-[#C89B3C] animate-pulse" title="Filtre actif" />
            )}
          </button>

          {selectedDocId && (
            <button
              onClick={() => {
                setSelectedDocId(null);
                setCurrentIndex(0);
              }}
              title="Revenir à toutes les séries (flux aléatoire)"
              className="p-1 rounded-full hover:bg-[#E4DDCC]/50 text-[#8B6845] hover:text-[#20201D] text-xs transition-colors cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Nom de la série PARFAITEMENT CENTRÉ AU MILIEU avec symbole face à face (< >) */}
        {/* Même police que les prénoms (font-sans) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10">
          {(() => {
            const title = currentDuo.documentaryTitle || '';
            const parts = title.includes('< >') ? title.split('< >') : title.includes('<>') ? title.split('<>') : null;
            return parts ? (
              <div 
                key={`duo-series-${currentDuo.id}-${title}`}
                className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF8] border border-[#E4DDCC] shadow-xs text-xs sm:text-sm animate-in fade-in zoom-in-95 duration-200"
              >
                <span className="font-sans font-bold text-[#20201D] tracking-tight">{parts[0].trim()}</span>
                <span 
                  className="inline-flex items-center gap-0.5 font-mono text-xs font-black text-[#C89B3C] px-0.5 select-none tracking-wider"
                  title="Symbole face à face"
                >
                  <span>&lt;</span>
                  <span>&gt;</span>
                </span>
                <span className="font-sans font-bold text-[#20201D] tracking-tight">{parts[1].trim()}</span>
              </div>
            ) : null;
          })()}
        </div>

        {/* Shuffle */}
        <div className="flex items-center gap-2 z-10">
          <button
            onClick={handleShuffle}
            title="Duo aléatoire"
            className="p-1.5 rounded-full bg-[#FFFDF8] hover:bg-[#F5F1E8] border border-[#E4DDCC] text-[#68655D] hover:text-[#20201D] transition-colors cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. LE MIROIR DU DUO AU FORMAT VIDÉO VERTICAL (9:16) AVEC FLÈCHES LATÉRALES & SWIPE */}
      <div className="relative my-auto flex items-center justify-center py-2">
        
        {/* Flèche Gauche (Navigation latérale identique à Productions & Proposer) */}
        <button
          onClick={handlePrev}
          className="hidden sm:flex absolute left-0 lg:-left-12 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-[#C89B3C] text-[#20201D] hover:text-white border border-[#E4DDCC] shadow-lg items-center justify-center transition-all cursor-pointer transform hover:scale-105"
          title="Duo précédent"
          id="prev-duo-arrow-btn"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div 
          className="w-full transition-transform duration-150 ease-out"
          style={{ transform: `translateX(${swipeOffset}px)` }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 relative max-w-2xl md:max-w-3xl mx-auto justify-items-center items-center">
            
            {/* PROTAGONIST A CARD - FORMAT VIDÉO VERTICAL 9:16 */}
            <div className="group relative rounded-3xl overflow-hidden bg-[#20201D] text-[#FFFDF8] shadow-2xl border border-[#E4DDCC]/50 flex flex-col justify-end w-full max-w-[300px] sm:max-w-[340px] aspect-[9/16] transition-all duration-300">
              <img 
                src={pA.photoUrl} 
                alt={pA.name} 
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151513] via-[#1F1E1B]/35 to-transparent pointer-events-none" />

              {/* TOP LEFT: THEMATIC POLE (INSTEAD OF COUNTRY) */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1 rounded-full bg-[#20201D]/80 backdrop-blur-xs border border-[#FFFDF8]/20 text-[11px] font-semibold tracking-wider text-[#F5F1E8] uppercase shadow-sm">
                  {themeA}
                </span>
              </div>

              {/* Centered Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate({
                      type: 'video_player',
                      story: currentDuo.storyA,
                      protagonist: pA,
                      duoId: currentDuo.id,
                      documentaryTitle: currentDuo.documentaryTitle
                    });
                  }}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#20201D]/75 hover:bg-[#C89B3C] text-[#FFFDF8] backdrop-blur-xs border border-[#FFFDF8]/30 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-2xl cursor-pointer"
                  id={`play-story-${pA.id}`}
                  title={`Écouter ${pA.name}`}
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </button>
              </div>

              {/* Bottom info: Prénom, âge et bouton son univers */}
              <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
                <div className="text-left font-sans">
                  <h3 className="text-lg sm:text-xl font-bold text-[#FFFDF8] tracking-tight">
                    {pA.name.split(' ')[0]}
                  </h3>
                  {pA.age && (
                    <p className="text-xs sm:text-sm font-normal text-[#E4DDCC]/90 mt-0.5">
                      {pA.age} ans
                    </p>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate({ type: 'protagonist_profile', protagonistId: pA.id });
                  }}
                  className="px-3 py-1.5 rounded-full sm:rounded-xl bg-[#FFFDF8]/20 hover:bg-[#C89B3C] text-[#FFFDF8] text-xs font-medium backdrop-blur-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                  title="Son univers"
                  id={`open-universe-${pA.id}`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Son univers</span>
                </button>
              </div>
            </div>

            {/* CENTRAL CONNECTING LINK: JUST THE LINK ICON, NO TEXT (USER REQUEST: BLUE BACKGROUND & WHITE BORDER) */}
            <div className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center my-[-10px] md:my-0 pointer-events-none">
              <div className="w-11 h-11 rounded-full bg-[#0B3B82] text-[#FFFDF8] border-2 border-white shadow-2xl flex items-center justify-center pointer-events-auto transition-transform hover:scale-110 ring-2 ring-[#0B3B82]/40">
                <Link2 className="w-4 h-4 text-[#FFFDF8]" />
              </div>
            </div>

            {/* PROTAGONIST B CARD - FORMAT VIDÉO VERTICAL 9:16 */}
            <div className="group relative rounded-3xl overflow-hidden bg-[#20201D] text-[#FFFDF8] shadow-2xl border border-[#E4DDCC]/50 flex flex-col justify-end w-full max-w-[300px] sm:max-w-[340px] aspect-[9/16] transition-all duration-300">
              <img 
                src={pB.photoUrl} 
                alt={pB.name} 
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151513] via-[#1F1E1B]/35 to-transparent pointer-events-none" />

              {/* TOP LEFT: THEMATIC POLE (INSTEAD OF COUNTRY) */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1 rounded-full bg-[#20201D]/80 backdrop-blur-xs border border-[#FFFDF8]/20 text-[11px] font-semibold tracking-wider text-[#F5F1E8] uppercase shadow-sm">
                  {themeB}
                </span>
              </div>

              {/* Centered Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate({
                      type: 'video_player',
                      story: currentDuo.storyB,
                      protagonist: pB,
                      duoId: currentDuo.id,
                      documentaryTitle: currentDuo.documentaryTitle
                    });
                  }}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#20201D]/75 hover:bg-[#C89B3C] text-[#FFFDF8] backdrop-blur-xs border border-[#FFFDF8]/30 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-2xl cursor-pointer"
                  id={`play-story-${pB.id}`}
                  title={`Écouter ${pB.name}`}
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </button>
              </div>

              {/* Bottom info: Prénom, âge et bouton son univers */}
              <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
                <div className="text-left font-sans">
                  <h3 className="text-lg sm:text-xl font-bold text-[#FFFDF8] tracking-tight">
                    {pB.name.split(' ')[0]}
                  </h3>
                  {pB.age && (
                    <p className="text-xs sm:text-sm font-normal text-[#E4DDCC]/90 mt-0.5">
                      {pB.age} ans
                    </p>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate({ type: 'protagonist_profile', protagonistId: pB.id });
                  }}
                  className="px-3 py-1.5 rounded-full sm:rounded-xl bg-[#FFFDF8]/20 hover:bg-[#C89B3C] text-[#FFFDF8] text-xs font-medium backdrop-blur-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                  title="Son univers"
                  id={`open-universe-${pB.id}`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Son univers</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3. LA QUESTION : MASQUÉE PAR DÉFAUT, RÉVÉLÉE SUR CLIC DU BOUTON PRÉCIS */}
          <div className="mt-4 flex flex-col items-center">
            {!isQuestionRevealed ? (
              <button
                onClick={() => setIsQuestionRevealed(true)}
                id="reveal-question-btn"
                className="px-5 py-2 rounded-full bg-[#FFFDF8] hover:bg-[#F5F1E8] border border-[#C89B3C]/50 hover:border-[#C89B3C] text-[#8B6845] hover:text-[#20201D] text-xs font-medium transition-all shadow-xs cursor-pointer"
              >
                <span>Révéler la question</span>
              </button>
            ) : (
              <div className="w-full max-w-2xl p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF8] border border-[#C89B3C]/40 shadow-sm text-center relative animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => setIsQuestionRevealed(false)}
                  className="absolute top-2.5 right-2.5 p-1 text-[#8B6845] hover:text-[#20201D] rounded-full hover:bg-[#E4DDCC]/50 transition-colors"
                  title="Masquer la question"
                >
                  <EyeOff className="w-3 h-3" />
                </button>
                <p className="font-editorial text-xs sm:text-sm md:text-base text-[#20201D] leading-relaxed px-5">
                  « {currentDuo.centralQuestion} »
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Flèche Droite (Navigation latérale identique à Productions & Proposer) */}
        <button
          onClick={handleNext}
          className="hidden sm:flex absolute right-0 lg:-right-12 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-[#C89B3C] text-[#20201D] hover:text-white border border-[#E4DDCC] shadow-lg items-center justify-center transition-all cursor-pointer transform hover:scale-105"
          title="Duo suivant"
          id="next-duo-arrow-btn"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>

      {/* Télécommande / Sélecteur Modal */}
      <RemoteControlModal
        isOpen={isRemoteOpen}
        onClose={() => setIsRemoteOpen(false)}
        selectedDocId={selectedDocId}
        onSelectDoc={(docId) => {
          setSelectedDocId(docId);
          setCurrentIndex(0);
          setIsQuestionRevealed(false);
        }}
      />
    </div>
  );
};
