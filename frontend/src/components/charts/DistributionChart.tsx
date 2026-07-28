import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

interface DistributionItem {
  name: string
  value: number
  color: string
}

interface DistributionChartProps {
  data: DistributionItem[]
  title?: string
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null
  const d = payload[0]
  return (
    <div style={{
      backgroundColor: '#0f172a',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: '10px',
      padding: '10px 14px',
      color: '#fff',
      fontSize: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }}>
      <p style={{ fontWeight: 700 }}>{d.name}</p>
      <p style={{ color: d.payload.color, fontWeight: 600 }}>{d.value}%</p>
    </div>
  )
}

const DistributionChart = ({ data, title }: DistributionChartProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      {title && <p className="text-xs font-bold text-muted uppercase tracking-widest mb-2">{title}</p>}
      <div className="w-full flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={4}
              dataKey="value"
              animationDuration={1500}
              stroke="rgba(0,0,0,0.3)"
              strokeWidth={2}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-[10px] text-white/60 font-medium">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DistributionChart
