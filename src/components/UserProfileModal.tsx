import React, { useState, useEffect } from 'react';
import { 
  X, 
  Package, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Cpu, 
  ShieldCheck, 
  Copy, 
  Check, 
  User, 
  MessageSquare, 
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Building
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'track' | 'orders' | 'profile';
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ 
  isOpen, 
  onClose,
  defaultTab = 'track'
}) => {
  const { 
    orders, 
    trackedOrderId, 
    setTrackedOrderId, 
    getOrderById,
    userProfile, 
    updateUserProfile, 
    systemConfig,
    setIsChatOpen,
    sendVisitorMessage
  } = useStore();

  const [activeTab, setActiveTab] = useState<'track' | 'orders' | 'profile'>(defaultTab);
  const [searchInput, setSearchInput] = useState(trackedOrderId || 'RBK-8921');
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(() => {
    return getOrderById(trackedOrderId || 'RBK-8921') || orders[0];
  });
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState(userProfile);

  // Sync selected order when trackedOrderId changes
  useEffect(() => {
    if (trackedOrderId) {
      setSearchInput(trackedOrderId);
      const found = getOrderById(trackedOrderId);
      if (found) {
        setSelectedOrder(found);
      }
    }
  }, [trackedOrderId, getOrderById]);

  useEffect(() => {
    setProfileForm(userProfile);
  }, [userProfile]);

  if (!isOpen) return null;

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const found = getOrderById(searchInput);
    setSelectedOrder(found);
    if (found) {
      setTrackedOrderId(found.orderId);
    }
  };

  const handleSelectSample = (id: string) => {
    setSearchInput(id);
    const found = getOrderById(id);
    setSelectedOrder(found);
    if (found) {
      setTrackedOrderId(found.orderId);
    }
  };

  const handleCopyTracking = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const handleAskOwnerAboutOrder = (order: Order) => {
    onClose();
    sendVisitorMessage(
      `Hello ${systemConfig.ownerName.split(' ')[0]}! I have a question regarding my order #${order.orderId} (Status: ${order.status.replace('_', ' ').toUpperCase()}). Can you check on its current lab testing or delivery progress?`
    );
    setIsChatOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profileForm);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'order_placed':
        return <span className="text-amber-400 font-mono font-medium">Order Placed</span>;
      case 'bench_tested':
        return <span className="text-cyan-400 font-mono font-medium">Bench-Tested by Mallick</span>;
      case 'dispatched':
        return <span className="text-blue-400 font-mono font-medium">Dispatched to Carrier</span>;
      case 'in_transit':
        return <span className="text-indigo-400 font-mono font-medium">In Transit</span>;
      case 'out_for_delivery':
        return <span className="text-emerald-400 font-mono font-medium animate-pulse">Out for Delivery</span>;
      case 'delivered':
        return <span className="text-emerald-500 font-mono font-bold">Delivered</span>;
      default:
        return <span className="text-slate-400 font-mono">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Customer Portal & Order Tracking</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  RoboKraft Dispatch
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Track real-time lab testing, carrier movements, and delivery of your robotics kits.
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

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-slate-800 flex items-center gap-6 bg-slate-950/30">
          <button
            onClick={() => setActiveTab('track')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'track'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Track Order Status</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Delivery Profile</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: Real-time Order Tracking */}
          {activeTab === 'track' && (
            <div className="space-y-6">
              {/* Order ID Search & Sample Triggers */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <form onSubmit={handleSearchOrder} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Enter Order ID (e.g., RBK-8921, RBK-4015)..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono uppercase"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Track Shipment</span>
                  </button>
                </form>

                {/* Quick Sample Triggers */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="text-slate-500 text-[11px]">Quick Samples:</span>
                  <button
                    type="button"
                    onClick={() => handleSelectSample('RBK-8921')}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-[11px] transition-colors"
                  >
                    RBK-8921 (Out for Delivery)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectSample('RBK-4015')}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-[11px] transition-colors"
                  >
                    RBK-4015 (In Transit)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectSample('RBK-7392')}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-[11px] transition-colors"
                  >
                    RBK-7392 (Bench Tested)
                  </button>
                </div>
              </div>

              {/* Order Status Result */}
              {selectedOrder ? (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Order Overview Banner */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <span className="font-mono font-semibold text-white text-sm">
                          Order #{selectedOrder.orderId}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Placed {new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                        <span aria-hidden="true">·</span>
                        <span>{selectedOrder.items.length} items</span>
                      </div>
                      <div className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                        <span>Current Status:</span>
                        {getStatusBadge(selectedOrder.status)}
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <div className="text-xs text-slate-400">Estimated Delivery:</div>
                      <div className="text-sm font-bold text-cyan-300 font-mono">
                        {selectedOrder.estimatedDelivery}
                      </div>
                    </div>
                  </div>

                  {/* Real-time Tracking Stepper */}
                  <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>Live Hardware Shipping & Verification Timeline</span>
                    </h3>

                    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                      {selectedOrder.trackingSteps.map((step, idx) => (
                        <div key={idx} className="relative flex items-start gap-4">
                          {/* Step Marker */}
                          <div 
                            className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                              step.completed
                                ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-sm'
                                : 'bg-slate-900 border-slate-700 text-slate-500'
                            }`}
                          >
                            {step.completed ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <h4 className={`text-xs font-semibold ${step.completed ? 'text-white' : 'text-slate-500'}`}>
                                {step.label}
                              </h4>
                              {step.timestamp && (
                                <span className="text-[10px] font-mono text-slate-400 tabular-nums">
                                  {new Date(step.timestamp).toLocaleDateString()} at{' '}
                                  {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                              {step.description}
                            </p>

                            {step.location && (
                              <div className="flex items-center gap-1 text-[11px] text-cyan-400/80 font-mono mt-1">
                                <MapPin className="w-3 h-3" />
                                <span>{step.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Owner Quality Verification Note */}
                  {selectedOrder.ownerNotes && (
                    <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-cyan-300">
                          Hardware Lab Inspection Notes (by {systemConfig.ownerName})
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-mono">
                          "{selectedOrder.ownerNotes}"
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Logistics & Carrier Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">
                        Carrier & Tracking Code
                      </span>
                      <div className="text-xs font-semibold text-slate-200">
                        {selectedOrder.carrier}
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <code className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
                          {selectedOrder.trackingNumber}
                        </code>
                        <button
                          onClick={() => handleCopyTracking(selectedOrder.trackingNumber)}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          title="Copy Tracking Number"
                        >
                          {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">
                        Destination Address
                      </span>
                      <div className="text-xs font-semibold text-slate-200">
                        {selectedOrder.customerName}
                      </div>
                      <div className="text-xs text-slate-400 leading-relaxed">
                        {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}
                      </div>
                    </div>
                  </div>

                  {/* Package Contents Breakdown */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                        Package Contents ({selectedOrder.items.length} items)
                      </h4>
                      <span className="text-xs font-mono text-cyan-400 font-bold tabular-nums">
                        Total: {systemConfig.currencySymbol}{selectedOrder.totalAmount.toFixed(2)}
                      </span>
                    </div>

                    <div className="divide-y divide-slate-800/80">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-3 min-w-0">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-10 h-10 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-[10px] text-cyan-400 shrink-0">
                                MCU
                              </div>
                            )}
                            <div className="truncate">
                              <span className="text-slate-200 font-medium block truncate">
                                {item.title}
                              </span>
                              <span className="text-slate-500 font-mono text-[11px]">
                                Qty: {item.quantity} · {systemConfig.currencySymbol}{item.unitPrice.toFixed(2)} each
                              </span>
                            </div>
                          </div>

                          <span className="font-mono font-bold text-slate-200 tabular-nums shrink-0">
                            {systemConfig.currencySymbol}{(item.quantity * item.unitPrice).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action: Ask Owner about this order */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleAskOwnerAboutOrder(selectedOrder)}
                      className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors flex items-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ask {systemConfig.ownerName.split(' ')[0]} About Order #{selectedOrder.orderId}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center border border-dashed border-slate-800 rounded-xl space-y-2">
                  <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                  <h4 className="text-sm font-semibold text-slate-200">No order found with ID "{searchInput}"</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Please check the order number on your invoice or pick one of the active sample orders above.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: My Orders List */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Total Registered Orders: {orders.length}</span>
                <span>Customer: {userProfile.name}</span>
              </div>

              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white font-mono">
                          #{ord.orderId}
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-xs text-slate-400">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-xs text-slate-400 font-mono">
                          {systemConfig.currencySymbol}{ord.totalAmount.toFixed(2)}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300">
                        {ord.items.map((i) => `${i.quantity}x ${i.title}`).join(', ')}
                      </div>

                      <div className="text-xs flex items-center gap-2 pt-0.5">
                        <span className="text-slate-500">Status:</span>
                        {getStatusBadge(ord.status)}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedOrder(ord);
                        setTrackedOrderId(ord.orderId);
                        setSearchInput(ord.orderId);
                        setActiveTab('track');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0 self-end sm:self-auto"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Status</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Delivery Profile */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {profileSaved && (
                <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Profile and shipping address saved!</span>
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Default Customer & Delivery Coordinates
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Email Address (For Invoices)</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Mobile Phone (For Courier SMS)</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">City / State</label>
                    <input
                      type="text"
                      value={profileForm.city}
                      onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Street Address / Lab Suite</label>
                  <input
                    type="text"
                    value={profileForm.street}
                    onChange={(e) => setProfileForm({ ...profileForm, street: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Postal / ZIP Code</label>
                    <input
                      type="text"
                      value={profileForm.postalCode}
                      onChange={(e) => setProfileForm({ ...profileForm, postalCode: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Country</label>
                    <input
                      type="text"
                      value={profileForm.country}
                      onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow"
                >
                  Save Profile Information
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
