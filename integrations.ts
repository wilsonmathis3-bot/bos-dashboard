export interface Integration {
  id: number;
  title: string;
  description: string;
  category: string;
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  glowColor: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "biological",
    title: "Biological & Neurological Synthesis",
    subtitle: "Merging AI with the deepest layers of human biology",
    color: "#ffb347",
    glowColor: "rgba(255, 179, 71, 0.3)",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283084951/VoBjRMdPnbNXtP7EgJQhuX/section-biological-V9LpajQ9PJWD2fXCuustLh.webp",
  },
  {
    id: "environmental",
    title: "Environmental & Ecological Integration",
    subtitle: "AI orchestrating Earth's natural systems",
    color: "#00f0ff",
    glowColor: "rgba(0, 240, 255, 0.3)",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283084951/VoBjRMdPnbNXtP7EgJQhuX/section-environmental-7GGiBWCF5S9aDHkZdJVbaM.webp",
  },
  {
    id: "consciousness",
    title: "Consciousness & Sensory Manipulation",
    subtitle: "Expanding the boundaries of human perception",
    color: "#a78bfa",
    glowColor: "rgba(167, 139, 250, 0.3)",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283084951/VoBjRMdPnbNXtP7EgJQhuX/section-consciousness-H7iDZRZ3jxPAdwMxZQV8V6.webp",
  },
  {
    id: "architecture",
    title: "Architecture & Infrastructure",
    subtitle: "Living buildings and self-aware cities",
    color: "#14f5c7",
    glowColor: "rgba(20, 245, 199, 0.3)",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283084951/VoBjRMdPnbNXtP7EgJQhuX/section-architecture-KD8cTUHgzcXGWs9ZeDsfd7.webp",
  },
  {
    id: "optimization",
    title: "Niche Human Optimization",
    subtitle: "Hyper-personalized enhancement of daily life",
    color: "#f472b6",
    glowColor: "rgba(244, 114, 182, 0.3)",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663283084951/VoBjRMdPnbNXtP7EgJQhuX/hero-neural-network-66ndwA8oDkZq2ZcwAAsM2Y.webp",
  },
];

