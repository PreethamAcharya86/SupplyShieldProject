// ===== COMMODITY PRICES =====
export const commodityPrices = [
  { id: 'petrol', name: 'Petrol', price: '₹108.2/L', change: '+3.2%', trend: 'up' as const, status: 'danger' as const, icon: 'Fuel', sparkline: [95,97,99,101,103,105,106,108] },
  { id: 'lpg', name: 'LPG Cylinder', price: '₹903', change: '+1.5%', trend: 'up' as const, status: 'warning' as const, icon: 'Flame', sparkline: [850,860,870,880,885,890,895,903] },
  { id: 'gold', name: 'Gold (24K)', price: '₹7,842/g', change: '+5.1%', trend: 'up' as const, status: 'danger' as const, icon: 'Gem', sparkline: [7200,7350,7400,7500,7600,7700,7800,7842] },
  { id: 'silver', name: 'Silver', price: '₹98.4/g', change: '+3.9%', trend: 'up' as const, status: 'warning' as const, icon: 'Gem', sparkline: [88,90,91,93,94,96,97,98] },
  { id: 'semiconductors', name: 'Semiconductors', price: '$4.8/unit', change: '+6.7%', trend: 'up' as const, status: 'danger' as const, icon: 'Cpu', sparkline: [3.8,3.9,4.1,4.2,4.4,4.5,4.7,4.8] },
  { id: 'crude', name: 'Crude Oil', price: '$82.5/bbl', change: '+4.2%', trend: 'up' as const, status: 'danger' as const, icon: 'Droplets', sparkline: [74,76,77,78,79,80,81,82] },
]

// ===== COMMODITY HISTORY (for Market detail charts) =====
export const commodityHistory: Record<string, { month: string; price: number; predicted?: number; upper?: number; lower?: number }[]> = {
  petrol: [
    { month: 'Jan 25', price: 94 }, { month: 'Mar 25', price: 96 }, { month: 'May 25', price: 99 },
    { month: 'Jul 25', price: 101 }, { month: 'Sep 25', price: 103 }, { month: 'Nov 25', price: 105 },
    { month: 'Jan 26', price: 106 }, { month: 'Mar 26', price: 108 }, { month: 'May 26', price: 108.2 },
    { month: 'Jul 26', predicted: 110, upper: 113, lower: 107 },
    { month: 'Sep 26', predicted: 112, upper: 116, lower: 108 },
    { month: 'Nov 26', predicted: 115, upper: 120, lower: 110 },
    { month: 'Dec 26', predicted: 117, upper: 123, lower: 111 },
  ],
  lpg: [
    { month: 'Jan 25', price: 820 }, { month: 'Mar 25', price: 835 }, { month: 'May 25', price: 850 },
    { month: 'Jul 25', price: 862 }, { month: 'Sep 25', price: 875 }, { month: 'Nov 25', price: 885 },
    { month: 'Jan 26', price: 890 }, { month: 'Mar 26', price: 895 }, { month: 'May 26', price: 903 },
    { month: 'Jul 26', predicted: 915, upper: 935, lower: 895 },
    { month: 'Sep 26', predicted: 928, upper: 955, lower: 900 },
    { month: 'Nov 26', predicted: 940, upper: 970, lower: 910 },
    { month: 'Dec 26', predicted: 950, upper: 985, lower: 915 },
  ],
  gold: [
    { month: 'Jan 25', price: 6800 }, { month: 'Mar 25', price: 7000 }, { month: 'May 25', price: 7200 },
    { month: 'Jul 25', price: 7350 }, { month: 'Sep 25', price: 7500 }, { month: 'Nov 25', price: 7600 },
    { month: 'Jan 26', price: 7700 }, { month: 'Mar 26', price: 7800 }, { month: 'May 26', price: 7842 },
    { month: 'Jul 26', predicted: 8000, upper: 8300, lower: 7700 },
    { month: 'Sep 26', predicted: 8200, upper: 8600, lower: 7800 },
    { month: 'Nov 26', predicted: 8400, upper: 8900, lower: 7900 },
    { month: 'Dec 26', predicted: 8500, upper: 9100, lower: 7950 },
  ],
  silver: [
    { month: 'Jan 25', price: 82 }, { month: 'Mar 25', price: 84 }, { month: 'May 25', price: 87 },
    { month: 'Jul 25', price: 89 }, { month: 'Sep 25', price: 91 }, { month: 'Nov 25', price: 94 },
    { month: 'Jan 26', price: 95 }, { month: 'Mar 26', price: 97 }, { month: 'May 26', price: 98.4 },
    { month: 'Jul 26', predicted: 101, upper: 106, lower: 96 },
    { month: 'Sep 26', predicted: 104, upper: 110, lower: 98 },
    { month: 'Nov 26', predicted: 106, upper: 113, lower: 99 },
    { month: 'Dec 26', predicted: 108, upper: 116, lower: 100 },
  ],
  semiconductors: [
    { month: 'Jan 25', price: 3.2 }, { month: 'Mar 25', price: 3.4 }, { month: 'May 25', price: 3.6 },
    { month: 'Jul 25', price: 3.8 }, { month: 'Sep 25', price: 4.0 }, { month: 'Nov 25', price: 4.2 },
    { month: 'Jan 26', price: 4.3 }, { month: 'Mar 26', price: 4.5 }, { month: 'May 26', price: 4.8 },
    { month: 'Jul 26', predicted: 5.1, upper: 5.5, lower: 4.7 },
    { month: 'Sep 26', predicted: 5.4, upper: 5.9, lower: 4.9 },
    { month: 'Nov 26', predicted: 5.6, upper: 6.2, lower: 5.0 },
    { month: 'Dec 26', predicted: 5.8, upper: 6.5, lower: 5.1 },
  ],
  crude: [
    { month: 'Jan 25', price: 72 }, { month: 'Mar 25', price: 74 }, { month: 'May 25', price: 76 },
    { month: 'Jul 25', price: 77 }, { month: 'Sep 25', price: 78 }, { month: 'Nov 25', price: 80 },
    { month: 'Jan 26', price: 81 }, { month: 'Mar 26', price: 82 }, { month: 'May 26', price: 82.5 },
    { month: 'Jul 26', predicted: 84, upper: 88, lower: 80 },
    { month: 'Sep 26', predicted: 86, upper: 91, lower: 81 },
    { month: 'Nov 26', predicted: 88, upper: 94, lower: 82 },
    { month: 'Dec 26', predicted: 89, upper: 96, lower: 83 },
  ],
}


