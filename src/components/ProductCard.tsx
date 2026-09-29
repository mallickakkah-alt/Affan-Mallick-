import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Cable, 
  Activity, 
  Cog, 
  BatteryCharging, 
  MessageSquare, 
  Check, 
  ShoppingCart, 
  Edit3, 
  Trash2,
  Info
} from 'lucide-react';
import { RoboticComponent } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  component: RoboticComponent;
  onOpenSpecs: (comp: RoboticComponent) => void;
  onEdit?: (comp: RoboticComponent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ component, onOpenSpecs, onEdit }) => {
  const { 
    systemConfig, 
    addToCart, 
    openChatWithProduct, 
    isOwnerMode, 
    deleteComponent 
  } = useStore();

  const [addedAnim, setAddedAnim] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(component, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const handleAskOwner = (e: React.MouseEvent) => {
    e.stopPropagation();
    openChatWithProduct(component);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Remove "${component.title}" from catalog?`)) {
      deleteComponent(component.id);
    }
  };

  const getCategoryIcon = () => {
    switch (component.category) {
      case 'microcontrollers': return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'kits': return <Layers className="w-4 h-4 text-amber-400" />;
      case 'cables_wiring': return <Cable className="w-4 h-4 text-emerald-400" />;
      case 'sensors': return <Activity className="w-4 h-4 text-blue-400" />;
      case 'motors_actuators': return <Cog className="w-4 h-4 text-orange-400" />;
      case 'power_modules': return <BatteryCharging className="w-4 h-4 text-purple-400" />;
      default: return <Cpu className="w-4 h-4 text-slate-400" />;
    }
  };

  const categoryLabelMap = {
    microcontrollers: 'Microcontroller',
    kits: 'Robotics Kit',
    cables_wiring: 'Cables & Wiring',
    sensors: 'Sensor Module',
    motors_actuators: 'Motor & Actuator',
    power_modules: 'Power Supply'
  };

  return (
    <article 
      onClick={() => onOpenSpecs(component)}
      className="group relative bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm hover:shadow-lg"
    >
      {/* Card Header & Media Slot */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
        {component.image && !imgError ? (
          <img
            src={component.image}
            alt={component.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* High-fidelity Fallback Hardware Canvas */
          <div className="w-full h-full p-6 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-center relative overflow-hidden">
            {/* PCB subtle decorative circuit trace background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative p-3 rounded-xl bg-slate-900 border border-slate-800 mb-2">
              {getCategoryIcon()}
            </div>
            <span className="relative text-xs font-mono text-slate-400 max-w-[180px] truncate">
              {component.title}
            </span>
            <span className="relative text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-mono">
              Hardware Component
            </span>
          </div>
        )}

        {/* Quiet unboxed status banner on card corner */}
        {component.badge && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-medium text-slate-300">
            {component.badge}
          </div>
        )}

        {/* Owner Controls Overlay */}
        {isOwnerMode && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(component);
              }}
              className="p-1.5 rounded-md bg-amber-950/80 border border-amber-600/50 text-amber-300 hover:bg-amber-900 transition-colors"
              title="Edit Product"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-md bg-red-950/80 border border-red-700/50 text-red-300 hover:bg-red-900 transition-colors"
              title="Delete Product"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Zero-Pill unboxed metadata line */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
            <span className="text-slate-400 font-medium">
              {categoryLabelMap[component.category]}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">★ {component.rating}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums text-slate-400">({component.reviewsCount})</span>
          </div>

          <h3 className="text-base font-semibold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors line-clamp-1">
            {component.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {component.shortDescription}
          </p>
        </div>

        {/* Pinout highlight if available */}
        {component.pinoutInfo && (
          <div className="text-[11px] font-mono text-slate-400 pt-1 flex items-center gap-1">
            <span className="text-cyan-400">Pinout:</span>
            <span className="truncate">{component.pinoutInfo.pinsCount}</span>
          </div>
        )}

        {/* Pricing, Stock & Action Buttons */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-bold text-white font-mono tabular-nums">
              {systemConfig.currencySymbol}{component.price.toFixed(2)}
            </div>
            <div className="text-[11px] text-slate-400">
              {component.stock > 0 ? (
                <span className="text-emerald-400 tabular-nums">
                  {component.stock} in stock
                </span>
              ) : (
                <span className="text-red-400">Backorder</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Ask Owner button */}
            <button
              onClick={handleAskOwner}
              className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
              title={`Ask ${systemConfig.ownerName} about ${component.title}`}
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            {/* View specs */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenSpecs(component);
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
              title="Technical pinout & specifications"
            >
              <Info className="w-4 h-4" />
            </button>

            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              disabled={component.stock === 0}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                addedAnim 
                  ? 'bg-emerald-500 text-slate-950' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {addedAnim ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
