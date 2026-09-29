import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  MessageSquare, 
  ShoppingCart, 
  Check, 
  Copy, 
  ExternalLink,
  Code,
  Zap,
  Layers,
  ChevronRight
} from 'lucide-react';
import { RoboticComponent } from '../types';
import { useStore } from '../context/StoreContext';

interface ComponentDetailModalProps {
  component: RoboticComponent | null;
  onClose: () => void;
}

export const ComponentDetailModal: React.FC<ComponentDetailModalProps> = ({ component, onClose }) => {
  const { 
    systemConfig, 
    addToCart, 
    openChatWithProduct 
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [copiedCode, setCopiedCode] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'pinout' | 'code'>('specs');

  if (!component) return null;

  const handleAddToCart = () => {
    addToCart(component, quantity);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const handleCopyCode = () => {
    if (component.sampleCode) {
      navigator.clipboard.writeText(component.sampleCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              Technical Datasheet
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">ID: {component.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Banner / Image & Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[4/3] flex items-center justify-center relative">
              {component.image ? (
                <img
                  src={component.image}
                  alt={component.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="p-6 text-center text-slate-500 flex flex-col items-center">
                  <Cpu className="w-12 h-12 text-cyan-400 mb-2" />
                  <span className="text-xs font-mono text-slate-400">Component Schematic</span>
                </div>
              )}
              {component.badge && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-[10px] text-cyan-300 font-mono">
                  {component.badge}
                </span>
              )}
            </div>

            <div className="md:col-span-7 flex flex-col justify-between h-full space-y-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span>★ {component.rating} rating</span>
                  <span aria-hidden="true">·</span>
                  <span>{component.reviewsCount} verified reviews</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {component.title}
                </h2>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {component.fullDescription}
                </p>
              </div>

              {/* Price & Stock info */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">
                    {systemConfig.currencySymbol}{component.price.toFixed(2)}
                  </div>
                  <div className="text-xs text-emerald-400 font-medium">
                    {component.stock > 0 ? `${component.stock} units available in lab` : 'Out of stock'}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    openChatWithProduct(component);
                  }}
                  className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask {systemConfig.ownerName.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-slate-800 flex items-center gap-4">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2.5 text-xs font-semibold transition-colors border-b-2 cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Hardware Specifications
            </button>
            {component.pinoutInfo && (
              <button
                onClick={() => setActiveTab('pinout')}
                className={`pb-2.5 text-xs font-semibold transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'pinout'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Pinout & Wiring Map
              </button>
            )}
            {component.sampleCode && (
              <button
                onClick={() => setActiveTab('code')}
                className={`pb-2.5 text-xs font-semibold transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'code'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Arduino Sketch Example
              </button>
            )}
          </div>

          {/* Tab 1: Specs */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {component.specs.map((spec, i) => (
                  <div 
                    key={i} 
                    className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between"
                  >
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      {spec.label}
                    </span>
                    <span className="text-sm font-semibold text-slate-200 mt-1 font-mono tabular-nums">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Pinout Details */}
          {activeTab === 'pinout' && component.pinoutInfo && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Zap className="w-4 h-4" />
                  <span>Electrical Logic & Wiring Architecture</span>
                </div>
                
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {component.pinoutInfo.diagramDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-400 block text-[10px] font-mono">Pin Count</span>
                    <span className="text-slate-200 font-semibold">{component.pinoutInfo.pinsCount}</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-400 block text-[10px] font-mono">Operating Voltage</span>
                    <span className="text-slate-200 font-semibold">{component.pinoutInfo.operatingVoltage}</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-400 block text-[10px] font-mono">Protocols</span>
                    <span className="text-slate-200 font-semibold">{component.pinoutInfo.communication}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Hardware Subsystems:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-400">
                    {component.pinoutInfo.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Sample Code */}
          {activeTab === 'code' && component.sampleCode && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Arduino IDE Compatible C++ (.ino)
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto max-h-60 leading-relaxed">
                <code>{component.sampleCode}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Quantity:</span>
            <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
              >
                -
              </button>
              <span className="px-3 py-1.5 text-xs font-mono text-white tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(component.stock, q + 1))}
                className="px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleAddToCart}
              disabled={component.stock === 0}
              className={`flex-1 sm:flex-none px-6 py-2.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                addedAnim
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              } disabled:opacity-40`}
            >
              {addedAnim ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add {quantity} to Cart ({(component.price * quantity).toFixed(2)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
