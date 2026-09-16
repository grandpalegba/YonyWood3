import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  Check, 
  UploadCloud, 
  Camera,
  CheckCircle2,
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Tv,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';
import { DOCUMENTARIES } from '../data/mockData';
import { ViewScreen, Documentary } from '../types';

const SERIES_PRESENTATIONS: Record<string, { synopsis: string; whyParticipate: string; videoUrl: string; duration: string }> = {
  'jesus-legba': {
    synopsis: "Au Bénin, deux univers spirituels se côtoient sans jamais s’affronter : la ferveur chrétienne et le culte ancestral de Legba, messager de l'invisible et protecteur des seuils. Face aux grands mystères humains — l'épreuve, le pardon, le deuil —, leurs rituels et prières dialoguent d'égal à égal.",
    whyParticipate: "Votre histoire a été marquée par une épreuve, une conversion, un doute ou une grâce inattendue ? Racontez comment votre foi vous porte au quotidien. Votre témoignage permettra de créer un pont unique et vivant entre deux traditions.",
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '1:15'
  },
  'finagnon-qosqorico': {
    synopsis: "Des cités lacustres de Ganvié sur pilotis aux terrasses andines de Cusco et Pisac à 3 400 m d'altitude. Un dialogue intime entre pêcheurs toffinou et paysans quechuas gardiens de la Pachamama sur l'attachement viscéral à une terre nourricière.",
    whyParticipate: "Vous vivez ou avez vécu un lien profond avec un territoire sacré, un fleuve ou une montagne ? Témoignez de ce que signifie habiter un lieu, partir, revenir, et transmettre l'amour de la terre.",
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '1:45'
  },
  'blacks-one-beyond-eve': {
    synopsis: "Quand la nuit tombe sur la métropole, créateurs urbains, gardiennes de mémoires et poètes s'emparent des carrefours. Entre l'effervescence de la rue et le recueillement intime, deux générations explorent ce qui fait la beauté et la survie de leur communauté.",
    whyParticipate: "Artiste, militant ou témoin des mutations urbaines, partagez le moment charnière où votre voix s'est affirmée et la trace indélébile que vous souhaitez transmettre à ceux qui viendront après vous.",
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '1:30'
  },
  'dixeat-fiat-luxe': {
    synopsis: "Le geste des bâtisseurs silencieux face à l'urgence de notre siècle. Entre ouvriers du quotidien, artisans d'art et pionniers de l'éveil écologique, une réflexion fraternelle sur la valeur du labeur et la lumière cachée dans chaque métier.",
    whyParticipate: "Vous exercez un métier de passion, de sueur ou de patience ? Racontez la dignité de votre geste, la transmission de votre savoir-faire et ce que le travail vous a appris sur les êtres humains.",
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '1:20'
  }
};

const EPISODE_PORTRAITS: Record<string, string[]> = {
  'jesus-legba': [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  ],
  'finagnon-qosqorico': [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  ],
  'blacks-one-beyond-eve': [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  ],
  'dixeat-fiat-luxe': [
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  ]
};

interface SubmitStoryScreenProps {
  preselectedDocumentaryId?: string;
  onNavigate: (screen: ViewScreen) => void;
}