export const integrations: Integration[] = [
  {
    id: 1,
    title: "AI-Mediated Epigenetic Trauma Resolution System",
    description: "An integration of AI pattern recognition with epigenetic sequencing to identify specific methylation patterns linked to generational trauma, paired with targeted, personalized neuro-linguistic programming and biofeedback to progressively reverse these epigenetic markers.",
    category: "biological",
  },
  {
    id: 2,
    title: "Personal Pheromonal Chemistry Synthesizer",
    description: "An AI system that continuously analyzes a user's sweat and physiological state to predict social compatibility and synthesize micro-doses of personalized pheromones via a wearable patch, optimizing interpersonal chemistry in real-time.",
    category: "biological",
  },
  {
    id: 3,
    title: "Symbiotic Gut-Brain Axis Modulator",
    description: "An ingestible, bio-compatible nanotech sensor suite controlled by an external AI that monitors real-time microbiome composition and directly synthesizes specific psychobiotics to optimize the user's mood, focus, or sleep architecture.",
    category: "biological",
  },
  {
    id: 4,
    title: "Vocal Cord Degeneration Predictive Remapping",
    description: "An AI that analyzes micro-tremors in a person's voice over years to predict specific vocal cord atrophy patterns, preemptively generating personalized vocal exercises and designing custom acoustic implants to preserve the user's exact youthful voice signature.",
    category: "biological",
  },
  {
    id: 5,
    title: "Chronotype-Specific Bioluminescent Circadian Lighting",
    description: "AI integration with genetically modified bioluminescent organisms integrated into home architecture. The AI monitors the inhabitants' circadian rhythms and adjusts the specific nutrient mix fed to the organisms to produce the exact light wavelength and intensity needed for optimal sleep-wake cycles.",
    category: "biological",
  },
  {
    id: 6,
    title: "Autonomous Mycorrhizal Network Manager",
    description: "An AI system integrated with deep-soil biosensors that translates chemical signals within forest fungal networks (the \"wood wide web\"), identifying localized nutrient deficiencies or pathogen attacks, and autonomously directing drones to inoculate specific soil nodes.",
    category: "environmental",
  },
  {
    id: 7,
    title: "Deep-Earth Tectonic Stress Sonification System",
    description: "An AI that translates deep geological anomalies and tectonic plate stress data into complex, continuous acoustic soundscapes (sonification), allowing geologists to \"listen\" to the earth's crust and intuitively detect impending seismic events before standard predictive models trigger.",
    category: "environmental",
  },
  {
    id: 8,
    title: "Hyperlocal Microclimate Bio-Acoustic Modulator",
    description: "An AI that predicts hyperlocal urban heat islands and dynamically adjusts the frequency and amplitude of urban soundscapes (using directional speakers) to manipulate localized air density and moisture condensation, effectively cooling specific city blocks.",
    category: "environmental",
  },
  {
    id: 9,
    title: "Autonomous Ocean Current Energy Harvester Swarm",
    description: "A swarm of bio-mimetic underwater drones controlled by a centralized AI that predicts micro-shifts in deep ocean currents, autonomously repositioning the swarm to harvest kinetic energy while simultaneously avoiding and protecting migratory marine life corridors.",
    category: "environmental",
  },
  {
    id: 10,
    title: "AI-Guided Paleoclimate Sediment Memory Reconstructor",
    description: "An AI model that analyzes the molecular structure of deep lake sediments to reconstruct highly localized, day-by-day weather patterns from millions of years ago, creating a highly accurate \"memory\" of past climates to predict hyper-specific future climate anomalies.",
    category: "environmental",
  },
  {
    id: 11,
    title: "Cross-Sensory Synesthesia Simulator",
    description: "An AI-driven neural interface that translates real-time sensory input from one modality to another (e.g., converting the chemical composition of food into a specific acoustic symphony), allowing users to safely experience and control induced synesthesia.",
    category: "consciousness",
  },
  {
    id: 12,
    title: "Lucid Dream Narrative Architect",
    description: "An AI system utilizing targeted ultrasonic neurofeedback to not only induce lucid dreaming but to dynamically generate and inject complex narrative structures, characters, and environments into the user's dream state based on their pre-sleep psychological needs.",
    category: "consciousness",
  },
  {
    id: 13,
    title: "Bereavement Neural Echo Generator",
    description: "Unlike standard \"griefbots\" that mimic text, this AI analyzes a deceased loved one's entire digital footprint to generate personalized, multi-sensory VR environments that simulate the exact emotional and physiological feeling of their presence, guided by real-time psychological monitoring to ensure healthy grief processing.",
    category: "consciousness",
  },
  {
    id: 14,
    title: "Collective Intelligence Swarm Governance Engine",
    description: "An AI platform for local governance that bypasses traditional voting by continuously analyzing the aggregated biometric and neuro-emotional responses of a population to proposed policies, finding the mathematical point of maximum collective social harmony rather than simple majority rule.",
    category: "consciousness",
  },
  {
    id: 15,
    title: "End-of-Life Personalized Timeline Architect",
    description: "An AI that utilizes comprehensive genomic, environmental, and lifestyle data to predict an individual's physiological decline timeline with high precision, autonomously curating and scheduling life experiences, financial distributions, and psychological preparation tailored to their specific trajectory.",
    category: "consciousness",
  },
  {
    id: 16,
    title: "Symbiotic Self-Healing Architectural Bioskin",
    description: "An AI that manages a living, biological \"skin\" applied to buildings. The AI predicts micro-fractures based on structural stress and directs the biological material to grow and calcify specifically in areas requiring reinforcement, effectively creating self-healing infrastructure.",
    category: "architecture",
  },
  {
    id: 17,
    title: "Urban Crowd Stampede Fluid Dynamics Predictor",
    description: "An AI system utilizing advanced fluid dynamics modeling applied to human movement, capable of predicting the exact moment a crowd will transition from safe density to a fatal crush, autonomously deploying physical barriers or acoustic deterrents seconds before the transition occurs.",
    category: "architecture",
  },
  {
    id: 18,
    title: "Architectural Resonance Health Optimizer",
    description: "An AI that analyzes the resonant frequency of a building's materials and the ambient noise of the city, dynamically altering the tension in structural cables to tune the building's overall vibration to frequencies scientifically proven to lower cortisol levels in its inhabitants.",
    category: "architecture",
  },
  {
    id: 19,
    title: "Atmospheric River Steering via Acoustic Levitation",
    description: "An AI that predicts the path of atmospheric rivers and utilizes massive arrays of ground-based acoustic levitation nodes to create high-pressure atmospheric walls, subtly steering heavy rainfall away from flood-prone areas toward drought-stricken reservoirs.",
    category: "architecture",
  },
  {
    id: 20,
    title: "Autonomous Cemetery Decomposition Predictor",
    description: "An AI system for urban planning that analyzes soil composition, weather patterns, and burial data to precisely predict the decomposition timeline of human remains, optimizing land reuse and managing the biochemical runoff in densely populated cities.",
    category: "architecture",
  },
  {
    id: 21,
    title: "Soil-to-Plate Molecular Gastronomy AI",
    description: "An AI that tracks the specific molecular nutrient profile of a vegetable from the moment it is planted in a smart-farm to the moment it enters a smart-kitchen, autonomously directing the cooking appliances to use specific temperatures and techniques to maximize the bioavailability of its unique nutrient profile.",
    category: "optimization",
  },
  {
    id: 22,
    title: "Childhood Developmental Trajectory Modeler",
    description: "An AI that analyzes a child's micro-expressions, play patterns, and linguistic development in real-time, providing parents with a dynamically updating, scientifically optimized daily schedule of specific games, interactions, and nutritional inputs to maximize the child's unique cognitive potential.",
    category: "optimization",
  },
  {
    id: 23,
    title: "Personal Electromagnetic Field Harmonizer",
    description: "An AI wearable that continuously maps the chaotic EMF radiation in a user's environment (from Wi-Fi, power lines, etc.) and generates a personalized, opposing electromagnetic phase-shift field to perfectly neutralize the radiation before it interacts with the user's biology.",
    category: "optimization",
  },
  {
    id: 24,
    title: "Interspecies Bioelectric Translator",
    description: "An AI model trained on the bioelectric signals of specific plant species, capable of translating human emotional states into bioelectric frequencies that plants can \"understand,\" fostering a measurable symbiotic growth response in indoor agriculture.",
    category: "optimization",
  },
  {
    id: 25,
    title: "Ancestral Genetic Trait Activator",
    description: "An AI that analyzes a user's genome to identify dormant traits from specific ancestral lineages (e.g., high-altitude oxygen efficiency, cold resistance) and designs highly specific, personalized epigenetic protocols (diet, extreme temperature exposure, specific stressors) to safely reactivate those dormant traits.",
    category: "optimization",
  },
];
