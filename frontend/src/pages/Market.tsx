import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, TrendingUp, Minus, BarChart2,
  ArrowUpRight, ArrowDownRight, Loader2, Sparkles
} from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import CommodityCard from '../components/dashboard/CommodityCard'
import PriceDetailChart from '../components/charts/PriceDetailChart'
import { commodityPrices, commodityHistory } from '../data/mockData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const Market = () => {
  const [selectedCommodity, setSelectedCommodity] = useState<string | null>(null)
  const [aiExplanation, setAiExplanation] = useState<string>('')
  const [aiLoading, setAiLoading] = useState(false)

  const selected = commodityPrices.find(c => c.id === selectedCommodity)
  const historyData = selectedCommodity ? commodityHistory[selectedCommodity] || [] : []

  const fetchAiExplanation = async (commodityName: string) => {
    setAiLoading(true)
    setAiExplanation('')
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY
      if (!apiKey) {
        setAiExplanation('⚠️ Groq API key not configured. Add VITE_GROQ_API_KEY to your .env file.')
        setAiLoading(false)
        return
      }
      const history = commodityHistory[selectedCommodity || ''] || []
      const prices = history.filter(d => d.price).map(d => `${d.month}: ${d.price}`)
      const predictions = history.filter(d => d.predicted).map(d => `${d.month}: ${d.predicted}`)

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{
            role: 'user',
            content: `You are SupplyShield AI, an expert commodity analyst for Indian markets in 2026. Analyze this commodity briefly (150 words max):

Commodity: ${commodityName}
Historical Prices: ${prices.join(', ')}
AI Predicted Prices: ${predictions.join(', ')}

Provide: 1) Why prices moved this way 2) Key risk factors for 2026 3) One actionable tip for consumers. Use bullet points. Be specific to Indian context.`
          }],
          temperature: 0.7,
          max_tokens: 300,
        })
      })
      const data = await res.json()
      setAiExplanation(data.choices?.[0]?.message?.content || 'Unable to generate analysis.')
    } catch {
      setAiExplanation('⚠️ Failed to connect to AI service. Please check your internet connection.')
    } finally {
      setAiLoading(false)
    }
  }

  const handleCardClick = (id: string) => {
    setSelectedCommodity(id)
    setAiExplanation('')
    const commodity = commodityPrices.find(c => c.id === id)
    if (commodity) fetchAiExplanation(commodity.name)
  }

  // Stats for selected commodity
  const getStats = () => {
    if (!historyData.length) return null
    const prices = historyData.filter(d => d.price).map(d => d.price!)
    const preds = historyData.filter(d => d.predicted).map(d => d.predicted!)
    const all = [...prices, ...preds]
    return {
      min: Math.min(...prices).toFixed(1),
      max: Math.max(...prices).toFixed(1),
      avg: (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(1),
      predMax: preds.length ? Math.max(...preds).toFixed(1) : '—',
      predMin: preds.length ? Math.min(...preds).toFixed(1) : '—',
      range: (Math.max(...all) - Math.min(...all)).toFixed(1),
    }
  }
  const stats = getStats()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span className="text-gradient">Commodity Market</span>
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Click any commodity to view detailed price charts, AI predictions for 2026, and intelligent analysis.
        </p>
      </motion.div>

      {/* Commodity Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
      >
        {commodityPrices.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <div onClick={() => handleCardClick(item.id)} className="cursor-pointer">
              <CommodityCard {...item} icon={item.icon} delay={0} />
            </div>
          </motion.div>
        ))}
      </motion.div>



      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCommodity && selected && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center py-20 px-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/85 backdrop-blur-sm"
              onClick={() => setSelectedCommodity(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              className="relative w-full max-w-5xl max-h-[80vh] bg-background border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-[1]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                    selected.status === 'danger' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
                    selected.status === 'warning' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
                    'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  }`}>
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selected.name}</h2>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-2xl font-black">{selected.price}</span>
                      <span className={`text-sm font-bold flex items-center gap-1 ${
                        selected.trend === 'up' ? 'text-red-400' : selected.trend === 'down' ? 'text-emerald-400' : 'text-muted'
                      }`}>
                        {selected.trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
                        {selected.trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
                        {selected.trend === 'neutral' && <Minus className="w-4 h-4" />}
                        {selected.change}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCommodity(null)} 
                  className="relative z-10 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Chart */}
                <div className="glass-card p-5 border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-blue-400" /> Price History & AI Forecast
                    </h3>
                    <span className="text-[10px] bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full font-bold border border-purple-500/20">
                      🤖 LSTM Model · 2026 Forecast
                    </span>
                  </div>
                  <div className="h-[280px]">
                    <PriceDetailChart data={historyData} commodityName={selected.id} />
                  </div>
                  <div className="mt-3 flex justify-between text-[10px] text-muted font-bold border-t border-white/5 pt-3">
                    <span>🔵 Actual Price · 🟣 AI Predicted · Shaded = Confidence Band</span>
                    <span className="text-purple-400">Confidence: 88%</span>
                  </div>
                </div>

                {/* Stats Grid */}
                {stats && (
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {[
                      { label: 'Min Price', value: stats.min, color: 'text-emerald-400' },
                      { label: 'Max Price', value: stats.max, color: 'text-red-400' },
                      { label: 'Average', value: stats.avg, color: 'text-blue-400' },
                      { label: 'Pred. High', value: stats.predMax, color: 'text-purple-400' },
                      { label: 'Pred. Low', value: stats.predMin, color: 'text-purple-300' },
                      { label: 'Range', value: stats.range, color: 'text-amber-400' },
                    ].map(s => (
                      <div key={s.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                        <p className="text-[9px] text-muted font-bold uppercase tracking-widest mb-1">{s.label}</p>
                        <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* AI Explanation */}
                <div className="glass-card p-5 border border-purple-500/10 bg-gradient-to-br from-purple-500/5 to-transparent">
                  <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-purple-400" /> AI Analysis — Groq LLM
                  </h3>
                  {aiLoading ? (
                    <div className="flex items-center gap-3 py-8 justify-center">
                      <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                      <span className="text-sm text-muted">Generating analysis...</span>
                    </div>
                  ) : aiExplanation ? (
                    <div className="space-y-3">
                      {aiExplanation.split('\n').filter((l: string) => l.trim()).map((line: string, idx: number) => {
                        const trimmed = line.trim()
                        // Section headers (numbered like "1)" or "**heading**")
                        if (/^\d+[\)\.\:]/.test(trimmed) || /^\*\*.*\*\*$/.test(trimmed)) {
                          const text = trimmed.replace(/^\d+[\)\.\:]\s*/, '').replace(/\*\*/g, '')
                          return (
                            <div key={idx} className="pt-2 first:pt-0">
                              <p className="text-xs font-black text-purple-400 uppercase tracking-wider mb-1">{text}</p>
                            </div>
                          )
                        }
                        // Bullet points
                        if (/^[-•*]\s/.test(trimmed)) {
                          const text = trimmed.replace(/^[-•*]\s*/, '')
                          return (
                            <div key={idx} className="flex items-start gap-2 pl-1">
                              <span className="text-purple-400 mt-1 text-[8px]">●</span>
                              <p className="text-sm text-white/80 leading-relaxed">{text}</p>
                            </div>
                          )
                        }
                        // Regular paragraph
                        return <p key={idx} className="text-sm text-white/80 leading-relaxed">{trimmed}</p>
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted italic py-4 text-center">Select a commodity to see AI analysis</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Market