export const SubmitStoryScreen: React.FC<SubmitStoryScreenProps> = ({
  preselectedDocumentaryId,
  onNavigate
}) => {
  // Step: 1 = Choisir la série, 2 = Choisir la question & épisode, 3 = Format vidéo
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDocId, setSelectedDocId] = useState<string>(preselectedDocumentaryId || DOCUMENTARIES[0].id);
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState<string>('01');
  const [videoOption, setVideoOption] = useState<'HAVE_VIDEO' | 'NEED_VIDEOGRAPHER' | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [videographerCity, setVideographerCity] = useState('');
  const [videographerContact, setVideographerContact] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Index de la série affichée en plein écran (étape 1 swipeable)
  const initialIndex = Math.max(0, DOCUMENTARIES.findIndex(d => d.id === (preselectedDocumentaryId || DOCUMENTARIES[0].id)));
  const [docIndex, setDocIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [isCardVideoPlaying, setIsCardVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showSeriesSynopsis, setShowSeriesSynopsis] = useState(false);

  // Index de l'épisode affiché en plein écran (étape 2 swipeable)
  const [episodeIndex, setEpisodeIndex] = useState(0);
  const [isEpisodeVideoPlaying, setIsEpisodeVideoPlaying] = useState(false);
  const [isEpisodeMuted, setIsEpisodeMuted] = useState(false);
  const [showTranscription, setShowTranscription] = useState(false);

  // Gesture / Swipe state pour l'étape 1
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  // Gesture / Swipe state pour l'étape 2 (épisodes)
  const [epTouchStartX, setEpTouchStartX] = useState<number | null>(null);
  const [epTouchEndX, setEpTouchEndX] = useState<number | null>(null);
  const [epMouseStartX, setEpMouseStartX] = useState<number | null>(null);
  const [isEpMouseDown, setIsEpMouseDown] = useState(false);
  const [epSwipeOffset, setEpSwipeOffset] = useState(0);

  const currentDoc = DOCUMENTARIES[docIndex] || DOCUMENTARIES[0];
  const selectedDoc = DOCUMENTARIES.find(d => d.id === selectedDocId) || DOCUMENTARIES[0];
  const currentQuestions = selectedDoc.questions || [];
  const currentEpisode = currentQuestions[episodeIndex] || currentQuestions[0];
  const selectedQuestion = currentQuestions.find(q => q.number === selectedQuestionNumber) || currentQuestions[0];

  const goToDoc = (idx: number) => {
    const safe = (idx + DOCUMENTARIES.length) % DOCUMENTARIES.length;
    setDocIndex(safe);
    setSelectedDocId(DOCUMENTARIES[safe].id);
    setSelectedQuestionNumber(DOCUMENTARIES[safe].questions[0]?.number || '01');
    setEpisodeIndex(0);
    setIsCardVideoPlaying(false);
    setShowSeriesSynopsis(false);
  };

  const handleNextDoc = () => goToDoc(docIndex + 1);
  const handlePrevDoc = () => goToDoc(docIndex - 1);

  // Navigation entre épisodes (Étape 2)
  const goToEpisode = (idx: number) => {
    const total = currentQuestions.length;
    if (total === 0) return;
    const safe = (idx + total) % total;
    setEpisodeIndex(safe);
    setSelectedQuestionNumber(currentQuestions[safe].number);
    setIsEpisodeVideoPlaying(false);
    setShowTranscription(false);
  };

  const handleNextEpisode = () => goToEpisode(episodeIndex + 1);
  const handlePrevEpisode = () => goToEpisode(episodeIndex - 1);

  // Synchronisation de l'épisode au changement de série sélectionnée
  useEffect(() => {
    const idx = selectedDoc.questions.findIndex(q => q.number === selectedQuestionNumber);
    if (idx >= 0) {
      setEpisodeIndex(idx);
    } else {
      setEpisodeIndex(0);
      if (selectedDoc.questions[0]) {
        setSelectedQuestionNumber(selectedDoc.questions[0].number);
      }
    }
    setIsEpisodeVideoPlaying(false);
    setShowTranscription(false);
  }, [selectedDocId]);

  // Touch handlers for mobile swipe (Étape 1)
  const minSwipeDistance = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    if (touchStartX !== null) {
      const diff = e.targetTouches[0].clientX - touchStartX;
      setSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
    }
  };

  const onTouchEnd = () => {
    setSwipeOffset(0);
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      handleNextDoc();
    } else if (distance < -minSwipeDistance) {
      handlePrevDoc();
    }
  };

  // Mouse handlers for desktop swipe (Étape 1)
  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, video, .synopsis-box')) return;
    setIsMouseDown(true);
    setMouseStartX(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || mouseStartX === null) return;
    const diff = e.clientX - mouseStartX;
    setSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    setIsMouseDown(false);
    setSwipeOffset(0);
    if (mouseStartX === null) return;
    const distance = mouseStartX - e.clientX;
    if (distance > minSwipeDistance) {
      handleNextDoc();
    } else if (distance < -minSwipeDistance) {
      handlePrevDoc();
    }
    setMouseStartX(null);
  };

  // Touch handlers for mobile swipe (Étape 2 - Épisodes)
  const onEpTouchStart = (e: React.TouchEvent) => {
    setEpTouchEndX(null);
    setEpTouchStartX(e.targetTouches[0].clientX);
  };

  const onEpTouchMove = (e: React.TouchEvent) => {
    setEpTouchEndX(e.targetTouches[0].clientX);
    if (epTouchStartX !== null) {
      const diff = e.targetTouches[0].clientX - epTouchStartX;
      setEpSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
    }
  };

  const onEpTouchEnd = () => {
    setEpSwipeOffset(0);
    if (!epTouchStartX || !epTouchEndX) return;
    const distance = epTouchStartX - epTouchEndX;
    if (distance > minSwipeDistance) {
      handleNextEpisode();
    } else if (distance < -minSwipeDistance) {
      handlePrevEpisode();
    }
  };

  // Mouse handlers for desktop swipe (Étape 2 - Épisodes)
  const onEpMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, video, .transcription-box')) return;
    setIsEpMouseDown(true);
    setEpMouseStartX(e.clientX);
  };

  const onEpMouseMove = (e: React.MouseEvent) => {
    if (!isEpMouseDown || epMouseStartX === null) return;
    const diff = e.clientX - epMouseStartX;
    setEpSwipeOffset(Math.max(-90, Math.min(90, diff * 0.4)));
  };

  const onEpMouseUp = (e: React.MouseEvent) => {
    if (!isEpMouseDown) return;
    setIsEpMouseDown(false);
    setEpSwipeOffset(0);
    if (epMouseStartX === null) return;
    const distance = epMouseStartX - e.clientX;
    if (distance > minSwipeDistance) {
      handleNextEpisode();
    } else if (distance < -minSwipeDistance) {
      handlePrevEpisode();
    }
    setEpMouseStartX(null);
  };

  // Keyboard navigation for step 1 and step 2
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (step === 1) {
        if (e.key === 'ArrowRight') {
          handleNextDoc();
        } else if (e.key === 'ArrowLeft') {
          handlePrevDoc();
        }
      } else if (step === 2) {
        if (e.key === 'ArrowRight') {
          handleNextEpisode();
        } else if (e.key === 'ArrowLeft') {
          handlePrevEpisode();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, docIndex, episodeIndex, currentQuestions.length]);

  // Video presentation modal state (optionnel si ouvert en grand)
  const [previewDoc, setPreviewDoc] = useState<Documentary | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);

  const handleFinishSubmission = () => {
    setSubmittedSuccess(true);
  };

  if (submittedSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C] text-[#8B6845] mx-auto flex items-center justify-center">
          <Check className="w-8 h-8" />
        </div>
        <h2 className="font-editorial text-3xl font-bold text-[#20201D]">
          Votre histoire est transmise.
        </h2>
        <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#E4DDCC] text-left space-y-2 max-w-md mx-auto">
          <p className="text-xs text-[#8B6845] font-bold uppercase tracking-wider">
            {selectedDoc.title}
          </p>
          <p className="font-editorial text-sm font-semibold text-[#20201D]">
            Épisode {selectedQuestion.number} — {selectedQuestion.title}
          </p>
          <p className="text-xs text-[#68655D] italic">
            « {selectedQuestion.prompt} »
          </p>
          <p className="text-xs text-[#C89B3C] pt-2 font-medium">
            Format : {videoOption === 'HAVE_VIDEO' ? 'Vidéo personnelle fournie' : 'Demande d’accompagnement par un cadreur'}
          </p>
        </div>
        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={() => onNavigate({ type: 'duo_feed' })}
            className="px-6 py-2.5 rounded-full bg-[#C89B3C] hover:bg-[#B78A2E] text-[#FFFDF8] text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Retourner aux duos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-28 space-y-6 text-[#20201D]">
      
      {/* Header discret & Step progress */}
      <div className="flex items-center justify-between border-b border-[#E4DDCC] pb-3">
        <div>
          <h1 className="font-editorial text-xl sm:text-2xl font-bold text-[#20201D]">
            Proposer une histoire
          </h1>
          <p className="text-xs text-[#8B6845] mt-0.5">
            Étape {step} sur 3 • {step === 1 ? 'La série' : step === 2 ? 'L’épisode & la question' : 'Le format vidéo'}
          </p>
        </div>

        {/* Step indicator pills with user-requested blue */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s
                  ? 'bg-[#0B3B82] text-[#FFFDF8] ring-2 ring-[#0B3B82]/30 shadow-xs'
                  : step > s
                  ? 'bg-[#0B3B82] text-[#FFFDF8]'
                  : 'bg-[#E4DDCC] text-[#7A756B]'
              }`}
            >
              {step > s ? '✓' : s}
            </div>
          ))}
        </div>
      </div>

      {/* PANNEAU 1 : UN SEUL ÉCRAN QUI APPARAÎT AVEC SWIPE (EXACTEMENT COMME LA CAPTURE D'ÉCRAN FOURNIE) */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* Conteneur de l'écran unique avec swipe et navigation fléchée */}
          <div className="relative flex items-center justify-center py-2">
            
            {/* Flèche Gauche (Navigation rapide) */}
            <button
              onClick={handlePrevDoc}
              className="hidden sm:flex absolute left-0 lg:-left-12 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-[#C89B3C] text-[#20201D] hover:text-white border border-[#E4DDCC] shadow-lg items-center justify-center transition-all cursor-pointer transform hover:scale-105"
              title="Série précédente"
              id="prev-series-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* CARTE UNIQUE FORMAT VIDÉO VERTICAL 9:16 AVEC SUPPORT DU SWIPE */}
            <div
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              className="w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] transition-transform duration-150 ease-out select-none cursor-grab active:cursor-grabbing"
              style={{ transform: `translateX(${swipeOffset}px)` }}
            >
              <div 
                className="group relative w-full h-full rounded-[2rem] sm:rounded-3xl overflow-hidden bg-[#20201D] text-[#FFFDF8] shadow-2xl border border-[#E4DDCC]/50 flex flex-col justify-between p-5 sm:p-6"
                id={`current-series-card-${currentDoc.id}`}
              >
                {/* 1. Média de fond : Vidéo en lecture OU affiche de film */}
                {isCardVideoPlaying ? (
                  <video
                    src={SERIES_PRESENTATIONS[currentDoc.id]?.videoUrl || currentDoc.teaserVideoUrl}
                    poster={currentDoc.posterUrl || currentDoc.coverImage}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={currentDoc.posterUrl || currentDoc.coverImage} 
                    alt={currentDoc.title} 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 pointer-events-none"
                  />
                )}

                {/* Voile sombre cinématographique doux pour contraste parfait */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none" />

                {/* HAUT : Badge du titre de la série (comme 'FINAGNON' sur la capture) */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold tracking-widest uppercase text-white/95 shadow-sm">
                    {currentDoc.title.toUpperCase()}
                  </span>

                  {isCardVideoPlaying && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }}
                      className="p-1.5 rounded-full bg-black/60 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                      title={isMuted ? 'Activer le son' : 'Couper le son'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>

                {/* CENTRE : Gros bouton de lecture circulaire translucide identique à la capture */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCardVideoPlaying(!isCardVideoPlaying);
                    }}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-black/65 hover:bg-[#C89B3C] text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-2xl cursor-pointer"
                    title={isCardVideoPlaying ? 'Mettre en pause' : `Visionner ${currentDoc.title}`}
                    id={`play-pause-btn-${currentDoc.id}`}
                  >
                    {isCardVideoPlaying ? (
                      <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
                    ) : (
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                    )}
                  </button>
                </div>

                {/* BAS : Transcription (Synopsis) à gauche et action Choisir cette série à droite */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSeriesSynopsis(true);
                    }}
                    className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white/95 text-[11px] font-medium backdrop-blur-md transition-all flex items-center gap-1.5 border border-white/20 cursor-pointer shadow-sm"
                    title="Afficher la transcription et le synopsis"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>Transcription</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDocId(currentDoc.id);
                      setSelectedQuestionNumber(currentDoc.questions[0].number);
                      setStep(2);
                    }}
                    className="px-4 py-2 rounded-full bg-white/20 hover:bg-[#C89B3C] text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg border border-white/20 hover:border-transparent cursor-pointer shrink-0"
                    title="Choisir cette série"
                    id={`continue-pill-btn-${currentDoc.id}`}
                  >
                    <span>Choisir cette série</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* OVERLAY DE TRANSCRIPTION / SYNOPSIS POUR LA SÉRIE */}
                {showSeriesSynopsis && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="synopsis-box absolute inset-0 bg-black/90 backdrop-blur-md z-20 flex flex-col justify-between p-6 text-[#FFFDF8] animate-in fade-in duration-200"
                  >
                    <div className="space-y-3 overflow-y-auto max-h-[82%] pr-1">
                      <div className="flex items-center justify-between pb-2 border-b border-white/15">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#C89B3C]">
                          Synopsis • Transcription
                        </span>
                        <button
                          onClick={() => setShowSeriesSynopsis(false)}
                          className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                          title="Fermer le synopsis"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="font-editorial text-lg sm:text-xl font-bold text-white">
                        {currentDoc.title}
                      </h4>

                      {currentDoc.subtitle && (
                        <p className="text-xs text-[#C89B3C] font-medium tracking-wide">
                          {currentDoc.subtitle}
                        </p>
                      )}

                      <div className="pt-1">
                        <p className="font-editorial text-sm sm:text-base italic font-light text-white/95 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
                          « {currentDoc.shortSynopsis || currentDoc.description} »
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between gap-3 border-t border-white/15">
                      <button
                        onClick={() => setShowSeriesSynopsis(false)}
                        className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                      >
                        Masquer
                      </button>

                      <button
                        onClick={() => {
                          setSelectedDocId(currentDoc.id);
                          setSelectedQuestionNumber(currentDoc.questions[0].number);
                          setStep(2);
                        }}
                        className="px-5 py-2 rounded-full bg-[#C89B3C] hover:bg-[#B78A2E] text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Choisir cette série</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Flèche Droite (Navigation rapide) */}
            <button
              onClick={handleNextDoc}
              className="hidden sm:flex absolute right-0 lg:-right-12 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-[#C89B3C] text-[#20201D] hover:text-white border border-[#E4DDCC] shadow-lg items-center justify-center transition-all cursor-pointer transform hover:scale-105"
              title="Série suivante"
              id="next-series-btn"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

        </div>
      )}

      {/* PANNEAU 2 : CHOISIR L'ÉPISODE AU FORMAT VIDÉO VERTICAL AVEC ÉCOUTE & TRANSCRIPTION */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* En-tête discret : Rappel de la série et changement rapide */}
          <div className="flex items-center justify-between px-1">
            <p className="text-xs text-[#68655D]">
              Série choisie : <strong className="text-[#20201D]">{selectedDoc.title}</strong>
            </p>
            <button
              onClick={() => {
                const idx = DOCUMENTARIES.findIndex(d => d.id === selectedDocId);
                if (idx >= 0) setDocIndex(idx);
                setStep(1);
              }}
              className="text-xs text-[#8B6845] hover:text-[#20201D] underline font-medium cursor-pointer"
            >
              Changer de série
            </button>
          </div>

          {/* CONTENEUR DU SWIPE ÉPISODE AVEC FLÈCHES LATÉRALES */}
          <div className="relative flex items-center justify-center py-2">
            
            {/* Flèche précédente (desktop & tablettes) */}
            <button
              onClick={handlePrevEpisode}
              aria-label="Épisode précédent"
              className="hidden sm:flex absolute -left-4 md:-left-8 z-20 w-11 h-11 rounded-full bg-[#FFFDF8] border border-[#E4DDCC] text-[#20201D] hover:bg-[#C89B3C] hover:text-white hover:border-transparent items-center justify-center shadow-lg transition-all cursor-pointer transform hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* CARTE UNIQUE FORMAT VIDÉO VERTICAL AVEC SUPPORT DU SWIPE */}
            <div
              style={{
                transform: `translateX(${epSwipeOffset}px)`
              }}
              onTouchStart={onEpTouchStart}
              onTouchMove={onEpTouchMove}
              onTouchEnd={onEpTouchEnd}
              onMouseDown={onEpMouseDown}
              onMouseMove={onEpMouseMove}
              onMouseUp={onEpMouseUp}
              className="relative w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] rounded-[2rem] sm:rounded-3xl overflow-hidden bg-[#20201D] text-[#FFFDF8] shadow-2xl border border-[#E4DDCC]/50 flex flex-col justify-between p-5 sm:p-6 transition-transform duration-150 ease-out select-none cursor-grab active:cursor-grabbing"
            >
              {/* Vidéo de l'épisode ou image de portrait de l'interlocuteur */}
              {isEpisodeVideoPlaying ? (
                <video
                  src={currentEpisode.videoAvatarUrl || selectedDoc.teaserVideoUrl}
                  poster={EPISODE_PORTRAITS[selectedDoc.id]?.[episodeIndex] || selectedDoc.posterUrl || selectedDoc.coverImage}
                  autoPlay
                  loop
                  muted={isEpisodeMuted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={EPISODE_PORTRAITS[selectedDoc.id]?.[episodeIndex] || selectedDoc.posterUrl || selectedDoc.coverImage}
                  alt={currentEpisode.title}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}

              {/* Voile sombre cinématographique pour une excellente lisibilité */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />

              {/* HAUT : Badge du numéro de l'épisode & Contrôle du son */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold tracking-widest uppercase text-white/95 shadow-sm">
                  ÉPISODE {currentEpisode.number}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEpisodeMuted(!isEpisodeMuted);
                    }}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                    title={isEpisodeMuted ? 'Activer le son' : 'Couper le son'}
                  >
                    {isEpisodeMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* CENTRE : Grand bouton circulaire de lecture/écoute */}
              <div className="relative z-10 flex items-center justify-center my-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEpisodeVideoPlaying(!isEpisodeVideoPlaying);
                  }}
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-black/65 hover:bg-[#C89B3C] text-white border border-white/25 backdrop-blur-xs flex items-center justify-center shadow-2xl transition-all cursor-pointer transform hover:scale-110 active:scale-95 group"
                  title={isEpisodeVideoPlaying ? "Mettre en pause" : `Écouter l'épisode ${currentEpisode.number}`}
                >
                  {isEpisodeVideoPlaying ? (
                    <Pause className="w-8 h-8 text-white fill-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white fill-white translate-x-0.5 group-hover:scale-105 transition-transform" />
                  )}
                </button>
              </div>

              {/* BAS : Titre de l'épisode, bouton transcription & bouton pour continuer */}
              <div className="relative z-10 space-y-3">
                
                {/* Titre de l'épisode en typographie éditoriale */}
                <div>
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md">
                    {currentEpisode.title}
                  </h3>
                </div>

                {/* Actions inférieures : Lire la transcription à gauche & Continuer à droite */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTranscription(true);
                    }}
                    className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white/95 text-[11px] font-medium backdrop-blur-md transition-all flex items-center gap-1.5 border border-white/20 cursor-pointer shadow-sm"
                    title="Afficher la transcription"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>Transcription</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQuestionNumber(currentEpisode.number);
                      setStep(3);
                    }}
                    className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-[#C89B3C] text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg border border-white/20 hover:border-transparent cursor-pointer shrink-0"
                    title="Choisir cet épisode"
                  >
                    <span>Choisir cet épisode</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* OVERLAY DE TRANSCRIPTION (lisible et soigné sur fond flouté) */}
              {showTranscription && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="transcription-box absolute inset-0 bg-black/90 backdrop-blur-md z-20 flex flex-col justify-between p-6 text-[#FFFDF8] animate-in fade-in duration-200"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/15">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#C89B3C]">
                        Transcription • Épisode {currentEpisode.number}
                      </span>
                      <button
                        onClick={() => setShowTranscription(false)}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                        title="Fermer la transcription"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="font-editorial text-lg font-bold text-white">
                      {currentEpisode.title}
                    </h4>

                    <div className="pt-2">
                      <p className="font-editorial text-base sm:text-lg italic font-light text-white/95 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
                        « {currentEpisode.prompt} »
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-3 border-t border-white/15">
                    <button
                      onClick={() => setShowTranscription(false)}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                    >
                      Masquer
                    </button>

                    <button
                      onClick={() => {
                        setSelectedQuestionNumber(currentEpisode.number);
                        setStep(3);
                      }}
                      className="px-5 py-2 rounded-full bg-[#C89B3C] hover:bg-[#B78A2E] text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Choisir cet épisode</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Flèche suivante (desktop & tablettes) */}
            <button
              onClick={handleNextEpisode}
              aria-label="Épisode suivant"
              className="hidden sm:flex absolute -right-4 md:-right-8 z-20 w-11 h-11 rounded-full bg-[#FFFDF8] border border-[#E4DDCC] text-[#20201D] hover:bg-[#C89B3C] hover:text-white hover:border-transparent items-center justify-center shadow-lg transition-all cursor-pointer transform hover:scale-105"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

        </div>
      )}

      {/* PANNEAU 3 : CHOISIR LE FORMAT : J'AI MA VIDÉO OU ÊTRE FILMÉ(E) */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#E4DDCC] text-xs space-y-1">
            <span className="text-[#8B6845] font-bold uppercase tracking-wider block text-[10px]">
              Votre choix
            </span>
            <p className="text-[#20201D] font-medium">
              {selectedDoc.title} • Épisode {selectedQuestion.number} ({selectedQuestion.title})
            </p>
          </div>

          <p className="text-xs text-[#20201D] font-medium">
            Comment souhaitez-vous transmettre votre vidéo ?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* OPTION A : J'ai ma vidéo */}
            <div
              onClick={() => setVideoOption('HAVE_VIDEO')}
              className={`p-5 rounded-3xl border cursor-pointer transition-all space-y-3 ${
                videoOption === 'HAVE_VIDEO'
                  ? 'bg-[#FFFDF8] border-[#C89B3C] shadow-md ring-2 ring-[#C89B3C]/30'
                  : 'bg-[#FFFDF8] hover:bg-[#F9F6EE] border-[#E4DDCC]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#C89B3C]/15 text-[#8B6845]">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-base font-bold text-[#20201D]">
                    J'ai ma vidéo
                  </h3>
                  <p className="text-[11px] text-[#8B6845]">
                    Enregistrée sur téléphone ou caméra
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#68655D] leading-relaxed">
                Téléversez directement votre fichier vidéo ou partagez un lien sécurisé.
              </p>

              {videoOption === 'HAVE_VIDEO' && (
                <div className="pt-2 border-t border-[#E4DDCC]/80 space-y-2">
                  <input
                    type="file"
                    id="direct-video-input"
                    className="hidden"
                    accept="video/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadedFileName(e.target.files[0].name);
                      }
                    }}
                  />
                  <label
                    htmlFor="direct-video-input"
                    className="block w-full text-center px-4 py-2 rounded-xl bg-[#C89B3C]/15 hover:bg-[#C89B3C]/25 text-xs font-semibold text-[#8B6845] cursor-pointer transition-colors"
                  >
                    {uploadedFileName ? `✓ ${uploadedFileName}` : 'Choisir le fichier vidéo'}
                  </label>
                  <p className="text-[10px] text-[#8B6845] text-center">
                    Formats MP4, MOV, WebM acceptés
                  </p>
                </div>
              )}
            </div>

            {/* OPTION B : Être filmé(e) */}
            <div
              onClick={() => setVideoOption('NEED_VIDEOGRAPHER')}
              className={`p-5 rounded-3xl border cursor-pointer transition-all space-y-3 ${
                videoOption === 'NEED_VIDEOGRAPHER'
                  ? 'bg-[#FFFDF8] border-[#C89B3C] shadow-md ring-2 ring-[#C89B3C]/30'
                  : 'bg-[#FFFDF8] hover:bg-[#F9F6EE] border-[#E4DDCC]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#C89B3C]/15 text-[#8B6845]">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-base font-bold text-[#20201D]">
                    Être filmé(e)
                  </h3>
                  <p className="text-[11px] text-[#8B6845]">
                    Accompagnement par notre réseau
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#68655D] leading-relaxed">
                Un cadreur de notre réseau documentaire vient vous rencontrer dans votre environnement.
              </p>

              {videoOption === 'NEED_VIDEOGRAPHER' && (
                <div className="pt-2 border-t border-[#E4DDCC]/80 space-y-2">
                  <input
                    type="text"
                    placeholder="Votre ville / pays"
                    value={videographerCity}
                    onChange={(e) => setVideographerCity(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E4DDCC] text-xs bg-[#FFFDF8] text-[#20201D] outline-none focus:border-[#C89B3C]"
                  />
                  <input
                    type="text"
                    placeholder="Téléphone ou e-mail"
                    value={videographerContact}
                    onChange={(e) => setVideographerContact(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E4DDCC] text-xs bg-[#FFFDF8] text-[#20201D] outline-none focus:border-[#C89B3C]"
                  />
                </div>
              )}
            </div>

          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 rounded-full bg-[#FFFDF8] hover:bg-[#F5F1E8] border border-[#E4DDCC] text-xs font-medium text-[#20201D] flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </button>

            <button
              disabled={!videoOption || (videoOption === 'HAVE_VIDEO' && !uploadedFileName)}
              onClick={handleFinishSubmission}
              className={`px-7 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 shadow-sm ${
                videoOption && (videoOption === 'NEED_VIDEOGRAPHER' || uploadedFileName)
                  ? 'bg-[#C89B3C] hover:bg-[#B78A2E] text-[#FFFDF8] cursor-pointer'
                  : 'bg-[#E4DDCC] text-[#7A756B] opacity-60 cursor-not-allowed'
              }`}
            >
              <span>{videoOption === 'NEED_VIDEOGRAPHER' ? 'Confirmer ma demande' : 'Transmettre mon récit'}</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MODAL VIDÉO DE PRÉSENTATION (FORMAT VERTICAL 9:16 ÉPURÉ & LISIBLE) */}
      {previewDoc && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setPreviewDoc(null)}
        >
          <div 
            className="relative w-full max-w-[340px] sm:max-w-[380px] bg-[#151513] text-[#FFFDF8] rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
            id={`modal-video-${previewDoc.id}`}
          >
            {/* Barre d'en-tête épurée */}
            <div className="w-full px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-black/50">
              <h3 className="font-editorial text-base sm:text-lg font-bold text-white tracking-wide">
                {previewDoc.title}
              </h3>

              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white/90 hover:text-white transition-colors cursor-pointer"
                title="Fermer"
                id="close-preview-video-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lecteur Vidéo au format vertical 9:16 (identique aux duos) */}
            <div className="relative w-full aspect-[9/16] bg-black overflow-hidden flex items-center justify-center">
              <video
                src={SERIES_PRESENTATIONS[previewDoc.id]?.videoUrl || previewDoc.teaserVideoUrl}
                poster={previewDoc.posterUrl || previewDoc.coverImage}
                autoPlay
                loop
                muted={isVideoMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Voile cinématographique pour les contrôles */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Contrôles overlay sobres */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                <button
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className="p-2 rounded-full bg-black/60 hover:bg-white/25 text-white backdrop-blur-md transition-colors cursor-pointer"
                  title={isVideoMuted ? 'Activer le son' : 'Couper le son'}
                >
                  {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Contrôle central play/pause */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
                <button
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="w-14 h-14 rounded-full bg-black/60 hover:bg-[#C89B3C] text-white backdrop-blur-xs flex items-center justify-center transition-transform hover:scale-110 shadow-2xl cursor-pointer"
                  title={isVideoPlaying ? 'Pause' : 'Lecture'}
                >
                  {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
              </div>

              {/* Bouton unique pour sceller le choix directement depuis la vidéo */}
              <div className="absolute bottom-4 inset-x-4 z-10">
                <button
                  onClick={() => {
                    setSelectedDocId(previewDoc.id);
                    setSelectedQuestionNumber(previewDoc.questions[0].number);
                    setPreviewDoc(null);
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#C89B3C] hover:bg-[#B78A2E] text-white font-bold text-xs sm:text-sm tracking-wide shadow-2xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer"
                  id={`confirm-select-doc-${previewDoc.id}`}
                >
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Sceller ce choix</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
