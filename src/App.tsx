import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ComponentDetailModal } from './components/ComponentDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { ChatDrawer } from './components/ChatDrawer';
import { OwnerSystemModal } from './components/OwnerSystemModal';
import { PlayStoreInfoModal } from './components/PlayStoreInfoModal';
import { UserProfileModal } from './components/UserProfileModal';
import { FloatingChatButton } from './components/FloatingChatButton';
import { Footer } from './components/Footer';
import { RoboticComponent } from './types';
import { Sliders, Shield, Plus, Sparkles, CheckCircle2, Smartphone, Truck } from 'lucide-react';

const MainApp: React.FC = () => {
  const { 
    systemConfig, 
    selectedComponent, 
    setSelectedComponent,
    isOwnerMode,
    toggleOwnerMode,
    isConfigModalOpen,
    setIsConfigModalOpen,
    isProfileModalOpen,
    setIsProfileModalOpen
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalInitialTab, setModalInitialTab] = useState<'branding' | 'add_component' | 'inventory' | 'orders' | 'play_store'>('branding');
  const [isPlayStoreModalOpen, setIsPlayStoreModalOpen] = useState(false);

  const handleOpenSpecs = (comp: RoboticComponent) => {
    setSelectedComponent(comp);
  };

  const handleOpenAddNew = () => {
    setModalInitialTab('add_component');
    setIsConfigModalOpen(true);
  };

  const handleOpenOrders = () => {
    setModalInitialTab('orders');
    setIsConfigModalOpen(true);
  };

  const handleOpenBranding = () => {
    setModalInitialTab('branding');
    setIsConfigModalOpen(true);
  };

  const handleOpenPlayStoreInfo = () => {
    setIsPlayStoreModalOpen(true);
  };

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Owner Mode Active Notification Strip */}
      {isOwnerMode && (
        <aside aria-label="Owner Mode active" className="bg-amber-950/80 border-b border-amber-600/40 px-4 py-2 text-xs text-amber-200">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Owner Mode Active:</strong> You are logged in as <strong>{systemConfig.ownerName}</strong> ({systemConfig.ownerEmail}).
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenOrders}
                className="underline hover:text-white font-medium flex items-center gap-1 cursor-pointer text-amber-300"
              >
                <Truck className="w-3 h-3" />
                <span>Orders & Dispatch</span>
              </button>
              <span aria-hidden="true" className="text-amber-600">·</span>
              <button
                onClick={handleOpenBranding}
                className="underline hover:text-white font-medium flex items-center gap-1 cursor-pointer"
              >
                <Sliders className="w-3 h-3" />
                <span>Change App Icon & Title</span>
              </button>
              <span aria-hidden="true" className="text-amber-600">·</span>
              <button
                onClick={handleOpenAddNew}
                className="underline hover:text-white font-medium flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Robotics Kit</span>
              </button>
              <span aria-hidden="true" className="text-amber-600">·</span>
              <button
                onClick={handleOpenPlayStoreInfo}
                className="underline hover:text-white font-medium flex items-center gap-1 cursor-pointer text-cyan-300"
              >
                <Smartphone className="w-3 h-3" />
                <span>Play Store Guide</span>
              </button>
              <span aria-hidden="true" className="text-amber-600">·</span>
              <button
                onClick={toggleOwnerMode}
                className="text-amber-400 hover:text-white font-medium cursor-pointer"
              >
                Switch to Visitor View
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Top Navbar */}
      <Navbar 
        onSelectCategory={setSelectedCategory} 
        onOpenPlayStoreInfo={handleOpenPlayStoreInfo}
        onOpenProfile={handleOpenProfile}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Banner with Workshop Photography */}
        <HeroBanner
          onExploreClick={() => {
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onFilterCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Featured Robotics Kits & Components Grid */}
        <ProductGrid
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenSpecs={handleOpenSpecs}
          onAddNewComponent={handleOpenAddNew}
        />
      </main>

      {/* Detailed Pinout & Spec Modal */}
      <ComponentDetailModal
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
      />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Real-time Chat Drawer with Owner Mallick Akkah */}
      <ChatDrawer />

      {/* Owner System Studio (Icon, Brand, & Inventory customizer) */}
      <OwnerSystemModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        initialTab={modalInitialTab}
      />

      {/* Play Store & Android Installation Modal */}
      <PlayStoreInfoModal
        isOpen={isPlayStoreModalOpen}
        onClose={() => setIsPlayStoreModalOpen(false)}
      />

      {/* User Profile & Real-time Order Tracking Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Floating Chat Trigger */}
      <FloatingChatButton />

      {/* Footer with clean unboxed links and owner contact */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
