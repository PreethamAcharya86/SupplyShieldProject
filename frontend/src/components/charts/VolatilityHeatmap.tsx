import { motion } from 'framer-motion'

interface VolatilityItem {
  name: string
  volatility: number
  status: string
}

interface VolatilityHeatmapProps {
  data: VolatilityItem[]
}

const getColor = (v: number) => {
  if (v >= 80) return { bg: 'rgba(239,68,68,0.25)', border: 'rgba(239,68,68,0.4)', text: 'text-red-400' }
  if (v >= 60) return { bg: 'rgba(249,115,22,0.2)', border: 'rgba(249,115,22,0.35)', text: 'text-orange-400' }
  if (v >= 40) return { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', text: 'text-amber-400' }
  if (v >= 20) return { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.25)', text: 'text-emerald-400' }
  return { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)', text: 'text-blue-400' }
}

const VolatilityHeatmap = ({ data }: VolatilityHeatmapProps) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {data.map((item, i) => {
        const c = getColor(item.volatility)
        return (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl p-3 text-center border transition-all hover:scale-105 cursor-default"
            style={{ backgroundColor: c.bg, borderColor: c.border }}
          >
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">{item.name}</p>
            <p className={`text-lg font-black ${c.text}`}>{item.volatility}%</p>
            <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: c.border.replace(/[\d.]+\)$/, '0.8)') }}
                initial={{ width: 0 }}
                whileInView={{ width: `${item.volatility}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.05 + 0.3 }}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default VolatilityHeatmap
