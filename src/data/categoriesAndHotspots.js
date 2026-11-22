// NASA Earth Information Center - 6 Core Stories & 8 Planetary Hotspots
export const CATEGORIES_DATA = [
  {
    id: 'climate',
    filterTag: 'Climate',
    title: 'Climate',
    short: 'Hotter Earth',
    full: 'Explore global temperatures, climate change, and carbon emissions.',
    icon: '🌡️',
    color: '#f97316',
    border: 'border-orange-500/40',
    glow: 'shadow-orange-500/20',
    bgImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ocean',
    filterTag: 'Ocean',
    title: 'Oceans',
    short: 'Rising Seas',
    full: 'Explore sea surface temperatures, ocean health, and marine ecosystems.',
    icon: '🌊',
    color: '#38bdf8',
    border: 'border-sky-500/40',
    glow: 'shadow-sky-500/20',
    bgImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'forest',
    filterTag: 'Forest',
    title: 'Forests',
    short: 'Losing Green',
    full: 'Explore forest cover, deforestation, and vegetation health.',
    icon: '🌲',
    color: '#22c55e',
    border: 'border-emerald-500/40',
    glow: 'shadow-emerald-500/20',
    bgImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'atmosphere',
    filterTag: 'Air Quality',
    title: 'Atmosphere',
    short: 'Thin Air',
    full: 'Explore air quality, atmospheric composition, and aerosols.',
    icon: '💨',
    color: '#60a5fa',
    border: 'border-blue-500/40',
    glow: 'shadow-blue-500/20',
    bgImage: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'disaster',
    filterTag: 'Disasters',
    title: 'Natural Disasters',
    short: 'Extreme Events',
    full: 'Explore earthquakes, wildfires, floods, and tropical cyclones.',
    icon: '⚠️',
    color: '#fb923c',
    border: 'border-amber-500/40',
    glow: 'shadow-amber-500/20',
    bgImage: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'satellite',
    filterTag: 'All',
    title: 'Satellites',
    short: 'Eyes in Space',
    full: 'Learn about Earth observation satellites and the information they collect.',
    icon: '🛰️',
    color: '#a855f7',
    border: 'border-purple-500/40',
    glow: 'shadow-purple-500/20',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
  }
];

export const MAP_FILTERS = [
  'All',
  'Climate',
  'Ocean',
  'Forest',
  'Air Quality',
  'Disasters'
];

export const HOTSPOTS_DATA = [
  {
    id: 'arctic',
    name: 'Arctic Ice Cap',
    category: ['Climate', 'Ocean'],
    icon: '🧊',
    x: 430,
    y: 55,
    tooltip: 'Arctic Ice Cap - Ice -32% since 1980 - Click to hear cracking sound',
    metric: 'Annual Sea Ice Extent -32% since 1980',
    acousticPitch: '1200 Hz Crystal Chimes (Ice Cracking)',
    color: '#00D9FF',
    freq: 1200
  },
  {
    id: 'california',
    name: 'California',
    category: ['Disasters', 'Climate'],
    icon: '🔥',
    x: 175,
    y: 170,
    tooltip: 'California - Megadrought & Wildfire Risk High - Click to hear fire siren',
    metric: 'Megadrought & Extreme Wildfire Index',
    acousticPitch: '830 Hz Saw Siren (Wildfire Crackle)',
    color: '#f97316',
    freq: 830
  },
  {
    id: 'amazon',
    name: 'Amazon Rainforest',
    category: ['Forest', 'Climate'],
    icon: '🌲',
    x: 325,
    y: 310,
    tooltip: 'Amazon Rainforest - Canopy Loss -18.2 Mha - Click to hear fading birdsong',
    metric: 'Primary Forest Canopy Loss -18.2 Mha',
    acousticPitch: '440 Hz Minor Chords (Fading Birdsong)',
    color: '#22c55e',
    freq: 440
  },
  {
    id: 'sahara',
    name: 'Sahara Desert',
    category: ['Air Quality', 'Climate'],
    icon: '💨',
    x: 495,
    y: 215,
    isCentralHub: true,
    tooltip: 'Sahara Desert - Transatlantic 182 Tg Dust Plume - Click to hear desert wind',
    metric: 'Aerosol Optical Depth 182 Tg Dust Plume',
    acousticPitch: '220 Hz Brown Noise (Desert Wind)',
    color: '#fbbf24',
    freq: 220
  },
  {
    id: 'himalayas',
    name: 'Himalayan Glaciers',
    category: ['Climate', 'Disasters'],
    icon: '🏔️',
    x: 715,
    y: 185,
    tooltip: 'Himalayan Glaciers - Third Pole Melt -0.38m/yr - Click to hear melting drip',
    metric: 'Third Pole Glacier Retreat -0.38 m/yr',
    acousticPitch: '1400 Hz Alpine Chimes & Water Drip',
    color: '#38bdf8',
    freq: 1400
  },
  {
    id: 'pacific',
    name: 'Pacific Warm Pool',
    category: ['Ocean', 'Climate'],
    icon: '🌊',
    x: 875,
    y: 275,
    tooltip: 'Pacific Warm Pool - Sea Temp +1.35°C Anomaly - Click to hear deep oceanic swell',
    metric: 'Sea Surface Temp Anomaly +1.35°C',
    acousticPitch: '100 Hz Warm Bass & Bubbles',
    color: '#00D9FF',
    freq: 100
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    category: ['Forest', 'Air Quality'],
    icon: '🌴',
    x: 785,
    y: 300,
    tooltip: 'Indonesia - Peatland & Coral Degradation - Click to hear underwater wobble',
    metric: 'Peatland Burning & Coral Reef Bleaching',
    acousticPitch: '175 Hz Underwater FM Wobble',
    color: '#10b981',
    freq: 175
  },
  {
    id: 'antarctica',
    name: 'Antarctica',
    category: ['Climate', 'Ocean'],
    icon: '❄️',
    x: 500,
    y: 460,
    tooltip: 'Antarctica - Ice Sheet -3,200 Gigatons Lost - Click to hear 40Hz ice collapse',
    metric: 'Ice Sheet Mass Loss -3,200 Gigatons',
    acousticPitch: '41 Hz Sub-Rumble & Massive Crack',
    color: '#e0f2fe',
    freq: 41
  }
];
