import { motion } from 'framer-motion'
import {
  TrendingUp, AlertTriangle, Cpu, BarChart2,
  Zap, Shield, Eye
} from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import TrendChart from '../components/charts/TrendChart'
import DistributionChart from '../components/charts/DistributionChart'
import VolatilityHeatmap from '../components/charts/VolatilityHeatmap'
import ComparisonBarChart from '../components/charts/ComparisonBarChart'
import {
  dashboardMetrics, crisisAlerts, commodityPrices,
  sectorDistribution, volatilityData, priceChangeData
} from '../data/mockData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const iconMap: Record<string, string> = {
  'Active Crises': '🔴',
  'Commodities Tracked': '📊',
  'AI Confidence': '🤖',
  'Price Alerts': '⚡',
}

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
              <span className="text-gradient">Intelligence Dashboard</span>
            </h1>
            <p className="text-muted text-base">Real-time analytics and AI-powered market intelligence — May 2026</p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <span className="pulse-dot pulse-dot-success" />
            <span className="text-xs font-bold">Systems Online</span>
          </div>
        </div>
      </motion.div>

      {/* KPI Metrics */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {dashboardMetrics.map((m) => (
          <motion.div key={m.label} variants={itemVariants}>
            <GlassCard hoverEffect={false} className="text-center py-6 relative overflow-hidden">
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-2">{iconMap[m.label] || '📍'} {m.label}</p>
              <p className={`text-3xl font-black ${m.color}`}>{m.value}</p>
              <p className="text-xs text-emerald-400 mt-1 font-semibold">{m.change} this week</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        {/* Trend Chart */}
        <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <GlassCard className="p-6" hoverEffect={false}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" /> Price Prediction — 2026
              </h3>
              <span className="text-[10px] text-muted bg-white/5 px-3 py-1 rounded-full font-bold">Petroleum · 10 Month</span>
            </div>
            <div className="h-[280px]">
              <TrendChart />
            </div>
            <div className="mt-3 flex justify-between text-[10px] text-muted font-bold border-t border-white/5 pt-3">
              <span>🔵 Actual · 🟣 AI Predicted</span>
              <span className="text-purple-400">LSTM Model · 88% Confidence</span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Sector Distribution */}
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <GlassCard className="p-6 h-full" hoverEffect={false}>
            <h3 className="text-base font-bold flex items-center gap-2 mb-2">
              <BarChart2 className="w-5 h-5 text-amber-400" /> Market Sectors
            </h3>
            <div className="h-[290px]">
              <DistributionChart data={sectorDistribution} />
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Price Changes + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <GlassCard className="p-6" hoverEffect={false}>
            <h3 className="text-base font-bold flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-blue-400" /> Price Change Leaderboard
            </h3>
            <div className="h-[360px]">
              <ComparisonBarChart data={priceChangeData} />
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <GlassCard className="p-6 h-full" hoverEffect={false}>
            <h3 className="text-base font-bold flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-purple-400" /> AI Insights
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                <p className="text-[10px] font-black text-red-400 mb-1">⚠ CRITICAL ALERT</p>
                <p className="text-xs text-white/80 leading-relaxed">Tomato prices surging +12.3% due to monsoon flooding in Karnataka. Expect further 8-10% rise through July 2026.</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <p className="text-[10px] font-black text-amber-400 mb-1">📊 MARKET SIGNAL</p>
                <p className="text-xs text-white/80 leading-relaxed">Gold demand accelerating as investors seek safe-haven assets. ₹8,000/g threshold likely by July 2026.</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-[10px] font-black text-emerald-400 mb-1">✅ POSITIVE OUTLOOK</p>
                <p className="text-xs text-white/80 leading-relaxed">Rice prices declining steadily. Good Kharif harvest expected — prices may drop to ₹66/kg by Dec 2026.</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <p className="text-[10px] font-black text-blue-400 mb-1">🔮 PREDICTION</p>
                <p className="text-xs text-white/80 leading-relaxed">OPEC+ cuts to push petrol past ₹115/L by Q4 2026. Consider stocking up before monsoon transport disruptions.</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Volatility Heatmap */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
        <GlassCard className="p-6" hoverEffect={false}>
          <h3 className="text-base font-bold flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-red-400" /> Commodity Volatility Index
          </h3>
          <VolatilityHeatmap data={volatilityData} />
        </GlassCard>
      </motion.div>

      {/* Recent Alerts */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
        <GlassCard className="p-6" hoverEffect={false}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" /> Recent Crisis Alerts
            </h3>
            <span className="text-[10px] font-bold text-muted bg-white/5 px-3 py-1 rounded-full">6 active</span>
          </div>
          <div className="space-y-3">
            {crisisAlerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className={`flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border hover:border-white/10 transition-colors ${
                alert.severity === 'critical' ? 'border-red-500/15' :
                alert.severity === 'high' ? 'border-orange-500/15' :
                alert.severity === 'medium' ? 'border-yellow-500/15' : 'border-green-500/15'
              }`}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  alert.severity === 'critical' ? 'bg-red-500' :
                  alert.severity === 'high' ? 'bg-orange-500' :
                  alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{alert.title}</p>
                  <p className="text-[10px] text-muted">{alert.region} · {alert.commodity}</p>
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-full ${
                  alert.severity === 'critical' ? 'badge-critical' :
                  alert.severity === 'high' ? 'badge-high' :
                  alert.severity === 'medium' ? 'badge-medium' : 'badge-low'
                }`}>{alert.severity}</span>
                <span className="text-xs font-bold text-red-400 hidden sm:block">{alert.impact}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}

export default Dashboard
