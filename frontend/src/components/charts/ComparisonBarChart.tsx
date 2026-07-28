import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts'

interface BarItem {
  name: string
  change: number
  fill: string
}

interface ComparisonBarChartProps {
  data: BarItem[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.[0]) return null
  const v = payload[0].value
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
      <p style={{ fontWeight: 700, marginBottom: 4 }}>{label}</p>
      <p style={{ color: v >= 0 ? '#ef4444' : '#10b981', fontWeight: 600 }}>
        {v >= 0 ? '+' : ''}{v.toFixed(1)}% price change
      </p>
    </div>
  )
}

const ComparisonBarChart = ({ data }: ComparisonBarChartProps) => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
            tickFormatter={(v) => `${v >= 0 ? '+' : ''}${v}%`}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 600 }}
            width={65}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="change" radius={[0, 6, 6, 0]} animationDuration={1500} barSize={18}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ComparisonBarChart
