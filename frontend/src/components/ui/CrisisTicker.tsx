import { tickerItems } from '../../data/mockData'

const CrisisTicker = () => {
  const doubled = [...tickerItems, ...tickerItems]

  return (
    <div className="fixed top-[72px] left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <div className="overflow-hidden py-2">
        <div className="flex items-center gap-8 whitespace-nowrap animate-ticker">
          {doubled.map((item, i) => (
            <span key={i} className="text-xs font-medium text-muted flex-shrink-0 px-4">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CrisisTicker
