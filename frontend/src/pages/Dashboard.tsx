import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight, ArrowDownRight, Brain, Newspaper, CloudRain, Sun,
  Thermometer, Wind, Sparkles, Shield, TrendingUp, Activity, BarChart3,
  Zap, Globe, Lightbulb, ChevronRight, Radio
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid, ComposedChart, ReferenceLine
} from 'recharts'
import {
  dashboardCommodities, priceTrendData, aiPredictionData, shortageRiskData,
  crisisRegions, smartRecommendations, newsFeed, weatherImpactData,
  aiExplanations, forecastConfidence
} from '../data/dashboardData'
import './Dashboard.css'

// ── Animation Variants ──
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
}

// ── Sparkline Mini Chart ──
const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const chartData = data.map((v, i) => ({ v, i }))
  return (
    <div className="commodity-sparkline">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5}
            fill={`url(#spark-${color})`} dot={false} isAnimationActive={true} animationDuration={1500} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── Risk Gauge SVG ──
const RiskGauge = ({ value }: { value: number }) => {
  const [animated, setAnimated] = useState(false)
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 300); return () => clearTimeout(t) }, [])

  const r = 80, cx = 100, cy = 95
  const startAngle = Math.PI, endAngle = 0
  const arc = Math.PI * r
  const offset = animated ? arc * (1 - value / 100) : arc

  const gaugeColor = value >= 75 ? '#ef4444' : value >= 50 ? '#f59e0b' : '#10b981'
  const x1 = cx + r * Math.cos(startAngle), y1 = cy - r * Math.sin(startAngle)
  const x2 = cx + r * Math.cos(endAngle), y2 = cy - r * Math.sin(endAngle)
  const pathD = `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`

  return (
    <svg className="risk-gauge-svg" viewBox="0 0 200 120">
      <path d={pathD} className="risk-gauge-track" />
      <path d={pathD} className="risk-gauge-fill"
        stroke={gaugeColor}
        strokeDasharray={arc}
        strokeDashoffset={offset}
      />
      <text x={cx} y={cy - 10} className="risk-gauge-value">{value}</text>
      <text x={cx} y={cy + 12} className="risk-gauge-label">Risk Score</text>
    </svg>
  )
}

// ── Weather Icon Map ──
const weatherIcons: Record<string, React.ElementType> = {
  'Tropical Storm': CloudRain, 'Severe Drought': Sun,
  'Heat Wave': Thermometer, 'Hurricane Risk': Wind,
}

