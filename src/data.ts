export const PROJECTS_WEB = [
  {
    id: 'scholarsync',
    name: 'ScholarSync',
    desc: 'AI-powered academic platform built in 24 hours for Google GDSC TechSprint. Multi-doc RAG with citations — ChromaDB + Gemini 2.0. Winner.',
    tags: ['Next.js', 'FastAPI', 'ChromaDB', 'Gemini 2.0'],
    badge: '🏆 Hackathon Winner',
    link: 'https://github.com/Nutricalboii',
    live: true,
  },
  {
    id: 'notum',
    name: 'Notum',
    desc: 'Zero-knowledge encrypted notes vault. All encryption happens client-side — the server never sees plaintext. AES-256-GCM, PBKDF2 key derivation.',
    tags: ['AES-256-GCM', 'WebCrypto', 'TypeScript', 'React'],
    link: 'https://github.com/Nutricalboii',
  },
  {
    id: 'sovereign-plate',
    name: 'The Sovereign Plate',
    desc: 'Restaurant ordering and management platform with real-time SMS notifications for order updates. Twilio integration, MongoDB backend.',
    tags: ['Node.js', 'Express', 'MongoDB', 'Twilio'],
    link: 'https://github.com/Nutricalboii',
    live: true,
  },
  {
    id: 'adya',
    name: 'ADYA',
    desc: 'Desktop AI assistant with a native GUI, built to run locally with Gemini as the backend. PyQt5 UI, local model routing.',
    tags: ['Python', 'PyQt5', 'Gemini API', 'Electron'],
    link: 'https://github.com/Nutricalboii',
  },
  {
    id: 'linguacode',
    name: 'LinguaCode',
    desc: 'English-to-Python compiler with a push-down automata simulator. Formal languages coursework turned into a real tool.',
    tags: ['Python', 'Compiler Theory', 'PDA', 'Parser'],
    link: 'https://github.com/Nutricalboii',
  },
  {
    id: 'telegram-bot',
    name: 'Automation Bot',
    desc: 'Telegram bot handling scheduled tasks, webhook integrations, and utility commands. Python backend with Node.js webhooks.',
    tags: ['Python', 'Node.js', 'Telegram API', 'Webhooks'],
    link: 'https://github.com/Nutricalboii',
  },
];

export const PROJECTS_SYSTEMS = [
  {
    id: 'vaelix-os',
    name: 'Vaelix OS',
    desc: 'My own Linux distro. 13 rebuilds to get a clean first boot. Built on Ubuntu 24.04 + KDE Plasma + XanMod kernel.',
    tags: ['Linux', 'KDE Plasma', 'XanMod', 'Bash'],
    status: 'in-development',
    link: 'https://github.com/Nutricalboii',
  },
  {
    id: 'loq-control',
    name: 'LOQ Control Center',
    desc: 'Hardware control suite for Lenovo LOQ laptops. GTK4, D-Bus, RAPL, Cairo fan curve editor with 7 draggable points.',
    tags: ['Python', 'GTK4', 'D-Bus', 'systemd', 'ACPI'],
    status: 'production',
    link: 'https://github.com/Nutricalboii',
  },
  {
    id: 'librepods',
    name: 'LibrePods',
    desc: 'Open-source AirPods companion for Linux. Bluetooth protocol reverse engineering, ear detection, battery monitoring.',
    tags: ['Python', 'Bluetooth', 'D-Bus', 'Linux'],
    status: 'production',
    link: 'https://github.com/Nutricalboii',
  },
  {
    id: 'android-bringup',
    name: 'Android 13 Bring-up',
    desc: 'Bringing Android 13 / LineageOS to Moto G5 Plus (potter) — bootloader trust chain, kernel 3.18, Soong/Ninja build system.',
    tags: ['C++', 'Soong/Ninja', 'Android BSP', 'Kernel'],
    status: 'blocked',
    link: 'https://github.com/Nutricalboii',
  },
];

export const SKILLS = [
  {
    label: 'Languages',
    chips: ['JavaScript', 'TypeScript', 'Python', 'Bash', 'C', 'C++', 'Java'],
  },
  {
    label: 'Frontend',
    chips: ['React', 'Next.js', 'Tailwind CSS', 'GTK4', 'PyQt5', 'Electron', 'Framer Motion'],
  },
  {
    label: 'Backend',
    chips: ['Node.js', 'Express', 'FastAPI', 'Fastify', 'REST APIs', 'MongoDB', 'ChromaDB'],
  },
  {
    label: 'DevOps & Systems',
    chips: ['Linux', 'Android BSP', 'Bash Scripting', 'systemd', 'D-Bus', 'ACPI', 'Kernel Config', 'Git'],
  },
  {
    label: 'Tools & APIs',
    chips: ['GitHub', 'WebCrypto', 'Twilio', 'Gemini API', 'Telegram API', 'Vercel', 'Firebase'],
  },
];
