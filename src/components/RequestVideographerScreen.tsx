import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Camera, 
  MapPin, 
  Check, 
  Star, 
  Calendar, 
  MessageSquare, 
  Sparkles,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { VIDEOGRAPHERS } from '../data/mockData';
import { ViewScreen, Videographer } from '../types';

interface RequestVideographerScreenProps {
  onNavigate: (screen: ViewScreen) => void;
}

export const RequestVideographerScreen: React.FC<RequestVideographerScreenProps> = ({ onNavigate }) => {
  const [selectedTerritory, setSelectedTerritory] = useState<string>('ALL');
  const [bookedVideographer, setBookedVideographer] = useState<Videographer | null>(null);

  const territories = ['ALL', 'Bénin', 'Pérou', 'Sénégal', 'France'];

  const filteredVideographers = selectedTerritory === 'ALL'
    ? VIDEOGRAPHERS
    : VIDEOGRAPHERS.filter(v => v.territory.toLowerCase().includes(selectedTerritory.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back button */}
      <button
        onClick={() => onNavigate({ type: 'submit_story' })}
        className="text-xs font-semibold text-[#8B6845] hover:text-[#20201D] flex items-center gap-1.5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour au parcours de contribution</span>
      </button>

      {/* Header Banner */}
      <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 sm:p-8 shadow-card space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/12 text-[#8B6845] text-xs font-semibold">
          <Camera className="w-3.5 h-3.5" />
          Réseau des Artisans de l'Image YonyWood
        </div>
        
        <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-[#20201D]">
          Demander un vidéaste sur votre territoire
        </h1>

        <p className="text-xs sm:text-sm text-[#68655D] leading-relaxed max-w-xl mx-auto">
          Vous portez une histoire vraie mais vous n'avez pas de matériel de tournage ? 
          Les vidéastes référencés de YonyWood respectent notre charte de regard : lumière naturelle, son clair, écoute bienveillante.
        </p>

        {/* Charte reassurance tags */}
        <div className="pt-2 flex flex-wrap justify-center gap-2 text-[11px] font-medium text-[#8B6845]">
          <span className="px-3 py-1 rounded-lg bg-[#F5F1E8] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#C89B3C]" /> Charte éthique signée
          </span>
          <span className="px-3 py-1 rounded-lg bg-[#F5F1E8] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#C89B3C]" /> Prise de son documentaire binaurale
          </span>
          <span className="px-3 py-1 rounded-lg bg-[#F5F1E8] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#C89B3C]" /> Accompagnement bienveillant
          </span>
        </div>
      </div>

      {/* Territory Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-[#68655D] mr-2">Filtrer par territoire :</span>
        {territories.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTerritory(t)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedTerritory === t
                ? 'bg-[#C89B3C] text-white shadow-xs'
                : 'bg-[#FFFDF8] text-[#68655D] hover:bg-[#E4DDCC] border border-[#E4DDCC]'
            }`}
          >
            {t === 'ALL' ? 'Tous les territoires' : t}
          </button>
        ))}
      </div>

      {/* Videographers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideographers.map((v) => (
          <div
            key={v.id}
            className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 shadow-card hover:shadow-float transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <img
                  src={v.photoUrl}
                  alt={v.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#C89B3C]"
                />
                <div className="space-y-0.5">
                  <h3 className="font-editorial font-bold text-lg text-[#20201D]">
                    {v.name}
                  </h3>
                  <p className="text-xs text-[#8B6845] font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {v.territory}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-amber-700 font-semibold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{v.rating}</span>
                    <span className="text-[#68655D]">({v.storiesShot} tournages YonyWood)</span>
                  </div>
                </div>
              </div>

              {/* Bio & Philosophy */}
              <p className="text-xs text-[#68655D] leading-relaxed">
                {v.bio}
              </p>

              {/* Technical Gear */}
              <div className="p-3 rounded-xl bg-[#F5F1E8] border border-[#E4DDCC] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6845] block">
                  Matériel documentaire certifié :
                </span>
                <p className="text-xs text-[#20201D] font-mono">
                  {v.equipment}
                </p>
              </div>

              {/* Price & Availability */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-bold text-[#20201D]">{v.rate}</span>
                <span className="text-[#8B6845] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {v.availability}
                </span>
              </div>

            </div>

            {/* Actions */}
            <div className="pt-2">
              <button
                onClick={() => setBookedVideographer(v)}
                className="w-full py-3 rounded-xl bg-[#C89B3C] hover:bg-[#B78A2E] text-white text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Réserver une séance avec {v.name.split(' ')[0]}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Booking Modal Confirmation */}
      {bookedVideographer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-[#C89B3C]/20 text-[#8B6845] flex items-center justify-center mx-auto">
              <Camera className="w-6 h-6" />
            </div>

            <h3 className="font-editorial text-2xl font-bold text-center text-[#20201D]">
              Demande de tournage envoyée à {bookedVideographer.name}
            </h3>

            <p className="text-xs text-[#68655D] text-center leading-relaxed">
              Le vidéaste va recevoir vos coordonnées et les grandes lignes de vos réponses aux 5 questions. Il prendra contact sous 48h pour fixer le lieu et l'heure en lumière naturelle.
            </p>

            <div className="p-4 rounded-xl bg-[#F5F1E8] border border-[#E4DDCC] text-xs text-[#20201D] space-y-1">
              <div><strong>Lieu :</strong> {bookedVideographer.territory}</div>
              <div><strong>Tarif estimé :</strong> {bookedVideographer.rate}</div>
              <div><strong>Statut :</strong> Notification transmise</div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setBookedVideographer(null);
                  onNavigate({ type: 'my_forest' });
                }}
                className="w-full py-3 rounded-xl bg-[#C89B3C] text-white text-xs font-semibold hover:bg-[#B78A2E]"
              >
                Voir dans Ma Forêt
              </button>
              <button
                onClick={() => setBookedVideographer(null)}
                className="w-full py-2.5 rounded-xl border border-[#E4DDCC] text-xs font-semibold text-[#68655D]"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
