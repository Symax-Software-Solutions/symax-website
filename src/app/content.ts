// Site content — easy to update without touching components

export const SITE_CONTENT = {
  company: {
    name: 'Symax Software Solutions',
    tagline: 'Precision Timing. Live Graphics. One Platform.',
    subtitle: 'Powering the world\'s biggest cycling events since 2022.',
    email: 'michael.voss@symaxsoftware.com',
    instagram: 'https://instagram.com/symaxsoftware',
    year: 2026,
  },

  nav: {
    links: [
      { label: 'Home', anchor: 'hero' },
      { label: 'Products', anchor: 'products' },
      { label: 'Portfolio', anchor: 'portfolio' },
      { label: 'Contact', anchor: 'contact' },
    ],
  },

  hero: {
    headline: 'Precision Timing.',
    headlineLine2: 'Live Graphics.',
    headlineLine3: 'One Platform.',
    subtitle: 'Powering the world\'s biggest cycling events since 2022.',
    cta: 'Explore Our Solutions',
    backgroundImage: 'assets/images/banner.jpg',
  },

  products: [
    {
      id: 'phoenix',
      name: 'Phoenix Timing & Scoring',
      tagline: 'The cloud timing platform built for serious events.',
      description: 'Hardware-agnostic cloud platform delivering real-time results at scale. Multi-tenant architecture means one deployment powers dozens of organizations. Trusted by Swisstiming at UCI World Championships.',
      logo: 'assets/images/phoenix_timing_scoring_logo.png',
      icon: null,
      badge: 'UCI World Championships',
      highlights: [
        'Cloud-based — access anywhere',
        'Hardware-agnostic RFID support',
        'Real-time live leaderboards',
        'Multi-tenant architecture',
        'Broadcast-ready graphics output',
      ],
      link: '/phoenix',
    },
    {
      id: 'racehub',
      name: 'RaceHub',
      tagline: 'Event registration, reimagined.',
      description: 'The modern registration platform built for cycling. Athlete profiles, seamless Phoenix integration, and simple pricing — €1 per registration, no hidden fees. Organizers love it. Athletes use it once and never go back.',
      logo: 'assets/images/race_hub_logo.png',
      icon: null,
      badge: '€1 / registration',
      highlights: [
        'Athlete profiles & history',
        'Seamless Phoenix integration',
        'Simple €1/registration pricing',
        'Mobile-optimized athlete flow',
        'Organizer dashboard',
      ],
      link: '#contact',
    },
  ],

  features: [
    { icon: '☁️', title: 'Cloud-Based', description: 'Access your timing platform anywhere. No local installs, no USB keys, no server rooms.' },
    { icon: '🔌', title: 'Hardware-Agnostic', description: 'Works with MYLAPS, Race Result, and more RFID timing systems.' },
    { icon: '📊', title: 'Live Graphics', description: 'Broadcast-ready overlays and lower-thirds for any screen. WorldTour quality at any level.' },
    { icon: '📱', title: 'Mobile-First', description: 'Athletes check results on their phones. Organizers manage events on the go. It just works.' },
    { icon: '🌍', title: 'Multi-Tenant', description: 'One platform, multiple organizations. Isolated data, shared infrastructure, zero compromise.' },
    { icon: '⚡', title: 'Real-Time', description: 'Instant results the moment a rider crosses the line. Live leaderboards. Zero delay.' },
  ],

  portfolio: [
    {
      id: 'pumptrack-wc',
      title: 'Pumptrack World Championships',
      subtitle: '2022 – 2025',
      description: 'Official timing & graphics for every edition. From Santiago to the latest — we\'ve been there from day one.',
      flag: '🏆',
      image: 'assets/images/pumptrack_banner.jpg',
      tags: ['Pumptrack', 'UCI', 'Graphics', 'Timing'],
    },
    {
      id: 'german-nationals',
      title: 'German National Road Cycling Championships',
      subtitle: 'Road Cycling',
      description: 'UCI-level road cycling with Phoenix. Full live results and broadcast graphics for national championship racing.',
      flag: '🇩🇪',
      image: null,
      tags: ['Road', 'UCI', 'National'],
    },
    {
      id: 'yogyakarta',
      title: 'Yogyakarta International',
      subtitle: '2,300 Riders',
      description: 'Large-scale road cycling event in Indonesia. Phoenix handled 2,300 rider entries with real-time results throughout.',
      flag: '🇮🇩',
      image: null,
      tags: ['Road', 'International', 'Scale'],
    },
    {
      id: 'uci-mtb-2024',
      title: 'UCI MTB World Championships 2024',
      subtitle: 'Switzerland',
      description: 'Contracted by Swisstiming for broadcast-quality live graphics at the UCI Mountain Bike World Championships.',
      flag: '🇨🇭',
      image: null,
      tags: ['MTB', 'UCI', 'Swisstiming', 'Broadcast'],
    },
    {
      id: 'eifel-christmas',
      title: 'Eifel Christmas Races',
      subtitle: 'Regional Road Cycling',
      description: 'Bringing professional-grade timing and graphics to regional road cycling events in the Eifel region of Germany.',
      flag: '🎄',
      image: null,
      tags: ['Road', 'Regional', 'Germany'],
    },
    {
      id: 'austria-2026',
      title: 'Austria Qualifier 2026',
      subtitle: 'AREA 47 — First Phoenix 2.0 Deployment',
      description: 'The first live deployment of Phoenix 2.0 cloud platform. New architecture, same precision. The future starts here.',
      flag: '🇦🇹',
      image: null,
      tags: ['Pumptrack', 'Phoenix 2.0', 'Cloud'],
    },
  ],

  partners: [
    { name: 'Velosolutions', logo: 'assets/logos/velosolutions_icon_white.png', url: 'https://velosolutions.com' },
    { name: 'UCI', logo: null, text: 'UCI', url: 'https://uci.org' },
    { name: 'Swisstiming', logo: null, text: 'Swisstiming', url: 'https://swisstiming.com' },
    { name: 'MYLAPS', logo: 'assets/logos/mylaps.png', url: 'https://mylaps.com' },
    { name: 'Red Bull', logo: 'assets/logos/red-bull-pumptrack-logo.png', url: 'https://redbull.com' },
  ],

  testimonials: [
    {
      quote: 'Phoenix transformed how we deliver race results. The real-time data and broadcast graphics are a step above anything we\'ve used before.',
      author: 'Race Timing Director',
      role: 'Professional Timing Provider',
      initials: 'TD',
    },
    {
      quote: 'The graphics quality rivals what you see on WorldTour broadcasts. Our audience and sponsors were blown away by the production value.',
      author: 'Event Organizer',
      role: 'International Cycling Event',
      initials: 'EO',
    },
    {
      quote: 'Finally, a platform that works with our existing hardware. Zero switching costs, immediate upgrade in results quality.',
      author: 'Timing Professional',
      role: 'UCI Event Contractor',
      initials: 'TP',
    },
  ],

  contact: {
    headline: 'Ready to Elevate Your Events?',
    subtext: 'Whether you\'re timing a local race or the world championships — let\'s talk about what Phoenix can do for you.',
    email: 'michael.voss@symaxsoftware.com',
  },

  phoenix: {
    hero: {
      headline: 'Phoenix Timing & Scoring',
      tagline: 'The cloud timing platform built for serious events.',
      description: 'Hardware-agnostic, cloud-native, broadcast-ready. Phoenix powers UCI World Championships and local club races with equal precision.',
      badge: 'Trusted by Swisstiming · UCI World Championships',
    },
    features: [
      {
        icon: '☁️',
        title: 'Cloud-Native',
        description: 'No local servers. No USB keys. Access your event from anywhere — timing desk, finish line, or home office.',
      },
      {
        icon: '🔌',
        title: 'Hardware-Agnostic',
        description: 'Works with MYLAPS, Race Result, and other RFID timing systems. Bring your existing hardware — Phoenix handles the rest.',
      },
      {
        icon: '📊',
        title: 'Broadcast Graphics',
        description: 'WorldTour-quality lower-thirds and live leaderboards. Output directly to broadcast feeds, screens, or streaming.',
      },
      {
        icon: '🏢',
        title: 'Multi-Tenant',
        description: 'One platform, multiple organizations. Complete data isolation per crew — perfect for timing service providers.',
      },
      {
        icon: '⚡',
        title: 'Real-Time Results',
        description: 'Zero-delay results the moment a rider crosses the line. Live leaderboards update instantly for athletes and spectators.',
      },
      {
        icon: '🔗',
        title: 'RaceHub Integration',
        description: 'Seamless connection with RaceHub registration. Start lists flow straight in — no manual imports, no CSV headaches.',
      },
    ],
    useCases: [
      { label: 'Pumptrack Racing', icon: '🚵' },
      { label: 'Road Cycling', icon: '🚴' },
      { label: 'Cyclocross', icon: '🌲' },
      { label: 'Criterium', icon: '🏙️' },
      { label: 'BMX Racing', icon: '🏁' },
      { label: 'MTB', icon: '⛰️' },
    ],
    download: {
      headline: 'Download Phoenix',
      description: 'Get the latest version of Phoenix Timing & Scoring. Available for Windows. macOS and Linux coming soon.',
      version: 'v2.0',
      releaseDate: 'March 2026',
      releaseNotes: 'First cloud release. Multi-tenant architecture, RaceHub integration, real-time SSE event stream.',
      platforms: [
        {
          os: 'Windows',
          icon: '🪟',
          available: true,
          filename: 'Phoenix-Setup-2.0.0.exe',
          url: '#download-windows',
          size: '~85 MB',
        },
        {
          os: 'macOS',
          icon: '🍎',
          available: false,
          filename: null,
          url: null,
          size: null,
        },
        {
          os: 'Linux',
          icon: '🐧',
          available: false,
          filename: null,
          url: null,
          size: null,
        },
      ],
    },
    cta: {
      headline: 'Ready to run your first event?',
      subtext: 'Get in touch and we\'ll have you set up before race day.',
      email: 'michael.voss@symaxsoftware.com',
    },
  },
};
