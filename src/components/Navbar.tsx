import React, { useState } from 'react';
import { 
  TreePine, 
  Film, 
  PlusCircle, 
  Menu,
  X,
  Shuffle,
  Tv
} from 'lucide-react';
import { ViewScreen } from '../types';
import { RemoteControlModal } from './RemoteControlModal';

interface NavbarProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRemoteOpen, setIsRemoteOpen] = useState(false);

  if (currentScreen.type === 'video_player') {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F5F1E8]/90 border-b border-[#E4DDCC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => { onNavigate({ type: 'home' }); setMobileMenuOpen(false); }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
          id="nav-logo"
        >
          <div className="w-7 h-7 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 flex items-center justify-center text-[#C89B3C] group-hover:scale-105 transition-transform">
            <TreePine className="w-3.5 h-3.5" />
          </div>
          <span className="font-editorial text-lg font-bold tracking-tight text-[#20201D]">
            YONYWOOD
          </span>
        </div>

        {/* Essential Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => onNavigate({ type: 'duo_feed' })}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentScreen.type === 'duo_feed'
                ? 'bg-[#C89B3C] text-[#FFFDF8] font-semibold'
                : 'text-[#68655D] hover:text-[#20201D] hover:bg-[#E4DDCC]/40'
            }`}
            id="nav-link-duos-feed"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Duos</span>
          </button>

          <button
            onClick={() => onNavigate({ type: 'documentaries' })}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentScreen.type === 'documentaries' || currentScreen.type === 'documentary_detail'
                ? 'bg-[#E4DDCC]/80 text-[#20201D] font-semibold'
                : 'text-[#68655D] hover:text-[#20201D] hover:bg-[#E4DDCC]/40'
            }`}
            id="nav-link-documentaries"
          >
            <Film className="w-3.5 h-3.5" />
            <span>Séries</span>
          </button>

          <button
            onClick={() => setIsRemoteOpen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-[#68655D] hover:text-[#20201D] hover:bg-[#E4DDCC]/40 transition-all flex items-center gap-1.5"
            id="nav-remote-btn"
          >
            <Tv className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Télécommande</span>
          </button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate({ type: 'submit_story' })}
            className="px-3 py-1.5 rounded-xl bg-[#0B3B82] hover:bg-[#0E4699] text-[#FFFDF8] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            id="nav-proposer-btn"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Proposer</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-xl text-[#68655D] md:hidden hover:bg-[#E4DDCC]/40"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF8] border-b border-[#E4DDCC] px-4 py-3 space-y-1">
          <button
            onClick={() => { onNavigate({ type: 'duo_feed' }); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#8B6845] bg-[#C89B3C]/10 flex items-center gap-2"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#C89B3C]" />
            Duos
          </button>
          <button
            onClick={() => { onNavigate({ type: 'documentaries' }); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#20201D] hover:bg-[#F5F1E8] flex items-center gap-2"
          >
            <Film className="w-3.5 h-3.5" />
            Séries
          </button>
          <button
            onClick={() => { setIsRemoteOpen(true); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#20201D] hover:bg-[#F5F1E8] flex items-center gap-2"
          >
            <Tv className="w-3.5 h-3.5 text-[#C89B3C]" />
            Télécommande
          </button>
        </div>
      )}

      <RemoteControlModal
        isOpen={isRemoteOpen}
        onClose={() => setIsRemoteOpen(false)}
        selectedDocId={null}
        onSelectDoc={(docId) => {
          onNavigate({ type: 'duo_feed', selectedDocId: docId || undefined });
          setMobileMenuOpen(false);
        }}
      />
    </header>
  );
};
