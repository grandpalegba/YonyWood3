import React from 'react';
import { Sparkles, Sliders, Check, RotateCcw, X, Tv } from 'lucide-react';
import { DOCUMENTARIES } from '../data/mockData';

interface RemoteControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDocId: string | null; // null means "all series (random feed)"
  onSelectDoc: (docId: string | null) => void;
}

export const RemoteControlModal: React.FC<RemoteControlModalProps> = ({
  isOpen,
  onClose,
  selectedDocId,
  onSelectDoc,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#20201D]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#FFFDF8] rounded-3xl border border-[#C89B3C]/30 shadow-2xl overflow-hidden text-[#20201D]"
        id="remote-control-panel"
      >
        {/* Header styling evoking an artisanal optical selector / remote */}
        <div className="p-6 bg-radial from-[#F9F5EC] to-[#F1EADA] border-b border-[#E4DDCC] relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#E4DDCC]/50 text-[#68655D] transition-colors"
            title="Fermer la télécommande"
            id="close-remote-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C89B3C] flex items-center justify-center text-[#FFFDF8] shadow-sm">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-normal text-[#20201D]">
                Télécommande des Séries
              </h3>
            </div>
          </div>
          <p className="mt-2 text-xs text-[#68655D] leading-relaxed">
            Zappez entre les univers ou laissez le hasard relier les protagonistes à votre écoute.
          </p>
        </div>

        {/* Series channels options */}
        <div className="p-5 space-y-2.5 max-h-[60vh] overflow-y-auto">
          {/* Channel 0: All Series / Random mode */}
          <button
            onClick={() => {
              onSelectDoc(null);
              onClose();
            }}
            id="remote-channel-all"
            className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
              selectedDocId === null
                ? 'bg-[#C89B3C]/10 border-[#C89B3C] shadow-xs'
                : 'bg-[#FFFDF8] hover:bg-[#F5F1E8] border-[#E4DDCC]'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                selectedDocId === null ? 'bg-[#C89B3C] text-[#FFFDF8]' : 'bg-[#E4DDCC] text-[#68655D]'
              }`}>
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <p className="font-editorial text-base text-[#20201D] font-medium">
                  Tous
                </p>
              </div>
            </div>
            {selectedDocId === null && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B6845] bg-[#C89B3C]/15 px-2.5 py-1 rounded-full">
                <Check className="w-3.5 h-3.5" /> Actif
              </span>
            )}
          </button>

          {/* Series channels */}
          {DOCUMENTARIES.map((doc, idx) => {
            const isSelected = selectedDocId === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => {
                  onSelectDoc(doc.id);
                  onClose();
                }}
                id={`remote-channel-${doc.id}`}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-[#C89B3C]/10 border-[#C89B3C] shadow-xs'
                    : 'bg-[#FFFDF8] hover:bg-[#F5F1E8] border-[#E4DDCC]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold font-mono transition-colors ${
                    isSelected ? 'bg-[#C89B3C] text-[#FFFDF8]' : 'bg-[#E4DDCC] text-[#68655D]'
                  }`}>
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-editorial text-base text-[#20201D] font-medium">
                        {doc.title}
                      </p>
                    </div>
                    <p className="text-xs text-[#8B6845] font-medium">
                      Focus : {doc.centralQuestion}
                    </p>
                  </div>
                </div>
                {isSelected ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B6845] bg-[#C89B3C]/15 px-2.5 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5" /> Actif
                  </span>
                ) : (
                  <span className="text-xs text-[#9E9B90] opacity-0 group-hover:opacity-100 transition-opacity">
                    Zapper →
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#F5F1E8] border-t border-[#E4DDCC] flex items-center justify-end text-xs text-[#68655D]">
          <button 
            onClick={onClose}
            className="text-[#8B6845] hover:text-[#20201D] font-medium underline underline-offset-2 cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