// ===== FEATURES =====
export const features = [
  { title: 'Real-Time Crisis Mapping', description: 'Track global supply chain disruptions on an interactive 3D globe with live crisis hotspots, severity indicators, and community-verified field reports.', icon: 'Globe' },
  { title: 'AI Price Prediction', description: 'Our LSTM neural network trained on historical commodity data forecasts price fluctuations up to 4 months ahead with 88% confidence.', icon: 'Cpu' },
  { title: 'Smart Alerts', description: 'Get instant notifications when our AI detects price spikes, shortages, or supply chain disruptions that could affect your region.', icon: 'AlertTriangle' },
  { title: 'Trend Analysis', description: 'Deep-dive into historical price trends with interactive charts, seasonal patterns, and correlation analysis across commodities.', icon: 'TrendingUp' },
  { title: 'Weather Impact', description: 'Monitor how monsoons, cyclones, and climate events ripple through agricultural supply chains and impact food prices.', icon: 'CloudRain' },
  { title: 'Verified Intelligence', description: 'Community-sourced reports verified by AI cross-referencing ensure you get accurate, on-the-ground information.', icon: 'ShieldCheck' },
]

// ===== CRISIS ALERTS =====
export const crisisAlerts = [
  { id: 'a1', title: 'Red Sea Shipping Crisis Escalates', severity: 'critical', description: 'Houthi attacks disrupting 15% of global trade through Suez Canal. Fuel & commodity shipping costs surging.', region: 'Middle East', commodity: 'Crude Oil', impact: '+12% price risk' },
  { id: 'a2', title: 'Monsoon Flooding — Kerala & Karnataka', severity: 'high', description: 'Heavy rains destroying vegetable crops and disrupting road supply networks across southern India.', region: 'South India', commodity: 'Vegetables', impact: '+15% price risk' },
  { id: 'a3', title: 'Russia-Ukraine Grain Export Tensions', severity: 'high', description: 'Black Sea grain corridor agreement under threat. Wheat and sunflower oil supplies at risk.', region: 'Eastern Europe', commodity: 'Wheat', impact: '+8% price risk' },
  { id: 'a4', title: 'OPEC+ Production Cuts Extended', severity: 'medium', description: 'Saudi Arabia extends voluntary 1M barrel/day cut through Q3 2026, tightening global oil supply.', region: 'Global', commodity: 'Petrol & Diesel', impact: '+5% price risk' },
  { id: 'a5', title: 'Onion Export Ban Lifted', severity: 'low', description: 'Government lifts export restrictions on onions. Domestic prices may stabilize as supply normalizes.', region: 'India', commodity: 'Onion', impact: 'Stabilizing' },
  { id: 'a6', title: 'Cyclone Approaching Bay of Bengal', severity: 'critical', description: 'Category 3 cyclone expected to make landfall in Odisha. Emergency supply chain protocols activated.', region: 'East India', commodity: 'Rice & Essentials', impact: '+20% price risk' },
]

