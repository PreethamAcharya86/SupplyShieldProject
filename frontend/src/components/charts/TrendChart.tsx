import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { trendData } from '../../data/mockData'

const TrendChart = () => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trendData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            dy={10}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorPrice)"
            animationDuration={2000}
            connectNulls={false}
            name="Actual"
          />
          <Area
            type="monotone"
            dataKey="predicted"
            stroke="#8b5cf6"
            strokeWidth={2}
            strokeDasharray="6 3"
            fillOpacity={1}
            fill="url(#colorPredicted)"
            animationDuration={2500}
            name="Predicted"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TrendChart
