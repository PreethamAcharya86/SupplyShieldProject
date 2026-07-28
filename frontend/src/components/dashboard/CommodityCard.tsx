import {
  ArrowUpRight, ArrowDownRight, Minus, Fuel, Flame, Beef, Apple,
  Gem, Droplets, CircleDollarSign, Egg, Pill, Cpu, Battery
} from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import { cn } from '../../lib/utils'

const icons: Record<string, React.ComponentType<any>> = {
  Fuel, Flame, Beef, Apple, Gem, Droplets, CircleDollarSign, Egg, Pill, Cpu, Battery
}

interface CommodityCardProps {
  name: string
  price: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  status: 'success' | 'warning' | 'danger'
  icon: string
  sparkline?: number[]
  delay?: number
}

const CommodityCard = ({ name, price, change, trend, status, icon, sparkline, delay }: CommodityCardProps) => {
  const Icon = icons[icon] || Fuel

  // Mini sparkline SVG
  const renderSparkline = () => {
    if (!sparkline || sparkline.length < 2) return null
    const min = Math.min(...sparkline)
    const max = Math.max(...sparkline)
    const range = max - min || 1
    const w = 80
    const h = 24
    const points = sparkline.map((v, i) => {
      const x = (i / (sparkline.length - 1)) * w
      const y = h - ((v - min) / range) * h
      return `${x},${y}`
    }).join(' ')

    const color = status === 'danger' ? '#ef4444' : status === 'warning' ? '#f59e0b' : '#10b981'

    return (
      <svg width={w} height={h} className="opacity-60">
        <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} />
      </svg>
    )
  }

  return (
    <GlassCard delay={delay} className="min-w-[220px]">
      <div className="flex justify-between items-start mb-3">
        <div className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center",
          status === 'success' && "text-emerald-400 border border-emerald-500/20 bg-emerald-500/10",
          status === 'warning' && "text-amber-400 border border-amber-500/20 bg-amber-500/10",
          status === 'danger' && "text-red-400 border border-red-500/20 bg-red-500/10"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
          trend === 'up' && "text-red-400 bg-red-500/10",
          trend === 'down' && "text-emerald-400 bg-emerald-500/10",
          trend === 'neutral' && "text-muted bg-white/5"
        )}>
          {trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
          {trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
          {trend === 'neutral' && <Minus className="w-3 h-3" />}
          {change}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-muted text-xs font-medium mb-0.5">{name}</h3>
          <p className="text-xl font-bold tracking-tight">{price}</p>
        </div>
        {renderSparkline()}
      </div>

      <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className={cn(
          "h-full rounded-full transition-all duration-1000",
          status === 'success' ? "bg-emerald-400 w-1/3" :
          status === 'warning' ? "bg-amber-400 w-2/3" : "bg-red-400 w-full"
        )} />
      </div>
    </GlassCard>
  )
}

export default CommodityCard
