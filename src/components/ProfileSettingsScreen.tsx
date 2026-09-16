import React, { useState, useRef, useEffect } from 'react';
import { 
  Sliders,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Edit3,
  ShoppingBag,
  Coins,
  HeartHandshake,
  X,
  Share2,
  Camera,
  MapPin,
  MessageSquare,
  Play,
  Film,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Lock,
  Mail,
  Key,
  Upload,
  UploadCloud,
  Image as ImageIcon,
  Video,
  LogOut,
  Check
} from 'lucide-react';
import { ViewScreen } from '../types';

interface ProfileSettingsScreenProps {
  onNavigate: (screen: ViewScreen) => void;
  selectedDocFilter: string[];
  onUpdateDocFilter: (docIds: string[]) => void;
  language: string;
  onUpdateLanguage: (lang: string) => void;
  hideQuestionByDefault: boolean;
  onToggleHideQuestion: (val: boolean) => void;
}

// Presets multimédias pour le choix rapide d'images et vidéos
const MEDIA_POSTER_PRESETS = [
  { name: 'Lagune & Ciel', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80' },
  { name: 'Forêt & Végétal', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Indigo & Tissage', url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80' },
  { name: 'Terre & Poterie', url: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80' },
];

const MEDIA_VIDEO_PRESETS = [
  { name: 'Extrait Nature', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
  { name: 'Bande-annonce Cinéma', url: 'https://media.w3.org/2010/05/sintel/trailer.mp4' },
  { name: 'Animation Teaser', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

// 1. Offre / Service avec format Vidéo Vertical 9:16
export interface UserOfferItem {
  id: string;
  title: string;
  seriesTitle: string;
  categoryLabel: string;
  type: 'produit' | 'service' | 'atelier' | 'consultation';
  price: string;
  priceNumeric: number;
  stock: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  isActive: boolean;
}

// 2. Part de coproduction avec Prix conseillé & Prévision de rendement
export interface UserShareItem {
  id: string;
  seriesId: string;
  seriesTitle: string;
  sharesCount: number;
  sharesOnSale?: number;
  salePrice?: number;
  purchasePrice: number;
  recommendedPrice: number;
  returnForecastPercent: number;
  returnForecastAmount: number;
  videoUrl: string;
  posterUrl: string;
  status: string;
}

// 3. Projet de financement participatif (Crowdfunding)
export interface UserProjectCrowdfunding {
  id: string;
  title: string;
  seriesTitle: string;
  category: string;
  collectedAmount: number;
  targetAmount: number;
  backersCount: number;
  daysRemaining: number;
  description: string;
  videoUrl: string;
  posterUrl: string;
}

// 4. Vidéo d'univers / Histoire publiée (Borne de montage)
export interface UserStoryVideo {
  id: string;
  title: string;
  seriesId: string;
  seriesTitle: string;
  episodeQuestion?: string;
  summary?: string;
  status: 'Validée' | 'Tournage planifié' | 'En cours de montage' | 'En revue';
  submissionDate: string;
  viewsCount: number;
  duration: string;
  videoUrl: string;
  posterUrl: string;
}

export const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({
  onNavigate,
  language,
  onUpdateLanguage,
  hideQuestionByDefault,
  onToggleHideQuestion
}) => {
  // Pistes du Pupitre / Borne de montage :
  // 'videos' (Mes vidéos) | 'shares' (Mes parts) | 'services' (Mes services) | 'projects' (Mes projets) | 'settings' (Paramètres)
  const [activeTab, setActiveTab] = useState<'videos' | 'shares' | 'services' | 'projects' | 'settings'>('videos');

  // Profile Identity
  const [userName, setUserName] = useState<string>('Amina');
  const [userFullName, setUserFullName] = useState<string>('Amina Traoré');
  const [userAge, setUserAge] = useState<number>(34);
  const [userTerritory, setUserTerritory] = useState<string>('Ganvié & Cotonou, Bénin');
  const [userBio, setUserBio] = useState<string>(
    'Passeuse de mémoires sonores et artisane du tissage traditionnel. Entre la lagune de Ganvié et la terre rouge d’Allada, je recueille les chants du fleuve et les gestes millénaires.'
  );
  const [userPhoto, setUserPhoto] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  );
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Unread messages indicator
  const totalUnreadMessages = 2;

  // Indices de navigation par piste
  const [storyIndex, setStoryIndex] = useState<number>(0);
  const [shareIndex, setShareIndex] = useState<number>(0);
  const [offerIndex, setOfferIndex] = useState<number>(0);
  const [projectIndex, setProjectIndex] = useState<number>(0);

  // Swiping state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  // Video playback
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Modales d'actions commerciales & gestion
  const [isSellingShares, setIsSellingShares] = useState<boolean>(false);
  const [sellPriceInput, setSellPriceInput] = useState<number>(55);
  const [sellCountInput, setSellCountInput] = useState<number>(1);

  // Modales gestion des Offres
  const [editingOffer, setEditingOffer] = useState<UserOfferItem | null>(null);
  const [offerFormTitle, setOfferFormTitle] = useState<string>('');
  const [offerFormPrice, setOfferFormPrice] = useState<string>('');
  const [offerFormDescription, setOfferFormDescription] = useState<string>('');
  const [offerFormPoster, setOfferFormPoster] = useState<string>('');
  const [offerFormVideo, setOfferFormVideo] = useState<string>('');
  const [isDeletingOffer, setIsDeletingOffer] = useState<boolean>(false);

  // Modales gestion des Projets
  const [editingProject, setEditingProject] = useState<UserProjectCrowdfunding | null>(null);
  const [projectFormTitle, setProjectFormTitle] = useState<string>('');
  const [projectFormTarget, setProjectFormTarget] = useState<number>(5000);
  const [projectFormDescription, setProjectFormDescription] = useState<string>('');
  const [projectFormPoster, setProjectFormPoster] = useState<string>('');
  const [projectFormVideo, setProjectFormVideo] = useState<string>('');
  const [isDeletingProject, setIsDeletingProject] = useState<boolean>(false);

  // Paramètres & Sécurité du compte
  const [userEmail, setUserEmail] = useState<string>('amina.traore@yonywood.org');
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [tempEmail, setTempEmail] = useState<string>('amina.traore@yonywood.org');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Modales gestion de studio (Mes vidéos)
  const [isDeletingStory, setIsDeletingStory] = useState<boolean>(false);

  // 1. DATA: Mes Vidéos importées (Format 9:16)
  const [stories, setStories] = useState<UserStoryVideo[]>([
    {
      id: 'story-1',
      title: 'Le chant des piroguiers sous la brume de Ganvié',
      seriesId: 'finagnon-qosqorico',
      seriesTitle: 'Finagnon < > Qosqorico',
      status: 'Validée',
      submissionDate: '12 Fév 2026',
      viewsCount: 1420,
      duration: '4:18',
      videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'story-2',
      title: 'Ce que murmurent les feuilles de karité avant l’aurore',
      seriesId: 'jesus-legba',
      seriesTitle: 'Révélation < > Tradition',
      status: 'Tournage planifié',
      submissionDate: '28 Fév 2026',
      viewsCount: 680,
      duration: '3:45',
      videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'story-3',
      title: 'Le secret de la cuve d’indigo fermentée',
      seriesId: 'jesus-legba',
      seriesTitle: 'Révélation < > Tradition',
      status: 'En cours de montage',
      submissionDate: '05 Mar 2026',
      viewsCount: 230,
      duration: '5:10',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  // 2. DATA: Mes Parts (avec Prix Conseillé, Stock en Réserve et en Vente)
  const [productionShares, setProductionShares] = useState<UserShareItem[]>([
    {
      id: 'share-1',
      seriesId: 'finagnon-qosqorico',
      seriesTitle: 'Finagnon < > Qosqorico',
      sharesCount: 10,
      sharesOnSale: 0,
      salePrice: 55,
      purchasePrice: 350,
      recommendedPrice: 55,
      returnForecastPercent: 18.5,
      returnForecastAmount: 64.75,
      status: 'Diffusion internationale',
      videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'share-2',
      seriesId: 'jesus-legba',
      seriesTitle: 'Révélation < > Tradition',
      sharesCount: 5,
      sharesOnSale: 2,
      salePrice: 50,
      purchasePrice: 200,
      recommendedPrice: 48,
      returnForecastPercent: 12.0,
      returnForecastAmount: 24.00,
      status: 'Post-production active',
      videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  // 3. DATA: Mes Offres (Titre + Prix + Modifier / Supprimer)
  const [offers, setOffers] = useState<UserOfferItem[]>([
    {
      id: 'off-1',
      title: 'Étoffe rituelle tissée au fil de coton sauvage',
      seriesTitle: 'Finagnon < > Qosqorico',
      categoryLabel: 'Artisanat Textile',
      type: 'produit',
      price: '180 €',
      priceNumeric: 180,
      stock: '4 pièces numérotées',
      description: 'Pièce cérémonielle tissée selon les motifs traditionnels toffinou.',
      videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
      isActive: true
    },
    {
      id: 'off-2',
      title: 'Atelier immersif d’écoute & initiation aux chants de lagune',
      seriesTitle: 'Révélation < > Tradition',
      categoryLabel: 'Transmission Vivante',
      type: 'atelier',
      price: '65 € / pers',
      priceNumeric: 65,
      stock: 'Sessions de 4 pers. max',
      description: 'Découverte des fréquences et mémoires d’eau au lever du jour à Ganvié.',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80',
      isActive: true
    }
  ]);

  // 4. DATA: Mes Projets (Financement Participatif)
  const [projects, setProjects] = useState<UserProjectCrowdfunding[]>([
    {
      id: 'proj-1',
      title: 'Le Sanctuaire Sonore de la Forêt de Kpassè',
      seriesTitle: 'Révélation < > Tradition',
      category: 'Préservation & Patrimoine Acoustique',
      collectedAmount: 3450,
      targetAmount: 5000,
      backersCount: 47,
      daysRemaining: 18,
      description: 'Enregistrement binaural immersif des derniers chants rituels des prêtresses de Kpassè.',
      videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'proj-2',
      title: 'Le Grand Métier à Tisser d’Allada',
      seriesTitle: 'Finagnon < > Qosqorico',
      category: 'Équipement d’Atelier Collectif',
      collectedAmount: 1820,
      targetAmount: 2800,
      backersCount: 29,
      daysRemaining: 34,
      description: 'Reconstruction d’un métier à tisser en bois d’iroko pour former 8 jeunes apprenties.',
      videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  // Gérer la lecture vidéo
  const toggleVideoPlayback = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Synchroniser la vidéo lors du changement de slide
  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [activeTab, storyIndex, shareIndex, offerIndex, projectIndex]);

  // Navigation Swipes & Chariot
  const handlePrev = () => {
    if (activeTab === 'videos') {
      setStoryIndex(prev => (prev > 0 ? prev - 1 : stories.length - 1));
    } else if (activeTab === 'shares') {
      setShareIndex(prev => (prev > 0 ? prev - 1 : productionShares.length - 1));
    } else if (activeTab === 'services') {
      setOfferIndex(prev => (prev > 0 ? prev - 1 : offers.length - 1));
    } else if (activeTab === 'projects') {
      setProjectIndex(prev => (prev > 0 ? prev - 1 : projects.length - 1));
    }
  };

  const handleNext = () => {
    if (activeTab === 'videos') {
      setStoryIndex(prev => (prev < stories.length - 1 ? prev + 1 : 0));
    } else if (activeTab === 'shares') {
      setShareIndex(prev => (prev < productionShares.length - 1 ? prev + 1 : 0));
    } else if (activeTab === 'services') {
      setOfferIndex(prev => (prev < offers.length - 1 ? prev + 1 : 0));
    } else if (activeTab === 'projects') {
      setProjectIndex(prev => (prev < projects.length - 1 ? prev + 1 : 0));
    }
  };

  // Touch Swipe Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setSwipeOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX;
    if (Math.abs(diff) < 120) {
      setSwipeOffset(diff);
    }
  };

  const onTouchEnd = () => {
    if (swipeOffset < -40) {
      handleNext();
    } else if (swipeOffset > 40) {
      handlePrev();
    }
    setTouchStartX(null);
    setSwipeOffset(0);
  };

  // Mouse Drag Handlers
  const onMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setTouchStartX(e.clientX);
    setSwipeOffset(0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || touchStartX === null) return;
    const diff = e.clientX - touchStartX;
    if (Math.abs(diff) < 120) {
      setSwipeOffset(diff);
    }
  };

  const onMouseUp = () => {
    if (!isMouseDown) return;
    if (swipeOffset < -40) {
      handleNext();
    } else if (swipeOffset > 40) {
      handlePrev();
    }
    setIsMouseDown(false);
    setTouchStartX(null);
    setSwipeOffset(0);
  };

  // Actions Mes Vidéos (Borne Studio)
  const handleDeleteCurrentStory = () => {
    if (stories.length <= 1) {
      setShareToast("Impossible de supprimer la seule vidéo restante de la borne.");
      setIsDeletingStory(false);
      setTimeout(() => setShareToast(null), 3500);
      return;
    }
    const currentId = stories[storyIndex]?.id;
    setStories(prev => prev.filter(s => s.id !== currentId));
    setStoryIndex(prev => Math.max(0, prev - 1));
    setIsDeletingStory(false);
    setShareToast("Vidéo retirée.");
    setTimeout(() => setShareToast(null), 3500);
  };

  // Actions Mes Parts : Gérer la mise en vente et stock
  const handleOpenManageShares = () => {
    const cur = productionShares[shareIndex];
    if (!cur) return;
    const availableReserve = cur.sharesCount - (cur.sharesOnSale || 0);
    setSellCountInput(cur.sharesOnSale && cur.sharesOnSale > 0 ? cur.sharesOnSale : Math.max(1, availableReserve));
    setSellPriceInput(cur.salePrice || cur.recommendedPrice);
    setIsSellingShares(true);
  };

  const handleConfirmSellShares = () => {
    const cur = productionShares[shareIndex];
    if (!cur) return;
    setProductionShares(prev => prev.map((s, idx) => {
      if (idx === shareIndex) {
        return {
          ...s,
          sharesOnSale: Math.min(s.sharesCount, sellCountInput),
          salePrice: sellPriceInput
        };
      }
      return s;
    }));
    setShareToast(`${sellCountInput} part(s) mises en vente à ${sellPriceInput} € / part sur le Marché.`);
    setIsSellingShares(false);
    setTimeout(() => setShareToast(null), 3500);
  };

  const handleCancelSaleShares = () => {
    setProductionShares(prev => prev.map((s, idx) => {
      if (idx === shareIndex) {
        return {
          ...s,
          sharesOnSale: 0
        };
      }
      return s;
    }));
    setShareToast("Parts retirées de la vente et remises en réserve.");
    setIsSellingShares(false);
    setTimeout(() => setShareToast(null), 3500);
  };

  // Actions Mes Offres (Modifier / Supprimer)
  const handleOpenEditOffer = (offer: UserOfferItem) => {
    setEditingOffer(offer);
    setOfferFormTitle(offer.title);
    setOfferFormPrice(offer.price);
    setOfferFormDescription(offer.description);
    setOfferFormPoster(offer.posterUrl);
    setOfferFormVideo(offer.videoUrl);
  };

  const handleSaveOffer = () => {
    if (!editingOffer) return;
    setOffers(prev => prev.map(o => o.id === editingOffer.id ? {
      ...o,
      title: offerFormTitle,
      price: offerFormPrice,
      description: offerFormDescription,
      posterUrl: offerFormPoster,
      videoUrl: offerFormVideo
    } : o));
    setEditingOffer(null);
    setShareToast("Offre mise à jour avec succès !");
    setTimeout(() => setShareToast(null), 3500);
  };

  const handleDeleteCurrentOffer = () => {
    if (offers.length <= 1) {
      setShareToast("Impossible de supprimer la seule offre active.");
      setIsDeletingOffer(false);
      setTimeout(() => setShareToast(null), 3500);
      return;
    }
    const currentId = offers[offerIndex]?.id;
    setOffers(prev => prev.filter(o => o.id !== currentId));
    setOfferIndex(prev => Math.max(0, prev - 1));
    setIsDeletingOffer(false);
    setShareToast("Offre supprimée.");
    setTimeout(() => setShareToast(null), 3500);
  };

  // Actions Mes Projets (Modifier / Supprimer)
  const handleOpenEditProject = (proj: UserProjectCrowdfunding) => {
    setEditingProject(proj);
    setProjectFormTitle(proj.title);
    setProjectFormTarget(proj.targetAmount);
    setProjectFormDescription(proj.description);
    setProjectFormPoster(proj.posterUrl);
    setProjectFormVideo(proj.videoUrl);
  };

  const handleSaveProject = () => {
    if (!editingProject) return;
    setProjects(prev => prev.map(p => p.id === editingProject.id ? {
      ...p,
      title: projectFormTitle,
      targetAmount: projectFormTarget,
      description: projectFormDescription,
      posterUrl: projectFormPoster,
      videoUrl: projectFormVideo
    } : p));
    setEditingProject(null);
    setShareToast("Projet mis à jour avec succès !");
    setTimeout(() => setShareToast(null), 3500);
  };

  const handleDeleteCurrentProject = () => {
    if (projects.length <= 1) {
      setShareToast("Impossible de supprimer le seul projet actif.");
      setIsDeletingProject(false);
      setTimeout(() => setShareToast(null), 3500);
      return;
    }
    const currentId = projects[projectIndex]?.id;
    setProjects(prev => prev.filter(p => p.id !== currentId));
    setProjectIndex(prev => Math.max(0, prev - 1));
    setIsDeletingProject(false);
    setShareToast("Projet supprimé.");
    setTimeout(() => setShareToast(null), 3500);
  };

  // Actions Paramètres : Sécurité du compte
  const handleSaveEmail = () => {
    if (!tempEmail || !tempEmail.includes('@')) {
      setShareToast("Veuillez saisir une adresse email valide.");
      setTimeout(() => setShareToast(null), 3000);
      return;
    }
    setUserEmail(tempEmail);
    setIsEditingEmail(false);
    setShareToast("Adresse email mise à jour avec succès.");
    setTimeout(() => setShareToast(null), 3000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setShareToast("Veuillez renseigner votre mot de passe actuel.");
      setTimeout(() => setShareToast(null), 3000);
      return;
    }
    if (newPassword.length < 6) {
      setShareToast("Le nouveau mot de passe doit comporter au moins 6 caractères.");
      setTimeout(() => setShareToast(null), 3000);
      return;
    }
    if (newPassword !== confirmPassword) {
      setShareToast("Les nouveaux mots de passe ne correspondent pas.");
      setTimeout(() => setShareToast(null), 3000);
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShareToast("Mot de passe mis à jour avec succès !");
    setTimeout(() => setShareToast(null), 3500);
  };

  // Upload local simulé pour les médias
  const handleUploadPosterFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(URL.createObjectURL(file));
      setShareToast("Image sélectionnée.");
      setTimeout(() => setShareToast(null), 2000);
    }
  };

  const handleUploadVideoFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(URL.createObjectURL(file));
      setShareToast("Vidéo sélectionnée.");
      setTimeout(() => setShareToast(null), 2000);
    }
  };

  // Partager le profil
  const handleShareProfile = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareToast("Lien de la borne de profil copié !");
    setTimeout(() => setShareToast(null), 3000);
  };

  // Active items
  const currentStory = stories[storyIndex] || stories[0];
  const currentShare = productionShares[shareIndex] || productionShares[0];
  const currentOffer = offers[offerIndex] || offers[0];
  const currentProject = projects[projectIndex] || projects[0];

  // Helper count for current active track
  const activeTrackItemsCount = 
    activeTab === 'videos' ? stories.length :
    activeTab === 'shares' ? productionShares.length :
    activeTab === 'services' ? offers.length :
    activeTab === 'projects' ? projects.length : 0;

  const activeCurrentIndex = 
    activeTab === 'videos' ? storyIndex :
    activeTab === 'shares' ? shareIndex :
    activeTab === 'services' ? offerIndex :
    activeTab === 'projects' ? projectIndex : 0;

  // Titre de série actif selon l'onglet courant
  const currentSeriesTitle = 
    activeTab === 'videos' ? currentStory?.seriesTitle :
    activeTab === 'shares' ? currentShare?.seriesTitle :
    activeTab === 'services' ? currentOffer?.seriesTitle :
    activeTab === 'projects' ? currentProject?.seriesTitle : '';

  const parseSeriesTitle = (title?: string) => {
    if (!title) return { partA: '', partB: '', hasSeparator: false };
    if (title.includes('< >')) {
      const parts = title.split('< >');
      return { partA: parts[0].trim(), partB: parts.slice(1).join('< >').trim(), hasSeparator: true };
    }
    if (title.includes('<>')) {
      const parts = title.split('<>');
      return { partA: parts[0].trim(), partB: parts.slice(1).join('<>').trim(), hasSeparator: true };
    }
    return { partA: title.trim(), partB: '', hasSeparator: false };
  };

  const parsedSeries = parseSeriesTitle(currentSeriesTitle);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-36 space-y-6 text-[#20201D]">
      
      {/* ========================================================================= */}
      {/* 1. EN-TÊTE D'IDENTITÉ & ACTIONS RAPIDES                                   */}
      {/* ========================================================================= */}
      <div className="space-y-4 border-b border-[#E4DDCC] pb-4">
        
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full p-0.5 border-2 border-[#C89B3C] shadow-sm overflow-hidden bg-white">
                <img
                  src={userPhoto}
                  alt={userFullName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <button
                onClick={() => setIsEditingProfile(true)}
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0B3B82] text-white flex items-center justify-center text-[10px] shadow-xs cursor-pointer hover:bg-[#0E4699]"
                title="Modifier mon profil"
                id="btn-edit-profile-avatar"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-lg sm:text-xl font-bold text-[#20201D] leading-tight">
                  {userFullName}
                </h1>
                <span className="text-xs text-[#8B6845] font-sans">({userAge} ans)</span>
              </div>
              <p className="text-xs text-[#8B6845] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#0B3B82]" />
                <span>{userTerritory}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Bouton Messagerie -> Ouvre directement la page Messagerie dédiée sans conflit */}
            <button
              onClick={() => onNavigate({ type: 'messaging' })}
              id="btn-profile-messages"
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F5F1E8] border border-[#E4DDCC] text-xs font-medium text-[#20201D] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer relative"
              title="Ouvrir la messagerie"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#0B3B82]" />
              <span>Messages</span>
              {totalUnreadMessages > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#0B3B82] text-white text-[9px] font-bold flex items-center justify-center">
                  {totalUnreadMessages}
                </span>
              )}
            </button>

            {/* Bouton Partager */}
            <button
              onClick={handleShareProfile}
              id="btn-share-profile"
              className="p-2 rounded-full bg-white hover:bg-[#F5F1E8] border border-[#E4DDCC] text-[#8B6845] hover:text-[#20201D] transition-colors cursor-pointer shadow-xs"
              title="Partager le profil"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LE MENU DE NAVIGATION DU PROFIL (SUR FOND BLEU #0B3B82)                  */}
        {/* 1. Mes vidéos | 2. Mes parts | 3. Mes offres | 4. Mes projets | 5. Paramètres */}
        {/* ========================================================================= */}
        <div className="bg-[#0B3B82] p-1.5 rounded-2xl border border-[#0B3B82] shadow-md">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            
            {/* Piste 1: Mes vidéos */}
            <button
              onClick={() => setActiveTab('videos')}
              id="tab-profile-videos"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 outline-none focus:outline-none focus-visible:outline-none ring-0 ${
                activeTab === 'videos'
                  ? 'bg-white text-[#0B3B82] shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Mes vidéos</span>
            </button>

            {/* Piste 2: Mes parts */}
            <button
              onClick={() => setActiveTab('shares')}
              id="tab-profile-shares"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 outline-none focus:outline-none focus-visible:outline-none ring-0 ${
                activeTab === 'shares'
                  ? 'bg-white text-[#0B3B82] shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Mes parts</span>
            </button>

            {/* Piste 3: Mes offres */}
            <button
              onClick={() => setActiveTab('services')}
              id="tab-profile-services"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 outline-none focus:outline-none focus-visible:outline-none ring-0 ${
                activeTab === 'services'
                  ? 'bg-white text-[#0B3B82] shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Mes offres</span>
            </button>

            {/* Piste 4: Mes projets */}
            <button
              onClick={() => setActiveTab('projects')}
              id="tab-profile-projects"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 outline-none focus:outline-none focus-visible:outline-none ring-0 ${
                activeTab === 'projects'
                  ? 'bg-white text-[#0B3B82] shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Mes projets</span>
            </button>

            {/* Piste 5: Paramètres */}
            <button
              onClick={() => setActiveTab('settings')}
              id="tab-profile-settings"
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ml-auto outline-none focus:outline-none focus-visible:outline-none ring-0 ${
                activeTab === 'settings'
                  ? 'bg-white text-[#0B3B82] shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Paramètres</span>
            </button>

          </div>
        </div>
      </div>

      {/* TOAST SUCCÈS LUDIQUE */}
      {shareToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full px-4 py-2.5 rounded-2xl bg-[#0B3B82] text-white text-xs font-semibold flex items-center gap-2 shadow-xl animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{shareToast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. AFFICHAGE ÉPURÉ SUR FOND BEIGE (FORMAT 9:16 AVEC NAVIGATION FLÈCHES)    */}
      {/* ========================================================================= */}
      {activeTab !== 'settings' ? (
        <div className="space-y-4 animate-in fade-in duration-200">

          {/* Conteneur principal sur fond beige avec flèches latérales */}
          <div className="relative flex items-center justify-center gap-3 sm:gap-6 py-2">
            
            {/* Flèche Gauche sur fond beige */}
            <button
              onClick={handlePrev}
              className="hidden sm:flex p-3.5 rounded-full bg-white hover:bg-[#F5F1E8] border border-[#E4DDCC] text-[#8B6845] hover:text-[#20201D] transition-all shadow-sm cursor-pointer hover:scale-105 outline-none focus:outline-none ring-0"
              title="Précédent"
              id="prev-studio-card-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* ÉCRAN DE VISIONNAGE VERTICAL FORMAT 9:16 (Sans repères de coins) */}
            <div
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              className="w-full max-w-[320px] sm:max-w-[350px] aspect-[9/16] transition-transform duration-150 ease-out select-none cursor-grab active:cursor-grabbing relative rounded-3xl overflow-hidden shadow-xl border border-[#E4DDCC] bg-black outline-none focus:outline-none ring-0"
              style={{ transform: `translateX(${swipeOffset}px)` }}
            >
              {/* ================================================================= */}
              {/* PISTE 1. MES VIDÉOS (Sans titre, juste statistiques + supprimer) */}
              {/* ================================================================= */}
              {activeTab === 'videos' && currentStory && (
                <div 
                  className="group relative w-full h-full flex flex-col justify-between p-5 text-white"
                  id={`card-video-${currentStory.id}`}
                >
                  {/* Image de couverture toujours visible pour éviter tout cadre ou clignotement */}
                  <img
                    src={currentStory.posterUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  {/* Vidéo de fond (activée uniquement en lecture) */}
                  <video
                    ref={videoRef}
                    src={currentStory.videoUrl}
                    loop
                    muted
                    playsInline
                    preload="none"
                    className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
                      isPlaying ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none" />

                  {/* HAUT : Titre de la série centré avec le symbole face à face */}
                  <div className="relative z-10 flex items-center justify-center w-full">
                    <div className="px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white/95 flex items-center gap-1.5 shadow-md">
                      {parsedSeries.hasSeparator ? (
                        <>
                          <span className="font-editorial font-bold">{parsedSeries.partA}</span>
                          <span className="font-mono text-xs font-black text-[#C89B3C] px-0.5 select-none tracking-wider flex items-center gap-0.5">
                            <span>&lt;</span>
                            <span>&gt;</span>
                          </span>
                          <span className="font-editorial font-bold">{parsedSeries.partB}</span>
                        </>
                      ) : (
                        <span className="font-editorial font-bold">{currentStory.seriesTitle}</span>
                      )}
                    </div>
                  </div>

                  {/* CENTRE : Lecture / Pause Vidéo */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <button
                      onClick={toggleVideoPlayback}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-black/65 hover:bg-[#C89B3C] text-white hover:text-black border border-white/25 backdrop-blur-xs flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-2xl cursor-pointer pointer-events-auto outline-none focus:outline-none ring-0"
                      title={isPlaying ? 'Mettre en pause' : 'Visionner la vidéo'}
                      id={`play-video-btn-${currentStory.id}`}
                    >
                      <Play className={`w-8 h-8 ${isPlaying ? 'opacity-30' : 'fill-current ml-1'}`} />
                    </button>
                  </div>

                  {/* BAS : Uniquement les statistiques & le bouton Supprimer (pas de titre, pas de renommer) */}
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs border border-white/15 text-[11px] text-[#E4DDCC] font-mono">
                          {currentStory.duration}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[11px] text-[#F3E5C8] font-bold font-mono">
                          {currentStory.viewsCount} vues
                        </span>
                      </div>

                      {/* Bouton Supprimer uniquement */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDeletingStory(true);
                        }}
                        className="py-1.5 px-3 rounded-xl bg-red-600/30 hover:bg-red-600/60 border border-red-500/40 text-red-200 hover:text-white text-xs font-semibold backdrop-blur-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm outline-none focus:outline-none ring-0"
                        title="Retirer cette vidéo"
                        id="btn-delete-video"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* PISTE 2. MES PARTS (Stock en réserve, en vente & Mettre en vente) */}
              {/* ================================================================= */}
              {activeTab === 'shares' && currentShare && (
                <div 
                  className="group relative w-full h-full flex flex-col justify-between p-5 text-white"
                  id={`card-share-${currentShare.id}`}
                >
                  <img
                    src={currentShare.posterUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  <video
                    ref={videoRef}
                    src={currentShare.videoUrl}
                    loop
                    muted
                    playsInline
                    preload="none"
                    className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
                      isPlaying ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none" />

                  {/* HAUT : Titre série centré avec symbole face à face & Parts détenues */}
                  <div className="relative z-10 flex items-center justify-between gap-2 w-full">
                    <div className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white/95 flex items-center gap-1.5 shadow-md">
                      {parsedSeries.hasSeparator ? (
                        <>
                          <span className="font-editorial font-bold">{parsedSeries.partA}</span>
                          <span className="font-mono text-xs font-black text-[#C89B3C] px-0.5 select-none tracking-wider flex items-center gap-0.5">
                            <span>&lt;</span>
                            <span>&gt;</span>
                          </span>
                          <span className="font-editorial font-bold">{parsedSeries.partB}</span>
                        </>
                      ) : (
                        <span className="font-editorial font-bold">{currentShare.seriesTitle}</span>
                      )}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#0B3B82] border border-white/20 text-xs font-bold text-white shadow-sm shrink-0">
                      {currentShare.sharesCount} part(s)
                    </span>
                  </div>

                  {/* CENTRE : Lecture */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <button
                      onClick={toggleVideoPlayback}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-black/65 hover:bg-[#C89B3C] text-white hover:text-black border border-white/25 backdrop-blur-xs flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-2xl cursor-pointer pointer-events-auto outline-none focus:outline-none ring-0"
                      title={isPlaying ? 'Mettre en pause' : `Visionner ${currentShare.seriesTitle}`}
                      id={`play-share-btn-${currentShare.id}`}
                    >
                      <Play className={`w-8 h-8 ${isPlaying ? 'opacity-30' : 'fill-current ml-1'}`} />
                    </button>
                  </div>

                  {/* BAS : STOCK EN RÉSERVE, STOCK EN VENTE + BOUTON METTRE EN VENTE */}
                  <div className="relative z-10 space-y-3">
                    <div className="p-3 rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 text-left space-y-2">
                      <div className="flex items-center justify-between text-xs pb-1.5 border-b border-white/10">
                        <span className="text-white/70">Stock total détenu</span>
                        <span className="font-bold text-white font-mono">{currentShare.sharesCount} part(s)</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/70">En réserve</span>
                        <span className="font-bold text-emerald-400 font-mono">
                          {currentShare.sharesCount - (currentShare.sharesOnSale || 0)} part(s)
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/70">En vente sur le Marché</span>
                        <span className="font-bold font-mono">
                          {(currentShare.sharesOnSale || 0) > 0 ? (
                            <span className="text-[#C89B3C]">
                              {currentShare.sharesOnSale} part(s) à {currentShare.salePrice || currentShare.recommendedPrice} €
                            </span>
                          ) : (
                            <span className="text-white/50">Aucune</span>
                          )}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenManageShares();
                      }}
                      className="w-full py-2.5 rounded-2xl bg-[#0B3B82] hover:bg-[#0E4699] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      id="btn-sell-shares-modal"
                    >
                      <Coins className="w-3.5 h-3.5" />
                      <span>Mettre en vente</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* PISTE 3. MES OFFRES (Prix en haut, Titre, Modifier / Supprimer)    */}
              {/* ================================================================= */}
              {activeTab === 'services' && currentOffer && (
                <div 
                  className="group relative w-full h-full flex flex-col justify-between p-5 text-white"
                  id={`card-service-${currentOffer.id}`}
                >
                  <img
                    src={currentOffer.posterUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  <video
                    ref={videoRef}
                    src={currentOffer.videoUrl}
                    loop
                    muted
                    playsInline
                    preload="none"
                    className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
                      isPlaying ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none" />

                  {/* HAUT : Titre série centré avec symbole face à face & Prix */}
                  <div className="relative z-10 flex items-center justify-between gap-2 w-full">
                    <div className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white/95 flex items-center gap-1.5 shadow-md">
                      {parsedSeries.hasSeparator ? (
                        <>
                          <span className="font-editorial font-bold">{parsedSeries.partA}</span>
                          <span className="font-mono text-xs font-black text-[#C89B3C] px-0.5 select-none tracking-wider flex items-center gap-0.5">
                            <span>&lt;</span>
                            <span>&gt;</span>
                          </span>
                          <span className="font-editorial font-bold">{parsedSeries.partB}</span>
                        </>
                      ) : (
                        <span className="font-editorial font-bold">{currentOffer.seriesTitle}</span>
                      )}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#C89B3C] border border-white/20 text-xs font-bold text-[#181816] shadow-md shrink-0">
                      {currentOffer.price}
                    </span>
                  </div>

                  {/* CENTRE : Lecture */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <button
                      onClick={toggleVideoPlayback}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-black/65 hover:bg-[#C89B3C] text-white hover:text-black border border-white/25 backdrop-blur-xs flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-2xl cursor-pointer pointer-events-auto outline-none focus:outline-none ring-0"
                      title={isPlaying ? 'Mettre en pause' : `Découvrir ${currentOffer.title}`}
                      id={`play-service-btn-${currentOffer.id}`}
                    >
                      <Play className={`w-8 h-8 ${isPlaying ? 'opacity-30' : 'fill-current ml-1'}`} />
                    </button>
                  </div>

                  {/* BAS : Titre & Boutons Modifier / Supprimer */}
                  <div className="relative z-10 space-y-3">
                    <div>
                      <h3 className="font-editorial text-base sm:text-lg font-bold text-white leading-snug">
                        {currentOffer.title}
                      </h3>
                      <p className="text-[11px] text-[#E4DDCC] mt-0.5">{currentOffer.categoryLabel}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditOffer(currentOffer);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-[#0B3B82] hover:bg-[#0E4699] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer outline-none focus:outline-none ring-0"
                        id="btn-edit-offer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#C89B3C]" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDeletingOffer(true);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-black/60 hover:bg-red-600/80 border border-white/20 hover:border-red-500 text-white/90 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer outline-none focus:outline-none ring-0"
                        id="btn-delete-offer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* PISTE 4. MES PROJETS (Titre, Jauge participative, Modifier / Supprimer) */}
              {/* ================================================================= */}
              {activeTab === 'projects' && currentProject && (
                <div 
                  className="group relative w-full h-full flex flex-col justify-between p-5 text-white"
                  id={`card-project-${currentProject.id}`}
                >
                  <img
                    src={currentProject.posterUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  <video
                    ref={videoRef}
                    src={currentProject.videoUrl}
                    loop
                    muted
                    playsInline
                    preload="none"
                    className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
                      isPlaying ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none" />

                  {/* HAUT : Titre série centré avec symbole face à face */}
                  <div className="relative z-10 flex items-center justify-center w-full">
                    <div className="px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white/95 flex items-center gap-1.5 shadow-md">
                      {parsedSeries.hasSeparator ? (
                        <>
                          <span className="font-editorial font-bold">{parsedSeries.partA}</span>
                          <span className="font-mono text-xs font-black text-[#C89B3C] px-0.5 select-none tracking-wider flex items-center gap-0.5">
                            <span>&lt;</span>
                            <span>&gt;</span>
                          </span>
                          <span className="font-editorial font-bold">{parsedSeries.partB}</span>
                        </>
                      ) : (
                        <span className="font-editorial font-bold">{currentProject.seriesTitle}</span>
                      )}
                    </div>
                  </div>

                  {/* CENTRE : Lecture */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <button
                      onClick={toggleVideoPlayback}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-black/65 hover:bg-[#C89B3C] text-white hover:text-black border border-white/25 backdrop-blur-xs flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-2xl cursor-pointer pointer-events-auto outline-none focus:outline-none ring-0"
                      title={isPlaying ? 'Mettre en pause' : `Pitch de ${currentProject.title}`}
                      id={`play-project-btn-${currentProject.id}`}
                    >
                      <Play className={`w-8 h-8 ${isPlaying ? 'opacity-30' : 'fill-current ml-1'}`} />
                    </button>
                  </div>

                  {/* BAS : Titre, Pourcentage/Jours & Boutons Modifier / Supprimer */}
                  <div className="relative z-10 space-y-3">
                    <div>
                      <h3 className="font-editorial text-base sm:text-lg font-bold text-white leading-snug">
                        {currentProject.title}
                      </h3>
                    </div>

                    {/* Jauge participative avec POURCENTAGE placé au niveau des jours & contributeurs */}
                    <div className="space-y-1.5 p-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-[#C89B3C]">
                          {currentProject.collectedAmount.toLocaleString()} € <span className="text-[10px] font-normal text-white/80">/ {currentProject.targetAmount.toLocaleString()} €</span>
                        </span>
                        
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-xs">
                            {Math.round((currentProject.collectedAmount / currentProject.targetAmount) * 100)} %
                          </span>
                          <span className="text-white/80 text-[10px]">
                            {currentProject.backersCount} cont. • {currentProject.daysRemaining} j
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#C89B3C] to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (currentProject.collectedAmount / currentProject.targetAmount) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Boutons Modifier & Supprimer */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditProject(currentProject);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-[#0B3B82] hover:bg-[#0E4699] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer outline-none focus:outline-none ring-0"
                        id="btn-edit-project"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#C89B3C]" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDeletingProject(true);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-black/60 hover:bg-red-600/80 border border-white/20 hover:border-red-500 text-white/90 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer outline-none focus:outline-none ring-0"
                        id="btn-delete-project"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Flèche Droite sur fond beige */}
            <button
              onClick={handleNext}
              className="hidden sm:flex p-3.5 rounded-full bg-white hover:bg-[#F5F1E8] border border-[#E4DDCC] text-[#8B6845] hover:text-[#20201D] transition-all shadow-sm cursor-pointer hover:scale-105 outline-none focus:outline-none ring-0"
              title="Suivant"
              id="next-studio-card-btn"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* CARTE 1 : SÉCURITÉ DU COMPTE (EMAIL & MOT DE PASSE) */}
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#E4DDCC]">
              <div className="w-8 h-8 rounded-full bg-[#0B3B82]/10 text-[#0B3B82] flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-editorial text-base sm:text-lg font-bold text-[#20201D]">
                  Sécurité du compte
                </h3>
                <p className="text-[11px] text-[#8B6845]">
                  Gestion de vos identifiants d'accès et protection du profil.
                </p>
              </div>
            </div>

            {/* Email de connexion */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#20201D] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#8B6845]" />
                  Adresse email
                </label>
                {!isEditingEmail ? (
                  <button
                    type="button"
                    onClick={() => {
                      setTempEmail(userEmail);
                      setIsEditingEmail(true);
                    }}
                    className="text-[11px] text-[#0B3B82] hover:underline font-semibold cursor-pointer"
                  >
                    Modifier
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSaveEmail}
                    className="text-[11px] text-emerald-700 hover:underline font-bold cursor-pointer"
                  >
                    Enregistrer
                  </button>
                )}
              </div>
              {isEditingEmail ? (
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    className="flex-1 text-xs p-2.5 rounded-xl bg-white border border-[#E4DDCC] text-[#20201D] focus:border-[#0B3B82] outline-none"
                    placeholder="nouvelle@adresse.org"
                  />
                  <button
                    onClick={handleSaveEmail}
                    className="px-3.5 py-2 rounded-xl bg-[#0B3B82] text-white text-xs font-bold hover:bg-[#0E4699] cursor-pointer shadow-xs"
                  >
                    Valider
                  </button>
                  <button
                    onClick={() => setIsEditingEmail(false)}
                    className="px-3 py-2 rounded-xl bg-[#FAF7EF] border border-[#E4DDCC] text-xs font-semibold text-[#8B6845] hover:text-[#20201D] cursor-pointer"
                  >
                    Annuler
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-[#FAF7EF] border border-[#E4DDCC] text-xs font-medium text-[#20201D] flex items-center justify-between">
                  <span>{userEmail}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Vérifié
                  </span>
                </div>
              )}
            </div>

            {/* Modification de mot de passe */}
            <form onSubmit={handleUpdatePassword} className="space-y-3 pt-2">
              <label className="text-xs font-bold text-[#20201D] flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#8B6845]" />
                Modifier le mot de passe
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <input
                    type="password"
                    placeholder="Mot de passe actuel"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#E4DDCC] text-[#20201D] placeholder:text-[#9E9B90] focus:border-[#0B3B82] outline-none"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#E4DDCC] text-[#20201D] placeholder:text-[#9E9B90] focus:border-[#0B3B82] outline-none"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirmer nouveau"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#E4DDCC] text-[#20201D] placeholder:text-[#9E9B90] focus:border-[#0B3B82] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={!currentPassword || !newPassword || !confirmPassword}
                  className="px-4 py-2 rounded-xl bg-[#0B3B82] hover:bg-[#0E4699] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold cursor-pointer transition-all shadow-xs"
                >
                  Mettre à jour le mot de passe
                </button>
              </div>
            </form>
          </div>

          {/* CARTE 2 : PRÉFÉRENCES (LANGUE & QUESTIONS) */}
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#E4DDCC]">
              <div className="w-8 h-8 rounded-full bg-[#C89B3C]/15 text-[#C89B3C] flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-editorial text-base sm:text-lg font-bold text-[#20201D]">
                  Préférences
                </h3>
                <p className="text-[11px] text-[#8B6845]">
                  Langue d'affichage et options de l'interface.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#20201D] block">Langue de navigation</label>
                <select
                  value={language}
                  onChange={(e) => onUpdateLanguage(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#E4DDCC] text-[#20201D] focus:border-[#0B3B82] outline-none"
                >
                  <option value="fr">Français (Langue principale)</option>
                  <option value="en">English (Translation)</option>
                  <option value="fon">Fongbe (Bénin)</option>
                  <option value="wo">Wolof (Sénégal)</option>
                </select>
              </div>

              <div className="space-y-1.5 flex flex-col justify-end">
                <label className="text-xs font-bold text-[#20201D] block">Affichage des questions</label>
                <button
                  type="button"
                  onClick={() => onToggleHideQuestion(!hideQuestionByDefault)}
                  className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#E4DDCC] text-left flex items-center justify-between cursor-pointer"
                >
                  <span>Masquer la question par défaut</span>
                  <span className={`w-8 h-4 rounded-full p-0.5 transition-colors ${hideQuestionByDefault ? 'bg-[#0B3B82]' : 'bg-[#E4DDCC]'}`}>
                    <span className={`block w-3 h-3 rounded-full bg-white transition-transform ${hideQuestionByDefault ? 'translate-x-4' : ''}`} />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* DÉCONNEXION */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => {
                setShareToast("Session clôturée avec succès.");
                setTimeout(() => setShareToast(null), 3000);
              }}
              className="py-2.5 px-6 rounded-2xl bg-white hover:bg-red-50 border border-red-200 text-red-700 hover:text-red-800 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Se déconnecter de ce profil</span>
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MODALE : CONFIRMATION DE SUPPRESSION VIDÉO                             */}
      {/* ========================================================================= */}
      {isDeletingStory && (
        <div 
          onClick={() => setIsDeletingStory(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-2xl space-y-4 text-xs text-[#20201D]"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="font-editorial text-lg font-bold text-[#20201D]">
                Retirer cette vidéo ?
              </h3>
              <p className="text-xs text-[#68655D] leading-relaxed">
                Voulez-vous vraiment retirer cette vidéo de votre profil ?
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsDeletingStory(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#E4DDCC] bg-white text-[#20201D] font-bold hover:bg-[#FAF7EF] cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteCurrentStory}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer transition-all shadow-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODALE : GESTION ET MISE EN VENTE DES PARTS SUR LE MARCHÉ              */}
      {/* ========================================================================= */}
      {isSellingShares && currentShare && (
        <div 
          onClick={() => setIsSellingShares(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-2xl space-y-4 text-xs text-[#20201D]"
          >
            <div className="flex justify-between items-center border-b border-[#E4DDCC] pb-3">
              <div>
                <h3 className="font-editorial text-base font-bold text-[#20201D]">
                  Mettre en vente sur le Marché
                </h3>
                <p className="text-[11px] text-[#8B6845]">{currentShare.seriesTitle}</p>
              </div>
              <button onClick={() => setIsSellingShares(false)} className="text-[#8B6845] hover:text-[#20201D] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {/* Récapitulatif du stock */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#FAF7EF] border border-[#E4DDCC] text-center">
                <div>
                  <span className="text-[10px] text-[#8B6845] block">Total détenu</span>
                  <span className="text-sm font-bold text-[#20201D] font-mono">{currentShare.sharesCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8B6845] block">En réserve</span>
                  <span className="text-sm font-bold text-emerald-600 font-mono">
                    {currentShare.sharesCount - (currentShare.sharesOnSale || 0)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8B6845] block">En vente</span>
                  <span className="text-sm font-bold text-[#C89B3C] font-mono">
                    {currentShare.sharesOnSale || 0}
                  </span>
                </div>
              </div>

              {/* Si des parts sont actuellement en vente */}
              {(currentShare.sharesOnSale || 0) > 0 && (
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-amber-900 block">
                      {currentShare.sharesOnSale} part(s) en vente à {currentShare.salePrice || currentShare.recommendedPrice} €
                    </span>
                    <span className="text-[10px] text-amber-700">Visibles par les acheteurs sur le Marché</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCancelSaleShares}
                    className="py-1 px-2.5 rounded-lg bg-white border border-amber-300 text-amber-900 font-bold text-[10px] hover:bg-amber-100 cursor-pointer transition-colors shadow-2xs"
                  >
                    Retirer de la vente
                  </button>
                </div>
              )}

              {/* Nombre de parts à mettre en vente */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-[#20201D]">Nombre de parts à mettre en vente :</label>
                  <span className="text-[11px] text-[#8B6845]">
                    Max disponible : <strong>{currentShare.sharesCount}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  {[1, 2, 5, currentShare.sharesCount].filter((v, i, a) => v <= currentShare.sharesCount && a.indexOf(v) === i).map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setSellCountInput(n)}
                      className={`flex-1 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer ${
                        sellCountInput === n 
                          ? 'bg-[#0B3B82] text-white border-[#0B3B82]' 
                          : 'bg-white border-[#E4DDCC] text-[#20201D]'
                      }`}
                    >
                      {n} part{n > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="1"
                  max={currentShare.sharesCount}
                  value={sellCountInput}
                  onChange={(e) => setSellCountInput(Math.min(currentShare.sharesCount, Math.max(1, Number(e.target.value))))}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E4DDCC] text-sm font-bold text-[#20201D] outline-none focus:border-[#0B3B82]"
                />
              </div>

              {/* Prix unitaire souhaité */}
              <div>
                <label className="font-bold text-[#20201D] block mb-1">Prix de vente souhaité par part (€) :</label>
                <input
                  type="number"
                  min="1"
                  value={sellPriceInput}
                  onChange={(e) => setSellPriceInput(Math.max(1, Number(e.target.value)))}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E4DDCC] text-sm font-bold text-[#20201D] outline-none focus:border-[#0B3B82]"
                />
                <span className="text-[11px] text-[#8B6845] mt-1 block">
                  Prix d'achat conseillé : <strong className="text-[#C89B3C]">{currentShare.recommendedPrice} €</strong>
                </span>
              </div>

              {/* Récapitulatif total */}
              <div className="p-3 rounded-2xl bg-[#0B3B82]/5 border border-[#0B3B82]/20 flex items-center justify-between font-bold">
                <span>Montant brut espéré :</span>
                <span className="text-base text-[#0B3B82] font-mono">{sellCountInput * sellPriceInput} €</span>
              </div>

              <button
                onClick={handleConfirmSellShares}
                className="w-full py-3 rounded-2xl bg-[#0B3B82] hover:bg-[#0E4699] text-white font-bold cursor-pointer transition-all shadow-sm"
              >
                Confirmer la mise en vente ({sellCountInput * sellPriceInput} €)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODALE : MODIFIER UNE OFFRE (TITRE, PRIX, PHOTOS, VIDÉOS, DESCRIPTION) */}
      {/* ========================================================================= */}
      {editingOffer && (
        <div 
          onClick={() => setEditingOffer(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-2xl space-y-4 text-xs text-[#20201D] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-[#E4DDCC] pb-3">
              <div>
                <h3 className="font-editorial text-base font-bold text-[#20201D]">
                  Modifier l'offre
                </h3>
                <p className="text-[11px] text-[#8B6845]">{editingOffer.categoryLabel}</p>
              </div>
              <button onClick={() => setEditingOffer(null)} className="text-[#8B6845] hover:text-[#20201D] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveOffer();
              }}
              className="space-y-3.5"
            >
              {/* Titre et Prix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-[#20201D] block">Titre de l'offre :</label>
                  <input
                    type="text"
                    required
                    value={offerFormTitle}
                    onChange={(e) => setOfferFormTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E4DDCC] text-xs font-semibold text-[#20201D] outline-none focus:border-[#0B3B82]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#20201D] block">Prix affiché :</label>
                  <input
                    type="text"
                    required
                    value={offerFormPrice}
                    onChange={(e) => setOfferFormPrice(e.target.value)}
                    placeholder="ex: 75 € / séance"
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E4DDCC] text-xs font-semibold text-[#20201D] outline-none focus:border-[#0B3B82]"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-bold text-[#20201D] block">Description & conditions :</label>
                <textarea
                  rows={3}
                  value={offerFormDescription}
                  onChange={(e) => setOfferFormDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E4DDCC] text-xs text-[#20201D] outline-none focus:border-[#0B3B82]"
                />
              </div>

              {/* Image de couverture (Photo) */}
              <div className="p-3 rounded-2xl bg-[#FAF7EF] border border-[#E4DDCC] space-y-2">
                <label className="font-bold text-[#20201D] flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#C89B3C]" />
                  Photo de couverture
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-20 rounded-xl overflow-hidden border border-[#E4DDCC] bg-black/10 shrink-0">
                    <img src={offerFormPoster} alt="Aperçu" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E4DDCC] hover:bg-[#FAF7EF] text-[11px] font-bold text-[#0B3B82] cursor-pointer shadow-2xs">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Choisir un fichier image</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleUploadPosterFile(e, setOfferFormPoster)} 
                      />
                    </label>
                    <input
                      type="url"
                      value={offerFormPoster}
                      onChange={(e) => setOfferFormPoster(e.target.value)}
                      placeholder="Ou coller une URL d'image"
                      className="w-full p-1.5 rounded-lg bg-white border border-[#E4DDCC] text-[11px] text-[#20201D] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Vidéo de présentation */}
              <div className="p-3 rounded-2xl bg-[#FAF7EF] border border-[#E4DDCC] space-y-2">
                <label className="font-bold text-[#20201D] flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-[#0B3B82]" />
                  Vidéo de démonstration
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E4DDCC] hover:bg-[#FAF7EF] text-[11px] font-bold text-[#0B3B82] cursor-pointer shadow-2xs">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Choisir un fichier vidéo (MP4/WebM)</span>
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        onChange={(e) => handleUploadVideoFile(e, setOfferFormVideo)} 
                      />
                    </label>
                  </div>
                  <input
                    type="url"
                    value={offerFormVideo}
                    onChange={(e) => setOfferFormVideo(e.target.value)}
                    placeholder="Ou coller une URL de vidéo"
                    className="w-full p-1.5 rounded-lg bg-white border border-[#E4DDCC] text-[11px] text-[#20201D] outline-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#E4DDCC]">
                <button
                  type="button"
                  onClick={() => setEditingOffer(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E4DDCC] bg-white text-[#20201D] font-bold hover:bg-[#FAF7EF] cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0B3B82] hover:bg-[#0E4699] text-white font-bold cursor-pointer transition-all shadow-sm"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODALE : CONFIRMATION SUPPRESSION OFFRE                                */}
      {/* ========================================================================= */}
      {isDeletingOffer && (
        <div 
          onClick={() => setIsDeletingOffer(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-2xl space-y-4 text-xs text-[#20201D]"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="font-editorial text-lg font-bold text-[#20201D]">
                Supprimer cette offre ?
              </h3>
              <p className="text-xs text-[#68655D] leading-relaxed">
                Êtes-vous sûr de vouloir supprimer l'offre « {currentOffer?.title} » ? Les réservations en cours resteront consultables.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsDeletingOffer(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#E4DDCC] bg-white text-[#20201D] font-bold hover:bg-[#FAF7EF] cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteCurrentOffer}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer transition-all shadow-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MODALE : MODIFIER UN PROJET (TITRE, OBJECTIF, PHOTOS, VIDÉOS, DESC)    */}
      {/* ========================================================================= */}
      {editingProject && (
        <div 
          onClick={() => setEditingProject(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-2xl space-y-4 text-xs text-[#20201D] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-[#E4DDCC] pb-3">
              <div>
                <h3 className="font-editorial text-base font-bold text-[#20201D]">
                  Modifier le projet
                </h3>
                <p className="text-[11px] text-[#8B6845]">{editingProject.category}</p>
              </div>
              <button onClick={() => setEditingProject(null)} className="text-[#8B6845] hover:text-[#20201D] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveProject();
              }}
              className="space-y-3.5"
            >
              {/* Titre et Objectif */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-[#20201D] block">Titre du projet :</label>
                  <input
                    type="text"
                    required
                    value={projectFormTitle}
                    onChange={(e) => setProjectFormTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E4DDCC] text-xs font-semibold text-[#20201D] outline-none focus:border-[#0B3B82]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#20201D] block">Objectif (€) :</label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={projectFormTarget}
                    onChange={(e) => setProjectFormTarget(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E4DDCC] text-xs font-semibold text-[#20201D] outline-none focus:border-[#0B3B82]"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-bold text-[#20201D] block">Présentation et utilité :</label>
                <textarea
                  rows={3}
                  value={projectFormDescription}
                  onChange={(e) => setProjectFormDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E4DDCC] text-xs text-[#20201D] outline-none focus:border-[#0B3B82]"
                />
              </div>

              {/* Image de couverture (Photo) */}
              <div className="p-3 rounded-2xl bg-[#FAF7EF] border border-[#E4DDCC] space-y-2">
                <label className="font-bold text-[#20201D] flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#C89B3C]" />
                  Photo d'illustration
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-20 rounded-xl overflow-hidden border border-[#E4DDCC] bg-black/10 shrink-0">
                    <img src={projectFormPoster} alt="Aperçu" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E4DDCC] hover:bg-[#FAF7EF] text-[11px] font-bold text-[#0B3B82] cursor-pointer shadow-2xs">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Choisir un fichier image</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleUploadPosterFile(e, setProjectFormPoster)} 
                      />
                    </label>
                    <input
                      type="url"
                      value={projectFormPoster}
                      onChange={(e) => setProjectFormPoster(e.target.value)}
                      placeholder="Ou coller une URL d'image"
                      className="w-full p-1.5 rounded-lg bg-white border border-[#E4DDCC] text-[11px] text-[#20201D] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Vidéo du pitch */}
              <div className="p-3 rounded-2xl bg-[#FAF7EF] border border-[#E4DDCC] space-y-2">
                <label className="font-bold text-[#20201D] flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-[#0B3B82]" />
                  Vidéo du pitch
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E4DDCC] hover:bg-[#FAF7EF] text-[11px] font-bold text-[#0B3B82] cursor-pointer shadow-2xs">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Choisir un fichier vidéo (MP4/WebM)</span>
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        onChange={(e) => handleUploadVideoFile(e, setProjectFormVideo)} 
                      />
                    </label>
                  </div>
                  <input
                    type="url"
                    value={projectFormVideo}
                    onChange={(e) => setProjectFormVideo(e.target.value)}
                    placeholder="Ou coller une URL de vidéo"
                    className="w-full p-1.5 rounded-lg bg-white border border-[#E4DDCC] text-[11px] text-[#20201D] outline-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#E4DDCC]">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E4DDCC] bg-white text-[#20201D] font-bold hover:bg-[#FAF7EF] cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0B3B82] hover:bg-[#0E4699] text-white font-bold cursor-pointer transition-all shadow-sm"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. MODALE : CONFIRMATION SUPPRESSION PROJET                               */}
      {/* ========================================================================= */}
      {isDeletingProject && (
        <div 
          onClick={() => setIsDeletingProject(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-2xl space-y-4 text-xs text-[#20201D]"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="font-editorial text-lg font-bold text-[#20201D]">
                Supprimer ce projet ?
              </h3>
              <p className="text-xs text-[#68655D] leading-relaxed">
                Êtes-vous sûr de vouloir supprimer le projet « {currentProject?.title} » ? Cette action annulera la campagne en cours.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsDeletingProject(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#E4DDCC] bg-white text-[#20201D] font-bold hover:bg-[#FAF7EF] cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteCurrentProject}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer transition-all shadow-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. MODALE D'ÉDITION DU PROFIL                                             */}
      {/* ========================================================================= */}
      {isEditingProfile && (
        <div 
          onClick={() => setIsEditingProfile(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-2xl space-y-4 text-xs text-[#20201D]"
          >
            <div className="flex justify-between items-center border-b border-[#E4DDCC] pb-3">
              <h3 className="font-editorial text-base font-bold text-[#20201D]">
                Modifier mon profil
              </h3>
              <button onClick={() => setIsEditingProfile(false)} className="text-[#8B6845] hover:text-[#20201D] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsEditingProfile(false);
                setShareToast("Profil mis à jour avec succès !");
                setTimeout(() => setShareToast(null), 3000);
              }}
              className="space-y-3"
            >
              <div>
                <label className="font-bold text-[#20201D] block mb-1">Prénom ou nom public :</label>
                <input
                  type="text"
                  required
                  value={userFullName}
                  onChange={(e) => {
                    setUserFullName(e.target.value);
                    setUserName(e.target.value.split(' ')[0]);
                  }}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E4DDCC]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#20201D] block mb-1">Âge :</label>
                  <input
                    type="number"
                    value={userAge}
                    onChange={(e) => setUserAge(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E4DDCC]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#20201D] block mb-1">Territoire / Ville :</label>
                  <input
                    type="text"
                    value={userTerritory}
                    onChange={(e) => setUserTerritory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#E4DDCC]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#20201D] block mb-1">Biographie / Démarche :</label>
                <textarea
                  rows={3}
                  value={userBio}
                  onChange={(e) => setUserBio(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-[#E4DDCC]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0B3B82] text-white font-bold cursor-pointer"
              >
                Enregistrer les modifications
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
