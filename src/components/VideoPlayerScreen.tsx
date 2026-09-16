import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  ArrowLeft, 
  Info, 
  Subtitles, 
  TreePine, 
  Sparkles,
  X,
  Compass
} from 'lucide-react';
import { Protagonist, ProtagonistStory, ViewScreen } from '../types';

interface VideoPlayerScreenProps {
  story: ProtagonistStory;
  protagonist: Protagonist;
  duoId?: string;
  documentaryTitle: string;
  onNavigate: (screen: ViewScreen) => void;
}

export const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({
  story,
  protagonist,
  duoId,
  documentaryTitle,
  onNavigate
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(18); // simulated percentage
  const [showCredits, setShowCredits] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);

  // Simulated video playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 0.3));
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Current formatted timecode
  const totalSeconds = story.videoDurationSeconds;
  const currentSeconds = Math.floor((progress / 100) * totalSeconds);
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0E0D0B] text-[#F5F1E8] flex flex-col justify-between overflow-hidden transition-all duration-700 animate-fadeIn">
      
      {/* 1. TOP BAR (DISCREET CONTROLS) */}
      <div className="p-4 sm:p-6 flex items-center justify-between z-30 bg-gradient-to-b from-black/80 to-transparent">
        
        {/* Return Button : Quitter l'immersion et revenir à la forêt */}
        <button
          onClick={() => {
            if (duoId) {
              onNavigate({ type: 'duo_detail', duoId });
            } else {
              onNavigate({ type: 'protagonist_profile', protagonistId: protagonist.id });
            }
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs sm:text-sm font-medium transition-all text-[#F5F1E8] border border-white/10"
          id="video-return-btn"
        >
          <ArrowLeft className="w-4 h-4 text-[#D9AF52]" />
          <span>Quitter l'immersion</span>
        </button>

        {/* Title Meta */}
        <div className="text-center hidden sm:block">
          <div className="text-[11px] uppercase tracking-widest text-[#D9AF52] font-semibold">
            {documentaryTitle} • QUESTION {story.questionNumber} : {story.questionTitle}
          </div>
          <h2 className="font-editorial text-sm sm:text-base font-medium text-white/90">
            {story.title} — {protagonist.name}
          </h2>
        </div>

        {/* Action icons: Protagonist Tree & Credits toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate({ type: 'protagonist_profile', protagonistId: protagonist.id })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium border border-white/10 transition-colors"
            title="Ouvrir l'arbre vivant de cette personne"
          >
            <TreePine className="w-3.5 h-3.5 text-[#D9AF52]" />
            <span className="hidden md:inline">Voir son arbre</span>
          </button>

          <button
            onClick={() => setShowCredits(!showCredits)}
            className={`p-2 rounded-lg border border-white/10 text-xs font-medium transition-all ${
              showCredits ? 'bg-[#D9AF52] text-black' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            title="Crédits du film documentaire"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 2. CINEMATOGRAPHIC STAGE (NIVEAU 3 IMMERSION) */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        
        {/* Simulated Film Feed with warm documentary tone in Vertical Video Format 9:16 */}
        <div className="relative w-full h-full max-w-sm sm:max-w-md max-h-[84vh] aspect-[9/16] flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#1B1916]">
            
            <img
              src={story.videoCoverUrl}
              alt={story.title}
              className={`w-full h-full object-cover transition-transform duration-1000 ${
                isPlaying ? 'scale-105 filter brightness-95' : 'scale-100 filter brightness-75'
              }`}
            />
            
            {/* Cinematic grain and subtle vignette */}
            <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/70 pointer-events-none" />

            {/* Subtitles Overlay */}
            {showSubtitles && isPlaying && (
              <div className="absolute bottom-8 left-6 right-6 text-center z-20 pointer-events-none">
                <p className="inline-block px-4 py-2 rounded-lg bg-black/75 backdrop-blur-xs text-sm sm:text-base font-medium text-white/95 leading-relaxed max-w-2xl border border-white/10">
                  « {protagonist.quote.replace(/[«»]/g, '')} »
                </p>
              </div>
            )}

            {/* Pause center indicator */}
            {!isPlaying && (
              <div 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-10"
              >
                <div className="w-20 h-20 rounded-full bg-[#D9AF52] flex items-center justify-center text-black shadow-2xl hover:scale-105 transition-transform">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Slide-over Credits Panel (Cahier des charges section 30) */}
        {showCredits && (
          <aside className="absolute right-0 top-0 bottom-0 w-80 sm:w-96 bg-[#1B1916]/95 backdrop-blur-xl border-l border-white/10 p-6 z-40 overflow-y-auto space-y-6 shadow-2xl animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D9AF52]" />
                <h3 className="font-editorial text-lg font-bold text-[#F5F1E8]">
                  Générique & Crédits
                </h3>
              </div>
              <button 
                onClick={() => setShowCredits(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-white/60 leading-relaxed italic">
                Chaque histoire de YonyWood est traitée comme un film à part entière, avec une direction de regard, une signature sonore et une mémoire d'équipe.
              </p>

              {story.credits.map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#D9AF52] tracking-wider block">
                    {c.label}
                  </span>
                  <p className="text-sm font-medium text-white">
                    {c.name}
                  </p>
                </div>
              ))}

              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-white/50 block">
                  Données techniques
                </span>
                <div className="text-[11px] text-white/70 space-y-1">
                  <div>Durée : {story.duration} ({story.videoDurationSeconds} secondes)</div>
                  <div>Format master : 4K DCI • Son binaural naturel</div>
                  <div>Territoire de captation : {protagonist.territory}</div>
                  <div>Statut du corpus : Publié et certifié</div>
                </div>
              </div>

            </div>

          </aside>
        )}

      </div>

      {/* 3. BOTTOM CINEMA CONTROLS */}
      <div className="p-4 sm:p-6 z-30 bg-gradient-to-t from-black/90 to-transparent space-y-3">
        
        {/* Interactive Scrubber Bar */}
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <span className="text-xs font-mono text-[#A8A399] w-12 text-right">
            {formatTime(currentSeconds)}
          </span>

          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
              setProgress(newProgress);
            }}
            className="relative flex-1 h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden group"
          >
            <div 
              className="h-full bg-[#D9AF52] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-xs font-mono text-[#A8A399] w-12">
            {story.duration}
          </span>
        </div>

        {/* Button Controls Row */}
        <div className="max-w-5xl mx-auto flex items-center justify-between pt-1">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              title={isPlaying ? 'Pause' : 'Lecture'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              title={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Center hint */}
          <div className="text-xs text-[#A8A399] italic hidden md:block">
            Niveau 3 : L'Immersion • Silence et écoute de la parole
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 transition-colors flex items-center gap-1.5 ${
                showSubtitles ? 'bg-[#D9AF52] text-black' : 'bg-white/10 text-white'
              }`}
              title="Sous-titres"
            >
              <Subtitles className="w-3.5 h-3.5" />
              <span>ST</span>
            </button>

            <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                } else {
                  document.exitFullscreen().catch(() => {});
                }
              }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs"
              title="Plein écran"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
