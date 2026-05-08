import { motion } from 'framer-motion'
import { ArrowRight, AlertTriangle, Cpu, Map, Hash, CloudRain, TrendingUp } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import CommodityCard from '../components/dashboard/CommodityCard'
import TrendChart from '../components/charts/TrendChart'
import { commodityPrices, features } from '../data/mockData'


const iconMap = {
  AlertTriangle: AlertTriangle,
  Cpu: Cpu,
  Map: Map,
  Hash: Hash,
  CloudRain: CloudRain
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const Home = () => {
  return (
    <div className="relative">
      {/* Background Glows */}
      <div className="bg-glow bg-glow-top-right"></div>
      <div className="bg-glow bg-glow-bottom-left"></div>

      <div className="container space-y-24 pb-24">
        {/* Hero Section */}
        <section className="section-padding relative overflow-hidden text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live Market Intelligence
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h1 mb-6 text-gradient"
          >
            AI Intelligence for <br />
            <span className="text-primary">Everyday Prices</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Empowering households and small vendors with real-time monitoring of fuel, food, and essential commodity risks.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="btn btn-primary">
              Explore Dashboard <ArrowRight className="w-5 h-5" />
            </button>
            <button className="btn btn-outline">
              View Alerts
            </button>
          </motion.div>

          {/* Decorative floating cards */}
          <div className="hidden xl:block absolute top-1/4 -left-12 animate-float">
             <GlassCard className="w-56 p-5 border-primary/20" hoverEffect={false}>
                <p className="text-xs text-muted font-bold mb-1 uppercase tracking-widest">Market Sentiment</p>
                <p className="text-2xl font-bold text-success">Stable</p>
             </GlassCard>
          </div>
          <div className="hidden xl:block absolute top-1/3 -right-12 animate-float" style={{ animationDelay: '1s' }}>
             <GlassCard className="w-56 p-5 border-danger/20" hoverEffect={false}>
                <p className="text-xs text-muted font-bold mb-1 uppercase tracking-widest">Active Alerts</p>
                <p className="text-2xl font-bold text-danger">12 Near You</p>
             </GlassCard>
          </div>
        </section>

        {/* Live Commodity Preview */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="h2 mb-2">Live Commodities</h2>
              <p className="text-muted">Real-time price tracking of essential goods.</p>
            </div>
            <button className="text-primary hover:underline font-bold flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commodityPrices.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <CommodityCard 
                  {...item} 
                  icon={item.icon as any}
                  trend={item.trend as "up" | "down" | "neutral"}
                  status={item.status as "success" | "warning" | "danger"}
                  delay={0} // Managed by stagger
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="section-padding"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="h2 mb-4">Intelligence Features</h2>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              Our platform uses advanced AI to process complex economic signals into actionable insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap]
              return (
                <motion.div 
                  key={feature.title} 
                  variants={itemVariants}
                  className={index === 0 ? "md:col-span-2" : ""}
                >
                  <GlassCard 
                    className="p-8 h-full glass-card-hover"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="h3 mb-3">{feature.title}</h3>
                    <p className="text-muted text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Locality Awareness Preview */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center section-padding">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="h2 mb-6">Locality Awareness</h2>
            <p className="text-muted text-lg mb-8 leading-relaxed">
              Stay ahead of local supply disruptions. PricePulse AI monitors transport routes, 
              weather patterns, and regional events to predict price hikes before they happen.
            </p>
            
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-danger/10 border border-danger/20 flex gap-4 fade-in">
                <AlertTriangle className="text-danger w-6 h-6 shrink-0" />
                <div>
                  <p className="font-bold text-danger mb-1">Heavy Rain Alert: Mysuru</p>
                  <p className="text-sm text-white/70">
                    Vegetable prices may rise by 15-20% due to flooded transport routes from production centers.
                  </p>
                </div>
              </div>
              
              <div className="p-5 rounded-2xl bg-warning/10 border border-warning/20 flex gap-4 fade-in" style={{ animationDelay: '0.2s' }}>
                <TrendingUp className="text-warning w-6 h-6 shrink-0" />
                <div>
                  <p className="font-bold text-warning mb-1">Fuel Logistics Delay</p>
                  <p className="text-sm text-white/70">
                    Minor delays in LPG distribution expected in North Bengaluru due to warehouse maintenance.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8 pb-4 border-primary/20" hoverEffect={false}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Price Trend Visualization
                </h3>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary transition-colors">
                  <option>Tomato (6 Months)</option>
                  <option>Petrol (1 Year)</option>
                </select>
              </div>
              <div className="h-[300px]">
                <TrendChart />
              </div>
              <div className="mt-6 flex justify-between text-xs text-muted font-medium">
                <span>Projection: Next 30 Days</span>
                <span className="text-danger">Confidence: High (88%)</span>
              </div>
            </GlassCard>
            
            {/* Decorative background blur */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

export default Home
