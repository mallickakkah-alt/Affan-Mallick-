import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { 
  AppSystemConfig, 
  RoboticComponent, 
  CartItem, 
  ChatSession, 
  ChatMessage, 
  AttachedProduct,
  Order,
  OrderStatus,
  UserProfile
} from '../types';
import { INITIAL_CONFIG, INITIAL_COMPONENTS, OWNER_WELCOME_MESSAGE } from '../data/initialCatalog';
import { INITIAL_ORDERS } from '../data/initialOrders';

interface StoreContextType {
  // System branding & settings
  systemConfig: AppSystemConfig;
  updateSystemConfig: (updates: Partial<AppSystemConfig>) => void;
  resetSystemConfig: () => void;
  isConfigModalOpen: boolean;
  setIsConfigModalOpen: (open: boolean) => void;

  // Components catalog
  components: RoboticComponent[];
  addComponent: (comp: Omit<RoboticComponent, 'id'>) => void;
  updateComponent: (id: string, updates: Partial<RoboticComponent>) => void;
  deleteComponent: (id: string) => void;
  resetComponents: () => void;
  selectedComponent: RoboticComponent | null;
  setSelectedComponent: (comp: RoboticComponent | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (comp: RoboticComponent, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Orders & Tracking System
  orders: Order[];
  createOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    items: Order['items'];
    totalAmount: number;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  trackedOrderId: string | null;
  setTrackedOrderId: (orderId: string | null) => void;
  openOrderTracking: (orderId: string) => void;

  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;

  // Owner vs Visitor Mode
  isOwnerMode: boolean;
  setIsOwnerMode: (mode: boolean) => void;
  toggleOwnerMode: () => void;

  // Real-time Chat
  chatSessions: ChatSession[];
  activeSessionId: string;
  currentVisitorSession: ChatSession | undefined;
  activeOwnerSessionId: string | null;
  setActiveOwnerSessionId: (id: string | null) => void;
  sendVisitorMessage: (text: string, attachedProduct?: AttachedProduct) => void;
  sendOwnerMessage: (sessionId: string, text: string, quote?: { productTitle: string; amount: number; notes?: string }) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  openChatWithProduct: (product: RoboticComponent) => void;
  unreadVisitorCount: number;
  unreadOwnerCount: number;
  markSessionReadByVisitor: () => void;
  markSessionReadByOwner: (sessionId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONFIG: 'robokraft_system_config',
  COMPONENTS: 'robokraft_components_v1',
  CART: 'robokraft_cart',
  ORDERS: 'robokraft_orders_v1',
  PROFILE: 'robokraft_user_profile_v1',
  CHAT_SESSIONS: 'robokraft_chat_sessions_v1',
  VISITOR_ID: 'robokraft_visitor_session_id',
  OWNER_MODE: 'robokraft_is_owner_mode'
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Mercer',
  email: 'alex.mercer@makertech.io',
  phone: '+1 (555) 482-9012',
  street: '742 Robotics Way, Suite 4B',
  city: 'Austin, TX',
  postalCode: '78701',
  country: 'United States'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. System Config
  const [systemConfig, setSystemConfig] = useState<AppSystemConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (saved) return { ...INITIAL_CONFIG, ...JSON.parse(saved) };
    } catch {
      // Fallback
    }
    return INITIAL_CONFIG;
  });

