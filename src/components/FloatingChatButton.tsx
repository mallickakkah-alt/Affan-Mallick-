import React from 'react';
import { MessageSquare, Bot } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingChatButton: React.FC = () => {
  const { 
    isChatOpen, 
    setIsChatOpen, 
    isOwnerMode, 
    unreadVisitorCount, 
    unreadOwnerCount,
    systemConfig 
  } = useStore();

  if (isChatOpen) return null;

  const count = isOwnerMode ? unreadOwnerCount : unreadVisitorCount;

  const themeBg = {
    cyan: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950',
    amber: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
    emerald: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
    blue: 'bg-blue-500 hover:bg-blue-400 text-slate-950',
    purple: 'bg-purple-500 hover:bg-purple-400 text-white'
  }[systemConfig.themeColor];

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={() => setIsChatOpen(true)}
        className={`relative group px-4 py-3 rounded-full shadow-2xl transition-all duration-200 hover:scale-105 flex items-center gap-2.5 font-semibold text-xs border border-white/20 ${
          isOwnerMode 
            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' 
            : themeBg
        }`}
        aria-label="Open Chat with Owner"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950"></span>
        </div>

        <span className="hidden sm:inline">
          {isOwnerMode ? 'Owner Messages' : `Chat with ${systemConfig.ownerName.split(' ')[0]}`}
        </span>

        {count > 0 && (
          <span className="min-w-[18px] h-[18px] px-1 bg-red-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center tabular-nums">
            {count}
          </span>
        )}
      </button>
    </div>
  );
};
