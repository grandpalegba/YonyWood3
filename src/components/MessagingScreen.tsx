import React, { useState } from 'react';
import { 
  Send, 
  ArrowLeft
} from 'lucide-react';
import { ViewScreen } from '../types';

interface MessagingScreenProps {
  onNavigate: (screen: ViewScreen) => void;
}

interface MessageThread {
  id: string;
  senderName: string;
  senderRole: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  badge?: string;
  messages: {
    id: string;
    from: 'user' | 'contact';
    text: string;
    timestamp: string;
  }[];
}

export const MessagingScreen: React.FC<MessagingScreenProps> = ({ onNavigate }) => {
  const [threads, setThreads] = useState<MessageThread[]>([
    {
      id: 'thread-1',
      senderName: 'Koffi (Tisserand)',
      senderRole: 'Protagoniste • Bénin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      lastMessage: '« Merci pour votre écoute sur la question du rythme du peigne d’acajou. »',
      time: '11:42',
      unreadCount: 1,
      badge: 'Dialogue ouvert',
      messages: [
        {
          id: 'm-1',
          from: 'contact',
          text: 'Bonjour Amina, j’ai vu que mon duo avec Amara avait fait écho chez vous.',
          timestamp: '11:30'
        },
        {
          id: 'm-2',
          from: 'user',
          text: 'Absolument Koffi, la manière dont vous avez parlé de votre transmission familiale m’a profondément touchée.',
          timestamp: '11:38'
        },
        {
          id: 'm-3',
          from: 'contact',
          text: 'Merci pour votre écoute sur la question du rythme du peigne d’acajou.',
          timestamp: '11:42'
        }
      ]
    },
    {
      id: 'thread-2',
      senderName: 'Comité Yonywood',
      senderRole: 'Validation éditoriale',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      lastMessage: 'Votre proposition de vidéo « Le souffle de la poterie rouge » a été validée.',
      time: 'Hier',
      badge: 'Projet',
      messages: [
        {
          id: 'm-4',
          from: 'contact',
          text: 'Votre proposition de vidéo « Le souffle de la poterie rouge » a été validée.',
          timestamp: 'Hier'
        }
      ]
    },
    {
      id: 'thread-3',
      senderName: 'Sayuri (Laqueuse)',
      senderRole: 'Passeuse • Japon',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      lastMessage: '« La laque demande de la patience, comme chaque rencontre. »',
      time: 'Mar 10',
      messages: [
        {
          id: 'm-5',
          from: 'contact',
          text: 'La laque demande de la patience, comme chaque rencontre.',
          timestamp: 'Mar 10'
        }
      ]
    }
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string>('thread-1');
  const [draftMessage, setDraftMessage] = useState('');
  // For mobile navigation: when true, user is inside the conversation
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setIsMobileChatOpen(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftMessage.trim()) return;

    const newMsg = {
      id: `user-${Date.now()}`,
      from: 'user' as const,
      text: draftMessage.trim(),
      timestamp: 'À l’instant'
    };

    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          lastMessage: draftMessage.trim(),
          time: 'À l’instant',
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));

    setDraftMessage('');
  };

  return (
    <div className="min-h-screen pb-36 pt-4 px-3 sm:px-6 max-w-5xl mx-auto text-[#20201D]">
      
      {/* Header épuré avec bouton Retour vers Profil */}
      <div className="pb-3 border-b border-[#E4DDCC] mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate({ type: 'profile' })}
            className="p-2 rounded-full bg-white hover:bg-[#F5F1E8] border border-[#E4DDCC] text-[#8B6845] hover:text-[#20201D] transition-colors cursor-pointer shadow-xs"
            title="Retour au profil"
            id="btn-back-to-profile"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#20201D]">
            Messagerie
          </h1>
        </div>
      </div>

      {/* Container de messagerie responsive */}
      <div className="bg-[#FFFDF8] rounded-3xl border border-[#E4DDCC] shadow-xs overflow-hidden min-h-[560px] flex flex-col md:grid md:grid-cols-12">
        
        {/* Liste des conversations (affichée sur desktop, ou sur mobile si aucune conversation n'est ouverte) */}
        <div className={`md:col-span-5 border-r border-[#E4DDCC] flex flex-col ${
          isMobileChatOpen ? 'hidden md:flex' : 'flex'
        }`}>
          <div className="p-3.5 border-b border-[#E4DDCC] bg-[#F9F6EE]/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B6845]">
              Discussions
            </span>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-[#E4DDCC]/50">
            {threads.map((thread) => {
              const isSelected = thread.id === activeThreadId;
              return (
                <div
                  key={thread.id}
                  onClick={() => handleSelectThread(thread.id)}
                  className={`p-4 cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected ? 'bg-[#C89B3C]/12' : 'hover:bg-[#F5F1E8]'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={thread.avatar}
                      alt={thread.senderName}
                      className="w-11 h-11 rounded-full object-cover border border-[#C89B3C]/40"
                    />
                    {thread.unreadCount && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C89B3C] text-[9px] font-bold text-[#FFFDF8] flex items-center justify-center">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-editorial text-sm font-bold text-[#20201D] truncate">
                        {thread.senderName}
                      </h4>
                      <span className="text-[10px] text-[#8B6845] shrink-0 font-mono">
                        {thread.time}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#8B6845]">
                      {thread.senderRole}
                    </p>

                    <p className="text-xs text-[#68655D] truncate mt-1">
                      {thread.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vue conversation (affichée sur desktop, ou sur mobile si isMobileChatOpen est vrai) */}
        <div className={`md:col-span-7 flex flex-col justify-between h-full bg-[#FFFDF8] ${
          !isMobileChatOpen ? 'hidden md:flex' : 'flex'
        }`}>
          
          {/* Header de la conversation active avec bouton retour pour mobile */}
          <div className="p-3.5 sm:p-4 border-b border-[#E4DDCC] bg-[#F9F6EE]/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* Bouton retour visible uniquement sur mobile pour revenir à la liste */}
              <button
                onClick={() => setIsMobileChatOpen(false)}
                className="md:hidden p-1.5 -ml-1 text-[#8B6845] hover:text-[#20201D] hover:bg-[#E4DDCC]/50 rounded-full transition-colors"
                title="Retour aux discussions"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <img
                src={activeThread.avatar}
                alt={activeThread.senderName}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-[#C89B3C]/40"
              />
              <div>
                <h3 className="font-editorial text-sm sm:text-base font-bold text-[#20201D]">
                  {activeThread.senderName}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-[#8B6845]">
                  {activeThread.senderRole}
                </p>
              </div>
            </div>

            {activeThread.badge && (
              <span className="text-[9px] uppercase font-bold text-[#8B6845] bg-[#C89B3C]/15 px-2.5 py-0.5 rounded-full">
                {activeThread.badge}
              </span>
            )}
          </div>

          {/* Flux des messages */}
          <div className="p-4 sm:p-6 space-y-3.5 overflow-y-auto flex-1 min-h-[360px] max-h-[460px]">
            {activeThread.messages.map((msg) => {
              const isMe = msg.from === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-md p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isMe
                        ? 'bg-[#0B3B82] text-[#FFFDF8] rounded-br-xs shadow-xs'
                        : 'bg-[#F5F1E8] text-[#20201D] rounded-bl-xs border border-[#E4DDCC]'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-[#8B6845] mt-1 px-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Formulaire de saisie */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-[#E4DDCC] flex items-center gap-2 bg-[#F9F6EE]/30">
            <input
              type="text"
              value={draftMessage}
              onChange={(e) => setDraftMessage(e.target.value)}
              placeholder="Écrire votre message..."
              className="flex-1 bg-[#FFFDF8] border border-[#E4DDCC] rounded-full px-4 py-2 text-xs sm:text-sm text-[#20201D] placeholder-[#9E9B90] outline-none focus:border-[#0B3B82] transition-colors"
            />
            <button
              type="submit"
              disabled={!draftMessage.trim()}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0B3B82] hover:bg-[#0E4699] disabled:opacity-40 text-[#FFFDF8] flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-xs"
              title="Envoyer"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>

        </div>
      </div>

    </div>
  );
};
