import React from 'react';
import { Cpu, Wrench, ShieldCheck, MessageSquare, ArrowDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeroBannerProps {
  onExploreClick: () => void;
  onFilterCategory: (cat: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick, onFilterCategory }) => {
  const { systemConfig, setIsChatOpen } = useStore();

  const themeGlow = {
    cyan: 'from-cyan-500/20 via-slate-900 to-slate-950',
    amber: 'from-amber-500/20 via-slate-900 to-slate-950',
    emerald: 'from-emerald-500/20 via-slate-900 to-slate-950',
    blue: 'from-blue-500/20 via-slate-900 to-slate-950',
    purple: 'from-purple-500/20 via-slate-900 to-slate-950'
  }[systemConfig.themeColor];

  const themeButton = {
    cyan: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950',
    amber: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
    emerald: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
    blue: 'bg-blue-500 hover:bg-blue-400 text-slate-950',
    purple: 'bg-purple-500 hover:bg-purple-400 text-white'
  }[systemConfig.themeColor];

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950">
      {/* Background radial gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${themeGlow} opacity-60 pointer-events-none`}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
              <span>Robotics Hardware Depot</span>
              <span aria-hidden="true">·</span>
              <span>Direct Engineering Guidance</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                {systemConfig.ownerName} Available
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              Arduino Uno, Nano, Shielded Cables & Complete Robotics Kits.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {systemConfig.tagline}. Hand-tested microcontrollers, high-flex Dupont jumper wires, 4WD autonomous rovers, and motor shields with live direct chat from shop owner {systemConfig.ownerName}.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${themeButton}`}
              >
                <span>Browse Components</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsChatOpen(true)}
                className="px-5 py-2.5 text-sm font-medium rounded-lg text-slate-200 bg-slate-900 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Chat with {systemConfig.ownerName.split(' ')[0]}</span>
              </button>
            </div>

            {/* Proof metrics / trust markers */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                  <Cpu className="w-3.5 h-3.5 text-slate-500" />
                  <span>Verified Boards</span>
                </div>
                <div className="text-sm font-semibold text-slate-200">100% Genuine Silicon</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                  <Wrench className="w-3.5 h-3.5 text-slate-500" />
                  <span>Wiring Tested</span>
                </div>
                <div className="text-sm font-semibold text-slate-200">Clean Pinout Spec</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Direct Advice</span>
                </div>
                <div className="text-sm font-semibold text-slate-200">Owner Live Chat</div>
              </div>
            </div>

            {/* Quick category launch chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
              <span className="text-slate-400">Quick Jump:</span>
              <button 
                onClick={() => onFilterCategory('microcontrollers')} 
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
              >
                Arduino Uno & Nano
              </button>
              <button 
                onClick={() => onFilterCategory('cables_wiring')} 
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
              >
                Jumper Wires & USB
              </button>
              <button 
                onClick={() => onFilterCategory('kits')} 
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
              >
                4WD Car & Arm Kits
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl group">
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-950 relative">
                <img
                  src="/src/assets/images/robotics_hero_workshop_1790708842543.jpg"
                  alt="High-tech robotics maker workbench with microcontrollers and tools"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              </div>

              {/* Floating hardware caption overlay */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-200">RoboKraft Hardware Bench</div>
                  <div className="text-slate-400 text-[11px]">Pinout verified · Ready for prototype builds</div>
                </div>
                <div className="text-right tabular-nums text-slate-400">
                  <span className="text-emerald-400 font-mono font-medium">Ready to Ship</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
