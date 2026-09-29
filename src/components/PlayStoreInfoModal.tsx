import React from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useStore } from '../context/StoreContext';

interface PlayStoreInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlayStoreInfoModal: React.FC<PlayStoreInfoModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { systemConfig } = useStore();

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-app-url';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Play Store & Android App Installation</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                  PWA Ready
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Install directly on your phone now or publish to Google Play Store.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6 text-xs text-slate-300">
          {/* Status Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white text-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Current App Status</span>
            </div>
            <p className="leading-relaxed text-slate-300">
              This application is currently running live on the web as an installable <strong>Progressive Web App (PWA)</strong>. 
              It is <strong>not yet submitted to the official Google Play Store</strong>, but it can be installed on Android phones right now without going through the Play Store!
            </p>
          </div>

          {/* Option 1: Instant Phone Installation (No Play Store Needed) */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-bold text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Option 1: Install to Your Phone Right Now</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold uppercase tracking-wider">
                Instant
              </span>
            </div>

            <p className="leading-relaxed text-slate-300">
              You and your customers can install this app immediately. It will appear on your home screen with the <strong>{systemConfig.appName}</strong> icon, open in full screen (without browser address bars), and work with offline caching.
            </p>

            {isInstalled ? (
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>The app is already installed on this device!</span>
              </div>
            ) : isInstallable ? (
              <button
                onClick={install}
                className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Tap to Install "{systemConfig.appName}" App</span>
              </button>
            ) : isIOS ? (
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>On iPhone or iPad:</span>
                </div>
                <p className="text-slate-400">
                  Tap the Safari <strong>Share</strong> button, then select <strong>Add to Home Screen</strong>.
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-semibold text-white">On Android (Chrome / Firefox / Edge):</div>
                <p className="text-slate-400">
                  Open the browser menu (<strong>⋮</strong> three dots on top right) and tap <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong>.
                </p>
              </div>
            )}
          </div>

          {/* Option 2: Publishing to Google Play Store */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Option 2: How to Put It on the Official Google Play Store</span>
            </div>

            <p className="leading-relaxed text-slate-400">
              To publish this app on Google Play so users can search and download it from the Play Store app, follow Google's official 3-step <strong>Trusted Web Activity (TWA)</strong> process:
            </p>

            <ol className="space-y-3 pl-2 text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-white">Generate the Android Package (AAB):</strong>
                  <p className="text-slate-400 mt-0.5">
                    Visit <strong>PWABuilder.com</strong> (by Microsoft & Google) or use Google's <strong>Bubblewrap CLI</strong>, enter your live app URL, and click "Package for Google Play". It will generate a signed <code>.aab</code> file using the Web App Manifest we just built.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-white">Google Play Developer Account:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Open <a href="https://play.google.com/console" target="_blank" rel="noreferrer" className="text-cyan-400 underline inline-flex items-center gap-1">Google Play Console <ExternalLink className="w-3 h-3" /></a> with your Google account (<code>{systemConfig.ownerEmail}</code>). A one-time $25 registration fee is charged by Google.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-white">Upload and Publish:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Create a new app named <strong>{systemConfig.appName}</strong>, upload the generated <code>.aab</code> file, set your store listing description, and submit for Google's review. Once approved, it appears in Google Play Store searches!
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Owner: {systemConfig.ownerName} ({systemConfig.ownerEmail})
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
