import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle, Filter, Bell, ShieldAlert,
  MapPin, Clock, ArrowUpRight, TrendingUp, Activity
} from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import DistributionChart from '../components/charts/DistributionChart'
import { crisisAlerts } from '../data/mockData'

const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
const severityDistribution = [
  { name: 'Critical', value: crisisAlerts.filter(a => a.severity === 'critical').length, color: '#ef4444' },
  { name: 'High', value: crisisAlerts.filter(a => a.severity === 'high').length, color: '#f97316' },
  { name: 'Medium', value: crisisAlerts.filter(a => a.severity === 'medium').length, color: '#f59e0b' },
  { name: 'Low', value: crisisAlerts.filter(a => a.severity === 'low').length, color: '#22c55e' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const Alerts = () => {
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all'
    ? crisisAlerts
    : crisisAlerts.filter(a => a.severity === filter)

  const sorted = [...filtered].sort((a, b) =>
    severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder]
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span className="text-gradient">Crisis Alerts</span>
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Real-time monitoring of global events impacting supply chains and commodity prices.
        </p>
      </motion.div>

      {/* Stats + Severity Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <GlassCard hoverEffect={false} className="text-center py-8">
          <ShieldAlert className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-3xl font-black text-red-400">{crisisAlerts.length}</p>
          <p className="text-xs text-muted font-bold uppercase tracking-widest mt-1">Total Active Alerts</p>
        </GlassCard>

        <GlassCard hoverEffect={false} className="text-center py-8">
          <TrendingUp className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <p className="text-3xl font-black text-amber-400">
            {crisisAlerts.filter(a => a.severity === 'critical' || a.severity === 'high').length}
          </p>
          <p className="text-xs text-muted font-bold uppercase tracking-widest mt-1">High Priority</p>
        </GlassCard>

        <GlassCard hoverEffect={false} className="p-4">
          <p className="text-xs font-bold text-muted uppercase tracking-widest mb-2 text-center">Severity Breakdown</p>
          <div className="h-[140px]">
            <DistributionChart data={severityDistribution} />
          </div>
        </GlassCard>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['all', 'critical', 'high', 'medium', 'low'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              filter === f
                ? 'bg-primary/20 border-primary/40 text-primary'
                : 'bg-white/[0.03] border-white/[0.08] text-muted hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            {f === 'all' ? `All (${crisisAlerts.length})` : `${f} (${crisisAlerts.filter(a => a.severity === f).length})`}
          </button>
        ))}
      </div>

      {/* Alert Cards */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 mb-16">
        {sorted.map((alert, i) => (
          <motion.div key={alert.id} variants={itemVariants}>
            <div className={`glass-card p-6 border-l-4 hover:border-l-[6px] transition-all ${
              alert.severity === 'critical' ? 'border-l-red-500' :
              alert.severity === 'high' ? 'border-l-orange-500' :
              alert.severity === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'
            }`}>
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  alert.severity === 'critical' ? 'bg-red-500/10 text-red-400' :
                  alert.severity === 'high' ? 'bg-orange-500/10 text-orange-400' :
                  alert.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'
                }`}>
                  <AlertTriangle className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold">{alert.title}</h3>
                    <span className={`badge ${
                      alert.severity === 'critical' ? 'badge-critical' :
                      alert.severity === 'high' ? 'badge-high' :
                      alert.severity === 'medium' ? 'badge-medium' : 'badge-low'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed mb-3">{alert.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {alert.region}</span>
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {alert.commodity}</span>
                    <span className="flex items-center gap-1 text-red-400 font-bold"><ArrowUpRight className="w-3 h-3" /> {alert.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Alerts