// ── Custom Tooltip ──
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 10, padding: '10px 14px', fontSize: '0.75rem'
    }}>
      <p style={{ fontWeight: 700, marginBottom: 4 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || p.stroke, fontWeight: 600 }}>
          {p.name}: {typeof p.value === 'number' ? p.value.toFixed(2) : p.value}
        </p>
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════
//  MAIN DASHBOARD COMPONENT
// ══════════════════════════════════════════════
const Dashboard = () => {
  const [time, setTime] = useState(new Date())
  useEffect(() => { const iv = setInterval(() => setTime(new Date()), 60000); return () => clearInterval(iv) }, [])

  return (
    <div className="relative">
      <div className="bg-glow bg-glow-top-right"></div>
      <div className="bg-glow bg-glow-bottom-left"></div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="dash-grid">

          {/* ═══ HEADER ═══ */}
          <motion.div className="dash-header" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div>
              <h1>Intelligence Dashboard</h1>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                Real-time commodity monitoring & AI-powered risk analysis
              </p>
            </div>
            <div className="dash-header-meta">
              <span className="live-badge"><span className="live-dot" /> Live Feed</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </motion.div>

          {/* ═══ 1. LIVE COMMODITY PRICES ═══ */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <div className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Radio style={{ width: 12, height: 12 }} /> Live Commodity Prices
            </div>
            <div className="dash-row-6">
              {dashboardCommodities.map((c) => {
                const sparkColor = c.status === 'danger' ? '#ef4444' : c.status === 'warning' ? '#f59e0b' : '#10b981'
                return (
                  <motion.div key={c.id} variants={fadeUp} className="dash-card commodity-mini">
                    <div className="commodity-mini-top">
                      <span className="commodity-mini-name">{c.name}</span>
                      <span className={`commodity-mini-change ${c.trend}`}>
                        {c.trend === 'up' ? <ArrowUpRight style={{ width: 10, height: 10 }} /> : <ArrowDownRight style={{ width: 10, height: 10 }} />}
                        {c.change}
                      </span>
                    </div>
                    <div>
                      <span className="commodity-mini-price">{c.price}</span>
                      <span className="commodity-mini-unit">{c.unit}</span>
                    </div>
                    <Sparkline data={c.sparkline} color={sparkColor} />
                    <div className="commodity-mini-footer">
                      <span>Vol: {c.volume}</span>
                      <span>{c.updated}</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* ═══ 2. PRICE TREND + 4. SHORTAGE RISK ═══ */}
          <motion.div className="dash-row-2" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {/* Price Trend Chart */}
            <motion.div variants={fadeUp} className="dash-card dash-card-lg">
              <div className="dash-card-header">
                <div className="dash-card-title"><TrendingUp style={{ width: 18, height: 18, color: 'var(--color-primary)' }} /> Price Trends (12M)</div>
                <div className="dash-card-subtitle">Multi-commodity tracking</div>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceTrendData}>
                    <defs>
                      <linearGradient id="gOil" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gWheat" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} dy={8} />
                    <YAxis hide />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="oil" name="Oil ($)" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gOil)" dot={false} animationDuration={2000} />
                    <Area type="monotone" dataKey="wheat" name="Wheat ($)" stroke="#f59e0b" strokeWidth={2} fill="url(#gWheat)" dot={false} animationDuration={2200} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="pred-legend">
                <span className="pred-legend-item"><span className="pred-legend-line" style={{ background: '#3b82f6' }} /> Crude Oil</span>
                <span className="pred-legend-item"><span className="pred-legend-line" style={{ background: '#f59e0b' }} /> Wheat</span>
              </div>
            </motion.div>

            {/* Shortage Risk Meter */}
            <motion.div variants={fadeUp} className="dash-card dash-card-lg">
              <div className="dash-card-header">
                <div className="dash-card-title"><Shield style={{ width: 18, height: 18, color: 'var(--color-warning)' }} /> Shortage Risk</div>
              </div>
              <div className="risk-gauge-wrap">
                <RiskGauge value={shortageRiskData.overall} />
                <span className="risk-level-pill elevated">{shortageRiskData.level}</span>
              </div>
              <div className="risk-factors">
                {shortageRiskData.factors.map((f) => (
                  <div key={f.name} className="risk-factor-row">
                    <span className="risk-factor-name">{f.name}</span>
                    <div className="risk-factor-bar">
                      <div className="risk-factor-fill" style={{ width: `${f.value}%`, background: f.color }} />
                    </div>
                    <span className="risk-factor-val" style={{ color: f.color }}>{f.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ═══ 3. AI PREDICTION + 10. FORECAST CONFIDENCE ═══ */}
          <motion.div className="dash-row-2" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {/* AI Prediction Chart */}
            <motion.div variants={fadeUp} className="dash-card dash-card-lg">
              <div className="dash-card-header">
                <div className="dash-card-title"><Brain style={{ width: 18, height: 18, color: 'var(--color-secondary)' }} /> AI Price Prediction</div>
                <div className="dash-card-subtitle">Crude Oil — 4 month forecast</div>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={aiPredictionData}>
                    <defs>
                      <linearGradient id="gConf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} dy={8} />
                    <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip content={<ChartTooltip />} />
                    <ReferenceLine x="May" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" label={{ value: 'Today', fill: 'rgba(255,255,255,0.3)', fontSize: 10, position: 'top' }} />
                    <Area type="monotone" dataKey="upper" name="Upper Bound" stroke="none" fill="url(#gConf)" animationDuration={2000} />
                    <Area type="monotone" dataKey="lower" name="Lower Bound" stroke="none" fill="transparent" animationDuration={2000} />
                    <Line type="monotone" dataKey="actual" name="Actual" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: '#3b82f6' }} connectNulls={false} animationDuration={1800} />
                    <Line type="monotone" dataKey="predicted" name="AI Predicted" stroke="#8b5cf6" strokeWidth={2.5} strokeDasharray="6 3" dot={{ r: 3, fill: '#8b5cf6', strokeDasharray: '' }} animationDuration={2200} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="pred-legend">
                <span className="pred-legend-item"><span className="pred-legend-line" style={{ background: '#3b82f6' }} /> Actual</span>
                <span className="pred-legend-item"><span className="pred-legend-line" style={{ background: '#8b5cf6', borderStyle: 'dashed' }} /> AI Predicted</span>
                <span className="pred-legend-item"><span className="pred-legend-area" style={{ background: '#8b5cf6' }} /> Confidence Band</span>
              </div>
            </motion.div>

            {/* Forecast Confidence */}
            <motion.div variants={fadeUp} className="dash-card dash-card-lg">
              <div className="dash-card-header">
                <div className="dash-card-title"><BarChart3 style={{ width: 18, height: 18, color: 'var(--color-success)' }} /> Forecast Confidence</div>
              </div>
              <div className="fc-list">
                {forecastConfidence.map((fc) => (
                  <div key={fc.commodity} className="fc-row">
                    <span className="fc-name">{fc.commodity}</span>
                    <div className="fc-bars">
                      <div className="fc-bar-group">
                        <span className="fc-bar-label">30d</span>
                        <div className="fc-bar-track"><div className="fc-bar-fill short" style={{ width: `${fc.short}%` }} /></div>
                      </div>
                      <div className="fc-bar-group">
                        <span className="fc-bar-label">90d</span>
                        <div className="fc-bar-track"><div className="fc-bar-fill medium" style={{ width: `${fc.medium}%` }} /></div>
                      </div>
                      <div className="fc-bar-group">
                        <span className="fc-bar-label">1y</span>
                        <div className="fc-bar-track"><div className="fc-bar-fill long" style={{ width: `${fc.long}%` }} /></div>
                      </div>
                    </div>
                    <div className="fc-direction">
                      {fc.direction === 'up'
                        ? <ArrowUpRight className="fc-arrow up" />
                        : <ArrowDownRight className="fc-arrow down" />}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ═══ 5. CRISIS HEATMAP ═══ */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="dash-card dash-card-lg">
            <div className="dash-card-header">
              <div className="dash-card-title"><Globe style={{ width: 18, height: 18, color: 'var(--color-danger)' }} /> Global Crisis Heatmap</div>
              <div className="dash-card-subtitle">Active disruptions worldwide</div>
            </div>
            <div className="crisis-grid">
              {crisisRegions.map((cr) => (
                <motion.div key={cr.id} className={`crisis-cell ${cr.severity}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: cr.id * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="crisis-region">
                    <span className={`severity-dot ${cr.severity}`} />
                    {cr.region}
                  </div>
                  <div className="crisis-type">{cr.type}</div>
                  <div className="crisis-impact">{cr.impact}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ═══ 6. RECOMMENDATIONS + 7. NEWS + 8. WEATHER ═══ */}
          <motion.div className="dash-row-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {/* Smart Recommendations */}
            <motion.div variants={fadeUp} className="dash-card dash-card-lg">
              <div className="dash-card-header">
                <div className="dash-card-title"><Lightbulb style={{ width: 18, height: 18, color: 'var(--color-warning)' }} /> Smart Recommendations</div>
              </div>
              <div className="scroll-panel rec-list">
                {smartRecommendations.map((rec, i) => (
                  <motion.div key={rec.id} className="rec-item"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="rec-item-header">
                      <span className="rec-title">{rec.title}</span>
                      <span className={`rec-priority ${rec.priority}`}>{rec.priority}</span>
                    </div>
                    <p className="rec-desc">{rec.desc}</p>
                    <div className="rec-footer">
                      <span className="rec-confidence"><Zap style={{ width: 10, height: 10 }} /> {rec.confidence}% conf.</span>
                      <span className="rec-impact">{rec.impact}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* News Intelligence Feed */}
            <motion.div variants={fadeUp} className="dash-card dash-card-lg">
              <div className="dash-card-header">
                <div className="dash-card-title"><Newspaper style={{ width: 18, height: 18, color: 'var(--color-primary)' }} /> News Intelligence</div>
              </div>
              <div className="scroll-panel news-list">
                {newsFeed.map((news, i) => (
                  <motion.div key={news.id} className="news-item"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className={`news-sentiment-bar ${news.sentiment}`} />
                    <div className="news-title">{news.title}</div>
                    <div className="news-meta">
                      <span className="news-source">{news.source}</span>
                      <span>{news.time}</span>
                      <span className="news-category">{news.category}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Weather Impact Panel */}
            <motion.div variants={fadeUp} className="dash-card dash-card-lg">
              <div className="dash-card-header">
                <div className="dash-card-title"><CloudRain style={{ width: 18, height: 18, color: 'var(--color-primary)' }} /> Weather Impact</div>
              </div>
              <div className="scroll-panel weather-list">
                {weatherImpactData.map((w, i) => {
                  const WIcon = weatherIcons[w.condition] || CloudRain
                  return (
                    <motion.div key={w.id} className="weather-item"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className={`weather-icon-wrap ${w.severity}`}>
                        <WIcon style={{ width: 18, height: 18 }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="weather-region">{w.region}</div>
                        <div className="weather-condition">{w.condition} · {w.duration}</div>
                        <div className="weather-commodities">
                          {w.commodities.map((c) => <span key={c} className="weather-tag">{c}</span>)}
                        </div>
                        <div className="weather-stats">
                          <span>Duration: {w.duration}</span>
                          <span className="weather-stat-danger">{w.priceImpact}</span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* ═══ 9. AI EXPLANATIONS ═══ */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <Sparkles style={{ width: 12, height: 12 }} /> AI-Generated Insights
            </div>
            <div className="ai-explanations">
              {aiExplanations.map((ai, i) => (
                <motion.div key={ai.id} className="ai-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="ai-card-glow" />
                  <div className="ai-badge"><Brain style={{ width: 10, height: 10 }} /> AI Analysis · {ai.commodity}</div>
                  <div className="ai-question">{ai.question}</div>
                  <p className="ai-answer">{ai.explanation}</p>
                  <div className="ai-factors">
                    {ai.factors.map((f) => <span key={f} className="ai-factor-tag">{f}</span>)}
                  </div>
                  <div className="ai-card-footer">
                    <div className="ai-confidence">
                      <span>Confidence: {ai.confidence}%</span>
                      <div className="ai-conf-bar">
                        <div className="ai-conf-fill" style={{ width: `${ai.confidence}%` }} />
                      </div>
                    </div>
                    <span>{ai.updated}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
