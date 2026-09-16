import React, { useState } from 'react';
import { 
  ArrowLeft, 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Film, 
  Users, 
  ShieldCheck,
  Search,
  Filter,
  Eye
} from 'lucide-react';
import { BACKOFFICE_APPLICATIONS } from '../data/mockData';
import { ViewScreen, BackOfficeApplication } from '../types';

interface EditorialBackOfficeScreenProps {
  onNavigate: (screen: ViewScreen) => void;
}

export const EditorialBackOfficeScreen: React.FC<EditorialBackOfficeScreenProps> = ({ onNavigate }) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const stages = [
    { key: 'ALL', label: 'Toutes (6)' },
    { key: 'NOUVELLES', label: '1. Nouvelles (1)' },
    { key: 'CONTROLE_TECHNIQUE', label: '2. Contrôle Tech (1)' },
    { key: 'AVIS_FORET', label: '3. Avis Forêt (1)' },
    { key: 'COMITE', label: '4. Comité (1)' },
    { key: 'REVISIONS', label: '5. Révisions (1)' },
    { key: 'APPROUVEES', label: '6. Approuvées (1)' },
    { key: 'PUBLIEES', label: '7. Publiées' }
  ];

  const filteredApps = BACKOFFICE_APPLICATIONS.filter(app => {
    const matchesStatus = filterStatus === 'ALL' || app.status === filterStatus;
    const matchesSearch = app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.documentaryTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.territory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Nav & Back */}
      <div className="flex items-center justify-between border-b border-[#E4DDCC] pb-4">
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="text-xs font-semibold text-[#8B6845] hover:text-[#20201D] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la forêt</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate({ type: 'review_system' })}
            className="px-3 py-1.5 rounded-lg bg-[#FFFDF8] border border-[#E4DDCC] text-xs font-medium text-[#20201D] hover:bg-[#F5F1E8]"
          >
            Vue Avis de la forêt (Pairs)
          </button>
          <button
            onClick={() => onNavigate({ type: 'site_map' })}
            className="px-3 py-1.5 rounded-lg bg-[#C89B3C] text-white text-xs font-semibold hover:bg-[#B78A2E]"
          >
            Plan des 12 Écrans
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 sm:p-8 shadow-card space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/12 text-[#8B6845] text-xs font-semibold">
          <LayoutDashboard className="w-3.5 h-3.5" />
          Back-Office Éditorial & Comité de Sélection (Section 28)
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-[#20201D]">
          Pipeline des Histoires en 7 Étapes
        </h1>

        <p className="text-xs sm:text-sm text-[#68655D] max-w-2xl leading-relaxed">
          Suivi rigoureux du processus d'intégration d'une parole au corpus de YonyWood, du dépôt initial jusqu'à la mise en ligne du duo documentaire.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {stages.map(s => (
            <button
              key={s.key}
              onClick={() => setFilterStatus(s.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterStatus === s.key
                  ? 'bg-[#20201D] text-white shadow-xs'
                  : 'bg-[#FFFDF8] text-[#68655D] hover:bg-[#E4DDCC] border border-[#E4DDCC]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 text-[#8B6845] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher candidat, territoire..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FFFDF8] border border-[#E4DDCC] text-xs focus:outline-none focus:border-[#C89B3C]"
          />
        </div>
      </div>

      {/* Applications Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-card hover:shadow-float transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              
              <div className="flex items-center justify-between border-b border-[#E4DDCC]/60 pb-3">
                <span className="text-[10px] font-mono font-bold text-[#8B6845]">
                  {app.id}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  app.status === 'APPROUVEES' 
                    ? 'bg-green-100 text-green-800'
                    : app.status === 'REVISIONS'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                }`}>
                  {app.status.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={app.candidatePhoto}
                  alt={app.candidateName}
                  className="w-12 h-12 rounded-xl object-cover border border-[#C89B3C]"
                />
                <div>
                  <h3 className="font-editorial font-bold text-base text-[#20201D]">
                    {app.candidateName}
                  </h3>
                  <p className="text-xs text-[#8B6845]">{app.territory}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F5F1E8] text-xs space-y-1">
                <div className="flex items-center justify-between font-medium">
                  <span className="text-[#20201D]">{app.documentaryTitle}</span>
                  <span className="text-[#8B6845]">{app.universeGroup}</span>
                </div>
                <div className="text-[11px] text-[#68655D] flex items-center justify-between pt-1 border-t border-[#E4DDCC]/50">
                  <span>Durée : {app.videoDuration}</span>
                  <span>Dépôt : {app.submittedDate}</span>
                </div>
              </div>

              <div className="text-[11px] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#68655D]">Contrôle technique :</span>
                  <span className={`font-semibold ${
                    app.technicalStatus === 'VALIDE' ? 'text-green-700' : 'text-amber-700'
                  }`}>
                    {app.technicalStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#68655D]">Assigné à :</span>
                  <span className="font-medium text-[#20201D]">{app.assignedReviewer}</span>
                </div>
              </div>

            </div>

            <div className="pt-3 border-t border-[#E4DDCC]/60 flex items-center justify-between gap-2">
              <button
                onClick={() => onNavigate({ type: 'review_system' })}
                className="flex-1 py-2 rounded-xl bg-[#F5F1E8] hover:bg-[#E4DDCC] text-xs font-semibold text-[#20201D] transition-colors"
              >
                Examiner dossier
              </button>
              <button
                onClick={() => onNavigate({ type: 'documentary_detail', documentaryId: app.documentaryId })}
                className="p-2 rounded-xl border border-[#E4DDCC] hover:bg-[#F5F1E8] text-[#8B6845]"
                title="Voir la série associée"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
