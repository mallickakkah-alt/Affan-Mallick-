import { RoboticComponent, AppSystemConfig } from '../types';

export const INITIAL_CONFIG: AppSystemConfig = {
  appName: 'RoboKraft Lab',
  tagline: 'Precision Robotics Kits, Microcontrollers & Prototyping Hardware',
  iconKey: 'bot',
  customIconUrl: '',
  themeColor: 'cyan',
  announcement: 'Free worldwide technical schematics with every kit · Live engineering support by Mallick Akkah',
  showAnnouncement: true,
  ownerName: 'Mallick Akkah',
  ownerEmail: 'mallickakkah@gmail.com',
  ownerStatus: 'online',
  ownerBio: 'Founder & Robotics Hardware Specialist. Ask me anything about pinout wiring, microcontrollers, or robotic arm builds.',
  ownerPhone: '+1 (555) 234-ROBO',
  currencySymbol: '$'
};

export const INITIAL_COMPONENTS: RoboticComponent[] = [
  {
    id: 'arduino-uno-r4',
    title: 'Arduino Uno R4 Minima Dev Board',
    category: 'microcontrollers',
    price: 24.50,
    stock: 42,
    rating: 4.9,
    reviewsCount: 184,
    image: '/src/assets/images/arduino_uno_board_1790708856459.jpg',
    badge: 'Popular',
    shortDescription: '32-bit RA4M1 microcontroller, 48MHz clock, 5V operating voltage with modern USB-C interface.',
    fullDescription: 'The Arduino UNO R4 Minima expands your maker possibilities with a powerful 32-bit microcontroller by Renesas. It provides 256 kB flash memory, 32 kB SRAM, and runs at 48 MHz—up to 16x faster than Uno R3. Supports CAN bus, 12-bit DAC, and 5V native logic for full compatibility with existing Arduino shields.',
    inStock: true,
    specs: [
      { label: 'Microcontroller', value: 'Renesas RA4M1 (Arm Cortex-M4)' },
      { label: 'Operating Voltage', value: '5 V' },
      { label: 'Input Voltage', value: '6-24 V DC' },
      { label: 'Digital I/O Pins', value: '14 (6 PWM)' },
      { label: 'Analog Input Pins', value: '6 (14-bit ADC)' },
      { label: 'Clock Speed', value: '48 MHz' },
      { label: 'Connector', value: 'USB Type-C' }
    ],
    pinoutInfo: {
      pinsCount: '14 Digital I/O, 6 Analog Inputs',
      operatingVoltage: '5V (Supports 6-24V Vin)',
      communication: 'UART, I2C, SPI, CAN bus',
      features: ['Native 12-bit DAC', 'Hardware capacitive touch', 'High-current output', 'Reset button with LED'],
      diagramDescription: 'Standard Uno footprint: Top row D0-D13 + AREF + GND; Bottom row Power rails (3.3V, 5V, GND, Vin) + Analog A0-A5.'
    },
    sampleCode: `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(115200);
  Serial.println("RoboKraft - Arduino Uno R4 Initialized!");
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}`
  },
  {
    id: 'arduino-nano-v3',
    title: 'Arduino Nano V3 ATmega328P Module',
    category: 'microcontrollers',
    price: 9.80,
    stock: 75,
    rating: 4.8,
    reviewsCount: 310,
    badge: 'Best Seller',
    shortDescription: 'Compact breadboard-friendly microcontroller with 8 analog inputs and Mini-USB interface.',
    fullDescription: 'A classic, miniature microcontroller board based on the ATmega328P. Perfect for compact robotic chassis, wearable electronics, and tight breadboard prototyping. Features 8 analog input pins (two more than standard Uno) and dual 3.3V / 5V power regulation.',
    inStock: true,
    specs: [
      { label: 'Microcontroller', value: 'ATmega328P (8-bit AVR)' },
      { label: 'Operating Voltage', value: '5 V' },
      { label: 'Input Voltage', value: '7-12 V' },
      { label: 'Digital I/O Pins', value: '22 (6 PWM)' },
      { label: 'Analog Input Pins', value: '8 (10-bit)' },
      { label: 'Flash Memory', value: '32 KB (2 KB bootloader)' },
      { label: 'Interface', value: 'Mini-USB / CH340G' }
    ],
    pinoutInfo: {
      pinsCount: '30 Pins Dual In-line Breadboard form factor',
      operatingVoltage: '5V Logic',
      communication: 'UART, SPI, I2C (A4/SDA, A5/SCL)',
      features: ['Dual 15-pin breadboard spacing', 'ICSP header', 'TX/RX transmission LEDs'],
      diagramDescription: 'Left bank: TX, RX, RST, GND, D2-D12; Right bank: D13, 3V3, REF, A0-A7, 5V, RST, GND, VIN.'
    },
    sampleCode: `// Read analog sensor and send to Serial
const int sensorPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int val = analogRead(sensorPin);
  Serial.print("Sensor A0: ");
  Serial.println(val);
  delay(200);
}`
  },
  {
    id: 'smart-car-kit-4wd',
    title: '4WD Smart Obstacle-Avoidance Robotic Car Kit',
    category: 'kits',
    price: 58.00,
    stock: 28,
    rating: 4.95,
    reviewsCount: 92,
    image: '/src/assets/images/robot_car_kit_1790708870517.jpg',
    badge: 'Complete Kit',
    shortDescription: 'Complete 4-wheel drive robotics platform with ultrasonic radar, dual motors, and acrylic chassis.',
    fullDescription: 'Comprehensive robotics builder kit featuring a dual-layer laser-cut acrylic chassis, 4 high-torque yellow TT gear motors with encoders, silicone grip tires, HC-SR04 ultrasonic rangefinder on an SG90 pan-tilt servo bracket, and an L298N motor driver shield. Comes with step-by-step wiring diagrams and pre-written navigation sketches.',
    inStock: true,
    specs: [
      { label: 'Drive System', value: '4-Wheel Independent DC Gear Motors' },
      { label: 'Reduction Ratio', value: '1:48 High Torque' },
      { label: 'Sensors Included', value: 'HC-SR04 Ultrasonic Distance, IR Line Tracker' },
      { label: 'Driver Board', value: 'L298N Dual H-Bridge Motor Driver' },
      { label: 'Power Source', value: '2x 18650 Battery Holder (7.4V)' },
      { label: 'Assembly Time', value: '~45 minutes' }
    ],
    pinoutInfo: {
      pinsCount: 'Motor Driver IN1-IN4, ENA/ENB PWM, Trig/Echo, Servo PWM',
      operatingVoltage: '7.4V - 12V Battery Pack',
      communication: 'Bluetooth / IR remote compatible',
      features: ['Autonomous obstacle avoidance', 'Line tracking algorithm', 'Speed speed modulation via PWM'],
      diagramDescription: 'L298N connects to Arduino D5, D6 (PWM speed) and D7, D8, D9, D10 (direction). Servo connected to D11, HC-SR04 Trig/Echo on D12/D13.'
    },
    sampleCode: `#include <Servo.h>
#define TRIG_PIN 12
#define ECHO_PIN 13

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  Serial.begin(9600);
}

long readDistance() {
  digitalWrite(TRIG_PIN, LOW); delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH);
  return duration * 0.034 / 2; // cm
}`
  },
  {
    id: 'robotic-arm-4dof',
    title: '4-DOF Desktop Robotic Arm Mechanical Kit',
    category: 'kits',
    price: 49.00,
    stock: 19,
    rating: 4.88,
    reviewsCount: 64,
    badge: 'Maker Favorite',
    shortDescription: 'Articulated laser-cut arm with 4 SG90 servos, mechanical claw gripper, and joystick control board.',
    fullDescription: 'Engineered for learning kinematics and robotic motion control. Includes laser-cut acrylic arm structural members, 4 micro-servos for waist rotation, shoulder pivot, elbow elevation, and precision parallel claw grasping. Includes a dual analog joystick control shield for manual manipulation.',
    inStock: true,
    specs: [
      { label: 'Degrees of Freedom', value: '4-DOF (Base, Shoulder, Elbow, Gripper)' },
      { label: 'Servos Included', value: '4x SG90 Micro Servos (180°)' },
      { label: 'Max Reach', value: '260 mm' },
      { label: 'Gripper Payload', value: 'Up to 90 grams' },
      { label: 'Control Method', value: 'Dual 2-Axis Analog Joysticks / Potentiometers' }
    ],
    pinoutInfo: {
      pinsCount: '4 Servo signal lines, 4 Analog input lines for joysticks',
      operatingVoltage: '5V (Dedicated external 2A power recommended)',
      communication: 'PWM control pulses (50Hz, 1ms - 2ms duty cycle)',
      features: ['Geared gripper mechanism', 'Smooth rotary base bearing', 'Cable management slots'],
      diagramDescription: 'Servos 1-4 connected to Arduino PWM pins D3, D5, D6, D9. Joysticks connect to A0, A1, A2, A3.'
    }
  },
  {
    id: 'jumper-wires-120pcs',
    title: '120-Piece Multi-Color Dupont Jumper Wire Bundle',
    category: 'cables_wiring',
    price: 7.50,
    stock: 140,
    rating: 4.9,
    reviewsCount: 420,
    badge: 'Essential',
    shortDescription: 'Set of 40 Male-Male, 40 Male-Female, and 40 Female-Female 20cm color-coded ribbon cables.',
    fullDescription: 'The indispensable breadboarding and robotics interconnect kit. Standard 2.54mm (0.1") pitch connectors compatible with Arduino Uno, Nano, Raspberry Pi, breadboards, and sensor headers. High-flexibility stranded copper cores with secure injection-molded terminal housings.',
    inStock: true,
    specs: [
      { label: 'Total Quantity', value: '120 Wires (3x 40-pin ribbons)' },
      { label: 'Connector Configurations', value: 'Male-Male (40), Male-Female (40), Female-Female (40)' },
      { label: 'Cable Length', value: '20 cm (7.87 inches)' },
      { label: 'Pitch Spacing', value: 'Standard 2.54 mm (0.1 inch)' },
      { label: 'Conductor Material', value: 'Pure copper stranded core (26 AWG)' }
    ],
    pinoutInfo: {
      pinsCount: 'Individual 1-pin Dupont crimp terminals',
      operatingVoltage: 'Up to 300V / 2A max rating',
      communication: 'Compatible with all digital/analog signals',
      features: ['Easy to separate single strands', '10 distinct color codings', 'Snug breadboard fit'],
      diagramDescription: 'Standard Dupont 2.54mm square connector housing with nickel-plated terminal pins.'
    }
  },
  {
    id: 'usb-cable-pack-arduino',
    title: 'High-Speed Shielded USB Cable Prototyping Kit',
    category: 'cables_wiring',
    price: 11.20,
    stock: 88,
    rating: 4.85,
    reviewsCount: 156,
    badge: 'High Quality',
    shortDescription: 'Trio of shielded cables: USB-A to Type-B (Uno), USB-A to Mini-B (Nano), and USB-A to Type-C.',
    fullDescription: 'Designed specifically for makers who work with multiple microcontroller form factors. Includes three heavy-duty shielded cables with ferrite beads to eliminate electrical motor noise and prevent upload disconnects while running robotics rigs.',
    inStock: true,
    specs: [
      { label: 'Included Cables', value: '1x USB-A to USB-B (1.5m), 1x USB-A to Mini-USB (1m), 1x USB-A to Type-C (1m)' },
      { label: 'Data Transfer Rate', value: 'USB 2.0 High Speed 480 Mbps' },
      { label: 'Shielding', value: 'Aluminum Mylar Foil + Braided Copper' },
      { label: 'Conductor Gauge', value: '24 AWG Power / 28 AWG Data' }
    ]
  },
  {
    id: 'hc-sr04-ultrasonic',
    title: 'HC-SR04 Ultrasonic Distance Sensor + Mounting Bracket',
    category: 'sensors',
    price: 4.90,
    stock: 96,
    rating: 4.75,
    reviewsCount: 230,
    badge: 'High Precision',
    shortDescription: 'Non-contact distance measurement module with 2cm to 400cm range, complete with acrylic mounting fixture.',
    fullDescription: 'Standard ultrasonic sonar module widely used in mobile robotics for obstacle detection and autonomous path mapping. Emits an 8-cycle 40kHz ultrasound burst and reads the reflected echo pulse width to compute millimeter-accurate distances.',
    inStock: true,
    specs: [
      { label: 'Working Voltage', value: '5 V DC' },
      { label: 'Static Current', value: '< 2 mA' },
      { label: 'Measuring Range', value: '2 cm - 400 cm' },
      { label: 'Measuring Angle', value: '15 degrees' },
      { label: 'Resolution', value: '0.3 cm' }
    ],
    pinoutInfo: {
      pinsCount: '4 Pins: VCC, Trig, Echo, GND',
      operatingVoltage: '5V DC',
      communication: 'TTL Pulse width',
      features: ['Dual transducer horns', 'Quick trigger response', 'Includes pre-drilled bracket'],
      diagramDescription: 'Pin 1: VCC (+5V), Pin 2: Trig (Pulse input), Pin 3: Echo (Pulse output), Pin 4: GND.'
    }
  },
  {
    id: 'l298n-motor-driver',
    title: 'L298N Dual H-Bridge DC & Stepper Motor Driver',
    category: 'motors_actuators',
    price: 6.40,
    stock: 62,
    rating: 4.82,
    reviewsCount: 195,
    badge: 'Robotics Core',
    shortDescription: 'Controls two DC motors bidirectionally with PWM speed regulation or one 4-wire bipolar stepper.',
    fullDescription: 'Heavy-duty motor driver module built around the L298N dual H-bridge chip. Features an onboard 78M05 5V regulator, aluminum finned heat sink, large terminal screw blocks for motor wiring, and optocoupler isolation for microcontroller protection.',
    inStock: true,
    specs: [
      { label: 'Driver Chip', value: 'L298N Dual Full-Bridge' },
      { label: 'Drive Voltage', value: '5 V - 35 V DC' },
      { label: 'Peak Drive Current', value: '2 A per bridge' },
      { label: 'Logic Voltage', value: '5 V' },
      { label: 'Maximum Power', value: '25 Watts' }
    ],
    pinoutInfo: {
      pinsCount: 'Screw terminals for Motors A & B, Power Vin/GND/5V; 6-pin logic header',
      operatingVoltage: 'Logic 5V, Motor supply 5-35V',
      communication: 'Direction pins IN1-IN4, PWM Enable pins ENA & ENB',
      features: ['Integrated 5V regulator jumper', 'Back-EMF flyback diodes', 'Heavy heat sink'],
      diagramDescription: 'ENA, IN1, IN2 control Motor A. ENB, IN3, IN4 control Motor B. Screw terminals OUT1/OUT2 for Left Motor, OUT3/OUT4 for Right Motor.'
    }
  },
  {
    id: 'sg90-servo-pack-4',
    title: 'TowerPro SG90 9g Micro Servos (4-Pack with Horns)',
    category: 'motors_actuators',
    price: 10.50,
    stock: 80,
    rating: 4.78,
    reviewsCount: 340,
    badge: 'Value Pack',
    shortDescription: 'Pack of 4 lightweight 9-gram servos with 180-degree rotation and assorted mechanical output horns.',
    fullDescription: 'The maker community workhorse for steering mechanisms, camera gimbals, robotic claws, and sensor sweepers. Operates on 4.8V - 6V with a standard 3-pin Dupont cable (Ground, VCC, PWM Signal).',
    inStock: true,
    specs: [
      { label: 'Operating Speed', value: '0.12 sec / 60 degrees (4.8V)' },
      { label: 'Stall Torque', value: '1.8 kg-cm (4.8V)' },
      { label: 'Operating Voltage', value: '4.8 V - 6.0 V' },
      { label: 'Weight', value: '9 grams per servo' },
      { label: 'Gear Type', value: 'Nylon geartrain' }
    ],
    pinoutInfo: {
      pinsCount: '3-wire standard servo cable (Brown: GND, Red: +5V, Orange: Signal PWM)',
      operatingVoltage: '4.8V - 6V',
      communication: '50Hz PWM pulse width control (1000us - 2000us)',
      features: ['Includes single, dual, and star servo arms', 'Lightweight 9g casing'],
      diagramDescription: 'Pin 1 (Brown) -> GND, Pin 2 (Red) -> 5V, Pin 3 (Orange) -> Arduino PWM Pin (e.g., Pin 9).'
    }
  },
  {
    id: 'solderless-breadboard-830',
    title: 'MB-102 830-Point Solderless Prototyping Breadboard',
    category: 'cables_wiring',
    price: 5.20,
    stock: 110,
    rating: 4.89,
    reviewsCount: 275,
    badge: 'High Reliability',
    shortDescription: 'Full-size prototyping board with independent power distribution rails and self-adhesive foam backing.',
    fullDescription: 'Features 830 tie-points organized into two power distribution buses and a 630-point terminal matrix with clear row/column alphanumeric coordinates. Nickel-plated phosphor bronze spring clips ensure tight contact and corrosion-free operation for over 10,000 insertions.',
    inStock: true,
    specs: [
      { label: 'Total Tie Points', value: '830 Points (630 terminal + 200 distribution)' },
      { label: 'Standard Pitch', value: '2.54 mm (0.1 inch)' },
      { label: 'Accepted Wire Gauges', value: '20 to 29 AWG' },
      { label: 'Dimensions', value: '165 x 55 x 8.5 mm' }
    ]
  },
  {
    id: 'esp32-devkit-v1',
    title: 'ESP32 NodeMCU WiFi + Bluetooth CP2102 Dev Board',
    category: 'microcontrollers',
    price: 13.90,
    stock: 54,
    rating: 4.93,
    reviewsCount: 165,
    badge: 'IoT Ready',
    shortDescription: 'Dual-core Xtensa 32-bit LX6 running up to 240MHz with integrated 2.4GHz Wi-Fi and Bluetooth BLE.',
    fullDescription: 'The premier choice for wireless robotic telemetry, web-controlled rovers, and video stream robot builds. Has 30 accessible GPIO pins, built-in Hall effect sensors, capacitive touch sensors, and hardware encryption acceleration.',
    inStock: true,
    specs: [
      { label: 'Processor', value: 'Dual-Core Tensilica Xtensa 32-bit LX6' },
      { label: 'Clock Frequency', value: 'Up to 240 MHz' },
      { label: 'Wireless', value: '802.11 b/g/n Wi-Fi + Bluetooth 4.2 BLE' },
      { label: 'SRAM / Flash', value: '520 KB SRAM / 4 MB SPI Flash' },
      { label: 'USB Bridge', value: 'Silicon Labs CP2102' }
    ],
    pinoutInfo: {
      pinsCount: '30 Pins Breadboard layout',
      operatingVoltage: '3.3V Logic (5V Micro-USB in)',
      communication: 'Wi-Fi, BLE, 3x UART, 2x SPI, 2x I2C, 16x PWM',
      features: ['Dual core processing', 'Over-the-Air (OTA) firmware update support', 'Built-in antenna'],
      diagramDescription: 'Supports EN & Boot buttons, 3.3V power regulator, and GPIO0-GPIO39 multiplexed pins.'
    }
  },
  {
    id: 'battery-holder-18650-dc',
    title: 'Dual 18650 Battery Case with DC Barrel Jack & Switch',
    category: 'power_modules',
    price: 6.80,
    stock: 70,
    rating: 4.79,
    reviewsCount: 118,
    badge: 'Robotics Power',
    shortDescription: '7.4V lithium pack enclosure with rocker on/off switch and standard 5.5 x 2.1mm DC plug for Arduino.',
    fullDescription: 'Safe and neat power enclosure for autonomous rovers. Holds two 3.7V 18650 lithium-ion cells in series to provide 7.4V to 8.4V nominal voltage. Plugs directly into Arduino DC barrel jack or motor driver terminals.',
    inStock: true,
    specs: [
      { label: 'Configuration', value: '2S (2x 18650 in Series)' },
      { label: 'Nominal Voltage', value: '7.4 V DC (8.4V peak)' },
      { label: 'Connector', value: 'Molded 5.5 x 2.1 mm DC Plug (Center Positive)' },
      { label: 'Switch', value: 'Built-in SPST Rocker Switch' }
    ]
  }
];

export const OWNER_WELCOME_MESSAGE = "Hello! I am Mallick Akkah, the owner & robotics engineer here. How can I help you with your Arduino or robotics setup? Feel free to ask about wiring, cable types, pinout logic, or kit parts!";
