import React from 'react';
import { 
  Bot, 
  Cpu, 
  CircuitBoard, 
  Zap, 
  Radio, 
  ShieldCheck, 
  Sparkles,
  Binary
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface AppIconProps {
  className?: string;
  size?: number;
}

export const AppIcon: React.FC<AppIconProps> = ({ className = 'w-6 h-6', size = 24 }) => {
  const { systemConfig } = useStore();
  const { iconKey, customIconUrl, themeColor } = systemConfig;

  if (iconKey === 'custom' && customIconUrl) {
    return (
      <img 
        src={customIconUrl} 
        alt="App Icon" 
        className={`${className} object-cover rounded-md`}
        onError={(e) => {
          // Fallback to bot if image fails to load
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  const colorMap = {
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400'
  };

  const activeColor = colorMap[themeColor] || colorMap.cyan;

  switch (iconKey) {
    case 'chip':
      return <Cpu size={size} className={`${className} ${activeColor}`} />;
    case 'cpu':
      return <Binary size={size} className={`${className} ${activeColor}`} />;
    case 'circuit':
      return <CircuitBoard size={size} className={`${className} ${activeColor}`} />;
    case 'zap':
      return <Zap size={size} className={`${className} ${activeColor}`} />;
    case 'radio':
      return <Radio size={size} className={`${className} ${activeColor}`} />;
    case 'shield':
      return <ShieldCheck size={size} className={`${className} ${activeColor}`} />;
    case 'sparkles':
      return <Sparkles size={size} className={`${className} ${activeColor}`} />;
    case 'bot':
    default:
      return <Bot size={size} className={`${className} ${activeColor}`} />;
  }
};
