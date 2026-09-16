import React from 'react';
import { 
  Compass, 
  Film, 
  Users, 
  Play, 
  TreePine, 
  Sparkles, 
  Link2, 
  FolderGit2, 
  Camera, 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  BookOpen,
  Eye
} from 'lucide-react';
import { ViewScreen } from '../types';
import { DOCUMENTARIES, PROTAGONISTS, DUOS } from '../data/mockData';

interface NavigationScreenProps {
  onNavigate: (screen: ViewScreen) => void;
}

export const NavigationScreen: React.FC<NavigationScreenProps> = ({ onNavigate }) => {
  const screensList = [
    {
      id: '01',
      title: 'Accueil & Onboarding',
      desc: "L'introduction pédagogique en 3 étapes, le mantra « Des histoires qui nous relient » et les 4 séries fondatrices.",
      target: { type: 'home' } as ViewScreen,
      icon: TreePine,
      level: 'Niveau 1 (La Forêt)'
    },
    {
      id: '02',
      title: 'Flux Continu des Duos (Swipeable)',
      desc: 'Découverte aléatoire ou filtrée par télécommande, présentation en miroir, question en majesté et accès direct aux univers.',
      target: { type: 'duo_feed' } as ViewScreen,
      icon: Compass,
      level: 'Niveau 2 (L’Écho des Duos)'
    },
    {
      id: '03',
      title: 'Les Séries Documentaires',
      desc: 'Les 4 séries éditoriales : RÉVÉLATION × TRADITION, FINAGNON × QOSQORICO, BLACKS ONE × BEYOND EVE, DIXEAT × FIAT LUXE.',
      target: { type: 'documentaries' } as ViewScreen,
      icon: Film,
      level: 'Niveau 1 (La Forêt)'
    },
    {
      id: '03',
      title: "Page d'un Duocumentaire",
      desc: 'La série en détail : 2 univers, question centrale, les 5 questions obligatoires, clairières disponibles et protagonistes.',
      target: { type: 'documentary_detail', documentaryId: DOCUMENTARIES[0].id } as ViewScreen,
      icon: BookOpen,
      level: 'Niveau 1 à 2'
    },
    {
      id: '04',
      title: "Page d'un Duo (La Clairière)",
      desc: 'Rencontre de deux visages autour d’une même question, extraits de paroles en résonance, ambiance dorée et chaleureuse.',
      target: { type: 'duo_detail', duoId: DUOS[0].id } as ViewScreen,
      icon: Compass,
      level: 'Niveau 2 (Les Clairières)'
    },
    {
      id: '05',
      title: 'Lecteur Vidéo / Immersion',
      desc: 'Ambiance sombre (#0E0D0B), cinématographique, centrée sur le regard, sous-titres, contrôle fluide et générique complet.',
      target: {
        type: 'video_player',
        story: PROTAGONISTS[0].stories[0],
        protagonist: PROTAGONISTS[0],
        duoId: DUOS[0].id,
        documentaryTitle: 'RÉVÉLATION × TRADITION'
      } as ViewScreen,
      icon: Play,
      level: "Niveau 3 (L'Immersion)"
    },
    {
      id: '06',
      title: 'Profil Protagoniste / L’Arbre',
      desc: 'Portrait avec aura vivante et 6 branches interactives : Racines, Clairières, Chemins, Fruits, Pousses, Besoins.',
      target: { type: 'protagonist_profile', protagonistId: PROTAGONISTS[0].id } as ViewScreen,
      icon: Users,
      level: 'Niveau 1 (La Forêt)'
    },
    {
      id: '07',
      title: 'Explorer une Transmission',
      desc: 'Navigation non-linéaire de racine en racine : transmission ancestrale ou de mentor reliant deux protagonistes.',
      target: { type: 'transmission_detail', protagonistId: PROTAGONISTS[0].id, transmissionId: 't-1' } as ViewScreen,
      icon: Link2,
      level: 'Niveau 1 à 2'
    },
    {
      id: '08',
      title: 'Ma Forêt (Espace Membre)',
      desc: 'Espace personnel chaleureux : mes histoires, mes duos, mes projets, produits artisanaux, opportunités et candidatures.',
      target: { type: 'my_forest' } as ViewScreen,
      icon: FolderGit2,
      level: 'Niveau 1 (La Forêt)'
    },
    {
      id: '09',
      title: 'Proposer son Histoire',
      desc: 'Parcours en 3 étapes : choix de la série, réponses aux 5 questions, dépôt de vidéo ou demande de tournage.',
      target: { type: 'submit_story' } as ViewScreen,
      icon: Sparkles,
      level: 'Niveau 1 (La Forêt)'
    },
    {
      id: '10',
      title: 'Demander un Vidéaste',
      desc: 'Sélection de vidéastes documentaires sur son territoire (Bénin, Pérou, Sénégal, France), matériel certifié et réservation.',
      target: { type: 'request_videographer' } as ViewScreen,
      icon: Camera,
      level: 'Niveau 1 (La Forêt)'
    },
    {
      id: '11',
      title: "L'Avis de la Forêt (Revue)",
      desc: 'Gouvernance collective en 7 étapes : 4 critères (Authenticité, Clarté, Technique, Charte) et vote des pairs.',
      target: { type: 'review_system' } as ViewScreen,
      icon: ShieldCheck,
      level: 'Niveau 1 (La Forêt)'
    },
    {
      id: '12',
      title: 'Navigation & Architecture',
      desc: 'Le plan complet de l’expérience, lexique philosophique YonyWood et synthèse des 3 niveaux d’atmosphère.',
      target: { type: 'site_map' } as ViewScreen,
      icon: Compass,
      level: 'Vue Synoptique'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. HEADER */}
      <div className="border-b border-[#E4DDCC] pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/12 text-[#8B6845] text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          ÉCRAN 12 • PLAN DU PROTOTYPE ET PHILOSOPHIE
        </div>

        <h1 className="font-editorial text-4xl sm:text-5xl font-normal text-[#20201D]">
          L'Architecture Vivante de YonyWood
        </h1>

        <p className="text-[#68655D] text-base sm:text-lg max-w-3xl leading-relaxed">
          Explorez l'intégralité des 12 écrans pensés pour incarner la Forêt sacrée solaire, 
          ainsi que les principes éditoriaux et le lexique fondateur.
        </p>
      </div>

      {/* 2. THE 12 SCREENS GRID */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#20201D]">
            Les 12 Écrans du Prototype
          </h2>
          <span className="text-xs text-[#8B6845] font-semibold">
            12 écrans interactifs connectés
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {screensList.map((s) => {
            const IconComponent = s.icon;
            return (
              <div
                key={s.id}
                onClick={() => onNavigate(s.target)}
                className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-card hover:shadow-float cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-[#C89B3C]/15 text-[#8B6845] flex items-center justify-center font-bold text-xs">
                      {s.id}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#8B6845] bg-[#F5F1E8] px-2.5 py-1 rounded-full">
                      {s.level}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5 text-[#C89B3C] group-hover:scale-110 transition-transform" />
                    <h3 className="font-editorial font-bold text-lg text-[#20201D] group-hover:text-[#C89B3C] transition-colors">
                      {s.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#68655D] leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E4DDCC]/60 flex items-center justify-between text-xs font-semibold text-[#C89B3C]">
                  <span>Ouvrir cet écran</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. LEXIQUE ET VOCABULAIRE FONDATEUR */}
      <section className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-8 shadow-card space-y-6">
        <div className="border-b border-[#E4DDCC]/60 pb-4">
          <span className="text-xs uppercase font-bold tracking-wider text-[#8B6845]">
            Alignement Conceptuel
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#20201D] mt-0.5">
            Le Vocabulaire Sacré de YonyWood
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs leading-relaxed">
          <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#E4DDCC] space-y-1.5">
            <h4 className="font-editorial font-bold text-sm text-[#20201D]">
              🌳 Duocumentaire (et non catégorie)
            </h4>
            <p className="text-[#68655D]">
              Une série éditoriale permanente organisée comme la rencontre féconde de deux mondes ou traditions autour d'une même question.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#E4DDCC] space-y-1.5">
            <h4 className="font-editorial font-bold text-sm text-[#20201D]">
              👤 Protagoniste (et non utilisateur/influenceur)
            </h4>
            <p className="text-[#68655D]">
              L'être humain au centre de son histoire, portant sa vérité d'expérience avec dignité et humilité.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#E4DDCC] space-y-1.5">
            <h4 className="font-editorial font-bold text-sm text-[#20201D]">
              🌿 Transmission (et non recommandation)
            </h4>
            <p className="text-[#68655D]">
              Le savoir vivant reçu d'un ancêtre ou d'un maître, transmis aux générations suivantes pour tisser le fil de la communauté.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#E4DDCC] space-y-1.5">
            <h4 className="font-editorial font-bold text-sm text-[#20201D]">
              🌞 Clairière (et non feed)
            </h4>
            <p className="text-[#68655D]">
              L'espace de rencontre où deux voix se posent face à face, laissant place à la résonance plutôt qu'au flux infini.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#E4DDCC] space-y-1.5">
            <h4 className="font-editorial font-bold text-sm text-[#20201D]">
              🌱 L'Arbre Vivant (et non profil social)
            </h4>
            <p className="text-[#68655D]">
              L'univers complet d'un protagoniste avec ses racines, ses fruits, ses projets en herbe, ses opportunités et ses besoins.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#E4DDCC] space-y-1.5">
            <h4 className="font-editorial font-bold text-sm text-[#20201D]">
              🦅 L'Avis de la Forêt (et non algorithme)
            </h4>
            <p className="text-[#68655D]">
              La revue par les pairs certifiés selon les 4 piliers d'authenticité, clarté, technique et charte éthique.
            </p>
          </div>
        </div>
      </section>

      {/* 4. LES 3 NIVEAUX D'ATMOSPHÈRE */}
      <section className="p-8 rounded-3xl bg-[#F5F1E8] border border-[#E4DDCC] space-y-6">
        <h3 className="font-editorial text-2xl font-bold text-[#20201D]">
          Les Trois Niveaux d'Atmosphère
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E4DDCC] space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#C89B3C]/15 text-[#8B6845] font-bold text-[10px]">
              NIVEAU 1
            </span>
            <h4 className="font-editorial font-bold text-base text-[#20201D]">
              La Forêt (Clair & Vivant)
            </h4>
            <p className="text-xs text-[#68655D] leading-relaxed">
              Palette lin/ivoire (#F5F1E8), lumière du jour naturelle, matières nobles, accueil, listes des séries et profils.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F3E9D2] border border-[#C89B3C]/30 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#C89B3C] text-white font-bold text-[10px]">
              NIVEAU 2
            </span>
            <h4 className="font-editorial font-bold text-base text-[#20201D]">
              Les Clairières (Chaleureux & Narratif)
            </h4>
            <p className="text-xs text-[#20201D] leading-relaxed">
              Fond doré sable (#F3E9D2), mise en scène des duos en dialogue, contrastes affirmés, parole en suspension.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E0D0B] text-white space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px]">
              NIVEAU 3
            </span>
            <h4 className="font-editorial font-bold text-base text-[#D9AF52]">
              L'Immersion (Sombre & Cinéma)
            </h4>
            <p className="text-xs text-[#A8A399] leading-relaxed">
              Fond noir mat (#0E0D0B), concentration exclusive sur le regard et la voix, générique documentaire d'auteur.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
