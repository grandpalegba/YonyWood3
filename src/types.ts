export interface QuestionTranslation {
  lang: string;
  label: string;
  prompt: string;
}

export interface QuestionItem {
  number: string;
  title: string;
  prompt: string;
  audioDuration?: string;
  videoAvatarUrl?: string;
  audioVoiceName?: string;
  translations?: QuestionTranslation[];
}

export interface UniverseInfo {
  name: string;
  tagline: string;
  description: string;
  territory: string;
}

export interface StoryCredit {
  role: 'story_owner' | 'director' | 'mentor' | 'camera' | 'sound';
  label: string;
  name: string;
  profileId?: string;
}

export interface ProtagonistStory {
  id: string;
  title: string;
  questionNumber: string;
  questionTitle: string;
  duration: string;
  summary: string;
  videoCoverUrl: string;
  videoDurationSeconds: number;
  credits: StoryCredit[];
}

export interface ProtagonistPasseur {
  id: string;
  name: string;
  role: string;
  country: string;
  photo: string;
}

export interface Protagonist {
  id: string;
  slug: string;
  name: string;
  age?: number;
  role: string;
  territory: string;
  country: string;
  flag: string;
  bio: string;
  photoUrl: string;
  documentaryId: string;
  universeTag: string;
  quote: string;
  tree: {
    passeurs?: ProtagonistPasseur[];
    heritiers?: ProtagonistPasseur[];
    transmissions: {
      id: string;
      title: string;
      ancestorOrMentor: string;
      description: string;
      connectedProtagonistId?: string;
    }[];
    duos: {
      id: string;
      partnerName: string;
      partnerRole: string;
      partnerPhoto: string;
      duoId: string;
      question: string;
    }[];
    opportunities: {
      id: string;
      title: string;
      description: string;
      badge: string;
    }[];
    creations: {
      id: string;
      title: string;
      type: string;
      description: string;
      priceOrDetail?: string;
    }[];
    parcours?: {
      id: string;
      year: string;
      title: string;
      location: string;
      role: string;
      description: string;
      highlight?: string;
      photoUrl?: string;
    }[];
    offers?: {
      id: string;
      title: string;
      type: 'produit' | 'service' | 'atelier' | 'consultation';
      categoryLabel: string;
      pricing: string;
      description: string;
      photoUrl?: string;
      stock?: string;
      origin?: string;
    }[];
    projects: {
      id: string;
      title: string;
      stage: string;
      description: string;
    }[];
    needs: {
      id: string;
      title: string;
      urgency: string;
      description: string;
    }[];
  };
  stories: ProtagonistStory[];
}

export interface ParcoursItem {
  id: string;
  year: string;
  title: string;
  location: string;
  role: string;
  description: string;
  highlight?: string;
  photoUrl?: string;
}

export interface OfferItem {
  id: string;
  title: string;
  type: 'produit' | 'service' | 'atelier' | 'consultation';
  categoryLabel: string;
  pricing: string;
  description: string;
  photoUrl?: string;
  stock?: string;
  origin?: string;
}

export interface Documentary {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  centralQuestion: string;
  description: string;
  shortSynopsis?: string;
  coverImage: string;
  posterUrl?: string;
  teaserVideoUrl?: string;
  teaserDuration?: string;
  universes: [UniverseInfo, UniverseInfo];
  questions: QuestionItem[];
  episodeCount: number;
  protagonistsCount: number;
  territories: string[];
}

export interface Duo {
  id: string;
  slug: string;
  documentaryId: string;
  documentaryTitle: string;
  episodeNumber: string;
  protagonistA: Protagonist;
  protagonistB: Protagonist;
  questionNumber: string;
  questionTitle: string;
  centralQuestion: string;
  quoteA: string;
  quoteB: string;
  coverImage: string;
  storyA: ProtagonistStory;
  storyB: ProtagonistStory;
  editorialReflection: string;
}

export interface Videographer {
  id: string;
  name: string;
  photo?: string;
  photoUrl?: string;
  territory: string;
  country?: string;
  bio: string;
  gear?: string;
  equipment?: string;
  specialties?: string[];
  languages?: string[];
  rateInfo?: string;
  rate?: string;
  availability?: string;
  verified?: boolean;
  completedShoots?: number;
  rating?: number;
  storiesShot?: number;
}

export interface ReviewCandidate {
  id: string;
  candidateName: string;
  candidatePhoto?: string;
  territory: string;
  documentaryTitle: string;
  questionNumber: string;
  questionTitle: string;
  storyTitle: string;
  summary: string;
  duration: string;
  stage: string;
  currentReviewsCount: number;
  requiredReviewsCount: number;
  videoCoverUrl: string;
}

export interface CommunityReviewItem {
  id: string;
  candidateName: string;
  candidatePhoto: string;
  territory: string;
  documentaryTitle: string;
  questionNumber: string;
  questionTitle: string;
  pitch: string;
  videoDuration: string;
  videoThumbnail: string;
  supports: number;
  revisionRequests: number;
  userVoted?: 'SUPPORT' | 'REVISION';
}

export interface BackOfficeApplication {
  id: string;
  candidateName: string;
  candidatePhoto: string;
  territory: string;
  documentaryId: string;
  documentaryTitle: string;
  universeGroup: string;
  status: 'NOUVELLES' | 'CONTROLE_TECHNIQUE' | 'AVIS_FORET' | 'COMITE' | 'REVISIONS' | 'APPROUVEES' | 'PUBLIEES';
  submittedDate: string;
  assignedReviewer: string;
  technicalStatus: 'EN_ATTENTE' | 'VALIDE' | 'REVISION_REQUISE';
  videoDuration: string;
}

export interface AffiliationPerson {
  id: string;
  name: string;
  firstName?: string;
  age: number;
  role: string;
  territory: string;
  country: string;
  flag: string;
  universeTag: string;
  photoUrl: string;
  isPioneer?: boolean;
  badge: 'Première effigie' | 'Invité(e)';
  invitationStory: string;
  invitedById?: string;
  invitedByName?: string;
  invitedPeople?: AffiliationPerson[];
  duoPartnerName?: string;
  duoPartnerPhoto?: string;
  duoId?: string;
  episodeQuestion?: string;
  protagonistIdRef?: string;
  teaserVideoUrl?: string;
  teaserPitch?: string;
  generation?: number;
}

export interface SeriesAffiliationTree {
  seriesId: string;
  seriesTitle: string;
  subtitle: string;
  description: string;
  centralQuestion: string;
  totalAffiliatedCount: number;
  generationsCount: number;
  pioneers: AffiliationPerson[];
}

export type ViewScreen = 
  | { type: 'home' }
  | { type: 'duo_feed'; selectedDocId?: string; currentDuoIndex?: number }
  | { type: 'marketplace' }
  | { type: 'documentaries' }
  | { type: 'documentary_detail'; documentaryId: string }
  | { type: 'duo_detail'; duoId: string }
  | { type: 'video_player'; story: ProtagonistStory; protagonist: Protagonist; duoId?: string; documentaryTitle: string }
  | { type: 'protagonist_profile'; protagonistId: string }
  | { type: 'transmission_detail'; protagonistId: string; transmissionId: string }
  | { type: 'my_forest' }
  | { type: 'profile' }
  | { type: 'messaging' }
  | { type: 'submit_story'; preselectedDocumentaryId?: string }
  | { type: 'request_videographer' }
  | { type: 'review_system' }
  | { type: 'forest_reviews' }
  | { type: 'site_map' }
  | { type: 'editorial_backoffice' };
