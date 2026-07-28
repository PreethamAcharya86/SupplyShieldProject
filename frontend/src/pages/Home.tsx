import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, AlertTriangle, Cpu, Globe, TrendingUp, CloudRain,
  ShieldCheck, BarChart2, Zap, Users, Target, Layers
} from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import CommodityCard from '../components/dashboard/CommodityCard'
import TrendChart from '../components/charts/TrendChart'
import { commodityPrices, features, crisisAlerts, dashboardMetrics } from '../data/mockData'

const iconMap: Record<string, React.ComponentType<any>> = {
  AlertTriangle, Cpu, Globe, TrendingUp, CloudRain, ShieldCheck
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const Home = () => {
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ===== HERO ===== */}
        <section className="py-12 md:py-20 relative text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8"
          >
            <span className="pulse-dot pulse-dot-primary" />
            Live Crisis Intelligence Active
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            <span className="text-gradient">AI-Powered Price</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              Intelligence Platform
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Predict shortages, price hikes, and supply chain disruptions during
            wars, floods, pandemics, and trade crises — before they impact you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/market" className="btn btn-primary text-base px-8 py-3.5">
              Explore Market <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/alerts" className="btn btn-outline text-base px-8 py-3.5">
              View Alerts
            </Link>
          </motion.div>
        </section>

        {/* ===== LIVE METRICS ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dashboardMetrics.map((m, i) => (
              <motion.div key={m.label} variants={itemVariants}>
                <GlassCard hoverEffect={false} className="text-center py-6">
                  <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">{m.label}</p>
                  <p className={`text-3xl font-extrabold ${m.color}`}>{m.value}</p>
                  <p className="text-xs text-emerald-400 mt-1">{m.change} this week</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ===== COMMODITY PRICES ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="section-title mb-2">Live Commodities</h2>
              <p className="section-subtitle">Real-time price tracking of essential goods</p>
            </div>
            <Link to="/market" className="text-blue-400 hover:underline font-bold flex items-center gap-1 text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {commodityPrices.slice(0, 8).map((item, i) => (
              <motion.div key={item.id} variants={itemVariants}>
                <CommodityCard {...item} icon={item.icon} delay={0} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ===== FEATURES ===== */}
        <motion.section
          className="mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Why SupplyShield?</h2>
            <p className="section-subtitle mx-auto">
              Advanced AI processing complex economic signals into actionable crisis intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] || Zap
              return (
                <motion.div key={f.title} variants={itemVariants} className={i === 0 ? "md:col-span-2" : ""}>
                  <GlassCard className="p-8 h-full">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-5">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                    <p className="text-muted text-base leading-relaxed">{f.description}</p>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* ===== CRISIS ALERTS PREVIEW ===== */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="section-title mb-2">Active Crisis Alerts</h2>
              <p className="section-subtitle">Global events affecting supply chains right now</p>
            </div>
            <Link to="/alerts" className="text-blue-400 hover:underline font-bold flex items-center gap-1 text-sm">
              All Alerts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crisisAlerts.slice(0, 4).map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`glass-card p-5 border-l-4 ${
                  alert.severity === 'critical' ? 'border-l-red-500' :
                  alert.severity === 'high' ? 'border-l-orange-500' :
                  alert.severity === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm">{alert.title}</h3>
                    <span className={`badge ${
                      alert.severity === 'critical' ? 'badge-critical' :
                      alert.severity === 'high' ? 'badge-high' :
                      alert.severity === 'medium' ? 'badge-medium' : 'badge-low'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs text-muted mb-2">{alert.description}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted">{alert.region} · {alert.commodity}</span>
                    <span className="text-red-400 font-semibold">{alert.impact}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== PRICE TREND + AI INSIGHTS ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-24">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-6" hoverEffect={false}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Price Prediction Chart
                </h3>
                <span className="text-xs text-muted bg-white/5 px-3 py-1 rounded-full">Petroleum · 10 Month</span>
              </div>
              <div className="h-[280px]">
                <TrendChart />
              </div>
              <div className="mt-4 flex justify-between text-xs text-muted font-medium border-t border-white/5 pt-3">
                <span>🔵 Actual  ·  🟣 AI Predicted</span>
                <span className="text-red-400">Confidence: High (88%)</span>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-6 h-full" hoverEffect={false}>
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Cpu className="w-5 h-5 text-purple-400" />
                AI Insights
              </h3>
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                  <p className="text-xs font-bold text-red-400 mb-1">⚠ Price Alert</p>
                  <p className="text-sm text-white/80">Petrol prices may rise 3-5% due to OPEC+ production cuts and Red Sea shipping disruptions.</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <p className="text-xs font-bold text-amber-400 mb-1">📊 Market Signal</p>
                  <p className="text-sm text-white/80">Gold demand surging as investors seek safe-haven assets amid geopolitical tensions.</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <p className="text-xs font-bold text-emerald-400 mb-1">✅ Positive Outlook</p>
                  <p className="text-sm text-white/80">India monsoon forecast is favorable — vegetable prices expected to normalize in 4-6 weeks.</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* ===== CTA ===== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="glass-card p-12 text-center bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gradient">
              Stay Ahead of Every Crisis
            </h2>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
              Join thousands of businesses and households using SupplyShield to make smarter purchasing and supply-chain decisions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/locality" className="btn btn-primary text-base px-8">
                <Globe className="w-5 h-5" /> Explore Globe
              </Link>
              <Link to="/awareness" className="btn btn-outline text-base px-8">
                Learn More
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Home
