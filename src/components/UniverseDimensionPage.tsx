import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Compass, 
  Video, 
  FolderKanban, 
  BookOpen, 
  HeartHandshake, 
  Check, 
  X, 
  Play, 
  Pause,
  ChevronLeft,
  ChevronRight,
  Share2, 
  Sparkles, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  Users,
  Eye,
  Clock,
  Coins,
  CheckCircle2
} from 'lucide-react';
import { ViewScreen } from '../types';
import { DUOS, DOCUMENTARIES, PROTAGONISTS } from '../data/mockData';

export type DimensionKey = 'histoire' | 'projects' | 'offers' | 'parcours' | 'needs' | 'transmissions';

interface UniverseDimensionPageProps {
  initialDimension: DimensionKey;
  protagonist: {
    id: string;
    name: string;
    fullName?: string;
    age?: number;
    territory?: string;
    role?: string;
    photoUrl: string;
    bio?: string;
    quote?: string;
    documentaryId?: string;
  };
  onBack: () => void;
  onNavigate: (screen: ViewScreen) => void;
  // Optional custom data
  customOffers?: any[];
  customStories?: any[];
  customTransmissions?: any[];
  customParcours?: any[];
  customProjects?: any[];
  customNeeds?: any[];
  networkPeople?: any[];
  passeurs?: any[];
  heritiers?: any[];
}

