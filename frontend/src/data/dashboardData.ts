// ===== LIVE COMMODITY PRICES =====
export const dashboardCommodities = [
  { id: '1', name: 'Crude Oil', price: '$78.45', unit: '/bbl', change: '+2.3%', trend: 'up' as const, status: 'warning' as const, sparkline: [71,73,72,75,74,76,78,78.5], volume: '1.2M', updated: '2m ago' },
  { id: '2', name: 'Natural Gas', price: '$3.21', unit: '/MMBtu', change: '-1.8%', trend: 'down' as const, status: 'success' as const, sparkline: [3.8,3.6,3.5,3.4,3.5,3.3,3.2,3.2], volume: '890K', updated: '1m ago' },
  { id: '3', name: 'Wheat', price: '$6.82', unit: '/bu', change: '+4.1%', trend: 'up' as const, status: 'danger' as const, sparkline: [5.9,6.1,6.0,6.3,6.5,6.6,6.7,6.8], volume: '456K', updated: '3m ago' },
  { id: '4', name: 'Rice', price: '$17.30', unit: '/cwt', change: '+0.5%', trend: 'up' as const, status: 'warning' as const, sparkline: [16.8,16.9,17.0,16.9,17.1,17.2,17.2,17.3], volume: '234K', updated: '5m ago' },
  { id: '5', name: 'Sugar', price: '$0.267', unit: '/lb', change: '-0.8%', trend: 'down' as const, status: 'success' as const, sparkline: [0.28,0.279,0.275,0.273,0.271,0.269,0.268,0.267], volume: '567K', updated: '1m ago' },
  { id: '6', name: 'Palm Oil', price: '$892', unit: '/t', change: '+6.2%', trend: 'up' as const, status: 'danger' as const, sparkline: [820,835,840,855,860,875,885,892], volume: '123K', updated: '4m ago' },
]

// ===== PRICE TREND (12 months) =====
export const priceTrendData = [
  { month: 'Jun', oil: 72, wheat: 5.9, rice: 16.5 },
  { month: 'Jul', oil: 75, wheat: 6.0, rice: 16.7 },
  { month: 'Aug', oil: 78, wheat: 6.1, rice: 16.8 },
  { month: 'Sep', oil: 80, wheat: 6.3, rice: 16.9 },
  { month: 'Oct', oil: 76, wheat: 6.2, rice: 17.0 },
  { month: 'Nov', oil: 74, wheat: 6.4, rice: 17.1 },
  { month: 'Dec', oil: 73, wheat: 6.5, rice: 17.0 },
  { month: 'Jan', oil: 75, wheat: 6.3, rice: 16.9 },
  { month: 'Feb', oil: 77, wheat: 6.6, rice: 17.1 },
  { month: 'Mar', oil: 76, wheat: 6.7, rice: 17.2 },
  { month: 'Apr', oil: 78, wheat: 6.8, rice: 17.3 },
  { month: 'May', oil: 78.5, wheat: 6.82, rice: 17.3 },
]

// ===== AI PREDICTION =====
export const aiPredictionData = [
  { month: 'Jan', actual: 75, predicted: 74.5, upper: null, lower: null },
  { month: 'Feb', actual: 77, predicted: 76.8, upper: null, lower: null },
  { month: 'Mar', actual: 76, predicted: 76.5, upper: null, lower: null },
  { month: 'Apr', actual: 78, predicted: 77.8, upper: null, lower: null },
  { month: 'May', actual: 78.5, predicted: 78.2, upper: null, lower: null },
  { month: 'Jun', actual: null, predicted: 80.1, upper: 83, lower: 77 },
  { month: 'Jul', actual: null, predicted: 82.3, upper: 86, lower: 78 },
  { month: 'Aug', actual: null, predicted: 81.5, upper: 87, lower: 76 },
  { month: 'Sep', actual: null, predicted: 79.8, upper: 86, lower: 74 },
]

// ===== SHORTAGE RISK =====
export const shortageRiskData = {
  overall: 67,
  level: 'ELEVATED',
  factors: [
    { name: 'Supply Disruption', value: 78, color: '#ef4444' },
    { name: 'Geopolitical Risk', value: 72, color: '#f59e0b' },
    { name: 'Climate Impact', value: 65, color: '#f59e0b' },
    { name: 'Demand Surge', value: 45, color: '#10b981' },
    { name: 'Logistics Delay', value: 58, color: '#f59e0b' },
  ]
}

// ===== CRISIS HEATMAP =====
export const crisisRegions = [
  { id: 1, region: 'Black Sea', severity: 'critical' as const, type: 'Conflict', impact: 'Grain exports halted' },
  { id: 2, region: 'SE Asia', severity: 'high' as const, type: 'Flooding', impact: 'Rice production -15%' },
  { id: 3, region: 'Horn of Africa', severity: 'critical' as const, type: 'Drought', impact: 'Food crisis 23M people' },
  { id: 4, region: 'South America', severity: 'medium' as const, type: 'El Niño', impact: 'Soybean yield risk' },
  { id: 5, region: 'Middle East', severity: 'high' as const, type: 'Conflict', impact: 'Oil route disruption' },
  { id: 6, region: 'W. Europe', severity: 'low' as const, type: 'Heatwave', impact: 'Wheat quality risk' },
  { id: 7, region: 'India', severity: 'medium' as const, type: 'Monsoon Delay', impact: 'Rice sowing delayed' },
  { id: 8, region: 'N. America', severity: 'low' as const, type: 'Stable', impact: 'Normal production' },
]

