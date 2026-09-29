import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    cartTotal, 
    cartCount,
    systemConfig,
    setIsChatOpen,
    sendVisitorMessage,
    createOrder,
    openOrderTracking,
    userProfile
  } = useStore();

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState(userProfile.name || '');
  const [customerContact, setCustomerContact] = useState(userProfile.email || '');

  if (!isCartOpen) return null;

  const handleConsultWithMallick = () => {
    if (cart.length === 0) return;
    const itemsSummary = cart.map((item) => `${item.quantity}x ${item.component.title}`).join(', ');
    sendVisitorMessage(
      `Hello Mallick! I'm planning my robotics build with these parts: ${itemsSummary}. Total: ${systemConfig.currencySymbol}${cartTotal.toFixed(2)}. Could you check if all the wires, voltages, and pinouts are fully compatible?`
    );
    setIsCartOpen(false);
    setIsChatOpen(true);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // 1. Create real order in store
    const newOrder = createOrder({
      customerName: customerName || 'Anonymous Maker',
      customerEmail: customerContact.includes('@') ? customerContact : 'maker@lab.io',
      customerPhone: !customerContact.includes('@') ? customerContact : undefined,
      shippingAddress: {
        street: userProfile.street || '101 Maker Avenue',
        city: userProfile.city || 'Austin',
        state: 'TX',
        postalCode: userProfile.postalCode || '78701',
        country: userProfile.country || 'United States'
      },
      items: cart.map((i) => ({
        componentId: i.component.id,
        title: i.component.title,
        quantity: i.quantity,
        unitPrice: i.component.price,
        image: i.component.image,
        category: i.component.category
      })),
      totalAmount: cartTotal
    });

    setCreatedOrderId(newOrder.orderId);

    // 2. Notify owner via chat
    const itemsSummary = cart.map((item) => `${item.quantity}x ${item.component.title} (${systemConfig.currencySymbol}${(item.component.price * item.quantity).toFixed(2)})`).join('\n· ');
    sendVisitorMessage(
      `[ORDER #${newOrder.orderId} CONFIRMED]\nBuyer: ${customerName}\nContact: ${customerContact}\nItems:\n· ${itemsSummary}\nTotal: ${systemConfig.currencySymbol}${cartTotal.toFixed(2)}\nStatus: Order Placed · Ready for Bench Testing`
    );

    clearCart();
    setCheckoutComplete(true);
  };

  const handleTrackNewOrder = () => {
    if (createdOrderId) {
      setIsCartOpen(false);
      setCheckoutComplete(false);
      openOrderTracking(createdOrderId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-semibold text-white">Robotics Prototyping Cart</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-300">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {checkoutComplete ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <div>
                  <h3 className="text-lg font-bold text-white">Order Confirmed!</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Your robotics components are booked for bench-testing by {systemConfig.ownerName}.
                  </p>
                </div>

                {createdOrderId && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                      Your Official Order Tracking ID
                    </span>
                    <div className="text-base font-bold font-mono text-cyan-300">
                      #{createdOrderId}
                    </div>
                  </div>
                )}

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleTrackNewOrder}
                    className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Track Real-Time Shipping Status</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutComplete(false);
                      setIsChatOpen(true);
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat with {systemConfig.ownerName.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            ) : cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.component.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3"
                >
                  <div className="w-14 h-14 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                    {item.component.image ? (
                      <img
                        src={item.component.image}
                        alt={item.component.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] font-mono text-cyan-400">MCU</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-200 truncate">
                      {item.component.title}
                    </h4>
                    <div className="text-xs font-mono text-cyan-400 mt-0.5 tabular-nums">
                      {systemConfig.currencySymbol}{item.component.price.toFixed(2)} each
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center rounded border border-slate-800 bg-slate-900">
                        <button
                          onClick={() => updateCartQuantity(item.component.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-slate-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.component.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-slate-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.component.id)}
                        className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-slate-500 space-y-3">
                <ShoppingCart className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm font-medium text-slate-400">Your cart is empty</p>
                <p className="text-xs text-slate-500">
                  Select Arduino boards, cables, or kits to begin your robotics project.
                </p>
              </div>
            )}
          </div>

          {/* Footer & Checkout Form */}
          {cart.length > 0 && !checkoutComplete && (
            <div className="p-5 border-t border-slate-800 bg-slate-950/70 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    {systemConfig.currencySymbol}{cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Robotics Tech Inspection</span>
                  <span className="text-emerald-400 font-mono">Free Included</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Estimated Total</span>
                  <span className="font-mono text-cyan-400 tabular-nums">
                    {systemConfig.currencySymbol}{cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Consultation shortcut with Owner */}
              <button
                type="button"
                onClick={handleConsultWithMallick}
                className="w-full py-2 px-3 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Verify Wiring & Compatibility with {systemConfig.ownerName.split(' ')[0]}</span>
              </button>

              {/* Checkout Form */}
              <form onSubmit={handlePlaceOrder} className="space-y-2 pt-1">
                <input
                  type="text"
                  placeholder="Your Name (Maker / Student / Engineer)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Phone or Email for Dispatch"
                  value={customerContact}
                  onChange={(e) => setCustomerContact(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>Submit Order Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
