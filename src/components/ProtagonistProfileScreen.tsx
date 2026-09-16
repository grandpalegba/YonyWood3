import React, { useState } from 'react';
import { 
  ArrowLeft, 
  X, 
  Play, 
  Share2, 
  Check, 
  FolderKanban, 
  BookOpen, 
  HeartHandshake, 
  ShoppingBag,
  Compass,
  Video,
  Link2, 
  ChevronRight, 
  Film 
} from 'lucide-react';
import { PROTAGONISTS, DUOS, DOCUMENTARIES } from '../data/mockData';
import { ViewScreen } from '../types';
import { UniverseDimensionPage, DimensionKey } from './UniverseDimensionPage';

interface ProtagonistProfileScreenProps {
  protagonistId: string;
  onNavigate: (screen: ViewScreen) => void;
}

interface FlowerPetalConfig {
  key: DimensionKey;
  label: string;
  shortDescription: string;
  icon: React.ElementType;
  angle: number; // Angle in degrees around center
}

export const ProtagonistProfileScreen: React.FC<ProtagonistProfileScreenProps> = ({
  protagonistId,
  onNavigate
}) => {
  const protagonist = PROTAGONISTS.find(p => p.id === protagonistId) || PROTAGONISTS[0];
  const [activeDimension, setActiveDimension] = useState<DimensionKey | null>('histoire');
  const [showDuosModal, setShowDuosModal] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  // 6 Directions strictly matching user order:
  // Transmission, Parcours, Histoire, Projet, Offre, Besoin
  const FLOWER_DIRECTIONS: FlowerPetalConfig[] = [
    { 
      key: 'transmissions', 
      label: 'Transmission', 
      shortDescription: 'Savoirs & mémoires reçus',
      icon: BookOpen, 
      angle: 270 // Top
    },
    { 
      key: 'parcours', 
      label: 'Parcours', 
      shortDescription: 'Itinéraire & étapes de vie',
      icon: Compass, 
      angle: 330 // Top Right
    },
    { 
      key: 'histoire', 
      label: 'Histoire', 
      shortDescription: 'Duos documentaires & récits',
      icon: Video, 
      angle: 30 // Bottom Right
    },
    { 
      key: 'projects', 
      label: 'Projet', 
      shortDescription: 'Chantiers vivants en cours',
      icon: FolderKanban, 
      angle: 90 // Bottom
    },
    { 
      key: 'offers', 
      label: 'Offre', 
      shortDescription: 'Créations, ateliers & pièces',
      icon: ShoppingBag, 
      angle: 150 // Bottom Left
    },
    { 
      key: 'needs', 
      label: 'Besoin', 
      shortDescription: 'Appels au réseau & matières',
      icon: HeartHandshake, 
      angle: 210 // Top Left
    }
  ];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find duos featuring this protagonist
  const directDuos = DUOS.filter(
    d => d.protagonistA.id === protagonist.id || d.protagonistB.id === protagonist.id
  );

  const seriesDuos = DUOS.filter(
    d => !directDuos.some(dd => dd.id === d.id)
  );
  const allParticipatingDuos = [...directDuos, ...seriesDuos];

  // Circle radius for flower petals on larger screens
  const petalDistance = 160;

  // IF AN ACTIVE DIMENSION IS SELECTED: RENDER THE FULL IMMERSIVE UNIVERSE PAGE!
  if (activeDimension) {
    return (
      <UniverseDimensionPage
        initialDimension={activeDimension}
        protagonist={{
          id: protagonist.id,
          name: protagonist.name,
          age: protagonist.age,
          territory: protagonist.territory,
          role: protagonist.role,
          photoUrl: protagonist.photoUrl,
          bio: protagonist.bio,
          quote: protagonist.quote,
          documentaryId: protagonist.documentaryId
        }}
        onBack={() => onNavigate({ type: 'duo_feed' })}
        onNavigate={onNavigate}
        customOffers={protagonist.tree.offers}
        customStories={protagonist.stories}
        customTransmissions={protagonist.tree.transmissions}
        customParcours={protagonist.tree.parcours}
        customProjects={protagonist.tree.projects}
        customNeeds={protagonist.tree.needs}
        passeurs={protagonist.tree.passeurs}
        heritiers={protagonist.tree.heritiers}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between pb-32 text-[#20201D] font-sans">
      
      {/* 1. TOP MINIMAL NAVIGATION BAR */}
      <div className="max-w-4xl w-full mx-auto px-4 pt-4">
        <div className="flex items-center justify-between border-b border-[#E4DDCC] pb-3">
          <button
            onClick={() => onNavigate({ type: 'duo_feed' })}
            className="text-xs font-semibold text-[#8B6845] hover:text-[#20201D] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Duos</span>
          </button>

          <div className="flex items-center gap-2">
            <select
              value={protagonist.id}
              onChange={(e) => onNavigate({ type: 'protagonist_profile', protagonistId: e.target.value })}
              className="text-xs bg-[#FFFDF8] border border-[#E4DDCC] rounded-full px-3 py-1.5 text-[#20201D] outline-hidden cursor-pointer hover:border-[#C89B3C] transition-colors"
            >
              {PROTAGONISTS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name.split(' ')[0]} ({p.territory})
                </option>
              ))}
            </select>

            <button
              onClick={handleShare}
              title="Partager le profil"
              className="p-1.5 rounded-full border border-[#E4DDCC] bg-[#FFFDF8] hover:bg-[#F5F1E8] text-[#68655D] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. THE FLOWER INTERFACE (6 DIRECTIONS AROUND PROTAGONIST) */}
      <section className="relative max-w-2xl w-full mx-auto px-4 my-auto flex flex-col items-center pt-4">
        
        {/* DESKTOP / TABLET FLOWER VIEW */}
        <div className="hidden sm:block relative w-[420px] h-[420px] mx-auto my-2">
          
          {/* Subtle Organic Dashed Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-dashed border-[#C89B3C]/30 pointer-events-none" />

          {/* Hairline connecting spokes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {FLOWER_DIRECTIONS.map((petal) => {
              const rad = (petal.angle * Math.PI) / 180;
              const centerX = 210;
              const centerY = 210;
              const nodeX = centerX + petalDistance * Math.cos(rad);
              const nodeY = centerY + petalDistance * Math.sin(rad);
              return (
                <line
                  key={`spoke-${petal.key}`}
                  x1={centerX}
                  y1={centerY}
                  x2={nodeX}
                  y2={nodeY}
                  stroke="#C89B3C"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
              );
            })}
          </svg>

          {/* CENTRAL PROTAGONIST PORTRAIT */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10 text-center pointer-events-auto">
            <div className="w-24 h-24 rounded-full p-1 bg-[#FFFDF8] border-2 border-[#C89B3C]/50 shadow-lg">
              <img
                src={protagonist.photoUrl}
                alt={protagonist.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Prénom plus petit, sans-serif, avec l'âge en dessous */}
            <div className="mt-2 text-center">
              <h2 className="text-base font-bold text-[#20201D] tracking-tight">
                {protagonist.name.split(' ')[0]}
              </h2>
              {protagonist.age && (
                <p className="text-xs text-[#8B6845] font-normal font-sans">
                  {protagonist.age} ans
                </p>
              )}
            </div>
          </div>

          {/* THE 6 PETALS */}
          {FLOWER_DIRECTIONS.map((petal) => {
            const rad = (petal.angle * Math.PI) / 180;
            const centerX = 210;
            const centerY = 210;
            const nodeX = centerX + petalDistance * Math.cos(rad);
            const nodeY = centerY + petalDistance * Math.sin(rad);
            const Icon = petal.icon;

            return (
              <div
                key={petal.key}
                style={{
                  left: `${nodeX}px`,
                  top: `${nodeY}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-20 pointer-events-auto"
              >
                <button
                  onClick={() => setActiveDimension(petal.key)}
                  id={`flower-petal-${petal.key}`}
                  className="group flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#FFFDF8] hover:bg-[#F5F1E8] border border-[#C89B3C]/35 hover:border-[#C89B3C] shadow-xs hover:shadow-md transition-all hover:scale-105 active:scale-95 text-center w-28 cursor-pointer"
                  title={petal.label}
                >
                  <div className="w-7 h-7 rounded-full bg-[#C89B3C]/10 group-hover:bg-[#C89B3C] text-[#8B6845] group-hover:text-[#FFFDF8] flex items-center justify-center transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#20201D] group-hover:text-[#8B6845] mt-1 leading-tight">
                    {petal.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* MOBILE COMPACT VIEW */}
        <div className="sm:hidden w-full space-y-4 py-2">
          {/* Center Identity */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full p-1 bg-[#FFFDF8] border-2 border-[#C89B3C]/50 shadow-md">
              <img
                src={protagonist.photoUrl}
                alt={protagonist.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-base font-bold text-[#20201D] tracking-tight mt-2">
              {protagonist.name.split(' ')[0]}
            </h2>
            {protagonist.age && (
              <p className="text-xs text-[#8B6845] font-normal font-sans">
                {protagonist.age} ans
              </p>
            )}
          </div>

          {/* 6 Grid Directions */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            {FLOWER_DIRECTIONS.map((petal) => {
              const Icon = petal.icon;
              return (
                <button
                  key={petal.key}
                  onClick={() => setActiveDimension(petal.key)}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FFFDF8] border border-[#E4DDCC] hover:border-[#C89B3C] text-left transition-all active:scale-98 shadow-xs cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C89B3C]/10 text-[#8B6845] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#20201D] leading-tight">
                      {petal.label}
                    </p>
                    <p className="text-[10px] text-[#68655D] truncate max-w-[120px]">
                      {petal.shortDescription}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTION BUTTON: LE VOIR DANS DES DUOS */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowDuosModal(true)}
            id="btn-see-in-duos"
            className="px-5 py-2.5 rounded-full bg-[#20201D] hover:bg-[#C89B3C] text-[#FFFDF8] text-xs font-semibold shadow-md flex items-center gap-2 transition-all hover:scale-102 active:scale-98 mx-auto cursor-pointer"
          >
            <Link2 className="w-3.5 h-3.5 text-[#C89B3C] group-hover:text-[#FFFDF8]" />
            <span>Le voir dans des duos</span>
          </button>
        </div>

      </section>

      {/* 3. MODAL: LE VOIR DANS DES DUOS */}
      {showDuosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#20201D]/50 backdrop-blur-xs">
          <div className="w-full max-w-xl max-h-[85vh] bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] shadow-2xl overflow-y-auto flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#E4DDCC] flex items-center justify-between sticky top-0 bg-[#FFFDF8] z-30">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-[#C89B3C]" />
                <h3 className="text-sm font-bold text-[#20201D]">
                  {protagonist.name.split(' ')[0]} dans les duos
                </h3>
              </div>
              <button
                onClick={() => setShowDuosModal(false)}
                className="p-1.5 rounded-full hover:bg-[#E4DDCC]/50 text-[#68655D] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-[#68655D]">
                Retrouvez {protagonist.name.split(' ')[0]} et ses dialogues vivants à travers les 4 duocumentaires fondateurs.
              </p>

              <div className="space-y-3">
                {allParticipatingDuos.map((duo) => {
                  const isA = duo.protagonistA.id === protagonist.id;
                  const partner = isA ? duo.protagonistB : duo.protagonistA;

                  return (
                    <div 
                      key={duo.id} 
                      className="p-4 rounded-2xl bg-[#F5F1E8]/70 border border-[#E4DDCC] hover:border-[#C89B3C]/60 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#C89B3C] uppercase tracking-wider bg-[#FFFDF8] px-2.5 py-0.5 rounded-full border border-[#E4DDCC]">
                          {duo.documentaryTitle} • {duo.episodeNumber}
                        </span>
                        <span className="text-[10px] text-[#68655D]">
                          {duo.questionTitle}
                        </span>
                      </div>

                      {/* Partner info */}
                      <div className="flex items-center gap-3">
                        <img 
                          src={partner.photoUrl} 
                          alt={partner.name}
                          className="w-11 h-11 rounded-full object-cover border border-[#C89B3C]" 
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs font-bold text-[#20201D]">
                              En duo avec {partner.name.split(' ')[0]}
                            </span>
                            {partner.age && (
                              <span className="text-[10px] text-[#8B6845]">
                                ({partner.age} ans)
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#68655D] truncate max-w-xs">
                            {duo.centralQuestion}
                          </p>
                        </div>
                      </div>

                      {/* Watch button */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => {
                            setShowDuosModal(false);
                            onNavigate({ 
                              type: 'video_player', 
                              story: duo.storyA, 
                              protagonist: duo.protagonistA, 
                              duoId: duo.id, 
                              documentaryTitle: duo.documentaryTitle 
                            });
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-[#20201D] hover:bg-[#C89B3C] text-[#FFFDF8] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Visionner ce duo</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Documentary Series shortcut */}
              <div className="pt-2 border-t border-[#E4DDCC] text-center">
                <button
                  onClick={() => {
                    setShowDuosModal(false);
                    onNavigate({ type: 'home' });
                  }}
                  className="text-xs text-[#8B6845] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Explorer l'arbre des 4 duocumentaires</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
