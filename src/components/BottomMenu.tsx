import React from 'react';
import { 
  Compass, 
  Video, 
  Link2, 
  Coins, 
  User,
  Film
} from 'lucide-react';
import { ViewScreen } from '../types';

interface BottomMenuProps {
  currentScreen: ViewScreen;
  onNavigate: (screen: ViewScreen) => void;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ currentScreen, onNavigate }) => {
  // Determine active item
  const isExplorerActive = currentScreen.type === 'home' || currentScreen.type === 'documentaries' || currentScreen.type === 'documentary_detail';
  const isProposeActive = currentScreen.type === 'submit_story' || currentScreen.type === 'request_videographer';
  const isDuosActive = currentScreen.type === 'duo_feed' || currentScreen.type === 'duo_detail';
  const isMarketActive = currentScreen.type === 'marketplace';
  const isProfileActive = currentScreen.type === 'profile' || currentScreen.type === 'my_forest' || currentScreen.type === 'messaging';

  // Do not show menu during fullscreen video player
  if (currentScreen.type === 'video_player') {
    return null;
  }

  const menuItems = [
    {
      id: 'explorer',
      label: 'Explorer',
      icon: Compass,
      isActive: isExplorerActive,
      onClick: () => onNavigate({ type: 'home' }),
      screenId: 'menu-item-explorer'
    },
    {
      id: 'proposer',
      label: 'Proposer',
      icon: Video,
      isActive: isProposeActive,
      onClick: () => onNavigate({ type: 'submit_story' }),
      screenId: 'menu-item-propose'
    },
    {
      id: 'duos',
      label: 'Duos',
      icon: Link2,
      isActive: isDuosActive,
      onClick: () => onNavigate({ type: 'duo_feed' }),
      screenId: 'menu-item-duos'
    },
    {
      id: 'productions',
      label: 'Productions',
      icon: Film,
      isActive: isMarketActive,
      onClick: () => onNavigate({ type: 'marketplace' }),
      screenId: 'menu-item-productions'
    },
    {
      id: 'profil',
      label: 'Profil',
      icon: User,
      isActive: isProfileActive,
      onClick: () => onNavigate({ type: 'profile' }),
      screenId: 'menu-item-profile'
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-3 sm:pb-5 px-3 sm:px-6">
      <nav 
        id="yonywood-main-menu"
        aria-label="Navigation principale"
        className="pointer-events-auto max-w-lg mx-auto bg-[#FFFDF8]/95 backdrop-blur-md border border-[#E4DDCC] rounded-full shadow-2xl shadow-black/10 px-2 py-1.5 flex items-center justify-around"
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              id={item.screenId}
              title={item.label}
              className={`relative flex flex-col items-center justify-center px-3 py-1.5 rounded-full transition-all duration-300 group cursor-pointer ${
                item.isActive
                  ? '-translate-y-1 text-[#20201D]'
                  : 'translate-y-0 text-[#7A756B] hover:text-[#20201D]'
              }`}
            >
              {/* Active illuminated pill background with user-requested blue */}
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  item.isActive 
                    ? 'bg-[#0B3B82] text-[#FFFDF8] shadow-md ring-2 ring-[#0B3B82]/30' 
                    : 'bg-transparent text-current group-hover:bg-[#EAE4D5]/50'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 ${item.isActive ? 'stroke-[2.2] scale-105' : 'stroke-[1.8] group-hover:scale-105'}`} />
              </div>

              {/* Label */}
              <span className={`text-[10px] tracking-tight mt-0.5 transition-all duration-200 ${
                item.isActive 
                  ? 'font-bold text-[#0B3B82]' 
                  : 'font-medium text-[#7A756B]'
              }`}>
                {item.label}
              </span>

              {/* Small subtle active dot indicator */}
              {item.isActive && (
                <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#0B3B82]" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
