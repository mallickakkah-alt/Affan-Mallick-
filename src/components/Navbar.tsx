import React from 'react';
import { ShoppingCart, MessageSquare, Shield, Sliders, Package } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { AppIcon } from './AppIcon';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  onSelectCategory?: (category: string) => void;
  onOpenPlayStoreInfo: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onSelectCategory, 
  onOpenPlayStoreInfo,
  onOpenProfile 
}) => {
  const { 
    systemConfig, 
    cartCount, 
    setIsCartOpen, 
    setIsChatOpen, 
    unreadVisitorCount,
    unreadOwnerCount,
    isOwnerMode,
    setIsConfigModalOpen,
    toggleOwnerMode
  } = useStore();

  const handleNavClick = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const themeBorder = {
    cyan: 'border-cyan-500/20',
    amber: 'border-amber-500/20',
    emerald: 'border-emerald-500/20',
    blue: 'border-blue-500/20',
    purple: 'border-purple-500/20'
  }[systemConfig.themeColor];

  const themeAccentBg = {
    cyan: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950',
    amber: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
    emerald: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
    blue: 'bg-blue-500 hover:bg-blue-400 text-slate-950',
    purple: 'bg-purple-500 hover:bg-purple-400 text-white'
  }[systemConfig.themeColor];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/90 border-b border-slate-800">
      {/* Optional Top Announcement */}
      {systemConfig.showAnnouncement && systemConfig.announcement && (
        <div className={`px-4 py-1.5 text-xs text-center border-b ${themeBorder} bg-slate-900/60 text-slate-300 font-medium flex items-center justify-center gap-2`}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{systemConfig.announcement}</span>
        </div>
      )}

      {/* Top Bar Contract: 3-Zone Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark + App Icon */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-colors flex items-center justify-center shadow-inner">
              <AppIcon className="w-5 h-5" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight text-white group-hover:text-slate-200 transition-colors">
                {systemConfig.appName}
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:block truncate max-w-[200px]">
                by {systemConfig.ownerName}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button 
            onClick={() => handleNavClick('all')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            All Components
          </button>
          <button 
            onClick={() => handleNavClick('microcontrollers')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Arduino & MCUs
          </button>
          <button 
            onClick={() => handleNavClick('kits')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Robotics Kits
          </button>
          <button 
            onClick={() => handleNavClick('cables_wiring')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Cables & Wires
          </button>
          <button 
            onClick={() => handleNavClick('sensors')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Sensors & Modules
          </button>
          <button 
            onClick={() => handleNavClick('motors_actuators')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Motors & Drivers
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Track Order Status & Profile */}
          <button
            onClick={onOpenProfile}
            className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            title="Customer Profile & Track Robotics Order"
            aria-label="Order Status and Profile"
          >
            <Package className="w-4 h-4 text-cyan-400" />
            <span className="text-xs hidden md:inline font-medium">Track Order</span>
          </button>

          {/* In-App Install & Google Play Store Info */}
          <PWAInstallButton onOpenPlayStoreInfo={onOpenPlayStoreInfo} />

          {/* Owner Mode Switch / Branding Studio Button */}
          {isOwnerMode ? (
            <div className="flex items-center gap-1.5 p-1 bg-amber-950/40 border border-amber-600/40 rounded-lg">
              <button
                onClick={() => setIsConfigModalOpen(true)}
                className="px-2.5 py-1 text-xs font-medium text-amber-200 hover:text-amber-100 hover:bg-amber-900/40 rounded transition-colors flex items-center gap-1.5"
                title="Change App Icon, System Name & Settings"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">App Studio & Icon</span>
              </button>
              <button
                onClick={toggleOwnerMode}
                className="px-2 py-1 text-xs font-medium text-amber-400 hover:bg-amber-900/60 rounded transition-colors"
                title="Switch back to Visitor view"
              >
                Exit Owner
              </button>
            </div>
          ) : (
            <button
              onClick={toggleOwnerMode}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 bg-slate-900/60 rounded-lg transition-colors flex items-center gap-1.5"
              title="Access Owner Dashboard (Mallick Akkah)"
            >
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Owner Login</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-cyan-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Chat with Owner Mallick Trigger */}
          <button
            onClick={() => setIsChatOpen(true)}
            className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${themeAccentBg}`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="whitespace-nowrap hidden sm:inline">
              {isOwnerMode ? 'Buyer Chats' : `Chat with ${systemConfig.ownerName.split(' ')[0]}`}
            </span>
            <span className="whitespace-nowrap sm:hidden">Chat</span>

            {/* Unread indicator */}
            {(isOwnerMode ? unreadOwnerCount : unreadVisitorCount) > 0 && (
              <span className="min-w-[16px] h-4 px-1 bg-red-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center tabular-nums">
                {isOwnerMode ? unreadOwnerCount : unreadVisitorCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