// ===== DASHBOARD METRICS =====
export const dashboardMetrics = [
  { label: 'Active Crises', value: '8', change: '+2', color: 'text-red-400' },
  { label: 'Commodities Tracked', value: '48', change: '+4', color: 'text-blue-400' },
  { label: 'AI Confidence', value: '88%', change: '+3%', color: 'text-emerald-400' },
  { label: 'Price Alerts', value: '24', change: '+6', color: 'text-amber-400' },
]

// ===== TREND DATA (Home page chart — 2026) =====
export const trendData = [
  { name: 'Oct 25', price: 96, predicted: null },
  { name: 'Nov 25', price: 98, predicted: null },
  { name: 'Dec 25', price: 100, predicted: null },
  { name: 'Jan 26', price: 102, predicted: null },
  { name: 'Feb 26', price: 104, predicted: 104 },
  { name: 'Mar 26', price: 106, predicted: 105 },
  { name: 'Apr 26', price: 108, predicted: 107 },
  { name: 'May 26', price: 108.2, predicted: 109 },
  { name: 'Jun 26', price: null, predicted: 110 },
  { name: 'Jul 26', price: null, predicted: 112 },
  { name: 'Aug 26', price: null, predicted: 115 },
  { name: 'Sep 26', price: null, predicted: 117 },
]

// ===== TICKER =====
export const tickerItems = [
  '🔴 Red Sea crisis: Shipping costs +40% — May 2026',
  '🟡 OPEC+ cuts extended through Q3 2026',
  '🟢 India monsoon forecast favorable for Kharif crops',
  '🔴 Cyclone alert: Bay of Bengal — supply routes at risk',
  '🟡 Gold hits ₹7,842/g amid geopolitical tensions',
  '🟢 Government releases buffer wheat stock — prices easing',
  '🔴 Tomato prices surge +12% in southern markets — May 2026',
  '🟡 LPG subsidy review pending — Q3 2026',
]

// ===== GLOBE CRISIS EVENTS =====
export const globalCrisisEvents = [
  { lat: 15.5, lng: 44.2, size: 1.2, severity: 'critical', label: 'Red Sea Shipping Crisis' },
  { lat: 10.0, lng: 76.5, size: 0.9, severity: 'high', label: 'Kerala Monsoon Flooding' },
  { lat: 48.5, lng: 35.0, size: 1.0, severity: 'high', label: 'Ukraine Grain Crisis' },
  { lat: 24.5, lng: 45.0, size: 0.8, severity: 'medium', label: 'OPEC+ Production Cuts' },
  { lat: 20.5, lng: 85.8, size: 1.1, severity: 'critical', label: 'Bay of Bengal Cyclone' },
  { lat: 13.0, lng: 77.5, size: 0.7, severity: 'medium', label: 'Karnataka Drought Stress' },
  { lat: 28.6, lng: 77.2, size: 0.6, severity: 'low', label: 'Delhi NCR Supply Stable' },
  { lat: -1.3, lng: 36.8, size: 0.8, severity: 'high', label: 'East Africa Drought' },
]

// ===== LOCALITY REVIEWS =====
export const localityReviews = [
  { id: 'r1', user: 'Arjun S.', region: 'South India', date: 'May 8, 2026', type: 'Crisis', comment: 'Heavy flooding in Wayanad has completely disrupted vegetable supply routes. Tomato and onion prices doubled at local markets overnight.', upvotes: 47 },
  { id: 'r2', user: 'Priya K.', region: 'Maharashtra', date: 'May 7, 2026', type: 'News', comment: 'Pune wholesale market seeing stabilization in wheat prices after government buffer stock release. Good sign for consumers.', upvotes: 32 },
  { id: 'r3', user: 'Ravi M.', region: 'Tamil Nadu', date: 'May 6, 2026', type: 'Crisis', comment: 'LPG shortage in rural Madurai district. Dealers reporting 2-week wait times. People switching to firewood for cooking.', upvotes: 61 },
  { id: 'r4', user: 'Sneha D.', region: 'Gujarat', date: 'May 5, 2026', type: 'News', comment: 'Groundnut oil prices dropping steadily in Rajkot market. Good harvest expected this season despite initial drought fears.', upvotes: 28 },
]

