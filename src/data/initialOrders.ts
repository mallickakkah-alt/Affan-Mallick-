import { Order } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    orderId: 'RBK-8921',
    customerName: 'Alex Mercer',
    customerEmail: 'alex.mercer@makertech.io',
    customerPhone: '+1 (555) 482-9012',
    shippingAddress: {
      street: '742 Robotics Way, Suite 4B',
      city: 'Austin',
      state: 'TX',
      postalCode: '78701',
      country: 'United States'
    },
    carrier: 'RoboKraft Express Air (Carrier Code: RK-EXP)',
    trackingNumber: 'RK-984201948US',
    status: 'out_for_delivery',
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    estimatedDelivery: 'Today by 5:00 PM',
    totalAmount: 65.50,
    ownerNotes: 'All yellow TT gear motors and ultrasonic sensor pins verified on test bench by Mallick Akkah. Packed with ESD-safe foam.',
    items: [
      {
        componentId: 'smart-car-kit-4wd',
        title: '4WD Smart Obstacle-Avoidance Robotic Car Kit',
        quantity: 1,
        unitPrice: 58.00,
        image: '/src/assets/images/robot_car_kit_1790708870517.jpg',
        category: 'kits'
      },
      {
        componentId: 'jumper-wires-120pcs',
        title: '120-Piece Multi-Color Dupont Jumper Wire Bundle',
        quantity: 1,
        unitPrice: 7.50,
        category: 'cables_wiring'
      }
    ],
    trackingSteps: [
      {
        step: 'order_placed',
        label: 'Order Confirmed',
        description: 'Order received and parts reserved in RoboKraft Lab inventory.',
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
        completed: true,
        location: 'Online Storefront'
      },
      {
        step: 'bench_tested',
        label: 'Hardware Bench-Tested & Verified',
        description: 'Chassis motors and sensor continuity inspected by store owner Mallick Akkah.',
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
        completed: true,
        location: 'RoboKraft Lab Testing Station'
      },
      {
        step: 'dispatched',
        label: 'Handed to Logistics Carrier',
        description: 'Sealed with anti-static packaging and transferred to RoboKraft Air Express.',
        timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000,
        completed: true,
        location: 'Austin Hub Depot'
      },
      {
        step: 'in_transit',
        label: 'In Transit Through Sorting Facility',
        description: 'Package departed regional logistics hub.',
        timestamp: Date.now() - 18 * 60 * 60 * 1000,
        completed: true,
        location: 'DFW Sorting Facility'
      },
      {
        step: 'out_for_delivery',
        label: 'Out for Delivery',
        description: 'Courier vehicle dispatched with your robotics kit for final delivery.',
        timestamp: Date.now() - 2 * 60 * 60 * 1000,
        completed: true,
        current: true,
        location: 'Local Delivery Van #14'
      },
      {
        step: 'delivered',
        label: 'Delivered & Signature',
        description: 'Delivered to front door or lab reception.',
        completed: false,
        location: 'Austin, TX'
      }
    ]
  },
  {
    orderId: 'RBK-4015',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@stemlab.edu',
    customerPhone: '+1 (555) 791-3420',
    shippingAddress: {
      street: '12 Innovation Boulevard, Lab 203',
      city: 'Boston',
      state: 'MA',
      postalCode: '02115',
      country: 'United States'
    },
    carrier: 'DHL Maker Tech Logistics',
    trackingNumber: 'DHL-391820491MA',
    status: 'in_transit',
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    estimatedDelivery: 'Tomorrow, 11:30 AM',
    totalAmount: 35.70,
    ownerNotes: 'Uno R4 bootloader and USB-C connectivity verified on 5V supply.',
    items: [
      {
        componentId: 'arduino-uno-r4',
        title: 'Arduino Uno R4 Minima Dev Board',
        quantity: 1,
        unitPrice: 24.50,
        image: '/src/assets/images/arduino_uno_board_1790708856459.jpg',
        category: 'microcontrollers'
      },
      {
        componentId: 'usb-cable-pack-arduino',
        title: 'High-Speed Shielded USB Cable Prototyping Kit',
        quantity: 1,
        unitPrice: 11.20,
        category: 'cables_wiring'
      }
    ],
    trackingSteps: [
      {
        step: 'order_placed',
        label: 'Order Confirmed',
        description: 'Invoice generated and parts allocated.',
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
        completed: true,
        location: 'RoboKraft System'
      },
      {
        step: 'bench_tested',
        label: 'Silicon & Voltage Bench-Test',
        description: 'ARM Cortex M4 flash test passed with zero errors.',
        timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
        completed: true,
        location: 'Electronics Workbench'
      },
      {
        step: 'dispatched',
        label: 'Dispatched to DHL Tech Hub',
        description: 'Manifest logged and barcode scanned.',
        timestamp: Date.now() - 20 * 60 * 60 * 1000,
        completed: true,
        location: 'Boston Sorting Station'
      },
      {
        step: 'in_transit',
        label: 'In Transit',
        description: 'Package en route to local distribution facility.',
        timestamp: Date.now() - 6 * 60 * 60 * 1000,
        completed: true,
        current: true,
        location: 'Northeast Logistics Center'
      },
      {
        step: 'out_for_delivery',
        label: 'Out for Delivery',
        description: 'Scheduled for morning route.',
        completed: false,
        location: 'Boston Local Depot'
      },
      {
        step: 'delivered',
        label: 'Delivered',
        description: 'Package received and signed.',
        completed: false,
        location: 'Boston, MA'
      }
    ]
  },
  {
    orderId: 'RBK-7392',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus@vanceengineering.com',
    customerPhone: '+1 (555) 321-8899',
    shippingAddress: {
      street: '45 Silicon Parkway',
      city: 'San Jose',
      state: 'CA',
      postalCode: '95110',
      country: 'United States'
    },
    carrier: 'FedEx Priority Tech',
    trackingNumber: 'FDX-772910344CA',
    status: 'bench_tested',
    createdAt: Date.now() - 12 * 60 * 60 * 1000,
    estimatedDelivery: 'Oct 2, 2026',
    totalAmount: 59.50,
    ownerNotes: 'Acrylic 4-DOF robotic arm laser cuts inspected for smooth edge tolerances. Servos centered to 90 degrees by Mallick Akkah.',
    items: [
      {
        componentId: 'robotic-arm-4dof',
        title: '4-DOF Desktop Robotic Arm Mechanical Kit',
        quantity: 1,
        unitPrice: 49.00,
        category: 'kits'
      },
      {
        componentId: 'sg90-servo-pack-4',
        title: 'TowerPro SG90 9g Micro Servos (4-Pack with Horns)',
        quantity: 1,
        unitPrice: 10.50,
        category: 'motors_actuators'
      }
    ],
    trackingSteps: [
      {
        step: 'order_placed',
        label: 'Order Confirmed',
        description: 'Payment authorized and items picked from hardware rack.',
        timestamp: Date.now() - 12 * 60 * 60 * 1000,
        completed: true,
        location: 'RoboKraft Headquarters'
      },
      {
        step: 'bench_tested',
        label: 'Quality Inspection & Servo Calibration',
        description: 'All 4 servo gearboxes calibrated and mechanical claw alignment verified.',
        timestamp: Date.now() - 3 * 60 * 60 * 1000,
        completed: true,
        current: true,
        location: 'Owner Hardware Lab (Mallick Akkah)'
      },
      {
        step: 'dispatched',
        label: 'Carrier Hand-off',
        description: 'Awaiting courier collection.',
        completed: false,
        location: 'RoboKraft Shipping Dock'
      },
      {
        step: 'in_transit',
        label: 'In Transit',
        description: 'Scheduled transit route.',
        completed: false
      },
      {
        step: 'out_for_delivery',
        label: 'Out for Delivery',
        description: 'Courier vehicle out for delivery.',
        completed: false
      },
      {
        step: 'delivered',
        label: 'Delivered',
        description: 'Delivered to recipient.',
        completed: false
      }
    ]
  }
];
