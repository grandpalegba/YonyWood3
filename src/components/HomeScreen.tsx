import React, { useState } from 'react';
import { 
  GitFork, 
  Link2, 
  ArrowRight, 
  Play, 
  User, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  Compass, 
  Search, 
  X,
  ExternalLink,
  Users,
  ChevronDown
} from 'lucide-react';
import { DOCUMENTARIES, DUOS, SERIES_AFFILIATION_TREES } from '../data/mockData';
import { ViewScreen, AffiliationPerson, SeriesAffiliationTree } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: ViewScreen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  // Explorer Mode: 'tree' (Arbre de filiation) or 'duos' (Explorer par Duos)
  const [exploreMode, setExploreMode] = useState<'tree' | 'duos'>('tree');

  // Selected Series for the Affiliation Tree
  const [selectedSeriesId, setSelectedSeriesId] = useState<string>('finagnon-qosqorico');

  // Selected Person in tree for detail inspection drawer/modal
  const [inspectedPerson, setInspectedPerson] = useState<AffiliationPerson | null>(null);

  // Duos mode search & filter
  const [duoSeriesFilter, setDuoSeriesFilter] = useState<string>('all');
  const [duoSearchQuery, setDuoSearchQuery] = useState<string>('');

  const currentSeriesTree = SERIES_AFFILIATION_TREES.find(t => t.seriesId === selectedSeriesId) || SERIES_AFFILIATION_TREES[1];
  const currentDocInfo = DOCUMENTARIES.find(d => d.id === selectedSeriesId) || DOCUMENTARIES[1];

  const filteredDuos = DUOS.filter(duo => {
    const matchesSeries = duoSeriesFilter === 'all' || duo.documentaryId === duoSeriesFilter;
    const matchesSearch = duoSearchQuery === '' || 
      duo.protagonistA.name.toLowerCase().includes(duoSearchQuery.toLowerCase()) ||
      duo.protagonistB.name.toLowerCase().includes(duoSearchQuery.toLowerCase()) ||
      duo.centralQuestion.toLowerCase().includes(duoSearchQuery.toLowerCase()) ||
      duo.documentaryTitle.toLowerCase().includes(duoSearchQuery.toLowerCase());
    return matchesSeries && matchesSearch;
  });

  return (
    <div className="min-h-screen text-[#20201D] pb-36 pt-6 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      
      {/* 1. HERO HEADER: EXPLORER YONYWOOD */}
      <header className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#8B6845] text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#C89B3C]" />
              <span>Exploration Vivante</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#20201D] leading-tight">
              Explorer les duocumentaires
            </h1>
            <p className="text-sm sm:text-base text-[#68655D] font-light leading-relaxed">
              Découvrez comment chaque duocumentaire s’est tissé de proche en proche. Parcourez l’arbre de filiation des 4 séries pour voir qui a fait entrer qui, ou écoutez directement les duos en vidéo.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex p-1.5 rounded-2xl bg-[#F0EBE0] border border-[#E4DDCC] self-start md:self-center shadow-inner">
            <button
              onClick={() => setExploreMode('tree')}
              id="btn-explore-mode-tree"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                exploreMode === 'tree'
                  ? 'bg-[#20201D] text-[#FFFDF8] shadow-md'
                  : 'text-[#68655D] hover:text-[#20201D]'
              }`}
            >
              <GitFork className="w-4 h-4 text-[#C89B3C]" />
              <span>Arbre des filiations</span>
            </button>
            <button
              onClick={() => setExploreMode('duos')}
              id="btn-explore-mode-duos"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                exploreMode === 'duos'
                  ? 'bg-[#20201D] text-[#FFFDF8] shadow-md'
                  : 'text-[#68655D] hover:text-[#20201D]'
              }`}
            >
              <Link2 className="w-4 h-4 text-[#C89B3C]" />
              <span>Explorer par Duos</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MODE: ARBRE DES FILIATIONS */}
      {exploreMode === 'tree' && (
        <section className="space-y-8">
          
          {/* Series Tabs: Les 4 Séries */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-[#8B6845]">
                1. Choisissez une série à explorer
              </span>
              <span className="text-xs text-[#7A756B]">
                4 duocumentaires fondateurs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SERIES_AFFILIATION_TREES.map((tree) => {
                const isSelected = tree.seriesId === selectedSeriesId;
                return (
                  <button
                    key={tree.seriesId}
                    onClick={() => setSelectedSeriesId(tree.seriesId)}
                    id={`series-tab-${tree.seriesId}`}
                    className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#20201D] text-[#FFFDF8] border-[#20201D] shadow-md ring-2 ring-[#C89B3C]/50'
                        : 'bg-[#FFFDF8] text-[#20201D] border-[#E4DDCC] hover:border-[#C89B3C]/60 hover:bg-[#FAF7EF]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-[#FFFDF8]/15 text-[#C89B3C]' : 'bg-[#EAE4D5] text-[#8B6845]'
                        }`}>
                          Thème : {tree.centralQuestion}
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-[#C89B3C] animate-pulse"></span>}
                      </div>

                      <h3 className="font-editorial text-lg font-bold leading-tight mt-1">
                        {tree.seriesTitle}
                      </h3>
                    </div>

                    <div className={`pt-2 border-t flex items-center justify-between text-[11px] ${
                      isSelected ? 'border-white/15 text-[#E4DDCC]' : 'border-[#E4DDCC] text-[#7A756B]'
                    }`}>
                      <span>{tree.totalAffiliatedCount} protagonistes</span>
                      <span>{tree.generationsCount} générations</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Series Spotlight & Synopsis */}
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#8B6845] bg-[#C89B3C]/15 px-2.5 py-0.5 rounded-full">
                    Arbre généalogique & d’alliance
                  </span>
                  <span className="text-xs text-[#7A756B]">
                    Question centrale : <strong className="text-[#20201D]">{currentSeriesTree.centralQuestion}</strong>
                  </span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#20201D]">
                  {currentSeriesTree.seriesTitle}
                </h2>
                <p className="font-editorial italic text-[#8B6845] text-sm sm:text-base">
                  {currentSeriesTree.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onNavigate({ type: 'duo_feed', selectedDocId: selectedSeriesId })}
                  id="btn-see-duos-for-series"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#20201D] hover:bg-[#C89B3C] text-[#FFFDF8] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Voir les duos vidéo de cette série</span>
                </button>
              </div>
            </div>

            {/* Synopsis enrichi & explicatif */}
            <div className="p-4 rounded-2xl bg-[#F9F6EE] border border-[#E4DDCC]/70 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B6845]">
                Le synopsis de la proposition
              </span>
              <p className="text-sm text-[#4A4740] font-light leading-relaxed">
                {currentDocInfo.description}
              </p>
            </div>

            {/* Visual Legend */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#68655D]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#C89B3C] ring-2 ring-[#C89B3C]/30"></span>
                <strong>Première effigie</strong> (Pionnier fondateur qui a ouvert la série)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#20201D]"></span>
                <strong>Invité(e)</strong> (Personne cooptée par un protagoniste)
              </span>
              <span className="flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-[#8B6845]" />
                <strong>Duo miroir</strong> (La rencontre filmée)
              </span>
            </div>
          </div>

          {/* THE GENERATION TREE */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-xl font-bold text-[#20201D] flex items-center gap-2">
                <GitFork className="w-5 h-5 text-[#C89B3C]" />
                <span>La toile des cooptations : qui a fait entrer qui</span>
              </h3>
              <span className="text-xs text-[#7A756B]">
                Cliquez sur un profil pour explorer son univers ou écouter son duo
              </span>
            </div>

            {/* The Two Founding Pillars / Universes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {currentSeriesTree.pioneers.map((pioneer, pIdx) => (
                <div 
                  key={pioneer.id}
                  className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-5 sm:p-7 space-y-6 shadow-xs relative"
                >
                  {/* Universe Pillar Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#E4DDCC]">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{pioneer.flag}</span>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B6845]">
                          Pôle {pioneer.universeTag}
                        </span>
                        <h4 className="font-editorial text-lg font-bold text-[#20201D]">
                          Lignée initiée par {pioneer.name}
                        </h4>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#C89B3C]/15 text-[#8B6845] text-xs font-bold">
                      Génération 01 • Racine
                    </span>
                  </div>

                  {/* Level 1: Première Effigie Card */}
                  <div className="relative">
                    <div 
                      onClick={() => setInspectedPerson(pioneer)}
                      className="group cursor-pointer rounded-2xl bg-[#20201D] text-[#FFFDF8] p-5 border border-[#C89B3C]/40 shadow-lg hover:border-[#C89B3C] transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative shrink-0">
                          <img 
                            src={pioneer.photoUrl} 
                            alt={pioneer.name}
                            className="w-16 h-16 rounded-full object-cover ring-4 ring-[#C89B3C]/40 group-hover:ring-[#C89B3C] transition-all"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute -bottom-1 -right-1 bg-[#C89B3C] text-[#20201D] p-1 rounded-full text-[10px] font-bold shadow-xs">
                            👑
                          </span>
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-sans text-base font-bold text-[#FFFDF8] group-hover:text-[#C89B3C] transition-colors">
                              {pioneer.name}
                            </h5>
                            <span className="text-xs font-mono text-[#C89B3C] bg-white/10 px-2 py-0.5 rounded-full">
                              {pioneer.age} ans
                            </span>
                          </div>

                          <p className="text-xs text-[#E4DDCC] font-light">
                            {pioneer.role} • <span className="text-[#C89B3C]">{pioneer.territory}</span>
                          </p>

                          <p className="text-xs text-[#D5CEBE] italic pt-1 leading-relaxed">
                            « {pioneer.invitationStory} »
                          </p>
                        </div>
                      </div>

                      {/* Mirror Duo Pill */}
                      {pioneer.duoPartnerName && (
                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-[#E4DDCC]">
                            <Link2 className="w-3.5 h-3.5 text-[#C89B3C]" />
                            <span>Duo miroir avec <strong>{pioneer.duoPartnerName}</strong></span>
                          </div>
                          <span className="text-[11px] text-[#C89B3C] font-semibold group-hover:underline flex items-center gap-1">
                            Explorer la filiation <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Connector line downwards */}
                    {pioneer.invitedPeople && pioneer.invitedPeople.length > 0 && (
                      <div className="flex flex-col items-center py-3">
                        <div className="w-0.5 h-6 bg-gradient-to-b from-[#C89B3C] to-[#E4DDCC]"></div>
                        <span className="px-3 py-1 rounded-full bg-[#F0EBE0] border border-[#E4DDCC] text-[10px] font-bold text-[#8B6845] uppercase tracking-wider">
                          A fait entrer dans le duocumentaire ({pioneer.invitedPeople.length})
                        </span>
                        <div className="w-0.5 h-6 bg-[#E4DDCC]"></div>
                      </div>
                    )}
                  </div>

                  {/* Level 2: Personnes qu'elle a fait entrer (Génération 2) */}
                  {pioneer.invitedPeople && pioneer.invitedPeople.length > 0 && (
                    <div className="space-y-6">
                      {pioneer.invitedPeople.map((level2Person) => (
                        <div key={level2Person.id} className="space-y-3">
                          
                          {/* Level 2 Card */}
                          <div 
                            onClick={() => setInspectedPerson(level2Person)}
                            className="group cursor-pointer rounded-2xl bg-[#FAF7EF] hover:bg-[#F3EDE2] border border-[#E4DDCC] hover:border-[#C89B3C] p-4.5 transition-all shadow-xs"
                          >
                            <div className="flex items-start gap-3.5">
                              <div className="relative shrink-0">
                                <img 
                                  src={level2Person.photoUrl} 
                                  alt={level2Person.name}
                                  className="w-13 h-13 rounded-full object-cover ring-2 ring-[#C89B3C]/40 group-hover:ring-[#C89B3C] transition-all"
                                  referrerPolicy="no-referrer"
                                />
                                <span className="absolute -bottom-1 -right-1 text-xs">
                                  {level2Person.flag}
                                </span>
                              </div>

                              <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <h6 className="font-sans text-sm font-bold text-[#20201D] group-hover:text-[#8B6845] transition-colors">
                                      {level2Person.name}
                                    </h6>
                                    <span className="text-[11px] font-mono text-[#7A756B]">
                                      ({level2Person.age} ans)
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-semibold bg-[#C89B3C]/15 text-[#8B6845] px-2 py-0.5 rounded-full">
                                    Invité(e)
                                  </span>
                                </div>

                                <p className="text-xs text-[#68655D]">
                                  {level2Person.role} • <span className="font-medium text-[#20201D]">{level2Person.territory}</span>
                                </p>

                                {/* Reason why they were brought in */}
                                <div className="mt-2 p-2.5 rounded-xl bg-[#FFFDF8] border border-[#E4DDCC]/60 text-xs text-[#524E46] leading-relaxed">
                                  <span className="font-bold text-[#8B6845]">Pourquoi {pioneer.name} l'a fait entrer : </span>
                                  {level2Person.invitationStory}
                                </div>
                              </div>
                            </div>

                            {/* Actions on card */}
                            <div className="mt-3 pt-2.5 border-t border-[#E4DDCC]/60 flex items-center justify-between text-xs">
                              <span className="text-[#8B6845] font-medium flex items-center gap-1">
                                <Link2 className="w-3 h-3" />
                                Duo : {level2Person.duoPartnerName}
                              </span>
                              <span className="text-[#20201D] font-semibold text-[11px] group-hover:text-[#C89B3C] flex items-center gap-1">
                                Fiche & filiation <ChevronRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>

                          {/* Level 3: Personnes que Level 2 a fait entrer à son tour */}
                          {level2Person.invitedPeople && level2Person.invitedPeople.length > 0 && (
                            <div className="pl-6 border-l-2 border-dashed border-[#C89B3C]/40 space-y-3 pt-1">
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#8B6845] uppercase tracking-wider">
                                <span>↳ A fait entrer à son tour ({level2Person.invitedPeople.length}) :</span>
                              </div>

                              {level2Person.invitedPeople.map((level3Person) => (
                                <div
                                  key={level3Person.id}
                                  onClick={() => setInspectedPerson(level3Person)}
                                  className="group cursor-pointer rounded-xl bg-[#FFFDF8] hover:bg-[#FAF7EF] border border-[#E4DDCC] hover:border-[#C89B3C] p-3.5 transition-all shadow-2xs"
                                >
                                  <div className="flex items-center gap-3">
                                    <img 
                                      src={level3Person.photoUrl} 
                                      alt={level3Person.name}
                                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E4DDCC] group-hover:ring-[#C89B3C] shrink-0"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                          <h6 className="font-sans text-xs font-bold text-[#20201D] group-hover:text-[#8B6845]">
                                            {level3Person.name}
                                          </h6>
                                          <span className="text-[10px] font-mono text-[#7A756B]">
                                            ({level3Person.age} ans)
                                          </span>
                                        </div>
                                        <span className="text-[10px] text-[#8B6845]">{level3Person.flag}</span>
                                      </div>
                                      <p className="text-[11px] text-[#68655D] truncate">
                                        {level3Person.role} • {level3Person.territory}
                                      </p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-[#7A756B] group-hover:text-[#20201D] shrink-0" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>

        </section>
      )}

      {/* 3. MODE: EXPLORER PAR DUOS */}
      {exploreMode === 'duos' && (
        <section className="space-y-6">
          
          {/* Filters Bar */}
          <div className="bg-[#FFFDF8] rounded-2xl border border-[#E4DDCC] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#7A756B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={duoSearchQuery}
                onChange={(e) => setDuoSearchQuery(e.target.value)}
                placeholder="Rechercher un protagoniste, une question, une ville..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF7EF] border border-[#E4DDCC] text-xs sm:text-sm focus:outline-hidden focus:border-[#C89B3C]"
              />
              {duoSearchQuery && (
                <button 
                  onClick={() => setDuoSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A756B] hover:text-[#20201D]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Series Filter dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#7A756B] whitespace-nowrap">Série :</span>
              <select
                value={duoSeriesFilter}
                onChange={(e) => setDuoSeriesFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#FAF7EF] border border-[#E4DDCC] text-xs font-medium focus:outline-hidden focus:border-[#C89B3C]"
              >
                <option value="all">Toutes les 4 séries ({DUOS.length} duos)</option>
                {DOCUMENTARIES.map(doc => (
                  <option key={doc.id} value={doc.id}>{doc.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Duos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDuos.map((duo) => (
              <div
                key={duo.id}
                id={`duo-explore-card-${duo.id}`}
                className="group rounded-3xl bg-[#FFFDF8] border border-[#E4DDCC] hover:border-[#C89B3C] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#E4DDCC]/70 pb-3">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#8B6845]">
                    {duo.documentaryTitle}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#20201D] bg-[#F0EBE0] px-2.5 py-0.5 rounded-full">
                    {duo.episodeNumber}
                  </span>
                </div>

                {/* Mirror Protagonists Face-to-Face */}
                <div className="flex items-center justify-around py-2">
                  {/* Protagonist A */}
                  <div className="flex flex-col items-center text-center space-y-1.5 flex-1">
                    <img 
                      src={duo.protagonistA.photoUrl} 
                      alt={duo.protagonistA.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-[#E4DDCC] group-hover:ring-[#C89B3C] transition-all"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-sans text-sm font-bold text-[#20201D]">
                        {duo.protagonistA.name}
                      </h4>
                      <p className="text-[11px] text-[#7A756B] font-mono">
                        {duo.protagonistA.age ? `${duo.protagonistA.age} ans` : ''} • {duo.protagonistA.territory}
                      </p>
                    </div>
                  </div>

                  {/* Golden Link Symbol */}
                  <div className="px-3 shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#F0EBE0] border border-[#C89B3C]/40 flex items-center justify-center text-[#8B6845] group-hover:bg-[#20201D] group-hover:text-[#C89B3C] transition-all shadow-xs">
                      <Link2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#8B6845] mt-1">Miroir</span>
                  </div>

                  {/* Protagonist B */}
                  <div className="flex flex-col items-center text-center space-y-1.5 flex-1">
                    <img 
                      src={duo.protagonistB.photoUrl} 
                      alt={duo.protagonistB.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-[#E4DDCC] group-hover:ring-[#C89B3C] transition-all"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-sans text-sm font-bold text-[#20201D]">
                        {duo.protagonistB.name}
                      </h4>
                      <p className="text-[11px] text-[#7A756B] font-mono">
                        {duo.protagonistB.age ? `${duo.protagonistB.age} ans` : ''} • {duo.protagonistB.territory}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Central Question */}
                <div className="p-3.5 rounded-2xl bg-[#F9F6EE] border border-[#E4DDCC]/70 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B6845]">
                    Question posée au duo
                  </span>
                  <p className="font-editorial text-sm font-bold text-[#20201D] leading-snug">
                    {duo.centralQuestion}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onNavigate({ 
                      type: 'video_player', 
                      story: duo.storyA, 
                      protagonist: duo.protagonistA, 
                      duoId: duo.id, 
                      documentaryTitle: duo.documentaryTitle 
                    })}
                    id={`btn-watch-duo-${duo.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#20201D] hover:bg-[#C89B3C] text-[#FFFDF8] text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Lancer le duo vidéo</span>
                  </button>

                  <button
                    onClick={() => onNavigate({ 
                      type: 'protagonist_profile', 
                      protagonistId: duo.protagonistA.id 
                    })}
                    title="Voir l'univers de ce protagoniste"
                    className="p-2.5 rounded-xl bg-[#F0EBE0] hover:bg-[#EAE4D5] text-[#20201D] transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </section>
      )}

      {/* 4. MODAL INSPECTEUR D'AFFILIATION */}
      {inspectedPerson && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setInspectedPerson(null)}
        >
          <div 
            className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={inspectedPerson.photoUrl} 
                  alt={inspectedPerson.name}
                  className="w-16 h-16 rounded-full object-cover ring-3 ring-[#C89B3C]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-sans text-lg font-bold text-[#20201D]">
                      {inspectedPerson.name}
                    </h4>
                    <span className="text-xs font-mono font-semibold text-[#8B6845] bg-[#C89B3C]/15 px-2 py-0.5 rounded-full">
                      {inspectedPerson.age} ans
                    </span>
                    <span className="text-base">{inspectedPerson.flag}</span>
                  </div>
                  <p className="text-xs text-[#68655D]">
                    {inspectedPerson.role} • <span className="font-medium text-[#20201D]">{inspectedPerson.territory}</span>
                  </p>
                  <span className={`inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    inspectedPerson.badge === 'Première effigie'
                      ? 'bg-[#20201D] text-[#C89B3C]'
                      : 'bg-[#EAE4D5] text-[#8B6845]'
                  }`}>
                    {inspectedPerson.badge}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setInspectedPerson(null)}
                className="p-1.5 rounded-full text-[#7A756B] hover:text-[#20201D] hover:bg-[#F0EBE0] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filiation Details */}
            <div className="space-y-3 pt-2 border-t border-[#E4DDCC]">
              {inspectedPerson.invitedByName && (
                <div className="p-3 rounded-xl bg-[#F0EBE0] text-xs text-[#524E46] flex items-center gap-2">
                  <GitFork className="w-4 h-4 text-[#8B6845] shrink-0" />
                  <span>
                    Fait entrer dans la série par : <strong>{inspectedPerson.invitedByName}</strong>
                  </span>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-[#F9F6EE] border border-[#E4DDCC]/70 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B6845]">
                  Histoire de son entrée dans le duocumentaire
                </span>
                <p className="text-xs sm:text-sm text-[#4A4740] font-light leading-relaxed">
                  « {inspectedPerson.invitationStory} »
                </p>
              </div>

              {/* Duo Partner Connection */}
              {inspectedPerson.duoPartnerName && (
                <div className="p-3.5 rounded-2xl bg-[#FFFDF8] border border-[#E4DDCC] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#8B6845] font-bold">
                    <Link2 className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>Duo miroir avec {inspectedPerson.duoPartnerName}</span>
                  </div>
                  {inspectedPerson.episodeQuestion && (
                    <p className="text-xs text-[#68655D] italic">
                      « {inspectedPerson.episodeQuestion} »
                    </p>
                  )}
                </div>
              )}

              {/* Filleuls qu'il/elle a fait entrer */}
              {inspectedPerson.invitedPeople && inspectedPerson.invitedPeople.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B6845]">
                    Personnes qu'elle/il a fait entrer à son tour ({inspectedPerson.invitedPeople.length}) :
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {inspectedPerson.invitedPeople.map(p => (
                      <span key={p.id} className="text-xs px-2.5 py-1 rounded-full bg-[#F0EBE0] text-[#20201D] font-medium flex items-center gap-1">
                        <span>{p.flag}</span>
                        <span>{p.name}</span>
                        <span className="text-[#7A756B]">({p.age} ans)</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions in Modal */}
            <div className="pt-3 border-t border-[#E4DDCC] flex items-center gap-3">
              {inspectedPerson.duoId && (
                <button
                  onClick={() => {
                    const foundDuo = DUOS.find(d => d.id === inspectedPerson.duoId) || DUOS[0];
                    setInspectedPerson(null);
                    onNavigate({
                      type: 'video_player',
                      story: foundDuo.storyA,
                      protagonist: foundDuo.protagonistA,
                      duoId: foundDuo.id,
                      documentaryTitle: foundDuo.documentaryTitle
                    });
                  }}
                  id="btn-modal-watch-duo"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#20201D] hover:bg-[#C89B3C] text-[#FFFDF8] text-xs font-semibold transition-colors cursor-pointer shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Écouter le Duo en vidéo {'< >'}</span>
                </button>
              )}

              <button
                onClick={() => {
                  const targetId = inspectedPerson.protagonistIdRef || 'koffi-tisserand';
                  setInspectedPerson(null);
                  onNavigate({
                    type: 'protagonist_profile',
                    protagonistId: targetId
                  });
                }}
                id="btn-modal-view-universe"
                className="px-5 py-3 rounded-full bg-[#F0EBE0] hover:bg-[#EAE4D5] text-[#20201D] text-xs font-semibold transition-colors cursor-pointer"
              >
                Explorer son univers
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
