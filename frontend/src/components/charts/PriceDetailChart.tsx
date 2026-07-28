import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts'

interface DataPoint {
  month: string
  price?: number
  predicted?: number
  upper?: number
  lower?: number
}

interface PriceDetailChartProps {
  data: DataPoint[]
  commodityName: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null
  return (
    <div style={{
      backgroundColor: '#0f172a',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: '12px',
      padding: '12px 16px',
      color: '#fff',
      fontSize: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }}>
      <p style={{ fontWeight: 700, marginBottom: 6, color: '#94a3b8' }}>{label}</p>
      {payload.map((p: any, i: number) => {
        if (p.dataKey === 'upper' || p.dataKey === 'lower') return null
        const colors: Record<string, string> = { price: '#3b82f6', predicted: '#a78bfa' }
        const labels: Record<string, string> = { price: '📊 Actual', predicted: '🤖 AI Predicted' }
        return (
          <p key={i} style={{ color: colors[p.dataKey] || '#fff', fontWeight: 600 }}>
            {labels[p.dataKey] || p.dataKey}: {typeof p.value === 'number' ? p.value.toFixed(1) : '—'}
          </p>
        )
      })}
      {payload.find((p: any) => p.dataKey === 'upper') && (
        <p style={{ color: '#64748b', fontSize: 10, marginTop: 4 }}>
          Band: {payload.find((p: any) => p.dataKey === 'lower')?.value?.toFixed(1)} – {payload.find((p: any) => p.dataKey === 'upper')?.value?.toFixed(1)}
        </p>
      )}
    </div>
  )
}

const PriceDetailChart = ({ data, commodityName }: PriceDetailChartProps) => {
  // Find where prediction starts
  const lastActualIdx = data.reduce((acc, d, i) => (d.price != null ? i : acc), 0)
  const dividerMonth = data[lastActualIdx]?.month

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-actual-${commodityName}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id={`grad-pred-${commodityName}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
            <linearGradient id={`grad-band-${commodityName}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
            dy={10}
            interval={1}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
            width={45}
          />
          <Tooltip content={<CustomTooltip />} />
          {dividerMonth && (
            <ReferenceLine
              x={dividerMonth}
              stroke="rgba(167,139,250,0.4)"
              strokeDasharray="4 4"
              label={{ value: 'AI Forecast →', position: 'top', fill: '#a78bfa', fontSize: 10, fontWeight: 700 }}
            />
          )}
          {/* Confidence band */}
          <Area type="monotone" dataKey="upper" stroke="none" fillOpacity={1} fill={`url(#grad-band-${commodityName})`} name="upper" />
          <Area type="monotone" dataKey="lower" stroke="none" fillOpacity={0} fill="transparent" name="lower" />
          {/* Actual prices */}
          <Area
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fillOpacity={1}
            fill={`url(#grad-actual-${commodityName})`}
            animationDuration={1500}
            connectNulls={false}
            dot={{ r: 3, fill: '#3b82f6', stroke: '#0f172a', strokeWidth: 2 }}
            name="Actual"
          />
          {/* Predicted prices */}
          <Area
            type="monotone"
            dataKey="predicted"
            stroke="#a78bfa"
            strokeWidth={2}
            strokeDasharray="6 3"
            fillOpacity={1}
            fill={`url(#grad-pred-${commodityName})`}
            animationDuration={2000}
            connectNulls={false}
            dot={{ r: 3, fill: '#a78bfa', stroke: '#0f172a', strokeWidth: 2 }}
            name="Predicted"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PriceDetailChart