  // 2. Components
  const [components, setComponents] = useState<RoboticComponent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPONENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_COMPONENTS;
  });

  // 3. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  // 4. Orders & Tracking
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_ORDERS;
  });

  const [trackedOrderId, setTrackedOrderId] = useState<string | null>('RBK-8921');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // 5. User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
    } catch {
      // Fallback
    }
    return DEFAULT_PROFILE;
  });

  // 6. Modals and active selections
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<RoboticComponent | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 7. Owner Mode
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.OWNER_MODE) === 'true';
    } catch {
      return false;
    }
  });

  // 8. Visitor Session ID
  const [activeSessionId] = useState<string>(() => {
    try {
      const existing = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
      if (existing) return existing;
      const newId = 'session_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem(STORAGE_KEYS.VISITOR_ID, newId);
      return newId;
    } catch {
      return 'session_default';
    }
  });

  // 7. Chat Sessions
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHAT_SESSIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }

    // Initialize with a welcome session for the visitor
    const initialSession: ChatSession = {
      id: activeSessionId,
      visitorName: 'Visitor #304',
      createdAt: Date.now(),
      lastMessage: OWNER_WELCOME_MESSAGE,
      lastTimestamp: Date.now(),
      unreadByOwner: 0,
      unreadByVisitor: 1,
      messages: [
        {
          id: 'welcome_msg',
          sessionId: activeSessionId,
          sender: 'owner',
          senderName: INITIAL_CONFIG.ownerName,
          text: OWNER_WELCOME_MESSAGE,
          timestamp: Date.now()
        }
      ]
    };
    return [initialSession];
  });

  const [activeOwnerSessionId, setActiveOwnerSessionId] = useState<string | null>(activeSessionId);

  // Cross-tab broadcast channel for real-time synchronization
  const broadcastChannel = useMemo(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      return new BroadcastChannel('robokraft_sync_channel');
    }
    return null;
  }, []);

  // Save Config
  const updateSystemConfig = useCallback((updates: Partial<AppSystemConfig>) => {
    setSystemConfig((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updated));
      broadcastChannel?.postMessage({ type: 'CONFIG_UPDATED', payload: updated });
      return updated;
    });
  }, [broadcastChannel]);

  const resetSystemConfig = useCallback(() => {
    setSystemConfig(INITIAL_CONFIG);
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(INITIAL_CONFIG));
    broadcastChannel?.postMessage({ type: 'CONFIG_UPDATED', payload: INITIAL_CONFIG });
  }, [broadcastChannel]);

  // Save Components
  const addComponent = useCallback((comp: Omit<RoboticComponent, 'id'>) => {
    const newComponent: RoboticComponent = {
      ...comp,
      id: 'comp_' + Date.now().toString(36)
    };
    setComponents((prev) => {
      const updated = [newComponent, ...prev];
      localStorage.setItem(STORAGE_KEYS.COMPONENTS, JSON.stringify(updated));
      broadcastChannel?.postMessage({ type: 'COMPONENTS_UPDATED', payload: updated });
      return updated;
    });
  }, [broadcastChannel]);

  const updateComponent = useCallback((id: string, updates: Partial<RoboticComponent>) => {
    setComponents((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...updates } : item));
      localStorage.setItem(STORAGE_KEYS.COMPONENTS, JSON.stringify(updated));
      broadcastChannel?.postMessage({ type: 'COMPONENTS_UPDATED', payload: updated });
      return updated;
    });
  }, [broadcastChannel]);

  const deleteComponent = useCallback((id: string) => {
    setComponents((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.COMPONENTS, JSON.stringify(updated));
      broadcastChannel?.postMessage({ type: 'COMPONENTS_UPDATED', payload: updated });
      return updated;
    });
  }, [broadcastChannel]);

  const resetComponents = useCallback(() => {
    setComponents(INITIAL_COMPONENTS);
    localStorage.setItem(STORAGE_KEYS.COMPONENTS, JSON.stringify(INITIAL_COMPONENTS));
    broadcastChannel?.postMessage({ type: 'COMPONENTS_UPDATED', payload: INITIAL_COMPONENTS });
  }, [broadcastChannel]);

  // Cart operations
  const addToCart = useCallback((comp: RoboticComponent, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.component.id === comp.id);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.component.id === comp.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        updated = [...prev, { component: comp, quantity: qty }];
      }
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.component.id !== id);
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateCartQuantity = useCallback((id: string, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) {
        const filtered = prev.filter((item) => item.component.id !== id);
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(filtered));
        return filtered;
      }
      const updated = prev.map((item) =>
        item.component.id === id ? { ...item, quantity: qty } : item
      );
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.component.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Owner mode toggle
  const toggleOwnerMode = useCallback(() => {
    setIsOwnerMode((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEYS.OWNER_MODE, String(next));
      return next;
    });
  }, []);

  // Sync state across tabs
  useEffect(() => {
    if (!broadcastChannel) return;

    const handleMessage = (e: MessageEvent) => {
      const { type, payload } = e.data;
      if (type === 'CONFIG_UPDATED') {
        setSystemConfig(payload);
      } else if (type === 'COMPONENTS_UPDATED') {
        setComponents(payload);
      } else if (type === 'CHAT_UPDATED') {
        setChatSessions(payload);
      } else if (type === 'ORDERS_UPDATED') {
        setOrders(payload);
      }
    };

    broadcastChannel.addEventListener('message', handleMessage);
    return () => {
      broadcastChannel.removeEventListener('message', handleMessage);
    };
  }, [broadcastChannel]);

  // Order Operations
  const createOrder = useCallback((orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    items: Order['items'];
    totalAmount: number;
  }): Order => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `RBK-${randomDigits}`;
    const newOrder: Order = {
      orderId: newOrderId,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      shippingAddress: orderData.shippingAddress,
      carrier: 'RoboKraft Express Air (Carrier Code: RK-EXP)',
      trackingNumber: `RK-${Math.floor(100000000 + Math.random() * 900000000)}US`,
      status: 'order_placed',
      createdAt: Date.now(),
      estimatedDelivery: 'In 2-3 business days',
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      ownerNotes: 'Scheduled for bench testing & continuous voltage inspection by Mallick Akkah.',
      trackingSteps: [
        {
          step: 'order_placed',
          label: 'Order Confirmed',
          description: 'Order details received and robotics kit components reserved.',
          timestamp: Date.now(),
          completed: true,
          current: true,
          location: 'RoboKraft Lab'
        },
        {
          step: 'bench_tested',
          label: 'Hardware Bench-Tested & Verified',
          description: 'Inspected for pinout alignment and test flash by Mallick Akkah.',
          completed: false,
          location: 'Electronics Bench'
        },
        {
          step: 'dispatched',
          label: 'Handed to Logistics Carrier',
          description: 'Anti-static sealed and handed to air courier.',
          completed: false
        },
        {
          step: 'in_transit',
          label: 'In Transit',
          description: 'Departed sorting facility.',
          completed: false
        },
        {
          step: 'out_for_delivery',
          label: 'Out for Delivery',
          description: 'With local courier delivery vehicle.',
          completed: false
        },
        {
          step: 'delivered',
          label: 'Delivered',
          description: 'Package delivered to recipient.',
          completed: false
        }
      ]
    };

    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
      broadcastChannel?.postMessage({ type: 'ORDERS_UPDATED', payload: updated });
      return updated;
    });

    setTrackedOrderId(newOrderId);
    return newOrder;
  }, [broadcastChannel]);

  const updateOrderStatus = useCallback((orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders((prev) => {
      const updated = prev.map((ord) => {
        if (ord.orderId !== orderId) return ord;
        
        const statusOrder: OrderStatus[] = [
          'order_placed',
          'bench_tested',
          'dispatched',
          'in_transit',
          'out_for_delivery',
          'delivered'
        ];
        const targetIndex = statusOrder.indexOf(newStatus);

        const updatedSteps = ord.trackingSteps.map((step, idx) => ({
          ...step,
          completed: idx <= targetIndex,
          current: idx === targetIndex,
          timestamp: idx <= targetIndex ? (step.timestamp || Date.now()) : undefined
        }));

        return {
          ...ord,
          status: newStatus,
          ownerNotes: note !== undefined ? note : ord.ownerNotes,
          trackingSteps: updatedSteps
        };
      });

      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
      broadcastChannel?.postMessage({ type: 'ORDERS_UPDATED', payload: updated });
      return updated;
    });
  }, [broadcastChannel]);

  const getOrderById = useCallback((orderId: string) => {
    const cleanId = orderId.trim().toUpperCase();
    return orders.find((o) => o.orderId.toUpperCase() === cleanId);
  }, [orders]);

  const openOrderTracking = useCallback((orderId: string) => {
    setTrackedOrderId(orderId.trim().toUpperCase());
    setIsProfileModalOpen(true);
  }, []);

  const updateUserProfile = useCallback((updates: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Helper to persist chat sessions
  const saveChatSessions = useCallback((updated: ChatSession[]) => {
    setChatSessions(updated);
    localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(updated));
    broadcastChannel?.postMessage({ type: 'CHAT_UPDATED', payload: updated });
  }, [broadcastChannel]);

  // Visitor sending message
  const sendVisitorMessage = useCallback((text: string, attachedProduct?: AttachedProduct) => {
    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      sessionId: activeSessionId,
      sender: 'visitor',
      senderName: 'You (Visitor)',
      text,
      timestamp: Date.now(),
      attachedProduct
    };

    setChatSessions((prev) => {
      const existingIndex = prev.findIndex((s) => s.id === activeSessionId);
      let updated: ChatSession[];
      if (existingIndex >= 0) {
        const existing = prev[existingIndex];
        const updatedSession: ChatSession = {
          ...existing,
          lastMessage: text || (attachedProduct ? `Inquired about ${attachedProduct.title}` : 'Message'),
          lastTimestamp: Date.now(),
          unreadByOwner: existing.unreadByOwner + 1,
          messages: [...existing.messages, newMsg]
        };
        updated = [...prev];
        updated[existingIndex] = updatedSession;
      } else {
        const newSession: ChatSession = {
          id: activeSessionId,
          visitorName: 'Visitor #' + activeSessionId.slice(-4),
          createdAt: Date.now(),
          lastMessage: text,
          lastTimestamp: Date.now(),
          unreadByOwner: 1,
          unreadByVisitor: 0,
          messages: [newMsg]
        };
        updated = [newSession, ...prev];
      }
      localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(updated));
      broadcastChannel?.postMessage({ type: 'CHAT_UPDATED', payload: updated });
      return updated;
    });
  }, [activeSessionId, broadcastChannel]);

  // Owner sending message to a specific visitor
  const sendOwnerMessage = useCallback((
    sessionId: string, 
    text: string, 
    quote?: { productTitle: string; amount: number; notes?: string }
  ) => {
    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      sessionId,
      sender: 'owner',
      senderName: systemConfig.ownerName,
      text,
      timestamp: Date.now(),
      isQuote: !!quote,
      quoteDetails: quote
    };

    setChatSessions((prev) => {
      const updated = prev.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            lastMessage: text || (quote ? `Custom Quote: $${quote.amount}` : 'Quote'),
            lastTimestamp: Date.now(),
            unreadByVisitor: s.unreadByVisitor + 1,
            messages: [...s.messages, newMsg]
          };
        }
        return s;
      });
      localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(updated));
      broadcastChannel?.postMessage({ type: 'CHAT_UPDATED', payload: updated });
      return updated;
    });
  }, [systemConfig.ownerName, broadcastChannel]);

  // Mark session read
  const markSessionReadByVisitor = useCallback(() => {
    setChatSessions((prev) => {
      const updated = prev.map((s) => {
        if (s.id === activeSessionId) {
          return { ...s, unreadByVisitor: 0 };
        }
        return s;
      });
      localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(updated));
      return updated;
    });
  }, [activeSessionId]);

  const markSessionReadByOwner = useCallback((sessionId: string) => {
    setChatSessions((prev) => {
      const updated = prev.map((s) => {
        if (s.id === sessionId) {
          return { ...s, unreadByOwner: 0 };
        }
        return s;
      });
      localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const openChatWithProduct = useCallback((product: RoboticComponent) => {
    setIsChatOpen(true);
    sendVisitorMessage(
      `Hi Mallick, I'm interested in the ${product.title}. Can you confirm if this is suitable for my robotics project?`,
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category
      }
    );
  }, [sendVisitorMessage]);

  const currentVisitorSession = useMemo(() => {
    return chatSessions.find((s) => s.id === activeSessionId);
  }, [chatSessions, activeSessionId]);

  const unreadVisitorCount = useMemo(() => {
    return currentVisitorSession?.unreadByVisitor || 0;
  }, [currentVisitorSession]);

  const unreadOwnerCount = useMemo(() => {
    return chatSessions.reduce((acc, s) => acc + (s.unreadByOwner || 0), 0);
  }, [chatSessions]);

  return (
    <StoreContext.Provider
      value={{
        systemConfig,
        updateSystemConfig,
        resetSystemConfig,
        isConfigModalOpen,
        setIsConfigModalOpen,
        components,
        addComponent,
        updateComponent,
        deleteComponent,
        resetComponents,
        selectedComponent,
        setSelectedComponent,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        // Orders & Profile
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        trackedOrderId,
        setTrackedOrderId,
        openOrderTracking,
        userProfile,
        updateUserProfile,
        isProfileModalOpen,
        setIsProfileModalOpen,
        // Owner Mode
        isOwnerMode,
        setIsOwnerMode,
        toggleOwnerMode,
        chatSessions,
        activeSessionId,
        currentVisitorSession,
        activeOwnerSessionId,
        setActiveOwnerSessionId,
        sendVisitorMessage,
        sendOwnerMessage,
        isChatOpen,
        setIsChatOpen,
        openChatWithProduct,
        unreadVisitorCount,
        unreadOwnerCount,
        markSessionReadByVisitor,
        markSessionReadByOwner
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