// ===== SMART RECOMMENDATIONS =====
export const smartRecommendations = [
  { id: '1', title: 'Diversify Wheat Sources', desc: 'Black Sea disruption persists. Consider Australian and Argentine suppliers.', priority: 'high' as const, category: 'Supply Chain', confidence: 92, impact: '+$2.4M savings' },
  { id: '2', title: 'Hedge Palm Oil Futures', desc: 'SE Asian flooding may push prices 8-12% higher. Lock in Q3 rates.', priority: 'high' as const, category: 'Financial', confidence: 87, impact: 'Risk -34%' },
  { id: '3', title: 'Increase Rice Reserves', desc: 'Indian monsoon delay signals supply constraints. Build 15-day buffer.', priority: 'medium' as const, category: 'Inventory', confidence: 79, impact: '+15 day buffer' },
  { id: '4', title: 'Monitor Suez Canal', desc: 'Middle East tensions may cause rerouting. Prepare for transit delays.', priority: 'low' as const, category: 'Logistics', confidence: 74, impact: '+10 day lead' },
]

// ===== NEWS FEED =====
export const newsFeed = [
  { id: '1', title: 'OPEC+ Extends Production Cuts Through Q3 2026', source: 'Reuters', time: '12m ago', sentiment: 'negative' as const, category: 'Energy' },
  { id: '2', title: 'Major Flooding in Vietnam Disrupts Rice Exports', source: 'Bloomberg', time: '34m ago', sentiment: 'negative' as const, category: 'Agriculture' },
  { id: '3', title: 'Brazil Soybean Harvest Exceeds Expectations', source: 'AgriPulse', time: '1h ago', sentiment: 'positive' as const, category: 'Agriculture' },
  { id: '4', title: 'New Pacific Trade Agreement Opens Sugar Routes', source: 'FT', time: '2h ago', sentiment: 'positive' as const, category: 'Trade' },
  { id: '5', title: 'Strait of Hormuz Shipping Bottleneck Intensifies', source: 'Maritime Exec', time: '3h ago', sentiment: 'negative' as const, category: 'Logistics' },
]

// ===== WEATHER IMPACT =====
export const weatherImpactData = [
  { id: '1', region: 'Southeast Asia', condition: 'Tropical Storm', severity: 'severe' as const, commodities: ['Rice', 'Palm Oil'], duration: '5-7 days', priceImpact: '+8-12%' },
  { id: '2', region: 'East Africa', condition: 'Severe Drought', severity: 'critical' as const, commodities: ['Coffee', 'Maize'], duration: '2-3 months', priceImpact: '+15-25%' },
  { id: '3', region: 'S. Europe', condition: 'Heat Wave', severity: 'moderate' as const, commodities: ['Wheat', 'Olive Oil'], duration: '10-14 days', priceImpact: '+3-6%' },
  { id: '4', region: 'Gulf of Mexico', condition: 'Hurricane Risk', severity: 'elevated' as const, commodities: ['Crude Oil', 'Gas'], duration: 'Jun-Nov', priceImpact: '+5-15%' },
]

// ===== AI EXPLANATIONS =====
export const aiExplanations = [
  { id: '1', commodity: 'Wheat', question: 'Why is wheat surging?', explanation: 'Wheat prices rise due to: (1) Black Sea grain corridor disruption reducing supply ~12%, (2) dry conditions in US Great Plains affecting yields, (3) emerging markets building strategic reserves. 78% probability of continued pressure through Q3.', confidence: 88, factors: ['Geopolitical', 'Climate', 'Demand'], updated: '15m ago' },
  { id: '2', commodity: 'Crude Oil', question: "What's driving oil volatility?", explanation: 'Oil volatility stems from OPEC+ cuts conflicting with weakening demand signals. Strait of Hormuz tensions add $3-5/barrel risk premium. Prices likely to test $82 resistance before potential Q3 correction.', confidence: 82, factors: ['OPEC+', 'Geopolitical', 'Demand'], updated: '8m ago' },
  { id: '3', commodity: 'Rice', question: 'Is a rice shortage imminent?', explanation: "Vietnam flooding reduced export capacity 15%, but India's delayed monsoon is the larger concern. Thailand/Myanmar output remains strong with 45-day global buffer. Shortage risk moderate (58/100), prices may rise 5-8%.", confidence: 75, factors: ['Weather', 'Supply Chain', 'Reserves'], updated: '22m ago' },
]

// ===== FORECAST CONFIDENCE =====
export const forecastConfidence = [
  { commodity: 'Crude Oil', short: 91, medium: 78, long: 62, direction: 'up' as const },
  { commodity: 'Natural Gas', short: 88, medium: 72, long: 55, direction: 'down' as const },
  { commodity: 'Wheat', short: 85, medium: 81, long: 68, direction: 'up' as const },
  { commodity: 'Rice', short: 79, medium: 65, long: 48, direction: 'up' as const },
  { commodity: 'Sugar', short: 92, medium: 84, long: 71, direction: 'down' as const },
  { commodity: 'Palm Oil', short: 76, medium: 63, long: 45, direction: 'up' as const },
]
