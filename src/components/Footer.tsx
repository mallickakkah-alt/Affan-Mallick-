import React from 'react';
import { Mail, Phone, Cpu, MapPin, Shield, Sliders } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { AppIcon } from './AppIcon';

export const Footer: React.FC = () => {
  const { 
    systemConfig, 
    isOwnerMode, 
    toggleOwnerMode, 
    setIsConfigModalOpen,
    setIsProfileModalOpen
  } = useStore();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-900">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <AppIcon className="w-4 h-4" size={18} />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                {systemConfig.appName}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {systemConfig.tagline}. Sourcing verified microcontrollers, low-resistance Dupont wires, sensor modules, and complete educational robotics chassis.
            </p>
            <div className="pt-1 text-xs text-slate-400">
              Direct store management & tech support by <span className="text-slate-200 font-medium">{systemConfig.ownerName}</span>.
            </div>
          </div>

          {/* Quick Categories */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-2 font-mono">
              Hardware Taxonomy
            </div>
            <ul className="space-y-1.5">
              <li><a href="#catalog-section" className="hover:text-cyan-400 transition-colors">Arduino Uno & Nano Boards</a></li>
              <li><a href="#catalog-section" className="hover:text-cyan-400 transition-colors">4WD Autonomous Car Platforms</a></li>
              <li><a href="#catalog-section" className="hover:text-cyan-400 transition-colors">Dupont Ribbon & Shielded Cables</a></li>
              <li><a href="#catalog-section" className="hover:text-cyan-400 transition-colors">HC-SR04 Sonar & Ultrasonic</a></li>
              <li>
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>→ Track Order Status</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Owner Direct Contact & Admin Panel */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-2 font-mono">
              Owner Direct Contact
            </div>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={`mailto:${systemConfig.ownerEmail}`} className="hover:text-white transition-colors">
                  {systemConfig.ownerEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{systemConfig.ownerPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Hardware Lab & Fulfillment Hub</span>
              </div>
            </div>

            <div className="pt-3">
              {isOwnerMode ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsConfigModalOpen(true)}
                    className="px-3 py-1.5 text-xs font-semibold rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 transition-colors flex items-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Open App System Studio</span>
                  </button>
                  <button
                    onClick={toggleOwnerMode}
                    className="px-2 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Exit Owner Mode
                  </button>
                </div>
              ) : (
                <button
                  onClick={toggleOwnerMode}
                  className="px-3 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Owner Login ({systemConfig.ownerName})</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div>
            © {new Date().getFullYear()} {systemConfig.appName}. Designed & owned by {systemConfig.ownerName}.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Tested Logic</span>
            <span aria-hidden="true">·</span>
            <span>Datasheets & Pinouts Included</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400">Live Engineering Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
