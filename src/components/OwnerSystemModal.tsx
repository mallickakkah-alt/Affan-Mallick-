import React, { useState } from 'react';
import { 
  X, 
  Sliders, 
  Bot, 
  Cpu, 
  Binary, 
  CircuitBoard, 
  Zap, 
  Radio, 
  ShieldCheck, 
  Sparkles, 
  Image as ImageIcon, 
  Save, 
  RotateCcw, 
  Plus, 
  Check, 
  Package, 
  User, 
  Palette,
  Upload,
  Smartphone,
  Download,
  ExternalLink,
  Truck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { AppSystemConfig, ThemeColor, RoboticComponent, OrderStatus } from '../types';

interface OwnerSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'branding' | 'add_component' | 'inventory' | 'orders' | 'play_store';
}

export const OwnerSystemModal: React.FC<OwnerSystemModalProps> = ({ 
  isOpen, 
  onClose,
  initialTab = 'branding'
}) => {
  const { 
    systemConfig, 
    updateSystemConfig, 
    resetSystemConfig,
    components,
    addComponent,
    updateComponent,
    deleteComponent,
    resetComponents,
    orders,
    updateOrderStatus
  } = useStore();

  const [activeTab, setActiveTab] = useState<'branding' | 'add_component' | 'inventory' | 'orders' | 'play_store'>(initialTab);
  const [savedNotification, setSavedNotification] = useState(false);

  // Branding Form State
  const [formData, setFormData] = useState<AppSystemConfig>({ ...systemConfig });
  const [customIconInput, setCustomIconInput] = useState(systemConfig.customIconUrl || '');

  // Add Component Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<RoboticComponent['category']>('microcontrollers');
  const [newPrice, setNewPrice] = useState('15.00');
  const [newStock, setNewStock] = useState('25');
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newFullDesc, setNewFullDesc] = useState('');
  const [newBadge, setNewBadge] = useState('New Part');
  const [newPinoutCount, setNewPinoutCount] = useState('14 Digital, 6 Analog');
  const [newPinoutVoltage, setNewPinoutVoltage] = useState('5V Logic');
  const [newPinoutComm, setNewPinoutComm] = useState('I2C, SPI, UART');
  const [newPinoutDesc, setNewPinoutDesc] = useState('');
  const [newSampleCode, setNewSampleCode] = useState('');
  const [newImage, setNewImage] = useState('');

  if (!isOpen) return null;

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    updateSystemConfig({
      ...formData,
      customIconUrl: customIconInput
    });
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  const handleCustomIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const url = event.target.result as string;
          setCustomIconInput(url);
          setFormData((prev) => ({ ...prev, iconKey: 'custom', customIconUrl: url }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateComponent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    addComponent({
      title: newTitle,
      category: newCategory,
      price: parseFloat(newPrice) || 9.99,
      stock: parseInt(newStock, 10) || 10,
      rating: 5.0,
      reviewsCount: 1,
      badge: newBadge,
      shortDescription: newShortDesc || 'Lab-tested robotic component with verified pinouts.',
      fullDescription: newFullDesc || 'Engineered for hobbyist and academic robotics development.',
      inStock: true,
      image: newImage || undefined,
      specs: [
        { label: 'Category', value: newCategory.replace('_', ' ').toUpperCase() },
        { label: 'Operating Voltage', value: newPinoutVoltage || '5V' },
        { label: 'Interface', value: newPinoutComm || 'Standard Dupont' }
      ],
      pinoutInfo: {
        pinsCount: newPinoutCount || 'Standard pinout',
        operatingVoltage: newPinoutVoltage || '5V',
        communication: newPinoutComm || 'GPIO',
        features: ['Precision pin header', 'Circuit verified'],
        diagramDescription: newPinoutDesc || 'Standard pin configuration.'
      },
      sampleCode: newSampleCode || undefined
    });

    // Reset form
    setNewTitle('');
    setNewShortDesc('');
    setNewFullDesc('');
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
    setActiveTab('inventory');
  };

  const iconOptions: { key: AppSystemConfig['iconKey']; label: string; icon: React.ReactNode }[] = [
    { key: 'bot', label: 'RoboBot', icon: <Bot className="w-5 h-5" /> },
    { key: 'chip', label: 'Microchip', icon: <Cpu className="w-5 h-5" /> },
    { key: 'cpu', label: 'Processor', icon: <Binary className="w-5 h-5" /> },
    { key: 'circuit', label: 'PCB Board', icon: <CircuitBoard className="w-5 h-5" /> },
    { key: 'zap', label: 'Power Spark', icon: <Zap className="w-5 h-5" /> },
    { key: 'radio', label: 'Telemetry', icon: <Radio className="w-5 h-5" /> },
    { key: 'shield', label: 'Hardware Armor', icon: <ShieldCheck className="w-5 h-5" /> },
    { key: 'sparkles', label: 'Quantum Node', icon: <Sparkles className="w-5 h-5" /> }
  ];

  const colorThemes: { key: ThemeColor; label: string; bg: string }[] = [
    { key: 'cyan', label: 'Cyber Cyan', bg: 'bg-cyan-500' },
    { key: 'amber', label: 'Robo Amber', bg: 'bg-amber-500' },
    { key: 'emerald', label: 'Mech Emerald', bg: 'bg-emerald-500' },
    { key: 'blue', label: 'Electric Blue', bg: 'bg-blue-500' },
    { key: 'purple', label: 'Plasma Violet', bg: 'bg-purple-500' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-amber-600/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-950 border border-amber-600/50 text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Owner System Studio & Brand Manager
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                  Owner: Mallick Akkah
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Customize app icon, system title, catalog parts, and store parameters.
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

        {/* Tab Switcher */}
        <div className="px-6 pt-3 border-b border-slate-800 flex items-center gap-6 bg-slate-950/30">
          <button
            onClick={() => setActiveTab('branding')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'branding'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>App Icon & System Branding</span>
          </button>

          <button
            onClick={() => setActiveTab('add_component')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'add_component'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add Robotic Component / Kit</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Inventory ({components.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Orders & Dispatch ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('play_store')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'play_store'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Play Store & Android</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {savedNotification && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Settings saved successfully! Active changes broadcasted in real time.</span>
            </div>
          )}

          {/* TAB 1: App Icon & Branding */}
          {activeTab === 'branding' && (
            <form onSubmit={handleSaveBranding} className="space-y-6">
              {/* App Icon Customizer Section */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>App System Icon</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Choose an icon or upload your custom logo for the application header and branding.
                    </p>
                  </div>

                  {/* Live Icon Preview */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700">
                    <span className="text-[10px] text-slate-400 font-mono">Live Preview:</span>
                    <div className="p-1 rounded bg-slate-950 border border-slate-800 flex items-center justify-center">
                      {formData.iconKey === 'custom' && customIconInput ? (
                        <img src={customIconInput} alt="Preview" className="w-5 h-5 rounded object-cover" />
                      ) : (
                        iconOptions.find((o) => o.key === formData.iconKey)?.icon || <Bot className="w-5 h-5 text-cyan-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Built-in Icon Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {iconOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.key}
                      onClick={() => setFormData({ ...formData, iconKey: opt.key })}
                      className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
                        formData.iconKey === opt.key
                          ? 'bg-amber-950/40 border-amber-500 text-amber-300 shadow-sm'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                        {opt.icon}
                      </div>
                      <span className="text-xs font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Icon URL or Upload */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300">
                      Or Use Custom Icon URL / Upload
                    </label>
                    <label className="cursor-pointer text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Local Image</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleCustomIconUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://example.com/custom-robot-icon.png"
                      value={customIconInput}
                      onChange={(e) => {
                        setCustomIconInput(e.target.value);
                        setFormData({ ...formData, iconKey: 'custom', customIconUrl: e.target.value });
                      }}
                      className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, iconKey: 'custom', customIconUrl: customIconInput })}
                      className="px-3 py-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 font-medium"
                    >
                      Apply Custom
                    </button>
                  </div>
                </div>
              </div>

              {/* System Branding & Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">App Name / Store Title</label>
                  <input
                    type="text"
                    value={formData.appName}
                    onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">App Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Accent Theme Color</label>
                  <div className="flex items-center gap-2">
                    {colorThemes.map((c) => (
                      <button
                        type="button"
                        key={c.key}
                        onClick={() => setFormData({ ...formData, themeColor: c.key })}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium border flex items-center justify-center gap-1.5 transition-colors ${
                          formData.themeColor === c.key
                            ? 'border-white text-white bg-slate-800'
                            : 'border-slate-800 text-slate-400 hover:text-slate-200 bg-slate-950'
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${c.bg}`}></span>
                        <span className="hidden sm:inline">{c.label.split(' ')[1]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Top Header Announcement</label>
                  <input
                    type="text"
                    value={formData.announcement}
                    onChange={(e) => setFormData({ ...formData, announcement: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Owner Identity Settings */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>Owner Contact & Profile Configuration</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Owner Full Name</label>
                    <input
                      type="text"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Owner Email</label>
                    <input
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Lab Presence Status</label>
                    <select
                      value={formData.ownerStatus}
                      onChange={(e) => setFormData({ ...formData, ownerStatus: e.target.value as any })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200"
                    >
                      <option value="online">Online (Fast Chat)</option>
                      <option value="in_lab">In Lab (Soldering / Testing)</option>
                      <option value="consulting">Consulting</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Owner Short Bio (Shown to Visitors)</label>
                  <textarea
                    rows={2}
                    value={formData.ownerBio}
                    onChange={(e) => setFormData({ ...formData, ownerBio: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={resetSystemConfig}
                  className="px-3 py-2 text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Factory Defaults</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Save App System & Icon</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Add New Component */}
          {activeTab === 'add_component' && (
            <form onSubmit={handleCreateComponent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Component / Kit Name *</label>
                  <input
                    type="text"
                    placeholder="e.g., Arduino Mega 2560 Pro or ESP32-CAM"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                  >
                    <option value="microcontrollers">Microcontroller (Arduino/ESP32)</option>
                    <option value="kits">Robotics Kit (4WD/Arm)</option>
                    <option value="cables_wiring">Cables & Jumper Wires</option>
                    <option value="sensors">Sensors & Sonar</option>
                    <option value="motors_actuators">Motors & Drivers</option>
                    <option value="power_modules">Power & Batteries</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-mono"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Stock Count</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Short Description</label>
                <input
                  type="text"
                  placeholder="Key summary for catalog card..."
                  value={newShortDesc}
                  onChange={(e) => setNewShortDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Full Technical Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed architecture, compatibility, and maker notes..."
                  value={newFullDesc}
                  onChange={(e) => setNewFullDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                />
              </div>

              {/* Pinout info */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-semibold text-cyan-400 block font-mono">
                  Pinout & Wiring Specifications
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Pins Count (e.g., 28 Pins)"
                    value={newPinoutCount}
                    onChange={(e) => setNewPinoutCount(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200"
                  />
                  <input
                    type="text"
                    placeholder="Voltage (e.g., 5V / 3.3V)"
                    value={newPinoutVoltage}
                    onChange={(e) => setNewPinoutVoltage(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200"
                  />
                  <input
                    type="text"
                    placeholder="Protocols (e.g., I2C, SPI)"
                    value={newPinoutComm}
                    onChange={(e) => setNewPinoutComm(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Pinout arrangement notes..."
                  value={newPinoutDesc}
                  onChange={(e) => setNewPinoutDesc(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200"
                />
              </div>

              {/* Sample Code */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Arduino Sample Sketch (.ino)</label>
                <textarea
                  rows={3}
                  placeholder={`void setup() {\n  // Code\n}`}
                  value={newSampleCode}
                  onChange={(e) => setNewSampleCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-mono"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Component to Catalog</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Inventory Management */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">
                  Total Catalog Items: {components.length}
                </span>
                <button
                  onClick={resetComponents}
                  className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default Robotics Catalog</span>
                </button>
              </div>

              <div className="space-y-2">
                {components.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white truncate">
                          {comp.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
                          {comp.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {comp.shortDescription}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right font-mono text-xs">
                        <div className="font-bold text-amber-400">
                          ${comp.price.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {comp.stock} units
                        </div>
                      </div>

                      <button
                        onClick={() => deleteComponent(comp.id)}
                        className="px-2.5 py-1 text-xs text-red-400 hover:bg-red-950/40 rounded border border-red-900/50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Customer Orders & Real-time Shipping Dispatch */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">
                  Active Maker Orders: {orders.length}
                </span>
                <span className="text-amber-400 font-mono text-[11px]">
                  Owner Quality Control Station (Mallick Akkah)
                </span>
              </div>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white font-mono">
                            #{ord.orderId}
                          </span>
                          <span aria-hidden="true" className="text-slate-700">·</span>
                          <span className="text-xs text-slate-300 font-medium">
                            {ord.customerName}
                          </span>
                          <span aria-hidden="true" className="text-slate-700">·</span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {ord.customerEmail}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {ord.items.map((i) => `${i.quantity}x ${i.title}`).join(', ')}
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <div className="text-xs font-bold font-mono text-cyan-400">
                          {systemConfig.currencySymbol}{ord.totalAmount.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Placed {new Date(ord.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Status Changer & Bench Testing Log */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-4 space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                          Live Shipping Stage
                        </label>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.orderId, e.target.value as OrderStatus)}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-amber-300 font-semibold focus:outline-none focus:border-amber-400 cursor-pointer"
                        >
                          <option value="order_placed">1. Order Placed</option>
                          <option value="bench_tested">2. Hardware Bench-Tested</option>
                          <option value="dispatched">3. Dispatched to Carrier</option>
                          <option value="in_transit">4. In Transit</option>
                          <option value="out_for_delivery">5. Out for Delivery</option>
                          <option value="delivered">6. Delivered</option>
                        </select>
                      </div>

                      <div className="sm:col-span-8 space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                          Owner Lab Notes (Visible to Customer Tracker)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            defaultValue={ord.ownerNotes || ''}
                            onBlur={(e) => updateOrderStatus(ord.orderId, ord.status, e.target.value)}
                            placeholder="Add hardware test or tracking note..."
                            className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Google Play Store & Android Deployment */}
          {activeTab === 'play_store' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>Is this app in Google Play Store?</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Currently, this application is deployed as a <strong>live Progressive Web App (PWA)</strong> on your Cloud Run URL. It is <strong>ready to be installed on any Android phone directly</strong>, and can be packaged into an official Android <code>.aab</code> package for the Google Play Store!
                </p>
              </div>

              {/* Direct Android Install */}
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Instant Android Installation (No Store Account Required)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold">
                    Active & Ready
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Any customer or maker visiting your app URL on Android Chrome can tap <strong>"Install App"</strong> in the top bar or browser menu. The app installs directly onto their phone with your custom icon ({systemConfig.appName}), full-screen mode, and offline caching.
                </p>
              </div>

              {/* Steps to Google Play Store */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider block text-amber-400 font-mono">
                  3 Steps to Publish on Google Play Store (For Owner Mallick Akkah)
                </span>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="font-semibold text-white">1. Generate the Android App Bundle (.aab)</div>
                    <p className="text-slate-400">
                      Open <strong>PWABuilder.com</strong> (Google & Microsoft's official tool) or run <code>npx @bubblewrap/cli build</code>. Enter your live app URL, and download the pre-configured, signed Android Package with your Web Manifest and icons.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="font-semibold text-white">2. Register on Google Play Console</div>
                    <p className="text-slate-400">
                      Sign in to <a href="https://play.google.com/console" target="_blank" rel="noreferrer" className="text-cyan-400 underline inline-flex items-center gap-1">play.google.com/console <ExternalLink className="w-3 h-3" /></a> with your Google account (<code>{systemConfig.ownerEmail}</code>). Google has a standard one-time $25 developer account fee.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="font-semibold text-white">3. Upload your .aab & Publish</div>
                    <p className="text-slate-400">
                      Create your store listing for <strong>{systemConfig.appName}</strong>, upload screenshots of your Arduino and Robotics kits, and submit. Within 2-3 days, your app will be officially searchable and downloadable on the Google Play Store!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
