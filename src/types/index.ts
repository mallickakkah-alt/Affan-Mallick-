export interface ComponentSpec {
  label: string;
  value: string;
}

export interface PinoutInfo {
  pinsCount: string;
  operatingVoltage: string;
  communication: string;
  features: string[];
  diagramDescription: string;
}

export interface RoboticComponent {
  id: string;
  title: string;
  category: 'microcontrollers' | 'kits' | 'cables_wiring' | 'sensors' | 'motors_actuators' | 'power_modules';
  price: number;
  stock: number;
  rating: number;
  reviewsCount: number;
  image?: string;
  badge?: string;
  shortDescription: string;
  fullDescription: string;
  specs: ComponentSpec[];
  pinoutInfo?: PinoutInfo;
  sampleCode?: string;
  inStock: boolean;
}

export type ThemeColor = 'cyan' | 'amber' | 'emerald' | 'blue' | 'purple';

export interface AppSystemConfig {
  appName: string;
  tagline: string;
  iconKey: 'bot' | 'chip' | 'cpu' | 'circuit' | 'sparkles' | 'zap' | 'shield' | 'radio' | 'custom';
  customIconUrl?: string;
  themeColor: ThemeColor;
  announcement: string;
  showAnnouncement: boolean;
  ownerName: string;
  ownerEmail: string;
  ownerStatus: 'online' | 'in_lab' | 'consulting';
  ownerBio: string;
  ownerPhone: string;
  currencySymbol: string;
}

export interface AttachedProduct {
  id: string;
  title: string;
  price: number;
  image?: string;
  category?: string;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  sender: 'visitor' | 'owner' | 'system';
  senderName: string;
  text: string;
  timestamp: number;
  attachedProduct?: AttachedProduct;
  isQuote?: boolean;
  quoteDetails?: {
    productTitle: string;
    amount: number;
    notes?: string;
  };
}

export interface ChatSession {
  id: string;
  visitorName: string;
  visitorEmail?: string;
  createdAt: number;
  lastMessage: string;
  lastTimestamp: number;
  unreadByOwner: number;
  unreadByVisitor: number;
  messages: ChatMessage[];
}

export interface CartItem {
  component: RoboticComponent;
  quantity: number;
}

export type OrderStatus = 
  | 'order_placed'
  | 'bench_tested'
  | 'dispatched'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered';

export interface TrackingStep {
  step: string;
  label: string;
  description: string;
  timestamp?: number;
  completed: boolean;
  current?: boolean;
  location?: string;
}

export interface OrderItem {
  componentId: string;
  title: string;
  quantity: number;
  unitPrice: number;
  image?: string;
  category?: string;
}

export interface Order {
  orderId: string;
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
  carrier: string;
  trackingNumber: string;
  status: OrderStatus;
  createdAt: number;
  estimatedDelivery: string;
  items: OrderItem[];
  totalAmount: number;
  trackingSteps: TrackingStep[];
  ownerNotes?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