// ===== AWARENESS CARDS =====
export const awarenessCards = [
  { title: 'Oil Price & Your Kitchen', description: 'When crude oil prices rise, everything from cooking gas to transport costs increases. A $10/barrel rise can add ₹5-8 to petrol and ₹3-5 to LPG over 2-3 months.', icon: 'Fuel', impact: 'Critical', category: 'Energy' },
  { title: 'Monsoon & Food Prices', description: 'India\'s agriculture depends 60% on monsoons. Delayed or excess rainfall can spike vegetable prices 30-50% within weeks as supply chains get disrupted.', icon: 'CloudRain', impact: 'High', category: 'Agriculture' },
  { title: 'AI in Supply Chains', description: 'Machine learning models can predict price movements with 85-90% accuracy by analyzing weather, geopolitics, and historical patterns simultaneously.', icon: 'Cpu', impact: 'Medium', category: 'Technology' },
  { title: 'Smart Buying Strategy', description: 'Stock up on non-perishables when prices are stable. Watch for early warning signals like transport strikes, weather alerts, and export policy changes.', icon: 'ShoppingCart', impact: 'High', category: 'Consumer' },
  { title: 'Global Trade & Local Impact', description: 'India imports 85% of its crude oil. Any disruption in the Strait of Hormuz or Suez Canal directly impacts fuel, fertilizer, and food prices domestically.', icon: 'Scale', impact: 'Critical', category: 'Trade' },
  { title: 'Health & Supply Crises', description: 'Pandemics and health emergencies can collapse supply chains overnight. COVID-19 showed how medicine and essential supply disruptions affect every household.', icon: 'HeartPulse', impact: 'Critical', category: 'Health' },
]

// ===== SECTOR DISTRIBUTION (for pie chart) =====
export const sectorDistribution = [
  { name: 'Energy', value: 35, color: '#ef4444' },
  { name: 'Agriculture', value: 30, color: '#10b981' },
  { name: 'Precious Metals', value: 20, color: '#f59e0b' },
  { name: 'Essentials', value: 15, color: '#3b82f6' },
]

// ===== VOLATILITY DATA (for heatmap) =====
export const volatilityData = [
  { name: 'Tomato', volatility: 95, status: 'critical' },
  { name: 'Onion', volatility: 82, status: 'high' },
  { name: 'Petrol', volatility: 68, status: 'high' },
  { name: 'Gold', volatility: 65, status: 'medium' },
  { name: 'Crude Oil', volatility: 62, status: 'medium' },
  { name: 'Diesel', volatility: 55, status: 'medium' },
  { name: 'LPG', volatility: 48, status: 'medium' },
  { name: 'Silver', volatility: 45, status: 'medium' },
  { name: 'Eggs', volatility: 30, status: 'low' },
  { name: 'Wheat', volatility: 22, status: 'low' },
  { name: 'Rice', volatility: 18, status: 'low' },
  { name: 'Sugar', volatility: 12, status: 'stable' },
]

// ===== PRICE CHANGE DATA (for bar chart) =====
export const priceChangeData = [
  { name: 'Tomato', change: 12.3, fill: '#ef4444' },
  { name: 'Onion', change: 8.5, fill: '#f97316' },
  { name: 'Gold', change: 5.1, fill: '#f59e0b' },
  { name: 'Crude', change: 4.2, fill: '#f59e0b' },
  { name: 'Silver', change: 3.9, fill: '#eab308' },
  { name: 'Petrol', change: 3.2, fill: '#eab308' },
  { name: 'Diesel', change: 2.8, fill: '#84cc16' },
  { name: 'Eggs', change: 2.1, fill: '#22c55e' },
  { name: 'LPG', change: 1.5, fill: '#22c55e' },
  { name: 'Wheat', change: 0.8, fill: '#10b981' },
  { name: 'Sugar', change: -0.5, fill: '#06b6d4' },
  { name: 'Rice', change: -1.2, fill: '#3b82f6' },
]
