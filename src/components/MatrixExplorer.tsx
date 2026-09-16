import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  X, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  ChevronLeft,
  Tv
} from 'lucide-react';
import { AffiliationPerson, ViewScreen } from '../types';
import { MATRIX_SERIES_DATA, MatrixSeriesConfig } from '../data/matrixData';
import { RemoteControlModal } from './RemoteControlModal';
import { CentralAstrolabeJoystick } from './CentralAstrolabeJoystick';
import { VerticalZoomSlider } from './VerticalZoomSlider';

interface MatrixExplorerProps {
  onNavigate: (screen: ViewScreen) => void;
}

interface MandalaNode {
  person: AffiliationPerson;
  x: number;
  y: number;
  r: number;
  level: number; // 0 = Couronne 1 (16 Pionniers), 1 = Gen 2, 2 = Gen 3, 3 = Gen 4, 4 = Gen 5
  angleDeg: number;
  parentId?: string;
}

export const MatrixExplorer: React.FC<MatrixExplorerProps> = ({ onNavigate }) => {
  // Sélecteur de série : null = "Toutes les séries • Flux aléatoire" (exactement comme sur Duo)
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(null);
  const [isRemoteOpen, setIsRemoteOpen] = useState<boolean>(false);

  // Chemin actif de sélection dans le mandala : [pioneer, gen2, gen3, gen4...]
  const [lineageTrail, setLineageTrail] = useState<AffiliationPerson[]>([]);

  // Survol d'un nœud pour illuminer
  const [hoveredPersonId, setHoveredPersonId] = useState<string | null>(null);

  // Vidéo Teaser active (ouverte au 2e clic sur la personne sélectionnée)
  const [activeTeaserPerson, setActiveTeaserPerson] = useState<AffiliationPerson | null>(null);

  // Angle de rotation global du Mandala (en degrés)
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  // Zoom de la scène (contrôlé par le curseur vertical intuitif)
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isTeaserPlaying, setIsTeaserPlaying] = useState<boolean>(true);
  const [isTeaserMuted, setIsTeaserMuted] = useState<boolean>(false);
  const teaserVideoRef = useRef<HTMLVideoElement | null>(null);

  // Drag-to-rotate interactif au pointeur sur le fond du mandala
  const isDraggingRef = useRef<boolean>(false);
  const startDragAngleRef = useRef<number>(0);
  const startRotationRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Génération des 16 pionniers représentatifs pour "Toutes les séries" (4 par série)
  const globalAllPioneers = useMemo<AffiliationPerson[]>(() => {
    const list: AffiliationPerson[] = [];
    MATRIX_SERIES_DATA.forEach(series => {
      list.push(...series.pioneers.slice(0, 4));
    });
    return list.slice(0, 16);
  }, []);

  // Configuration de la série courante ou de la constellation globale
  const currentSeries = useMemo<MatrixSeriesConfig>(() => {
    if (!selectedSeriesId) {
      return {
        seriesId: 'all',
        seriesTitle: 'Toutes les séries',
        subtitle: 'L’arbre universel de la transmission',
        description: 'Constellation globale réunissant les pionniers majeurs de toutes les séries.',
        centralQuestion: 'La transmission vivante',
        accentColor: '#C89B3C',
        pioneers: globalAllPioneers
      };
    }
    return MATRIX_SERIES_DATA.find(s => s.seriesId === selectedSeriesId) || MATRIX_SERIES_DATA[0];
  }, [selectedSeriesId, globalAllPioneers]);

  // Réinitialiser la navigation du mandala lors d'un changement de série
  useEffect(() => {
    setLineageTrail([]);
    setHoveredPersonId(null);
    setRotationAngle(0);
  }, [selectedSeriesId]);

  // Dimensions géométriques du Mandala
  const SVG_SIZE = 920;
  const CENTER_X = 460;
  const CENTER_Y = 460;

  // RAYONS DES COURONNES : ORGANISATION HARMONIEUSE & ADAPTATIVE
  // Au repos (Gen 0), le cercle initial de 16 pionniers s'épanouit généreusement (R = 250)
  // pour occuper confortablement l'écran dès le départ sur ordinateur sans obliger à zoomer.
  // Quand on clique sur une personne, le cercle des pionniers se resserre avec grâce
  // au fur et à mesure que les générations successives fleurissent vers l'extérieur.
  const depth = lineageTrail.length;
  const R_ORBIT_PIONEERS = depth === 0 ? 250 : depth === 1 ? 180 : depth === 2 ? 145 : 125;
  const R_ORBIT_GEN2     = depth <= 1 ? 315 : depth === 2 ? 250 : 210;
  const R_ORBIT_GEN3     = depth <= 2 ? 355 : 295;
  const R_ORBIT_GEN4     = 380;
  const R_ORBIT_GEN5     = 430;

  // Gestion du Drag-to-rotate angulaire directement sur le canevas d'arrière-plan
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button') || 
        (e.target as HTMLElement).closest('.mandala-node-target') || 
        (e.target as HTMLElement).closest('#central-astrolabe-joystick') ||
        (e.target as HTMLElement).closest('#vertical-zoom-slider')) {
      return;
    }
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const clickAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    
    isDraggingRef.current = true;
    startDragAngleRef.current = clickAngle;
    startRotationRef.current = rotationAngle;
  };

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    const delta = currentAngle - startDragAngleRef.current;
    setRotationAngle((startRotationRef.current + delta) % 360);
  }, []);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Décompte de descendance totale
  const countDescendants = (p: AffiliationPerson): number => {
    let count = 0;
    if (p.invitedPeople) {
      count += p.invitedPeople.length;
      for (const child of p.invitedPeople) {
        count += countDescendants(child);
      }
    }
    return count;
  };

  // 1. Calcul des 16 Pionniers sur la couronne intérieure (autour de la manette centrale)
  const pioneerNodes: MandalaNode[] = useMemo(() => {
    const count = currentSeries.pioneers.length;
    return currentSeries.pioneers.map((pioneer, i) => {
      const baseAngle = (i / count) * 360 - 90;
      const effectiveAngle = baseAngle + rotationAngle;
      const rad = (effectiveAngle * Math.PI) / 180;
      return {
        person: pioneer,
        x: CENTER_X + R_ORBIT_PIONEERS * Math.cos(rad),
        y: CENTER_Y + R_ORBIT_PIONEERS * Math.sin(rad),
        r: 18,
        level: 0,
        angleDeg: effectiveAngle
      };
    });
  }, [currentSeries, rotationAngle, R_ORBIT_PIONEERS]);

  const selectedPioneer = lineageTrail[0] || null;
  const selectedGen2 = lineageTrail[1] || null;
  const selectedGen3 = lineageTrail[2] || null;
  const selectedGen4 = lineageTrail[3] || null;

  // 2. Calcul des Nœuds Gen 2 (s'étendent vers l'EXTÉRIEUR sur l'anneau 2)
  const gen2Nodes: MandalaNode[] = useMemo(() => {
    if (!selectedPioneer || !selectedPioneer.invitedPeople || selectedPioneer.invitedPeople.length === 0) {
      return [];
    }
    const pioneerNode = pioneerNodes.find(n => n.person.id === selectedPioneer.id);
    const baseAngle = pioneerNode ? pioneerNode.angleDeg : -90;
    const count = selectedPioneer.invitedPeople.length;

    // Éventail harmonieux rayonnant vers l'extérieur
    const arcSpread = count === 1 ? 0 : Math.min(80, count * 26);
    const startAngle = baseAngle - arcSpread / 2;

    return selectedPioneer.invitedPeople.map((person, i) => {
      const angle = count === 1 ? baseAngle : startAngle + (i / (count - 1)) * arcSpread;
      const rad = (angle * Math.PI) / 180;
      return {
        person,
        x: CENTER_X + R_ORBIT_GEN2 * Math.cos(rad),
        y: CENTER_Y + R_ORBIT_GEN2 * Math.sin(rad),
        r: 16,
        level: 1,
        angleDeg: angle,
        parentId: selectedPioneer.id
      };
    });
  }, [selectedPioneer, pioneerNodes, R_ORBIT_GEN2]);

  // 3. Calcul des Nœuds Gen 3 (s'étendent encore plus vers l'EXTÉRIEUR sur l'anneau 3)
  const gen3Nodes: MandalaNode[] = useMemo(() => {
    if (!selectedGen2 || !selectedGen2.invitedPeople || selectedGen2.invitedPeople.length === 0) {
      return [];
    }
    const gen2Node = gen2Nodes.find(n => n.person.id === selectedGen2.id);
    const baseAngle = gen2Node ? gen2Node.angleDeg : -90;
    const count = selectedGen2.invitedPeople.length;

    const arcSpread = count === 1 ? 0 : Math.min(60, count * 24);
    const startAngle = baseAngle - arcSpread / 2;

    return selectedGen2.invitedPeople.map((person, i) => {
      const angle = count === 1 ? baseAngle : startAngle + (i / (count - 1)) * arcSpread;
      const rad = (angle * Math.PI) / 180;
      return {
        person,
        x: CENTER_X + R_ORBIT_GEN3 * Math.cos(rad),
        y: CENTER_Y + R_ORBIT_GEN3 * Math.sin(rad),
        r: 14,
        level: 2,
        angleDeg: angle,
        parentId: selectedGen2.id
      };
    });
  }, [selectedGen2, gen2Nodes, R_ORBIT_GEN3]);

  // 4. Calcul des Nœuds Gen 4 (s'étendent vers la périphérie sur l'anneau 4)
  const gen4Nodes: MandalaNode[] = useMemo(() => {
    if (!selectedGen3 || !selectedGen3.invitedPeople || selectedGen3.invitedPeople.length === 0) {
      return [];
    }
    const gen3Node = gen3Nodes.find(n => n.person.id === selectedGen3.id);
    const baseAngle = gen3Node ? gen3Node.angleDeg : -90;
    const count = selectedGen3.invitedPeople.length;

    const arcSpread = count === 1 ? 0 : Math.min(50, count * 22);
    const startAngle = baseAngle - arcSpread / 2;

    return selectedGen3.invitedPeople.map((person, i) => {
      const angle = count === 1 ? baseAngle : startAngle + (i / (count - 1)) * arcSpread;
      const rad = (angle * Math.PI) / 180;
      return {
        person,
        x: CENTER_X + R_ORBIT_GEN4 * Math.cos(rad),
        y: CENTER_Y + R_ORBIT_GEN4 * Math.sin(rad),
        r: 12,
        level: 3,
        angleDeg: angle,
        parentId: selectedGen3.id
      };
    });
  }, [selectedGen3, gen3Nodes, R_ORBIT_GEN4]);

  // 5. Calcul des Nœuds Gen 5 (sur la couronne extérieure ultime)
  const gen5Nodes: MandalaNode[] = useMemo(() => {
    if (!selectedGen4 || !selectedGen4.invitedPeople || selectedGen4.invitedPeople.length === 0) {
      return [];
    }
    const gen4Node = gen4Nodes.find(n => n.person.id === selectedGen4.id);
    const baseAngle = gen4Node ? gen4Node.angleDeg : -90;
    const count = selectedGen4.invitedPeople.length;

    return selectedGen4.invitedPeople.map((person, i) => {
      const angle = count === 1 ? baseAngle : baseAngle - 20 + i * 20;
      const rad = (angle * Math.PI) / 180;
      return {
        person,
        x: CENTER_X + R_ORBIT_GEN5 * Math.cos(rad),
        y: CENTER_Y + R_ORBIT_GEN5 * Math.sin(rad),
        r: 10,
        level: 4,
        angleDeg: angle,
        parentId: selectedGen4.id
      };
    });
  }, [selectedGen4, gen4Nodes, R_ORBIT_GEN5]);

  // Règle d'interaction utilisateur :
  // 1er clic sur une personne -> déploie ses invités vers l'extérieur
  // 2e clic sur la personne déjà sélectionnée -> ouvre la modale de présentation pour entrer dans son univers
  const handleNodeClick = (person: AffiliationPerson, level: number) => {
    const isCurrentlySelectedAtThisLevel = lineageTrail[level]?.id === person.id;

    if (isCurrentlySelectedAtThisLevel) {
      setActiveTeaserPerson(person);
      return;
    }

    setLineageTrail(prev => {
      const newTrail = prev.slice(0, level);
      newTrail[level] = person;
      return newTrail;
    });
  };

  // Video Autoplay control
  useEffect(() => {
    if (activeTeaserPerson && teaserVideoRef.current) {
      teaserVideoRef.current.currentTime = 0;
      teaserVideoRef.current.play().catch(() => {});
      setIsTeaserPlaying(true);
    }
  }, [activeTeaserPerson]);

  const toggleTeaserPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!teaserVideoRef.current) return;
    if (isTeaserPlaying) {
      teaserVideoRef.current.pause();
      setIsTeaserPlaying(false);
    } else {
      teaserVideoRef.current.play();
      setIsTeaserPlaying(true);
    }
  };

  const toggleTeaserMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!teaserVideoRef.current) return;
    teaserVideoRef.current.muted = !isTeaserMuted;
    setIsTeaserMuted(!isTeaserMuted);
  };

  // Obtenir les coordonnées du parent sélectionné pour tracer les rayons vers l'extérieur
  const activePioneerNode = selectedPioneer ? pioneerNodes.find(n => n.person.id === selectedPioneer.id) : null;
  const activeGen2Node = selectedGen2 ? gen2Nodes.find(n => n.person.id === selectedGen2.id) : null;
  const activeGen3Node = selectedGen3 ? gen3Nodes.find(n => n.person.id === selectedGen3.id) : null;

  return (
    <div 
      className="min-h-screen bg-[#F5F1E8] text-[#20201D] pb-24 pt-2 px-2 sm:px-4 relative overflow-hidden select-none flex flex-col items-center justify-start cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      
      {/* ATMOSPHÈRE CHALEUREUSE DU MANDALA : FOND LIN NATUREL & AURAS DORÉES */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-85"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(200, 155, 60, 0.12) 0%, rgba(245, 241, 232, 0.5) 45%, rgba(238, 230, 216, 0.95) 100%),
            radial-gradient(circle at 50% 50%, rgba(255, 253, 248, 0.8) 0%, transparent 70%)
          `
        }}
      />

      {/* HEADER ÉPURÉ : SÉLECTEUR TÉLÉCOMMANDE DES SÉRIES */}
      <div className="relative z-20 w-full max-w-4xl flex items-center justify-between border-b border-[#E4DDCC] pb-2 px-2 mb-1">
        {/* SÉLECTEUR TÉLÉCOMMANDE AVEC LA PETITE TÉLÉ */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsRemoteOpen(true)}
            id="open-explorer-series-btn"
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] hover:bg-[#F5F1E8] border border-[#E4DDCC] hover:border-[#C89B3C] transition-all shadow-xs cursor-pointer"
          >
            <Tv className="w-3.5 h-3.5 text-[#C89B3C] group-hover:scale-110 transition-transform" />
            <span className="font-editorial text-xs sm:text-sm font-medium text-[#20201D]">
              {selectedSeriesId 
                ? currentSeries.seriesTitle 
                : 'Tous'
              }
            </span>
            {selectedSeriesId && (
              <span className="w-2 h-2 rounded-full bg-[#C89B3C] animate-pulse" title="Filtre actif" />
            )}
          </button>

          {(selectedSeriesId || lineageTrail.length > 0) && (
            <button
              onClick={() => {
                setSelectedSeriesId(null);
                setLineageTrail([]);
                setRotationAngle(0);
              }}
              className="p-1.5 rounded-full hover:bg-[#E4DDCC]/50 text-[#8B6845] hover:text-[#20201D] text-xs transition-colors cursor-pointer"
              aria-label="Réinitialiser"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* CURSEUR DE ZOOM VERTICAL INTUITIF FLOTTANT SUR LE CÔTÉ DROIT */}
      <VerticalZoomSlider
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
        minZoom={0.65}
        maxZoom={1.45}
      />

      {/* LE MANDALA VIVANT (CHAMP CIRCULAIRE TOURNANT AVEC LA MANETTE AU CENTRE) */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-[880px] aspect-square flex items-center justify-center transition-transform duration-100 ease-out origin-center my-auto"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <svg 
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} 
          className="w-full h-full overflow-visible select-none pointer-events-none"
        >
          <defs>
            <filter id="mandalaGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. COURONNES CONCENTRIQUES DU MANDALA EN OR FIN & BISTRE DOUX */}
          
          {/* Cercle solaire doré entourant la manette centrale */}
          <circle 
            cx={CENTER_X} 
            cy={CENTER_Y} 
            r={46} 
            fill="none" 
            stroke="rgba(200, 155, 60, 0.35)" 
            strokeWidth="1.2" 
            strokeDasharray="2 3"
          />

          {/* 16 RAYONS SOLAIRES EN OR : LIENS ENTRE LA MANETTE CENTRALE ET LES 16 PHOTOS DU SOLEIL */}
          {pioneerNodes.map((node) => {
            const isHovered = hoveredPersonId === node.person.id;
            const isSelected = selectedPioneer?.id === node.person.id;
            const rad = (node.angleDeg * Math.PI) / 180;
            const rStart = 46; // Naissance du rayon juste au bord de la manette centrale
            const rEnd = R_ORBIT_PIONEERS - 20; // Arrivée juste devant le portrait du pionnier
            const x1 = CENTER_X + rStart * Math.cos(rad);
            const y1 = CENTER_Y + rStart * Math.sin(rad);
            const x2 = CENTER_X + rEnd * Math.cos(rad);
            const y2 = CENTER_Y + rEnd * Math.sin(rad);

            return (
              <g key={`sun-ray-${node.person.id}`} className="transition-all duration-500 ease-out">
                {/* Rayon solaire rayonnant */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={
                    isSelected
                      ? '#C89B3C'
                      : isHovered
                      ? '#8B6845'
                      : 'rgba(200, 155, 60, 0.40)'
                  }
                  strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.2}
                  strokeDasharray={isSelected ? undefined : '3 4'}
                  strokeLinecap="round"
                  filter={isSelected || isHovered ? 'url(#mandalaGlow)' : undefined}
                />
                {/* Petit éclat ou perle dorée à l'origine du rayon */}
                <circle
                  cx={x1}
                  cy={y1}
                  r={isSelected ? 2.5 : isHovered ? 2 : 1.2}
                  fill={isSelected ? '#C89B3C' : isHovered ? '#8B6845' : 'rgba(200, 155, 60, 0.6)'}
                />
              </g>
            );
          })}

          {/* Anneau 1 : Les 16 Pionniers (autour du centre) */}
          <circle 
            cx={CENTER_X} 
            cy={CENTER_Y} 
            r={R_ORBIT_PIONEERS} 
            fill="none" 
            stroke="rgba(139, 104, 69, 0.22)" 
            strokeWidth="1.5" 
            strokeDasharray="4 8"
            className="opacity-90 transition-all duration-500 ease-out"
          />

          {/* Anneau 2 : Génération 2 (s'étend vers l'extérieur) */}
          <circle 
            cx={CENTER_X} 
            cy={CENTER_Y} 
            r={R_ORBIT_GEN2} 
            fill="none" 
            stroke={selectedPioneer ? 'rgba(200, 155, 60, 0.7)' : 'rgba(139, 104, 69, 0.14)'} 
            strokeWidth={selectedPioneer ? "2.5" : "1"} 
            strokeDasharray={selectedPioneer ? 'none' : '3 6'} 
            filter={selectedPioneer ? 'url(#subtleGlow)' : undefined}
            className="transition-all duration-500 ease-out"
          />

          {/* Anneau 3 : Génération 3 (s'étend encore plus loin) */}
          <circle 
            cx={CENTER_X} 
            cy={CENTER_Y} 
            r={R_ORBIT_GEN3} 
            fill="none" 
            stroke={selectedGen2 ? 'rgba(200, 155, 60, 0.8)' : 'rgba(139, 104, 69, 0.10)'} 
            strokeWidth={selectedGen2 ? "2" : "1"} 
            strokeDasharray={selectedGen2 ? 'none' : '2 5'} 
            filter={selectedGen2 ? 'url(#subtleGlow)' : undefined}
            className="transition-all duration-500 ease-out"
          />

          {/* Anneau 4 : Génération 4 (confins célestes) */}
          <circle 
            cx={CENTER_X} 
            cy={CENTER_Y} 
            r={R_ORBIT_GEN4} 
            fill="none" 
            stroke={selectedGen3 ? 'rgba(200, 155, 60, 0.85)' : 'rgba(139, 104, 69, 0.08)'} 
            strokeWidth={selectedGen3 ? "1.5" : "1"} 
            strokeDasharray={selectedGen3 ? 'none' : '2 4'} 
            className="transition-all duration-500 ease-out"
          />

          {/* RAYONS DORÉS CONNECTANT LE PARENT À SES ENFANTS VERS L'EXTÉRIEUR */}
          {/* Rayons Pionnier -> Gen 2 */}
          {activePioneerNode && gen2Nodes.map((childNode) => (
            <line
              key={`ray-gen1-${childNode.person.id}`}
              x1={activePioneerNode.x}
              y1={activePioneerNode.y}
              x2={childNode.x}
              y2={childNode.y}
              stroke="rgba(200, 155, 60, 0.65)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          ))}

          {/* Rayons Gen 2 -> Gen 3 */}
          {activeGen2Node && gen3Nodes.map((childNode) => (
            <line
              key={`ray-gen2-${childNode.person.id}`}
              x1={activeGen2Node.x}
              y1={activeGen2Node.y}
              x2={childNode.x}
              y2={childNode.y}
              stroke="rgba(200, 155, 60, 0.75)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          ))}

          {/* Rayons Gen 3 -> Gen 4 */}
          {activeGen3Node && gen4Nodes.map((childNode) => (
            <line
              key={`ray-gen3-${childNode.person.id}`}
              x1={activeGen3Node.x}
              y1={activeGen3Node.y}
              x2={childNode.x}
              y2={childNode.y}
              stroke="rgba(200, 155, 60, 0.85)"
              strokeWidth="1.5"
            />
          ))}
        </svg>

        {/* --- LA MANETTE INTÉRIEURE AU CENTRE DU MANDALA --- */}
        <CentralAstrolabeJoystick
          rotationAngle={rotationAngle}
          onRotateDelta={(delta) => setRotationAngle(prev => (prev + delta) % 360)}
          onSetRotationAngle={(angle) => setRotationAngle(angle)}
          onReset={() => {
            setRotationAngle(0);
            setLineageTrail([]);
          }}
        />

        {/* --- NŒUDS POSITIONNÉS SUR LE MANDALA (UNIQUEMENT VISAGES & NUMÉROS DE LIAISON) --- */}

        {/* 1. COURONNE 1 : LES PIONNIERS (Autour de la manette centrale) */}
        {pioneerNodes.map((node) => {
          const isSelected = selectedPioneer?.id === node.person.id;
          const isHovered = hoveredPersonId === node.person.id;
          const hasLineage = node.person.invitedPeople && node.person.invitedPeople.length > 0;
          const totalDesc = hasLineage ? countDescendants(node.person) : 0;

          return (
            <div
              key={node.person.id}
              onClick={() => handleNodeClick(node.person, 0)}
              onMouseEnter={() => setHoveredPersonId(node.person.id)}
              onMouseLeave={() => setHoveredPersonId(null)}
              className="mandala-node-target absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group pointer-events-auto transition-all duration-500 ease-out z-20"
              style={{
                left: `${(node.x / SVG_SIZE) * 100}%`,
                top: `${(node.y / SVG_SIZE) * 100}%`,
              }}
              title={node.person.name}
              id={`mandala-node-${node.person.id}`}
            >
              <div className="relative">
                {/* Aura rayonnante autour du portrait */}
                <div className={`absolute -inset-1.5 rounded-full transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#C89B3C] opacity-90 blur-md scale-115 animate-pulse'
                    : isHovered
                    ? 'bg-[#C89B3C]/60 opacity-80 blur-xs scale-105'
                    : 'opacity-0 group-hover:opacity-100 group-hover:bg-[#C89B3C]/40'
                }`} />

                {/* Avatar du pionnier */}
                <img
                  src={node.person.photoUrl}
                  alt={node.person.name}
                  className={`w-8.5 h-8.5 sm:w-9 sm:h-9 md:w-9.5 md:h-9.5 rounded-full object-cover border-2 transition-all duration-300 transform group-hover:scale-110 relative z-10 shadow-md ${
                    isSelected
                      ? 'border-[#C89B3C] shadow-[0_0_18px_rgba(200,155,60,0.8)] scale-105 ring-2 ring-[#C89B3C]/40'
                      : 'border-[#E4DDCC] group-hover:border-[#C89B3C]'
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* Numéro de liaison */}
                {hasLineage && (
                  <span className={`absolute -bottom-0.5 -right-0.5 z-20 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7.5px] font-bold border transition-all ${
                    isSelected 
                      ? 'bg-[#C89B3C] text-white border-white shadow-md' 
                      : 'bg-[#20201D] text-[#FFFDF8] border-white group-hover:bg-[#C89B3C]'
                  }`}>
                    {totalDesc}
                  </span>
                )}
              </div>

              {/* Au survol : uniquement prénom et nom de la personne */}
              {isHovered && (
                <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-[#20201D] text-[#FFFDF8] text-[11px] font-sans font-medium whitespace-nowrap shadow-md z-30 pointer-events-none animate-in fade-in duration-150">
                  {node.person.name}
                </div>
              )}
            </div>
          );
        })}

        {/* 2. COURONNE 2 : GÉNÉRATION 2 */}
        {gen2Nodes.map((node) => {
          const isSelected = selectedGen2?.id === node.person.id;
          const isHovered = hoveredPersonId === node.person.id;
          const hasLineage = node.person.invitedPeople && node.person.invitedPeople.length > 0;
          const totalDesc = hasLineage ? countDescendants(node.person) : 0;

          return (
            <div
              key={node.person.id}
              onClick={() => handleNodeClick(node.person, 1)}
              onMouseEnter={() => setHoveredPersonId(node.person.id)}
              onMouseLeave={() => setHoveredPersonId(null)}
              className="mandala-node-target absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group pointer-events-auto transition-all duration-500 ease-out z-20"
              style={{
                left: `${(node.x / SVG_SIZE) * 100}%`,
                top: `${(node.y / SVG_SIZE) * 100}%`,
              }}
              title={node.person.name}
              id={`mandala-node-gen2-${node.person.id}`}
            >
              <div className="relative">
                <div className={`absolute -inset-1.5 rounded-full transition-all ${
                  isSelected 
                    ? 'bg-[#C89B3C] opacity-90 blur-sm scale-110 animate-pulse' 
                    : isHovered
                    ? 'bg-[#C89B3C]/70 blur-xs'
                    : 'opacity-0 group-hover:opacity-100 group-hover:bg-[#C89B3C]/40'
                }`} />
                <img
                  src={node.person.photoUrl}
                  alt={node.person.name}
                  className={`w-7.5 h-7.5 sm:w-8 sm:h-8 md:w-8.5 md:h-8.5 rounded-full object-cover border-2 transition-all transform group-hover:scale-110 relative z-10 shadow-sm ${
                    isSelected ? 'border-[#C89B3C] shadow-[0_0_16px_rgba(200,155,60,0.7)] scale-105' : 'border-[#E4DDCC] group-hover:border-[#C89B3C]'
                  }`}
                  referrerPolicy="no-referrer"
                />
                {hasLineage && (
                  <span className="absolute -bottom-0.5 -right-0.5 z-20 w-3 h-3 rounded-full bg-[#C89B3C] text-white text-[7px] font-bold flex items-center justify-center border border-white">
                    {totalDesc}
                  </span>
                )}
              </div>

              {/* Au survol : uniquement prénom et nom de la personne */}
              {isHovered && (
                <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-[#20201D] text-[#FFFDF8] text-[11px] font-sans font-medium whitespace-nowrap shadow-md z-30 pointer-events-none animate-in fade-in duration-150">
                  {node.person.name}
                </div>
              )}
            </div>
          );
        })}

        {/* 3. COURONNE 3 : GÉNÉRATION 3 */}
        {gen3Nodes.map((node) => {
          const isSelected = selectedGen3?.id === node.person.id;
          const isHovered = hoveredPersonId === node.person.id;
          const hasLineage = node.person.invitedPeople && node.person.invitedPeople.length > 0;
          const totalDesc = hasLineage ? countDescendants(node.person) : 0;

          return (
            <div
              key={node.person.id}
              onClick={() => handleNodeClick(node.person, 2)}
              onMouseEnter={() => setHoveredPersonId(node.person.id)}
              onMouseLeave={() => setHoveredPersonId(null)}
              className="mandala-node-target absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group pointer-events-auto transition-all duration-500 ease-out z-20"
              style={{
                left: `${(node.x / SVG_SIZE) * 100}%`,
                top: `${(node.y / SVG_SIZE) * 100}%`,
              }}
              title={node.person.name}
              id={`mandala-node-gen3-${node.person.id}`}
            >
              <div className="relative">
                <div className={`absolute -inset-1.5 rounded-full transition-all ${
                  isSelected 
                    ? 'bg-[#C89B3C] opacity-90 blur-sm scale-110' 
                    : isHovered
                    ? 'bg-[#C89B3C]/70 blur-xs'
                    : 'opacity-0'
                }`} />
                <img
                  src={node.person.photoUrl}
                  alt={node.person.name}
                  className={`w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full object-cover border-2 transition-all transform group-hover:scale-110 relative z-10 shadow-xs ${
                    isSelected ? 'border-[#C89B3C] shadow-[0_0_12px_rgba(200,155,60,0.6)]' : 'border-[#E4DDCC] group-hover:border-[#C89B3C]'
                  }`}
                  referrerPolicy="no-referrer"
                />
                {hasLineage && (
                  <span className="absolute -bottom-0.5 -right-0.5 z-20 w-2.5 h-2.5 rounded-full bg-[#C89B3C] text-white text-[6.5px] font-bold flex items-center justify-center border border-white">
                    {totalDesc}
                  </span>
                )}
              </div>

              {/* Au survol : uniquement prénom et nom de la personne */}
              {isHovered && (
                <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-[#20201D] text-[#FFFDF8] text-[11px] font-sans font-medium whitespace-nowrap shadow-md z-30 pointer-events-none animate-in fade-in duration-150">
                  {node.person.name}
                </div>
              )}
            </div>
          );
        })}

        {/* 4. COURONNE 4 : GÉNÉRATION 4 */}
        {gen4Nodes.map((node) => {
          const isSelected = selectedGen4?.id === node.person.id;
          const isHovered = hoveredPersonId === node.person.id;
          const hasLineage = node.person.invitedPeople && node.person.invitedPeople.length > 0;

          return (
            <div
              key={node.person.id}
              onClick={() => handleNodeClick(node.person, 3)}
              onMouseEnter={() => setHoveredPersonId(node.person.id)}
              onMouseLeave={() => setHoveredPersonId(null)}
              className="mandala-node-target absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group pointer-events-auto transition-all duration-500 ease-out z-20"
              style={{
                left: `${(node.x / SVG_SIZE) * 100}%`,
                top: `${(node.y / SVG_SIZE) * 100}%`,
              }}
              title={node.person.name}
              id={`mandala-node-gen4-${node.person.id}`}
            >
              <div className="relative">
                <div className={`absolute -inset-1 rounded-full ${isSelected ? 'bg-[#C89B3C] blur-xs scale-110' : ''}`} />
                <img
                  src={node.person.photoUrl}
                  alt={node.person.name}
                  className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full object-cover border transition-transform relative z-10 ${
                    isSelected ? 'border-[#C89B3C] ring-2 ring-[#C89B3C]/60 scale-110' : 'border-[#E4DDCC] group-hover:border-[#C89B3C]'
                  }`}
                  referrerPolicy="no-referrer"
                />
                {hasLineage && (
                  <span className="absolute -bottom-0.5 -right-0.5 z-20 w-2 h-2 rounded-full bg-[#C89B3C] text-white text-[6px] font-bold flex items-center justify-center">
                    +
                  </span>
                )}
              </div>

              {/* Au survol : uniquement prénom et nom de la personne */}
              {isHovered && (
                <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-[#20201D] text-[#FFFDF8] text-[11px] font-sans font-medium whitespace-nowrap shadow-md z-30 pointer-events-none animate-in fade-in duration-150">
                  {node.person.name}
                </div>
              )}
            </div>
          );
        })}

        {/* 5. COURONNE 5 : GÉNÉRATION 5 */}
        {gen5Nodes.map((node) => {
          const isHovered = hoveredPersonId === node.person.id;
          return (
            <div
              key={node.person.id}
              onClick={() => handleNodeClick(node.person, 4)}
              onMouseEnter={() => setHoveredPersonId(node.person.id)}
              onMouseLeave={() => setHoveredPersonId(null)}
              className="mandala-node-target absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group pointer-events-auto transition-all duration-500 ease-out z-20"
              style={{
                left: `${(node.x / SVG_SIZE) * 100}%`,
                top: `${(node.y / SVG_SIZE) * 100}%`,
              }}
              title={node.person.name}
              id={`mandala-node-gen5-${node.person.id}`}
            >
              <img
                src={node.person.photoUrl}
                alt={node.person.name}
                className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full object-cover border border-[#C89B3C] group-hover:scale-125 transition-transform"
                referrerPolicy="no-referrer"
              />
              {isHovered && (
                <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-[#20201D] text-[#FFFDF8] text-[11px] font-sans font-medium whitespace-nowrap shadow-md z-30 pointer-events-none animate-in fade-in duration-150">
                  {node.person.name}
                </div>
              )}
            </div>
          );
        })}

      </div>

      {/* SÉLECTEUR MODAL TÉLÉCOMMANDE DES SÉRIES (EXACTEMENT COMME SUR DUO) */}
      <RemoteControlModal
        isOpen={isRemoteOpen}
        onClose={() => setIsRemoteOpen(false)}
        selectedDocId={selectedSeriesId}
        onSelectDoc={(docId) => {
          setSelectedSeriesId(docId);
          setLineageTrail([]);
          setRotationAngle(0);
        }}
      />

      {/* MODALE CINÉMATOGRAPHIQUE AU 2E CLIC : VIDÉO DE PRÉSENTATION & ENTRER DANS L'UNIVERS */}
      {activeTeaserPerson && (
        <div 
          onClick={() => setActiveTeaserPerson(null)}
          className="fixed inset-0 z-50 bg-[#20201D]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm sm:max-w-md bg-[#FFFDF8] rounded-3xl border border-[#C89B3C]/40 overflow-hidden shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-200 text-[#20201D]"
          >
            {/* Lecteur vidéo vertical */}
            <div className="relative aspect-[9/13] w-full bg-[#181816] overflow-hidden group">
              <video
                ref={teaserVideoRef}
                src={activeTeaserPerson.teaserVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                poster={activeTeaserPerson.photoUrl}
                className="w-full h-full object-cover"
                loop
                playsInline
                autoPlay
                muted={isTeaserMuted}
                onClick={toggleTeaserPlay}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#181816] via-transparent to-[#181816]/30 pointer-events-none" />

              {/* Bouton Fermer */}
              <button
                onClick={() => setActiveTeaserPerson(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#20201D]/70 hover:bg-[#20201D] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Bouton Son */}
              <button
                onClick={toggleTeaserMute}
                className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-[#20201D]/70 hover:bg-[#20201D] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                title={isTeaserMuted ? 'Activer le son' : 'Couper le son'}
              >
                {isTeaserMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#C89B3C]" />}
              </button>

              {/* Play/Pause toggle central */}
              <div 
                onClick={toggleTeaserPlay}
                className={`absolute inset-0 flex items-center justify-center transition-opacity cursor-pointer ${
                  isTeaserPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100 bg-black/40'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-black/60 border border-white/30 flex items-center justify-center text-white backdrop-blur-xs">
                  {isTeaserPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                </div>
              </div>

              {/* Bas de vidéo : Prénom, Territoire & citation */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-10 space-y-2 pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{activeTeaserPerson.flag}</span>
                  {activeTeaserPerson.universeTag && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89B3C] bg-black/60 px-2.5 py-0.5 rounded-full border border-[#C89B3C]/40">
                      {activeTeaserPerson.universeTag}
                    </span>
                  )}
                  <span className="text-[11px] text-white/90">
                    {activeTeaserPerson.territory}
                  </span>
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md">
                  {activeTeaserPerson.name}
                </h3>

                {activeTeaserPerson.teaserPitch && (
                  <p className="text-xs sm:text-sm text-white/95 font-light italic leading-relaxed drop-shadow bg-black/50 p-2.5 rounded-xl border border-white/15">
                    {activeTeaserPerson.teaserPitch}
                  </p>
                )}
              </div>
            </div>

            {/* Pied de carte : Découvrir son univers */}
            <div className="p-4 bg-[#F9F5EC] border-t border-[#E4DDCC] flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveTeaserPerson(null)}
                className="px-4 py-2.5 rounded-full bg-white hover:bg-[#E4DDCC]/50 text-[#68655D] hover:text-[#20201D] border border-[#E4DDCC] text-xs font-medium transition-colors cursor-pointer"
              >
                Fermer
              </button>

              <button
                onClick={() => {
                  const targetId = activeTeaserPerson.protagonistIdRef || 'koffi-tisserand';
                  setActiveTeaserPerson(null);
                  onNavigate({
                    type: 'protagonist_profile',
                    protagonistId: targetId
                  });
                }}
                className="flex-1 py-3 px-5 rounded-full bg-[#C89B3C] hover:bg-[#B58B35] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer transform hover:scale-[1.02]"
                id="btn-explore-universe"
              >
                <span>Découvrir son univers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
