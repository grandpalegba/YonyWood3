import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  TreePine, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Sparkles, 
  Play, 
  Users,
  Vote,
  Award
} from 'lucide-react';
import { PENDING_REVIEWS } from '../data/mockData';
import { ViewScreen, ReviewCandidate } from '../types';

interface ReviewSystemScreenProps {
  onNavigate: (screen: ViewScreen) => void;
}

export const ReviewSystemScreen: React.FC<ReviewSystemScreenProps> = ({ onNavigate }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<ReviewCandidate>(PENDING_REVIEWS[0]);
  const [ratings, setRatings] = useState({
    authenticity: 5,
    clarity: 4,
    technicalQuality: 4,
    charterRespect: 5
  });
  const [comment, setComment] = useState('');
  const [votedSuccess, setVotedSuccess] = useState(false);

  const handleVote = (decision: 'APPROVE' | 'REVISE') => {
    setVotedSuccess(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back button */}
      <button
        onClick={() => onNavigate({ type: 'home' })}
        className="text-xs font-semibold text-[#8B6845] hover:text-[#20201D] flex items-center gap-1.5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour à la forêt</span>
      </button>

      {/* Header Banner */}
      <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 sm:p-8 shadow-card space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/12 text-[#8B6845] text-xs font-semibold">
          <TreePine className="w-3.5 h-3.5" />
          Gouvernance Vivante • ÉCRAN 11
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-[#20201D]">
          L'Avis de la Forêt
        </h1>

        <p className="text-xs sm:text-sm text-[#68655D] leading-relaxed max-w-xl mx-auto">
          À YonyWood, la validation d'une histoire ne dépend ni d'un algorithme secret ni d'un nombre de vues.
          Ce sont les protagonistes déjà intégrés et les pairs du territoire qui veillent à l'authenticité, à la dignité et à la résonance du corpus.
        </p>

        {/* 7 Stages Process Pill */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F1E8] border border-[#E4DDCC] text-xs font-semibold text-[#8B6845]">
            <Award className="w-4 h-4 text-[#C89B3C]" />
            <span>Processus en 7 étapes : Dépôt → Contrôle Technique → <strong>Avis des Pairs</strong> → Montage Duo → Validation Finale</span>
          </div>
        </div>
      </div>

      {/* Two Columns Review Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Video Candidate Preview (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-card space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#E4DDCC]/60 pb-3">
              <span className="text-xs font-bold text-[#C89B3C] uppercase tracking-wider">
                {selectedCandidate.documentaryTitle}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                {selectedCandidate.stage}
              </span>
            </div>

            {/* Video preview simulation */}
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-black group">
              <img
                src={selectedCandidate.videoCoverUrl}
                alt={selectedCandidate.storyTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#D9AF52] flex items-center justify-center text-black shadow-lg">
                  <Play className="w-7 h-7 fill-current ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-xs">
                <span>Candidat : {selectedCandidate.candidateName}</span>
                <span className="font-mono">{selectedCandidate.duration}</span>
              </div>
            </div>

            {/* Story Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#8B6845]">
                  QUESTION {selectedCandidate.questionNumber} : {selectedCandidate.questionTitle}
                </span>
                <span className="text-xs text-[#68655D]">{selectedCandidate.territory}</span>
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#20201D]">
                « {selectedCandidate.storyTitle} »
              </h3>
              <p className="text-xs sm:text-sm text-[#68655D] leading-relaxed">
                {selectedCandidate.summary}
              </p>
            </div>

            {/* Current votes progress */}
            <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#E4DDCC] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#20201D]">Avis exprimés par la forêt</span>
                <span className="text-[#8B6845] font-semibold">{selectedCandidate.currentReviewsCount} / {selectedCandidate.requiredReviewsCount} avis reçus</span>
              </div>
              <div className="w-full bg-[#E4DDCC] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#C89B3C] h-full rounded-full transition-all"
                  style={{ width: `${(selectedCandidate.currentReviewsCount / selectedCandidate.requiredReviewsCount) * 100}%` }}
                />
              </div>
            </div>

          </div>

          {/* Switch Candidate List */}
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#E4DDCC] space-y-3">
            <span className="text-xs font-bold text-[#8B6845] uppercase tracking-wider block">
              Autres histoires en attente de l'Avis de la forêt :
            </span>
            <div className="space-y-2">
              {PENDING_REVIEWS.map(item => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedCandidate(item);
                    setVotedSuccess(false);
                  }}
                  className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    selectedCandidate.id === item.id 
                      ? 'bg-[#F5F1E8] border-[#C89B3C] font-semibold text-[#20201D]'
                      : 'border-[#E4DDCC] hover:bg-[#F5F1E8]/50 text-[#68655D]'
                  }`}
                >
                  <span>{item.candidateName} — {item.storyTitle}</span>
                  <span className="text-[10px] text-[#8B6845]">{item.documentaryTitle.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: The 4 Criteria & Vote Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 sm:p-8 shadow-card space-y-6">
            
            <div className="border-b border-[#E4DDCC]/60 pb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-[#8B6845]">
                Rôle de Gardien du Corpus
              </span>
              <h2 className="font-editorial text-2xl font-bold text-[#20201D] mt-0.5">
                Votre Évaluation
              </h2>
            </div>

            {votedSuccess ? (
              <div className="p-6 rounded-2xl bg-green-50 border border-green-200 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-green-700 mx-auto" />
                <h3 className="font-editorial font-bold text-lg text-green-900">
                  Votre avis a été consigné dans la forêt
                </h3>
                <p className="text-xs text-green-800 leading-relaxed">
                  Merci d'exercer votre regard bienveillant. Dès que les 5 avis seront réunis, l'histoire passera en phase de proposition de duo.
                </p>
                <button
                  onClick={() => setVotedSuccess(false)}
                  className="mt-2 px-4 py-2 rounded-xl bg-green-800 text-white text-xs font-semibold"
                >
                  Modifier mon avis
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                
                {/* Criterion 1: Authenticité */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#20201D]">1. Authenticité de la parole</span>
                    <span className="text-[#C89B3C] font-mono font-bold">{ratings.authenticity}/5</span>
                  </div>
                  <p className="text-[11px] text-[#68655D]">
                    L'histoire est-elle vécue sincèrement, sans artifice commercial ?
                  </p>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={ratings.authenticity}
                    onChange={(e) => setRatings({ ...ratings, authenticity: Number(e.target.value) })}
                    className="w-full accent-[#C89B3C]"
                  />
                </div>

                {/* Criterion 2: Clarté narrative */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#20201D]">2. Clarté narrative & question</span>
                    <span className="text-[#C89B3C] font-mono font-bold">{ratings.clarity}/5</span>
                  </div>
                  <p className="text-[11px] text-[#68655D]">
                    La réponse à la question centrale est-elle intelligible et captivante ?
                  </p>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={ratings.clarity}
                    onChange={(e) => setRatings({ ...ratings, clarity: Number(e.target.value) })}
                    className="w-full accent-[#C89B3C]"
                  />
                </div>

                {/* Criterion 3: Qualité technique */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#20201D]">3. Qualité sonore & visuelle</span>
                    <span className="text-[#C89B3C] font-mono font-bold">{ratings.technicalQuality}/5</span>
                  </div>
                  <p className="text-[11px] text-[#68655D]">
                    Son propre et voix distincte, image stable en lumière naturelle.
                  </p>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={ratings.technicalQuality}
                    onChange={(e) => setRatings({ ...ratings, technicalQuality: Number(e.target.value) })}
                    className="w-full accent-[#C89B3C]"
                  />
                </div>

                {/* Criterion 4: Respect de la charte */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#20201D]">4. Dignité & esprit YonyWood</span>
                    <span className="text-[#C89B3C] font-mono font-bold">{ratings.charterRespect}/5</span>
                  </div>
                  <p className="text-[11px] text-[#68655D]">
                    Respect des êtres, absence de provocation ou de haine.
                  </p>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={ratings.charterRespect}
                    onChange={(e) => setRatings({ ...ratings, charterRespect: Number(e.target.value) })}
                    className="w-full accent-[#C89B3C]"
                  />
                </div>

                {/* Note / Comment */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-[#20201D] block">
                    Votre mot bienveillant ou recommandation :
                  </label>
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Ce que cette parole suscite en vous..."
                    className="w-full p-3 rounded-xl bg-[#F5F1E8] border border-[#E4DDCC] text-xs focus:outline-none focus:border-[#C89B3C]"
                  />
                </div>

                {/* Decision Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleVote('APPROVE')}
                    className="flex-1 py-3 rounded-xl bg-[#C89B3C] hover:bg-[#B78A2E] text-white font-medium text-xs transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Valider pour la Forêt</span>
                  </button>

                  <button
                    onClick={() => handleVote('REVISE')}
                    className="px-4 py-3 rounded-xl bg-[#FFFDF8] hover:bg-[#F5F1E8] border border-[#E4DDCC] text-xs font-medium text-[#8B6845] transition-colors"
                  >
                    Demander retouche son
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
