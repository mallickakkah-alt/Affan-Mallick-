import React, { useState } from 'react';
import { Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  onOpenPlayStoreInfo: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ onOpenPlayStoreInfo }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  return (
    <>
      <div className="flex items-center gap-1.5">
        {/* Play Store Info shortcut button */}
        <button
          onClick={onOpenPlayStoreInfo}
          className="px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          title="Google Play Store & Android App Details"
        >
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Install / Play Store</span>
        </button>

        {/* 1-Click Install if install prompt is ready */}
        {isInstallable && !isInstalled && (
          <button
            onClick={install}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center gap-1.5 animate-pulse"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Install App</span>
          </button>
        )}

        {/* iOS Fallback button */}
        {isIOS && !isInstalled && (
          <button
            onClick={() => setShowIOSGuide(true)}
            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Install</span>
          </button>
        )}
      </div>

      {/* iOS Modal instructions */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl bg-slate-900 border border-slate-800 p-6 text-slate-200 space-y-4">
            <h3 className="text-base font-semibold text-white">Install on iPhone / iPad</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              1. Tap the <strong>Share</strong> icon at the bottom of Safari.<br />
              2. Scroll down and choose <strong>Add to Home Screen</strong>.<br />
              3. Tap <strong>Add</strong> to access RoboKraft directly from your home screen.
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