export const UniverseDimensionPage: React.FC<UniverseDimensionPageProps> = ({
  initialDimension,
  protagonist,
  onBack,
  onNavigate,
  customOffers,
  customStories,
  customTransmissions,
  customParcours,
  customProjects,
  customNeeds,
  passeurs,
  heritiers
}) => {
  const [currentDimension, setCurrentDimension] = useState<DimensionKey>(initialDimension);

  // Swiping state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);

  // Individual indices for each video dimension
  const [histoireIdx, setHistoireIdx] = useState<number>(0);
  const [projectIdx, setProjectIdx] = useState<number>(0);
  const [offerIdx, setOfferIdx] = useState<number>(0);
  const [parcoursIdx, setParcoursIdx] = useState<number>(0);
  const [needIdx, setNeedIdx] = useState<number>(0);

  // Video playback
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Frise navigation target: 'all' | 'passeurs' | 'central' | 'heritiers'
  const [friseFocus, setFriseFocus] = useState<'all' | 'passeurs' | 'central' | 'heritiers'>('all');
  const friseScrollRef = useRef<HTMLDivElement | null>(null);

  // Modals state
  const [contributingProject, setContributingProject] = useState<any | null>(null);
  const [contributionAmount, setContributionAmount] = useState<number>(35);
  const [pledgeConfirmed, setPledgeConfirmed] = useState<boolean>(false);

  const [purchasingOffer, setPurchasingOffer] = useState<any | null>(null);
  const [buyerName, setBuyerName] = useState<string>('');
  const [buyerEmail, setBuyerEmail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile_money'>('mobile_money');
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  const [respondingToNeed, setRespondingToNeed] = useState<any | null>(null);
  const [helperName, setHelperName] = useState<string>('');
  const [helperContact, setHelperContact] = useState<string>('');
  const [helperProposal, setHelperProposal] = useState<string>('');
  const [helpSent, setHelpSent] = useState<boolean>(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dimensions metadata in user requested order
  const DIMENSIONS = [
    { key: 'histoire' as DimensionKey, label: 'Histoire', icon: Video, subtitle: 'Productions & Séries' },
    { key: 'projects' as DimensionKey, label: 'Projets', icon: FolderKanban, subtitle: 'Financement participatif' },
    { key: 'offers' as DimensionKey, label: 'Offres', icon: ShoppingBag, subtitle: 'Savoir-faire & Pièces' },
    { key: 'parcours' as DimensionKey, label: 'Parcours', icon: Compass, subtitle: 'Mon parcours en vidéo' },
    { key: 'needs' as DimensionKey, label: 'Besoins', icon: HeartHandshake, subtitle: 'Appels à la communauté' },
    { key: 'transmissions' as DimensionKey, label: 'Transmission', icon: BookOpen, subtitle: 'Frise de filiation' }
  ];

  // 1. DATA: Histoire (Productions & Séries où le personnage a participé)
  const relatedDuos = DUOS.filter(
    d => d.protagonistA.id === protagonist.id || d.protagonistB.id === protagonist.id
  );
  const relatedDoc = DOCUMENTARIES.find(doc => doc.id === protagonist.documentaryId) || DOCUMENTARIES[0];

  const histoireList = customStories && customStories.length > 0 ? customStories : [
    {
      id: 'prod-1',
      title: `${relatedDoc.title} — Saison 1`,
      seriesTitle: relatedDoc.title,
      role: 'Co-créateur & Témoin clé',
      episodeQuestion: relatedDoc.centralQuestion || 'L’appartenance & le geste originel',
      summary: relatedDoc.shortSynopsis || 'Une rencontre documentaire intime face à un alter ego transatlantique. Deux mémoires vivantes dialoguent par-delà les océans.',
      videoUrl: relatedDoc.teaserVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      posterUrl: relatedDoc.coverImage || protagonist.photoUrl,
      duration: '5 épisodes • 48 min',
      viewsCount: 4210,
      status: 'En diffusion officielle',
      partnerName: relatedDuos[0]?.protagonistB.name || 'Amara'
    },
    {
      id: 'prod-2',
      title: 'Épisode 01 : Le Silence de la Navette',
      seriesTitle: relatedDoc.title,
      role: 'Protagoniste principal',
      episodeQuestion: '« Que transmet une main qui tisse depuis toujours ? »',
      summary: 'Aux premières heures du jour sur la lagune de Ganvié, l’écoute attentive des battements de la chaîne et de la trame avant le lever du soleil.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      duration: '09:20',
      viewsCount: 2840,
      status: 'Épisode disponible',
      partnerName: 'Amara'
    },
    {
      id: 'prod-3',
      title: 'Hors-Série : Les Voix de l’Eau et du Feu',
      seriesTitle: 'Constellation YonyWood',
      role: 'Contribution patrimoniale',
      episodeQuestion: '« Ce que les aïeux murmurent dans la matière »',
      summary: 'Table ronde et performance immersive enregistrée lors de la rencontre de Porto-Novo avec les maîtres teinturiers et les apprentis de la lagune.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      duration: '14:50',
      viewsCount: 1690,
      status: 'Avant-première abonnés',
      partnerName: 'Papa Dossou & Malik'
    }
  ];

  // 2. DATA: Projets nécessitant un financement participatif
  const projectsList = customProjects && customProjects.length > 0 ? customProjects : [
    {
      id: 'proj-1',
      title: `L’Atelier Vivant des Jeunes Tisserands de ${protagonist.territory || 'Porto-Novo'}`,
      category: 'Formation & Transmission Solidaire',
      collectedAmount: 3850,
      targetAmount: 5000,
      backersCount: 47,
      daysRemaining: 16,
      description: 'Création d’un hangar d’apprentissage gratuit et éco-conçu pour former 12 jeunes filles et garçons déscolarisés aux métiers du fil, de la navette et de la teinture végétale.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
      perks: [
        { amount: 25, title: 'Nom gravé sur la charpente', desc: 'Votre nom sculpté sur la poutre maîtresse de l’atelier + lien vers les archives sonores.' },
        { amount: 60, title: 'Bande cérémonielle tissée', desc: 'Une bande textile de 15 cm tissée main par les apprentis de la première promotion.' }
      ]
    },
    {
      id: 'proj-2',
      title: 'L’Archive Sonore des Chants de Travail Oubliés',
      category: 'Patrimoine Immatériel & Enregistrement',
      collectedAmount: 1940,
      targetAmount: 2500,
      backersCount: 29,
      daysRemaining: 24,
      description: 'Collecte et numérisation haute fidélité des berceuses et mélopées fredonnées par les tisseuses au travail pour préserver les dialectes en voie d’extinction.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      perks: [
        { amount: 20, title: 'Lien d’écoute binaurale HD', desc: 'Album digital en mixage 3D spatialisé avant sortie officielle.' },
        { amount: 50, title: 'Coffret sérigraphié', desc: 'Livret des contes traduits et numérotés avec illustrations locales.' }
      ]
    }
  ];

  // 3. DATA: Offres (Savoir-faire, pièces d'artisanat & ateliers)
  const offersList = customOffers && customOffers.length > 0 ? customOffers : [
    {
      id: 'off-1',
      title: 'Étoffe rituelle tissée main et teintée à l’indigo naturel',
      pricing: '120 €',
      categoryLabel: 'Artisanat d’art',
      stock: '3 pièces numérotées',
      origin: protagonist.territory || 'Porto-Novo & Ganvié',
      description: 'Pièce tissée sur métier traditionnel à pédales en fil de coton biologique cultivé localement. Teinture par cuve d’indigo fermenté selon le rituel transmis par les aînées.',
      specs: '180 x 60 cm • 100% Coton brut biologique • Teinture végétale',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'off-2',
      title: 'Atelier d’initiation aux paysages sonores et à l’écoute du vivant',
      pricing: '45 € / pers.',
      categoryLabel: 'Atelier immersif',
      stock: '6 places disponibles',
      origin: 'En direct depuis la lagune ou sur place',
      description: 'Une marche d’écoute de 3 heures pour déceler les polyrythmies de l’eau, de la matière et des résonances minérales. Mise à disposition d’enregistreurs binauraux.',
      specs: 'Durée : 3h00 • Matériel fourni • Document pédagogique inclus',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'off-3',
      title: 'Navette de tisserand sculptée en bois d’iroko patiné',
      pricing: '65 €',
      categoryLabel: 'Objet de tradition',
      stock: '2 exemplaires uniques',
      origin: 'Atelier d’Abomey',
      description: 'Chaque navette est taillée à la main à la gouge dans un bois récupéré d’anciennes charpentes, puis frottée à la cire d’abeille pour glisser sans bruit entre les fils.',
      specs: 'Longueur : 28 cm • Poids : 95g • Bois d’iroko centenaire',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // 4. DATA: Parcours avec vidéo où il explique son parcours
  const parcoursList = customParcours && customParcours.length > 0 ? customParcours : [
    {
      id: 'parc-1',
      year: '1992 — 2005',
      title: 'Chapitre 1 : L’enfance au bord de l’eau et le son premier',
      location: protagonist.territory || 'Porto-Novo, Bénin',
      role: 'L’éveil du regard',
      quote: '« Mon père m’a appris que le tissu n’est pas fait avec les yeux, mais avec la pulsation du sang. »',
      description: `Dans cette vidéo intime, ${protagonist.name.split(' ')[0]} raconte comment le bruit de la navette le réveillait à quatre heures du matin et comment la lagune est devenue son premier maître d’harmonie.`,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      duration: '06:15'
    },
    {
      id: 'parc-2',
      year: '2006 — 2017',
      title: 'Chapitre 2 : L’apprentissage exigeant auprès des maîtres',
      location: 'Bénin & Haute-Guinée',
      role: 'Passeur de couleurs végétales',
      quote: '« Pour comprendre l’indigo, il faut accepter que la cuve soit vivante. Elle respire, elle s’endort, elle ressuscite. »',
      description: 'Dix années d’apprentissage silencieux : apprendre à manier la cendre, le citron sauvage et la fermentation bactérienne des pigments sans produit de synthèse.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
      duration: '08:40'
    },
    {
      id: 'parc-3',
      year: '2018 — Présent',
      title: 'Chapitre 3 : La liberté créative et l’accueil de la relève',
      location: 'International & YonyWood',
      role: 'Fondateur d’atelier & Mentor',
      quote: '« On ne garde un savoir que lorsqu’on le donne à quelqu’un qui ira plus loin que nous. »',
      description: 'Comment l’entrée sur la plateforme et la rencontre avec son alter ego ont déclenché l’ouverture de l’Atelier Solidaire pour la jeunesse déscolarisée.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      duration: '07:30'
    }
  ];

  // 5. DATA: Besoins concrets
  const needsList = customNeeds && customNeeds.length > 0 ? customNeeds : [
    {
      id: 'need-1',
      title: 'Sourcing de fil de coton biologique écru ouest-africain',
      category: 'Matières premières & Éco-filière',
      urgency: 'Prioritaire pour la rentrée d’octobre',
      description: 'Nous recherchons des coopératives paysannes féminines ou partenaires capables de fournir 50 kg de fil écru sans pesticides pour alimenter la prochaine session de formation des 12 apprentis.',
      impact: 'Permet de garantir 6 mois d’apprentissage continu sans dépendre des importations synthétiques.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
      status: 'Appel ouvert'
    },
    {
      id: 'need-2',
      title: 'Microphones binauraux étanches pour prises en pirogue',
      category: 'Matériel audiovisuel',
      urgency: 'En cours de recherche',
      description: 'Prêt ou don de deux capsules microphoniques binaurales résistant aux embruns pour terminer la captation sonore du prochain duo documentaire sur le lac.',
      impact: 'Sauvegarde haute fidélité des chants lacustres toffinou pour le montage final.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      status: 'Appel ouvert'
    },
    {
      id: 'need-3',
      title: 'Mentorat en diffusion culturelle internationale',
      category: 'Compétences & Réseau solidaire',
      urgency: 'Opportunité ouverte',
      description: 'Recherche d’un(e) programmateur(rice) ou commissaire d’exposition pour nous guider dans les partenariats avec les biennales textiles éthiques.',
      impact: 'Ouvrir de nouveaux débouchés économiques équitables pour les artisanes.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      status: 'Appel ouvert'
    }
  ];

  // 6. DATA: Transmission (Passeurs à gauche, Protagoniste au milieu, Héritiers à droite)
  const passeursList = (passeurs && passeurs.length > 0) ? passeurs : [
    {
      id: 'pass-1',
      name: 'Papa Mensah Dossou',
      role: 'Maître tisseur de cour',
      territory: 'Abomey & Allada, Bénin',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      introYear: 'Membre pionnier 2022',
      transmissionNote: `A introduit ${protagonist.name.split(' ')[0]} sur la plateforme : « Il porte la patience des anciens dans ses mains. »`,
      protagonistIdRef: 'koffi-tisserand'
    },
    {
      id: 'pass-2',
      name: 'Mama Saliou',
      role: 'Doyenne des cuves d’indigo',
      territory: 'Guinée Maritime',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      introYear: 'Inspiratrice 2021',
      transmissionNote: 'A transmis le secret bactérien de la fermentation des feuilles d’indigo.',
      protagonistIdRef: 'amara-tisserande'
    }
  ];

  const heritiersList = (heritiers && heritiers.length > 0) ? heritiers : [
    {
      id: 'herit-1',
      name: 'Awa Traoré',
      role: 'Créatrice textile & Luth',
      territory: 'Sénégal & Mali',
      photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
      introYear: 'Parrainée en 2024',
      transmissionNote: `Filleule accueillie par ${protagonist.name.split(' ')[0]} : « Elle allie le son de la kora au fil d’indigo. »`,
      protagonistIdRef: 'awa-traore'
    },
    {
      id: 'herit-2',
      name: 'Sika Houndé',
      role: 'Apprenti tisseur de 18 ans',
      territory: 'Ganvié, Bénin',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      introYear: 'Parrainé en 2024',
      transmissionNote: 'Premier élève de l’Atelier Solidaire de Porto-Novo.',
      protagonistIdRef: 'sika-hounde'
    }
  ];

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    setTouchDeltaX(e.touches[0].clientX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX) > 45) {
      if (touchDeltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  // Previous & Next navigation for active dimension
  const handlePrev = () => {
    if (currentDimension === 'histoire') {
      setHistoireIdx(prev => (prev > 0 ? prev - 1 : histoireList.length - 1));
    } else if (currentDimension === 'projects') {
      setProjectIdx(prev => (prev > 0 ? prev - 1 : projectsList.length - 1));
    } else if (currentDimension === 'offers') {
      setOfferIdx(prev => (prev > 0 ? prev - 1 : offersList.length - 1));
    } else if (currentDimension === 'parcours') {
      setParcoursIdx(prev => (prev > 0 ? prev - 1 : parcoursList.length - 1));
    } else if (currentDimension === 'needs') {
      setNeedIdx(prev => (prev > 0 ? prev - 1 : needsList.length - 1));
    }
  };

  const handleNext = () => {
    if (currentDimension === 'histoire') {
      setHistoireIdx(prev => (prev < histoireList.length - 1 ? prev + 1 : 0));
    } else if (currentDimension === 'projects') {
      setProjectIdx(prev => (prev < projectsList.length - 1 ? prev + 1 : 0));
    } else if (currentDimension === 'offers') {
      setOfferIdx(prev => (prev < offersList.length - 1 ? prev + 1 : 0));
    } else if (currentDimension === 'parcours') {
      setParcoursIdx(prev => (prev < parcoursList.length - 1 ? prev + 1 : 0));
    } else if (currentDimension === 'needs') {
      setNeedIdx(prev => (prev < needsList.length - 1 ? prev + 1 : 0));
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentDimension === 'transmissions') return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentDimension, histoireIdx, projectIdx, offerIdx, parcoursIdx, needIdx]);

  // Handle Frise Scroll focus
  const scrollToFriseSection = (target: 'all' | 'passeurs' | 'central' | 'heritiers') => {
    setFriseFocus(target);
    if (!friseScrollRef.current) return;
    const container = friseScrollRef.current;
    if (target === 'passeurs') {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (target === 'central') {
      container.scrollTo({ left: container.scrollWidth / 2 - container.clientWidth / 2, behavior: 'smooth' });
    } else if (target === 'heritiers') {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      container.scrollTo({ left: container.scrollWidth / 2 - container.clientWidth / 2, behavior: 'smooth' });
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen text-[#20201D] pb-32 pt-3 px-3 sm:px-6 max-w-5xl mx-auto space-y-4">
      
      {/* 1. TOP HEADER & PROTAGONIST IDENTITY */}
      <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            id="btn-back-universe"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0EBE0] hover:bg-[#EAE4D5] text-xs font-semibold text-[#20201D] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#8B6845]" />
            <span>Retour</span>
          </button>

          {/* Identity Capsule */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={protagonist.photoUrl} 
                alt={protagonist.name} 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#C89B3C]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#0B3B82] border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">
                ✓
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-editorial text-sm font-bold text-[#20201D]">
                  {protagonist.name}
                </h2>
                {protagonist.age && (
                  <span className="text-[11px] text-[#8B6845] font-sans">
                    • {protagonist.age} ans
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#68655D] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#C89B3C]" />
                <span>{protagonist.territory || 'Artisan de tradition'}</span>
              </p>
            </div>
          </div>

          {/* Protagonist Switcher / Quick Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast("Lien de l'Univers copié !");
              }}
              title="Partager cet univers"
              className="p-2 rounded-full border border-[#E4DDCC] bg-white hover:bg-[#F5F1E8] text-[#68655D] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6 DIMENSION SELECTOR PILLS (EXACT ADÉQUATION WITH USER REQUEST) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-[#E4DDCC]/70 pt-2.5 scrollbar-none">
          {DIMENSIONS.map((dim) => {
            const Icon = dim.icon;
            const isActive = currentDimension === dim.key;
            return (
              <button
                key={dim.key}
                onClick={() => {
                  setCurrentDimension(dim.key);
                  setIsPlaying(true);
                }}
                id={`tab-dim-${dim.key}`}
                className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0B3B82] text-[#FFFDF8] shadow-sm ring-2 ring-[#0B3B82]/30'
                    : 'bg-[#F0EBE0] text-[#68655D] hover:text-[#20201D] hover:bg-[#EAE4D5]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FFFDF8]' : 'text-[#8B6845]'}`} />
                <span>{dim.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full px-4 py-2.5 rounded-2xl bg-[#0B3B82] text-white text-xs font-semibold flex items-center gap-2 shadow-xl animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIMENSION 1 : HISTOIRE (PRODUCTIONS & SÉRIES DU PERSONNAGE - SWIPABLE)    */}
      {/* ========================================================================= */}
      {currentDimension === 'histoire' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B6845] font-bold">
              Histoire • Productions & Séries documentaires ({histoireList.length})
            </span>
            <p className="text-xs text-[#68655D]">
              Les créations et séries dans lesquelles {protagonist.name.split(' ')[0]} a participé. Swipez pour découvrir chaque réalisation.
            </p>
          </div>

          <div className="relative flex items-center justify-center py-1">
            <button
              onClick={handlePrev}
              className="hidden sm:flex absolute left-2 md:left-10 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#C89B3C] text-[#20201D] hover:text-white border border-[#E4DDCC] shadow-md items-center justify-center transition-all cursor-pointer"
              title="Production précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 9:16 VERTICAL VIDEO CARD */}
            {(() => {
              const item = histoireList[histoireIdx];
              return (
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] rounded-3xl overflow-hidden relative shadow-2xl bg-black border border-[#C89B3C]/40 select-none"
                >
                  <video
                    ref={videoRef}
                    src={item.videoUrl}
                    poster={item.posterUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold tracking-wide uppercase border border-white/20">
                      {item.seriesTitle}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#C89B3C] text-[#FFFDF8] text-[10px] font-bold shadow-xs">
                      {item.status}
                    </span>
                  </div>

                  {/* Play/Pause center overlay */}
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        if (isPlaying) videoRef.current.pause();
                        else videoRef.current.play();
                        setIsPlaying(!isPlaying);
                      }
                    }}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs border border-white/30 text-white flex items-center justify-center transition-all hover:scale-105 z-10 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1 text-[#C89B3C]" />}
                  </button>

                  {/* Bottom Content Gradient */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/85 to-transparent p-5 text-white z-10 space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#C89B3C] font-mono uppercase tracking-wider block">
                        Rôle : {item.role}
                      </span>
                      <h3 className="font-editorial text-lg font-bold leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#E4DDCC] italic line-clamp-1">
                        {item.episodeQuestion}
                      </p>
                      <p className="text-[11px] text-white/80 line-clamp-2 pt-1 font-light leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#C89B3C] font-mono border-t border-white/15 pt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {item.viewsCount} vues
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigate({ type: 'duo_feed' })}
                      id="btn-watch-production"
                      className="w-full py-2.5 rounded-xl bg-[#0B3B82] hover:bg-[#0E4699] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-[#C89B3C]" />
                      <span>Visionner cette réalisation</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            <button
              onClick={handleNext}
              className="hidden sm:flex absolute right-2 md:right-10 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#C89B3C] text-[#20201D] hover:text-white border border-[#E4DDCC] shadow-md items-center justify-center transition-all cursor-pointer"
              title="Production suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-1.5 pt-1">
            {histoireList.map((_, i) => (
              <button
                key={i}
                onClick={() => setHistoireIdx(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === histoireIdx ? 'w-6 bg-[#0B3B82]' : 'w-2 bg-[#E4DDCC]'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIMENSION 2 : PROJETS DE FINANCEMENT PARTICIPATIF (SWIPABLE)              */}
      {/* ========================================================================= */}
      {currentDimension === 'projects' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B6845] font-bold">
              Projets • Chantiers vivants nécessitant un financement ({projectsList.length})
            </span>
            <p className="text-xs text-[#68655D]">
              Appels à contribution solidaire pour l’atelier de transmission et les créations en cours.
            </p>
          </div>

          <div className="relative flex items-center justify-center py-1">
            <button
              onClick={handlePrev}
              className="hidden sm:flex absolute left-2 md:left-10 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#C89B3C] text-[#20201D] hover:text-white border border-[#E4DDCC] shadow-md items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {(() => {
              const proj = projectsList[projectIdx];
              const percent = Math.min(100, Math.round((proj.collectedAmount / proj.targetAmount) * 100));
              return (
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] rounded-3xl overflow-hidden relative shadow-2xl bg-black border border-[#C89B3C]/40 select-none"
                >
                  <video
                    src={proj.videoUrl}
                    poster={proj.posterUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold tracking-wide uppercase border border-white/20">
                      Crowdfunding Solidaire
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#C89B3C] text-[#FFFDF8] text-[10px] font-bold shadow-xs">
                      J-{proj.daysRemaining} restants
                    </span>
                  </div>

                  {/* Bottom Content with Progress Gauge */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/90 to-transparent p-5 text-white z-10 space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#C89B3C] font-mono uppercase tracking-wider block">
                        {proj.category}
                      </span>
                      <h3 className="font-editorial text-lg font-bold leading-tight">
                        {proj.title}
                      </h3>
                      <p className="text-[11px] text-white/80 line-clamp-2 font-light leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    {/* Financial Gauge */}
                    <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/15 space-y-2">
                      <div className="flex justify-between items-end text-xs">
                        <div>
                          <span className="text-base font-bold text-[#C89B3C] font-mono">
                            {proj.collectedAmount} €
                          </span>
                          <span className="text-[10px] text-white/70 ml-1">
                            sur {proj.targetAmount} €
                          </span>
                        </div>
                        <span className="font-bold text-emerald-400 font-mono text-xs">
                          {percent}%
                        </span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#C89B3C] to-emerald-400 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-[10px] text-white/70">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#C89B3C]" />
                          {proj.backersCount} contributeurs
                        </span>
                        <span>Objectif sécurisé</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setContributingProject(proj);
                        setPledgeConfirmed(false);
                      }}
                      id="btn-pledge-project"
                      className="w-full py-2.5 rounded-xl bg-[#0B3B82] hover:bg-[#0E4699] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
                    >
                      <Coins className="w-3.5 h-3.5 text-[#C89B3C]" />
                      <span>Soutenir ce projet participatif</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            <button
              onClick={handleNext}
              className="hidden sm:flex absolute right-2 md:right-10 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#C89B3C] text-[#20201D] hover:text-white border border-[#E4DDCC] shadow-md items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center items-center gap-1.5 pt-1">
            {projectsList.map((_, i) => (
              <button
                key={i}
                onClick={() => setProjectIdx(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === projectIdx ? 'w-6 bg-[#0B3B82]' : 'w-2 bg-[#E4DDCC]'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIMENSION 3 : OFFRES & SAVOIR-FAIRE (SWIPABLE)                            */}
      {/* ========================================================================= */}
      {currentDimension === 'offers' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B6845] font-bold">
              Offres • Créations d’artisanat & Ateliers d’auteur ({offersList.length})
            </span>
            <p className="text-xs text-[#68655D]">
              Chaque pièce est façonnée selon les traditions. Votre achat soutient directement l’indépendance de l’artisan.
            </p>
          </div>

          <div className="relative flex items-center justify-center py-1">
            <button
              onClick={handlePrev}
              className="hidden sm:flex absolute left-2 md:left-10 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#C89B3C] text-[#20201D] hover:text-white border border-[#E4DDCC] shadow-md items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {(() => {
              const offer = offersList[offerIdx];
              return (
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] rounded-3xl overflow-hidden relative shadow-2xl bg-black border border-[#C89B3C]/40 select-none"
                >
                  <video
                    src={offer.videoUrl}
                    poster={offer.posterUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold tracking-wide uppercase border border-white/20">
                      {offer.categoryLabel}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-800 text-emerald-100 text-[10px] font-semibold">
                      {offer.stock}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/90 to-transparent p-5 text-white z-10 space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xl font-bold font-mono text-[#C89B3C]">
                          {offer.pricing}
                        </span>
                        <span className="text-[10px] text-white/70">
                          {offer.origin}
                        </span>
                      </div>
                      <h3 className="font-editorial text-lg font-bold leading-tight">
                        {offer.title}
                      </h3>
                      <p className="text-[11px] text-white/80 line-clamp-2 font-light leading-relaxed">
                        {offer.description}
                      </p>
                      <p className="text-[10px] text-[#E4DDCC] italic">
                        {offer.specs}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setPurchasingOffer(offer);
                        setOrderConfirmed(false);
                      }}
                      id="btn-buy-offer"
                      className="w-full py-2.5 rounded-xl bg-[#0B3B82] hover:bg-[#0E4699] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C89B3C]" />
                      <span>Commander / Réserver cette offre</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            <button
              onClick={handleNext}
              className="hidden sm:flex absolute right-2 md:right-10 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#C89B3C] text-[#20201D] hover:text-white border border-[#E4DDCC] shadow-md items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center items-center gap-1.5 pt-1">
            {offersList.map((_, i) => (
              <button
                key={i}
                onClick={() => setOfferIdx(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === offerIdx ? 'w-6 bg-[#0B3B82]' : 'w-2 bg-[#E4DDCC]'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIMENSION 4 : PARCOURS EN VIDÉO (SON PARCOURS RACONTÉ - SWIPABLE)         */}
      {/* ========================================================================= */}
      {currentDimension === 'parcours' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B6845] font-bold">
              Parcours • Son histoire racontée en vidéo face caméra ({parcoursList.length} chapitres)
            </span>
            <p className="text-xs text-[#68655D]">
              {protagonist.name.split(' ')[0]} retrace les étapes fondatrices, ses doutes et ses apprentissages décisifs.
            </p>
          </div>

          <div className="relative flex items-center justify-center py-1">
            <button
              onClick={handlePrev}
              className="hidden sm:flex absolute left-2 md:left-10 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#C89B3C] text-[#20201D] hover:text-white border border-[#E4DDCC] shadow-md items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {(() => {
              const step = parcoursList[parcoursIdx];
              return (
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] rounded-3xl overflow-hidden relative shadow-2xl bg-black border border-[#C89B3C]/40 select-none"
                >
                  <video
                    src={step.videoUrl}
                    poster={step.posterUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold tracking-wide uppercase border border-white/20">
                      {step.year}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#C89B3C] text-[#FFFDF8] text-[10px] font-bold shadow-xs">
                      {step.location}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/90 to-transparent p-5 text-white z-10 space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-[#C89B3C] font-mono uppercase tracking-wider block">
                        Rôle : {step.role}
                      </span>
                      <h3 className="font-editorial text-lg font-bold leading-tight">
                        {step.title}
                      </h3>
                      <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-[#E4DDCC] italic">
                        {step.quote}
                      </div>
                      <p className="text-[11px] text-white/80 line-clamp-2 font-light leading-relaxed pt-1">
                        {step.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#C89B3C] font-mono border-t border-white/15 pt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Durée : {step.duration}
                      </span>
                      <span>Chapitre {parcoursIdx + 1} / {parcoursList.length}</span>
                    </div>

                    <button
                      onClick={() => showToast(`Lecture du chapitre ${parcoursIdx + 1}`)}
                      id="btn-listen-parcours"
                      className="w-full py-2.5 rounded-xl bg-[#0B3B82] hover:bg-[#0E4699] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-[#C89B3C]" />
                      <span>Écouter le témoignage complet</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            <button
              onClick={handleNext}
              className="hidden sm:flex absolute right-2 md:right-10 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#C89B3C] text-[#20201D] hover:text-white border border-[#E4DDCC] shadow-md items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center items-center gap-1.5 pt-1">
            {parcoursList.map((_, i) => (
              <button
                key={i}
                onClick={() => setParcoursIdx(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === parcoursIdx ? 'w-6 bg-[#0B3B82]' : 'w-2 bg-[#E4DDCC]'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIMENSION 5 : BESOINS CONCRETS & APPELS EN VIDÉO (SWIPABLE)               */}
      {/* ========================================================================= */}
      {currentDimension === 'needs' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B6845] font-bold">
              Besoins • Appels à la communauté & besoins concrets ({needsList.length})
            </span>
            <p className="text-xs text-[#68655D]">
              Matériel, compétences, relais et mentorat recherchés par {protagonist.name.split(' ')[0]}.
            </p>
          </div>

          <div className="relative flex items-center justify-center py-1">
            <button
              onClick={handlePrev}
              className="hidden sm:flex absolute left-2 md:left-10 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#C89B3C] text-[#20201D] hover:text-white border border-[#E4DDCC] shadow-md items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {(() => {
              const need = needsList[needIdx];
              return (
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] rounded-3xl overflow-hidden relative shadow-2xl bg-black border border-[#C89B3C]/40 select-none"
                >
                  <video
                    src={need.videoUrl}
                    poster={need.posterUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold tracking-wide uppercase border border-white/20">
                      {need.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-600/90 text-white text-[10px] font-bold shadow-xs">
                      {need.urgency}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/90 to-transparent p-5 text-white z-10 space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-[#C89B3C] font-mono uppercase tracking-wider block">
                        Statut : {need.status || 'Appel ouvert'}
                      </span>
                      <h3 className="font-editorial text-lg font-bold leading-tight">
                        {need.title}
                      </h3>
                      <p className="text-[11px] text-white/80 line-clamp-3 font-light leading-relaxed">
                        {need.description}
                      </p>
                      <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs text-[10px] text-emerald-300">
                        ✦ Impact : {need.impact}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setRespondingToNeed(need);
                        setHelpSent(false);
                      }}
                      id="btn-reply-need"
                      className="w-full py-2.5 rounded-xl bg-[#0B3B82] hover:bg-[#0E4699] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
                    >
                      <HeartHandshake className="w-3.5 h-3.5 text-[#C89B3C]" />
                      <span>Répondre à ce besoin / Apporter mon aide</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            <button
              onClick={handleNext}
              className="hidden sm:flex absolute right-2 md:right-10 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#C89B3C] text-[#20201D] hover:text-white border border-[#E4DDCC] shadow-md items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center items-center gap-1.5 pt-1">
            {needsList.map((_, i) => (
              <button
                key={i}
                onClick={() => setNeedIdx(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === needIdx ? 'w-6 bg-[#0B3B82]' : 'w-2 bg-[#E4DDCC]'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIMENSION 6 : LA FRISE DE TRANSMISSION                                   */}
      {/* À gauche ceux qui l'ont précédé et fait rentrer dans la plateforme        */}
      {/* Au milieu le personnage avec sa vidéo de présentation principale         */}
      {/* À droite ceux qu'il a fait rentrer                                        */}
      {/* ========================================================================= */}
      {currentDimension === 'transmissions' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* Header Banner */}
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-4 sm:p-6 shadow-xs space-y-3 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/15 text-[#8B6845] text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>La Frise de Transmission & Chaîne de Filiation</span>
            </div>
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#20201D]">
              De qui a-t-on reçu la flamme ? À qui la passe-t-on ?
            </h2>
            <p className="text-xs text-[#68655D] max-w-2xl mx-auto leading-relaxed">
              Sur notre plateforme, chaque créateur est un maillon d’une chaîne vivante. À gauche, les aînés et mentors qui l’ont précédé et coopté. Au milieu, sa vidéo de présentation principale. À droite, les héritiers qu’il a fait entrer.
            </p>

            {/* Quick Segment Jump Pills */}
            <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
              <button
                onClick={() => scrollToFriseSection('passeurs')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  friseFocus === 'passeurs' ? 'bg-[#0B3B82] text-white shadow-xs' : 'bg-[#F0EBE0] text-[#68655D] hover:text-[#20201D]'
                }`}
              >
                ← 1. Ceux qui l'ont précédé ({passeursList.length})
              </button>
              <button
                onClick={() => scrollToFriseSection('central')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  friseFocus === 'central' ? 'bg-[#0B3B82] text-white shadow-xs' : 'bg-[#F0EBE0] text-[#68655D] hover:text-[#20201D]'
                }`}
              >
                ✦ 2. Vidéo Principale (Centre)
              </button>
              <button
                onClick={() => scrollToFriseSection('heritiers')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  friseFocus === 'heritiers' ? 'bg-[#0B3B82] text-white shadow-xs' : 'bg-[#F0EBE0] text-[#68655D] hover:text-[#20201D]'
                }`}
              >
                3. Ceux qu'il a fait rentrer ({heritiersList.length}) →
              </button>
            </div>
          </div>

          {/* THE PANORAMIC HORIZONTAL TIMELINE / FRISE CONTAINER */}
          <div 
            ref={friseScrollRef}
            className="overflow-x-auto pb-6 pt-2 scrollbar-none px-2"
          >
            <div className="inline-flex items-center gap-6 sm:gap-8 min-w-max py-2">
              
              {/* =============================================================== */}
              {/* GAUCHE : CEUX QUI L'ONT PRÉCÉDÉ ET FAIT RENTRER DANS LA PLATEFORME */}
              {/* =============================================================== */}
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE4D5] text-[#8B6845] text-xs font-bold uppercase tracking-wider">
                  <span>← Précédé & Accueilli par</span>
                </div>

                <div className="flex items-center gap-4">
                  {passeursList.map((pass) => (
                    <div 
                      key={pass.id}
                      className="w-56 sm:w-64 rounded-3xl bg-[#FFFDF8] border-2 border-[#E4DDCC] hover:border-[#C89B3C] p-4 shadow-sm space-y-3 text-left transition-all hover:scale-102"
                    >
                      <div className="relative h-36 rounded-2xl overflow-hidden bg-[#EAE4D5]">
                        <img 
                          src={pass.photo} 
                          alt={pass.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[9px] font-mono">
                          {pass.introYear}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-editorial text-sm font-bold text-[#20201D]">
                          {pass.name}
                        </h4>
                        <p className="text-[11px] text-[#8B6845] font-medium">
                          {pass.role}
                        </p>
                        <p className="text-[10px] text-[#68655D]">
                          {pass.territory}
                        </p>
                      </div>

                      <div className="p-2 rounded-xl bg-[#FAF7EF] border border-[#E4DDCC] text-[10px] text-[#524E46] italic leading-relaxed">
                        « {pass.transmissionNote} »
                      </div>

                      <button
                        onClick={() => {
                          const target = PROTAGONISTS.find(p => p.id === pass.protagonistIdRef);
                          if (target) {
                            onNavigate({ type: 'protagonist_profile', protagonistId: target.id });
                          } else {
                            showToast(`Univers de ${pass.name}`);
                          }
                        }}
                        className="w-full py-2 rounded-xl bg-[#F0EBE0] hover:bg-[#C89B3C] text-[#20201D] hover:text-white text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Voir son univers</span>
                        <span>→</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* LIAISON DORÉE ANIMÉE (GAUCHE -> CENTRE) */}
              <div className="flex flex-col items-center justify-center px-2">
                <div className="flex items-center gap-1 text-[#C89B3C] font-mono text-[10px] uppercase font-bold tracking-wider">
                  <span>Transmet</span>
                  <span>➔</span>
                </div>
                <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-[#E4DDCC] via-[#C89B3C] to-[#0B3B82] my-2" />
                <span className="text-[9px] text-[#8B6845] bg-[#FAF7EF] px-2 py-0.5 rounded-full border border-[#E4DDCC]">
                  Filiation
                </span>
              </div>

              {/* =============================================================== */}
              {/* CENTRE : LE PERSONNAGE AVEC SA VIDÉO DE PRÉSENTATION PRINCIPALE   */}
              {/* =============================================================== */}
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3B82] text-white text-xs font-bold uppercase tracking-wider ring-2 ring-[#0B3B82]/20 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>Le Personnage Central</span>
                </div>

                {/* 9:16 VERTICAL VIDEO CARD IN GLORY */}
                <div className="w-[280px] sm:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden relative shadow-2xl bg-black border-2 border-[#C89B3C] ring-4 ring-[#C89B3C]/30 select-none">
                  <video
                    ref={videoRef}
                    src={protagonist.documentaryId ? DOCUMENTARIES.find(d => d.id === protagonist.documentaryId)?.teaserVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                    poster={protagonist.photoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Top Badge */}
                  <div className="absolute top-4 inset-x-4 flex justify-between items-center z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold tracking-wide uppercase border border-white/20">
                      Vidéo de Présentation Principale
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
                  </div>

                  {/* Play Button Overlay */}
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        if (isPlaying) videoRef.current.pause();
                        else videoRef.current.play();
                        setIsPlaying(!isPlaying);
                      }
                    }}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs border border-white/30 text-white flex items-center justify-center transition-all hover:scale-105 z-10 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1 text-[#C89B3C]" />}
                  </button>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/85 to-transparent p-5 text-white z-10 space-y-2 text-center">
                    <h3 className="font-editorial text-xl font-bold leading-tight">
                      {protagonist.name}
                    </h3>
                    <p className="text-xs text-[#C89B3C] font-mono">
                      {protagonist.role} • {protagonist.territory}
                    </p>
                    <p className="text-[11px] text-[#E4DDCC] italic line-clamp-2">
                      {protagonist.quote || '« Chaque fil garde la mémoire de la terre. »'}
                    </p>

                    <div className="pt-2 border-t border-white/15 flex justify-center gap-3 text-[10px] text-white/80 font-mono">
                      <span>✓ 2 Séries liées</span>
                      <span>•</span>
                      <span>{heritiersList.length} Filleuls accueillis</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* LIAISON DORÉE ANIMÉE (CENTRE -> DROITE) */}
              <div className="flex flex-col items-center justify-center px-2">
                <div className="flex items-center gap-1 text-[#C89B3C] font-mono text-[10px] uppercase font-bold tracking-wider">
                  <span>Passe le relais</span>
                  <span>➔</span>
                </div>
                <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-[#0B3B82] via-[#C89B3C] to-emerald-600 my-2" />
                <span className="text-[9px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Relève
                </span>
              </div>

              {/* =============================================================== */}
              {/* DROITE : CEUX QU'IL A FAIT RENTRER DANS LA PLATEFORME           */}
              {/* =============================================================== */}
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                  <span>Accueilli(e)s & Filleul(e)s →</span>
                </div>

                <div className="flex items-center gap-4">
                  {heritiersList.map((herit) => (
                    <div 
                      key={herit.id}
                      className="w-56 sm:w-64 rounded-3xl bg-[#FFFDF8] border-2 border-[#E4DDCC] hover:border-emerald-600 p-4 shadow-sm space-y-3 text-left transition-all hover:scale-102"
                    >
                      <div className="relative h-36 rounded-2xl overflow-hidden bg-[#EAE4D5]">
                        <img 
                          src={herit.photo} 
                          alt={herit.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-900/80 text-white text-[9px] font-mono">
                          {herit.introYear}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-editorial text-sm font-bold text-[#20201D]">
                          {herit.name}
                        </h4>
                        <p className="text-[11px] text-emerald-800 font-medium">
                          {herit.role}
                        </p>
                        <p className="text-[10px] text-[#68655D]">
                          {herit.territory}
                        </p>
                      </div>

                      <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[10px] text-emerald-900 italic leading-relaxed">
                        « {herit.transmissionNote} »
                      </div>

                      <button
                        onClick={() => {
                          const target = PROTAGONISTS.find(p => p.id === herit.protagonistIdRef);
                          if (target) {
                            onNavigate({ type: 'protagonist_profile', protagonistId: target.id });
                          } else {
                            showToast(`Univers de ${herit.name}`);
                          }
                        }}
                        className="w-full py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Voir son univers</span>
                        <span>→</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 1 : SOUTENIR UN PROJET PARTICIPATIF (CROWDFUNDING)              */}
      {/* ===================================================================== */}
      {contributingProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setContributingProject(null)}
        >
          <div 
            className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#E4DDCC] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B6845]">Financement participatif</span>
                <h3 className="font-editorial text-base font-bold text-[#20201D]">
                  {contributingProject.title}
                </h3>
              </div>
              <button 
                onClick={() => setContributingProject(null)}
                className="p-1 text-[#7A756B] hover:text-[#20201D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!pledgeConfirmed ? (
              <div className="space-y-4">
                <p className="text-xs text-[#68655D] leading-relaxed">
                  Votre contribution aide directement {protagonist.name.split(' ')[0]} à réaliser ce chantier solidaire.
                </p>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#68655D] block">
                    Choisissez votre palier de soutien :
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[20, 35, 60].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setContributionAmount(amt)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          contributionAmount === amt 
                            ? 'bg-[#0B3B82] text-white shadow-xs' 
                            : 'bg-[#F0EBE0] text-[#20201D] hover:bg-[#EAE4D5]'
                        }`}
                      >
                        {amt} €
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF7EF] border border-[#E4DDCC] text-xs text-[#8B6845] space-y-1">
                  <span className="font-bold block">Contrepartie associée :</span>
                  <p className="text-[11px] text-[#524E46]">
                    {contributionAmount >= 60 
                      ? '✦ Bande textile d’indigo tissée main par les apprentis + nom gravé sur la charpente.'
                      : '✦ Nom gravé sur la charpente de l’atelier + accès aux enregistrements sonores exclusifs.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setPledgeConfirmed(true)}
                  className="w-full py-3 rounded-xl bg-[#0B3B82] hover:bg-[#0E4699] text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
                >
                  Confirmer ma contribution de {contributionAmount} €
                </button>
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-editorial text-lg font-bold text-[#20201D]">
                  Merci pour votre soutien !
                </h4>
                <p className="text-xs text-[#68655D]">
                  Votre contribution de {contributionAmount} € a bien été enregistrée pour « {contributingProject.title} ».
                </p>
                <button
                  type="button"
                  onClick={() => setContributingProject(null)}
                  className="px-6 py-2 rounded-full bg-[#0B3B82] text-white text-xs font-semibold"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2 : COMMANDER UNE OFFRE ARTISANAT                              */}
      {/* ===================================================================== */}
      {purchasingOffer && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPurchasingOffer(null)}
        >
          <div 
            className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#E4DDCC] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B6845]">Commande directe d'atelier</span>
                <h3 className="font-editorial text-base font-bold text-[#20201D]">
                  {purchasingOffer.title}
                </h3>
              </div>
              <button 
                onClick={() => setPurchasingOffer(null)}
                className="p-1 text-[#7A756B] hover:text-[#20201D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!orderConfirmed ? (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!buyerName.trim()) return;
                  setOrderConfirmed(true);
                }} 
                className="space-y-3"
              >
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7EF] border border-[#E4DDCC]">
                  <span className="text-xs font-semibold text-[#524E46]">Montant total :</span>
                  <span className="text-base font-bold font-mono text-[#0B3B82]">{purchasingOffer.pricing}</span>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#68655D] block mb-1">Votre Nom & Prénom *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Clara Dupont"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#FAF7EF] border border-[#E4DDCC] focus:outline-hidden focus:border-[#C89B3C]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#68655D] block mb-1">Votre Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="Ex: clara@example.com"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#FAF7EF] border border-[#E4DDCC] focus:outline-hidden focus:border-[#C89B3C]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#68655D] block mb-1">Mode de règlement solidaire :</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mobile_money')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                        paymentMethod === 'mobile_money' ? 'bg-[#0B3B82] text-white border-[#0B3B82]' : 'bg-[#FAF7EF] text-[#68655D] border-[#E4DDCC]'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile Money</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                        paymentMethod === 'card' ? 'bg-[#0B3B82] text-white border-[#0B3B82]' : 'bg-[#FAF7EF] text-[#68655D] border-[#E4DDCC]'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Carte Bancaire</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0B3B82] hover:bg-[#0E4699] text-white text-xs font-bold transition-colors cursor-pointer shadow-md mt-2"
                >
                  Valider la commande ({purchasingOffer.pricing})
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-editorial text-lg font-bold text-[#20201D]">
                  Commande transmise avec succès !
                </h4>
                <p className="text-xs text-[#68655D]">
                  Merci {buyerName}. Un message a été transmis à l'atelier de {protagonist.name.split(' ')[0]}.
                </p>
                <button
                  type="button"
                  onClick={() => setPurchasingOffer(null)}
                  className="px-6 py-2 rounded-full bg-[#0B3B82] text-white text-xs font-semibold"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3 : RÉPONDRE À UN BESOIN / APPORTER MON AIDE                    */}
      {/* ===================================================================== */}
      {respondingToNeed && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setRespondingToNeed(null)}
        >
          <div 
            className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#E4DDCC] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B6845]">Réponse solidaire</span>
                <h3 className="font-editorial text-base font-bold text-[#20201D]">
                  {respondingToNeed.title}
                </h3>
              </div>
              <button 
                onClick={() => setRespondingToNeed(null)}
                className="p-1 text-[#7A756B] hover:text-[#20201D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!helpSent ? (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!helperName.trim()) return;
                  setHelpSent(true);
                }} 
                className="space-y-3"
              >
                <div>
                  <label className="text-[11px] font-bold text-[#68655D] block mb-1">Votre Prénom & Nom *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Marc Legrand"
                    value={helperName}
                    onChange={(e) => setHelperName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#FAF7EF] border border-[#E4DDCC] focus:outline-hidden focus:border-[#C89B3C]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#68655D] block mb-1">Votre Téléphone ou Email *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: marc@example.com ou +33 6..."
                    value={helperContact}
                    onChange={(e) => setHelperContact(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#FAF7EF] border border-[#E4DDCC] focus:outline-hidden focus:border-[#C89B3C]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#68655D] block mb-1">Votre proposition d'aide *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Ex: Je dispose de contacts avec des coopératives agricoles ou de matériel à prêter..."
                    value={helperProposal}
                    onChange={(e) => setHelperProposal(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#FAF7EF] border border-[#E4DDCC] focus:outline-hidden focus:border-[#C89B3C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0B3B82] hover:bg-[#0E4699] text-white text-xs font-bold transition-colors cursor-pointer shadow-md mt-2"
                >
                  Envoyer ma proposition à l'artisan
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-editorial text-lg font-bold text-[#20201D]">
                  Proposition transmise !
                </h4>
                <p className="text-xs text-[#68655D]">
                  Merci {helperName}. Vos coordonnées et votre proposition ont été transmises à {protagonist.name.split(' ')[0]}.
                </p>
                <button
                  type="button"
                  onClick={() => setRespondingToNeed(null)}
                  className="px-6 py-2 rounded-full bg-[#0B3B82] text-white text-xs font-semibold"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
