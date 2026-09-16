import React, { useState } from 'react';
import { 
  TreePine, 
  Film, 
  Compass, 
  Bookmark, 
  Clock, 
  PlusCircle, 
  Sparkles, 
  ArrowRight,
  Package,
  Layers,
  Heart,
  FileText,
  UserCheck
} from 'lucide-react';
import { PROTAGONISTS, DUOS, DOCUMENTARIES } from '../data/mockData';
import { ViewScreen } from '../types';

interface MyForestScreenProps {
  onNavigate: (screen: ViewScreen) => void;
}

export const MyForestScreen: React.FC<MyForestScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<
    'HISTOIRES' | 'DUOS' | 'TRANSMISSIONS' | 'PROJETS' | 'PRODUITS' | 'OPPORTUNITES' | 'BESOINS' | 'CANDIDATURES' | 'SAUVEGARDES'
  >('HISTOIRES');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* 1. WELCOME HEADER */}
      <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/12 text-[#8B6845] text-xs font-semibold">
            <TreePine className="w-3.5 h-3.5" />
            Espace Membre • Ma Forêt Personnelle
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-[#20201D]">
            Bienvenue dans votre clairière, Roméo.
          </h1>
          <p className="text-sm text-[#68655D] max-w-xl leading-relaxed">
            Retrouvez ici vos histoires partagées, vos duos en cours de résonance, vos transmissions reçues et données, ainsi que vos sauvegardes d'exploration.
          </p>
        </div>

        {/* Action button: Contribuer */}
        <button
          onClick={() => onNavigate({ type: 'submit_story' })}
          className="px-5 py-3 rounded-xl bg-[#C89B3C] hover:bg-[#B78A2E] text-white font-medium text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Proposer une nouvelle histoire</span>
        </button>

      </div>

      {/* 2. TABBED SECTIONS NAVIGATION */}
      <div className="border-b border-[#E4DDCC] overflow-x-auto">
        <div className="flex gap-2 pb-3 min-w-max">
          {[
            { key: 'HISTOIRES', label: '🎬 Mes Histoires', count: 1 },
            { key: 'DUOS', label: '🌞 Mes Duos', count: 1 },
            { key: 'TRANSMISSIONS', label: '🌿 Mes Transmissions', count: 2 },
            { key: 'PROJETS', label: '🌱 Mes Projets', count: 1 },
            { key: 'PRODUITS', label: '🥭 Produits & Services', count: 2 },
            { key: 'OPPORTUNITES', label: '🛤️ Mes Opportunités', count: 1 },
            { key: 'BESOINS', label: '🌾 Mes Besoins', count: 1 },
            { key: 'CANDIDATURES', label: '📑 Mes Candidatures', count: 1 },
            { key: 'SAUVEGARDES', label: '🤍 Mes Sauvegardes', count: 3 }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === tab.key
                  ? 'bg-[#20201D] text-white shadow-xs'
                  : 'bg-[#FFFDF8] text-[#68655D] hover:bg-[#E4DDCC]/50 border border-[#E4DDCC]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-[#E4DDCC] text-[#20201D]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. TAB CONTENTS */}
      <div className="space-y-6">
        
        {/* TAB 1: MES HISTOIRES */}
        {activeTab === 'HISTOIRES' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-bold">
                  PUBLIÉE & INTÉGRÉE AU CORPUS
                </span>
                <span className="text-xs text-[#68655D]">RÉVÉLATION × TRADITION</span>
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#20201D]">
                « La poignée de terre d'Allada »
              </h3>
              <p className="text-xs text-[#68655D] leading-relaxed">
                Réponse à la Question 01 (La Rencontre). Filmée en lumière naturelle à l'aube d'Allada.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#E4DDCC]/60 text-xs">
                <span className="text-[#8B6845]">Durée : 11:42</span>
                <button
                  onClick={() => onNavigate({
                    type: 'video_player',
                    story: PROTAGONISTS[0].stories[0],
                    protagonist: PROTAGONISTS[0],
                    documentaryTitle: 'RÉVÉLATION × TRADITION'
                  })}
                  className="text-[#C89B3C] font-semibold hover:underline"
                >
                  Visionner l'histoire →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MES DUOS */}
        {activeTab === 'DUOS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between text-xs text-[#8B6845]">
                <span className="font-bold">CLAIRIÈRE ACTIVE</span>
                <span>ÉPISODE 01</span>
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#20201D]">
                En duo avec Père Matthieu Agonhossou
              </h3>
              <p className="font-editorial italic text-xs text-[#68655D]">
                « Racontez-nous un moment où vous avez réellement rencontré votre foi. »
              </p>
              <button
                onClick={() => onNavigate({ type: 'duo_detail', duoId: 'duo-jesus-legba-01' })}
                className="w-full py-2.5 rounded-xl bg-[#C89B3C] text-white text-xs font-semibold hover:bg-[#B78A2E] transition-colors"
              >
                Ouvrir la clairière du duo
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: MES TRANSMISSIONS */}
        {activeTab === 'TRANSMISSIONS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-card space-y-3">
              <span className="text-[10px] uppercase font-bold text-[#8B6845]">
                Lignée ancestrale reçue
              </span>
              <h3 className="font-editorial text-lg font-bold text-[#20201D]">
                L'onction des carrefours
              </h3>
              <p className="text-xs text-[#68655D]">
                Reçu de Hounnon Kpossou (1918–1996) : l'art d'écouter les pierres levées.
              </p>
              <button
                onClick={() => onNavigate({ type: 'transmission_detail', protagonistId: 'dah-zounon', transmissionId: 't-1' })}
                className="text-xs font-semibold text-[#C89B3C] hover:underline"
              >
                Explorer la lignée →
              </button>
            </div>

            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-card space-y-3">
              <span className="text-[10px] uppercase font-bold text-[#8B6845]">
                Transmission transmise aux jeunes
              </span>
              <h3 className="font-editorial text-lg font-bold text-[#20201D]">
                Les feuilles calmantes de berge
              </h3>
              <p className="text-xs text-[#68655D]">
                Transmission active auprès de 2 apprentis herboristes à Tori.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: MES PROJETS */}
        {activeTab === 'PROJETS' && (
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-card space-y-3 max-w-xl">
            <span className="px-2 py-0.5 rounded-md bg-[#8B6845]/10 text-[10px] font-bold text-[#8B6845]">
              Jeune pousse • En cours
            </span>
            <h3 className="font-editorial text-xl font-bold text-[#20201D]">
              Conservatoire des plantes sacrées d'Allada
            </h3>
            <p className="text-xs text-[#68655D] leading-relaxed">
              Arboretum de 4 hectares pour sauvegarder les essences médicinales du plateau et créer un sentier botanique pédagogique.
            </p>
          </div>
        )}

        {/* TAB 5: PRODUITS & SERVICES */}
        {activeTab === 'PRODUITS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-card space-y-2">
              <span className="text-[10px] font-bold text-[#C89B3C] uppercase">Fruit artisanal</span>
              <h3 className="font-editorial text-lg font-bold text-[#20201D]">
                Huile protectrice de néré et karité
              </h3>
              <p className="text-xs text-[#68655D]">
                Formule ancestrale préparée au solstice d'harmattan pour apaiser la fatigue des marcheurs.
              </p>
            </div>
          </div>
        )}

        {/* TAB 6: OPPORTUNITÉS */}
        {activeTab === 'OPPORTUNITES' && (
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-card space-y-2 max-w-xl">
            <span className="text-[10px] font-bold text-[#8B6845] uppercase">Chemin ouvert aux autres</span>
            <h3 className="font-editorial text-lg font-bold text-[#20201D]">
              Résidence de recherche aux sources d'Allada
            </h3>
            <p className="text-xs text-[#68655D]">
              Accueil de deux étudiants ou cinéastes par an pour étudier la symbolique des carrefours.
            </p>
          </div>
        )}

        {/* TAB 7: BESOINS */}
        {activeTab === 'BESOINS' && (
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-card space-y-2 max-w-xl">
            <span className="text-[10px] font-bold text-amber-700 uppercase">Espace à cultiver</span>
            <h3 className="font-editorial text-lg font-bold text-[#20201D]">
              Archivage sonore et numérisation des chants oraux
            </h3>
            <p className="text-xs text-[#68655D]">
              Recherche d'un ingénieur du son bénévole ou subventionné pour enregistrer 60 heures de récits d'anciens.
            </p>
          </div>
        )}

        {/* TAB 8: MES CANDIDATURES */}
        {activeTab === 'CANDIDATURES' && (
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-card space-y-4 max-w-2xl">
            <div className="flex items-center justify-between border-b border-[#E4DDCC]/60 pb-3">
              <span className="text-xs font-bold text-[#C89B3C]">
                Candidature #CAND-2026-088
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                Étape 3/7 : Avis de la forêt
              </span>
            </div>
            <h3 className="font-editorial text-lg font-bold text-[#20201D]">
              FINAGNON × QOSQORICO — Question 02 (Partir)
            </h3>
            <p className="text-xs text-[#68655D]">
              Votre vidéo a passé le contrôle technique avec succès. Elle est actuellement soumise au regard bienveillant des protagonistes publiés de la forêt.
            </p>
            <div className="w-full bg-[#E4DDCC]/60 h-2 rounded-full overflow-hidden">
              <div className="bg-[#C89B3C] h-full w-3/6 rounded-full" />
            </div>
          </div>
        )}

        {/* TAB 9: MES SAUVEGARDES */}
        {activeTab === 'SAUVEGARDES' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOCUMENTARIES.slice(0, 3).map((doc) => (
              <div 
                key={doc.id}
                onClick={() => onNavigate({ type: 'documentary_detail', documentaryId: doc.id })}
                className="bg-[#FFFDF8] rounded-2xl border border-[#E4DDCC] p-4 cursor-pointer hover:shadow-card transition-all space-y-2"
              >
                <img src={doc.coverImage} alt={doc.title} className="w-full h-32 rounded-xl object-cover" />
                <h4 className="font-editorial font-bold text-sm text-[#20201D]">{doc.title}</h4>
                <p className="text-[11px] text-[#68655D] line-clamp-1">{doc.subtitle}</p>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
