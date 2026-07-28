import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Globe from 'react-globe.gl'
import { 
  X, Send, MapPin, AlertTriangle, MessageSquare, 
  ThumbsUp, Share2, Info, PenLine, 
  PlusCircle, Globe as GlobeIcon,
  CheckCircle, ShieldAlert
} from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import { globalCrisisEvents, localityReviews } from '../data/mockData'

const Locality = () => {
  const globeEl = useRef<any>()
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'insights' | 'report'>('insights')
  const [isAutoRotate, setIsAutoRotate] = useState(true)
  const [globeReady, setGlobeReady] = useState(false)
  const [regionInput, setRegionInput] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [reviewMarkers, setReviewMarkers] = useState<{ lat: number; lng: number; label: string }[]>([])

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = isAutoRotate
      globeEl.current.controls().autoRotateSpeed = 0.5
      if (isAutoRotate) {
        globeEl.current.pointOfView({ lat: 20, lng: 77, altitude: 2.5 })
      }
    }
  }, [globeReady, isAutoRotate])

  // Gen globe data
  const globeData = useMemo(() => {
    return globalCrisisEvents.map(event => ({
      lat: event.lat,
      lng: event.lng,
      size: event.size,
      color: event.severity === 'critical' ? '#ef4444' : 
             event.severity === 'high' ? '#f97316' : 
             event.severity === 'medium' ? '#f59e0b' : '#3b82f6',
      label: event.label
    }))
  }, [])

  // Green review markers for the globe
  const reviewGlobeData = useMemo(() => {
    return reviewMarkers.map(marker => ({
      lat: marker.lat,
      lng: marker.lng,
      size: 0.8,
      color: '#22c55e',
      label: `✅ ${marker.label}`
    }))
  }, [reviewMarkers])

  const allGlobeData = useMemo(() => [...globeData, ...reviewGlobeData], [globeData, reviewGlobeData])

  const handlePointClick = (point: any) => {
    setIsAutoRotate(false)
    setSelectedEvent(point)
    setIsModalOpen(true)
    setActiveTab('insights')
    setSubmitSuccess(false)
  }

  const handleGlobeClick = ({ lat, lng }: { lat: number, lng: number }) => {
    setIsAutoRotate(false)
    setSelectedEvent({ 
      label: `Region (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`,
      lat, 
      lng 
    })
    setRegionInput('')
    setIsModalOpen(true)
    setActiveTab('report')
    setSubmitSuccess(false)
  }

  const handleSubmitReport = () => {
    const lat = selectedEvent?.lat ?? 20.5
    const lng = selectedEvent?.lng ?? 78.9
    const label = regionInput || selectedEvent?.label || 'Unknown Region'

    // Add green marker
    setReviewMarkers(prev => [...prev, { lat, lng, label }])

    // Show success
    setSubmitSuccess(true)
    setTimeout(() => {
      setSubmitSuccess(false)
      setIsModalOpen(false)
    }, 2500)
  }

  return (
    <div className="relative w-full h-[calc(100vh-128px)] overflow-hidden bg-background">
      {/* Globe Container */}
      <div className="absolute inset-0 z-0">
        <Globe
          ref={globeEl}
          onGlobeReady={() => setGlobeReady(true)}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          onGlobeClick={handleGlobeClick}
          onPointClick={handlePointClick}
          ringsData={allGlobeData}
          ringColor={(d: any) => d.color}
          ringMaxRadius={5}
          ringPropagationSpeed={2}
          ringRepeatPeriod={1000}
          atmosphereColor="#cae9ff"
          atmosphereAltitude={0.2}
        />
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Left Panel: Crisis Intensity */}
        <div className="absolute top-8 left-8 w-80 space-y-4 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="p-4 border-white/10">
               <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">Crisis Intensity</h3>
               <div className="space-y-3">
                  {[
                    { label: 'Critical', color: 'bg-red-500', count: 3 },
                    { label: 'High', color: 'bg-orange-500', count: 5 },
                    { label: 'Medium', color: 'bg-yellow-500', count: 8 },
                    { label: 'Stable', color: 'bg-blue-500', count: 12 },
                  ].map(lvl => (
                    <div key={lvl.label} className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${lvl.color}`} />
                          <span className="text-xs text-white/80">{lvl.label}</span>
                       </div>
                       <span className="text-[10px] font-bold text-muted">{lvl.count}</span>
                    </div>
                  ))}
               </div>
            </GlassCard>
          </motion.div>

          {/* Review markers legend */}
          {reviewMarkers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <GlassCard className="p-4 border-emerald-500/10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
                  ✅ Your Reviews ({reviewMarkers.length})
                </h3>
                <div className="space-y-2">
                  {reviewMarkers.slice(-3).map((m, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs text-white/80 truncate">{m.label}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button 
              onClick={() => { setIsModalOpen(true); setSubmitSuccess(false) }}
              className="w-full btn btn-primary py-4 shadow-xl shadow-primary/20 pointer-events-auto"
            >
              <PlusCircle className="w-5 h-5" /> REPORT CRISIS
            </button>
          </motion.div>
        </div>

        {/* Right Panel: Bottom Legend/Info */}
        <div className="absolute bottom-8 right-8 w-64 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-4 border-white/10">
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
                     <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                     <p className="text-[10px] uppercase font-bold text-muted">Safe Corridor</p>
                     <p className="text-xs font-bold">Western EU Stable</p>
                  </div>
               </div>
               <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-4/5" />
               </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Center Hint */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
           {!selectedEvent && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-xs font-bold text-white/30 uppercase tracking-[0.3em]"
              >
                Drag to rotate · Click hotspots
              </motion.p>
           )}
        </div>
      </div>

      {/* Detail Modal / Side Panel */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-background border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <GlobeIcon className="w-6 h-6" />
                   </div>
                   <div>
                      <h2 className="text-xl font-bold">{selectedEvent?.label || 'Global Intelligence'}</h2>
                      <p className="text-xs text-muted flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Targeted Region Analysis
                      </p>
                   </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="flex border-b border-white/10 px-6">
                 <button 
                  onClick={() => setActiveTab('insights')}
                  className={`py-4 px-6 text-sm font-bold border-b-2 transition-all ${activeTab === 'insights' ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-white'}`}
                 >
                    COMMUNITY INSIGHTS
                 </button>
                 <button 
                  onClick={() => setActiveTab('report')}
                  className={`py-4 px-6 text-sm font-bold border-b-2 transition-all ${activeTab === 'report' ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-white'}`}
                 >
                    SUBMIT REPORT
                 </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {activeTab === 'insights' ? (
                  <div className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                           <p className="text-[10px] uppercase font-bold text-muted mb-1">Severity</p>
                           <p className="text-lg font-bold text-red-400">HIGH</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                           <p className="text-[10px] uppercase font-bold text-muted mb-1">Reports Today</p>
                           <p className="text-lg font-bold text-white">124</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                           <p className="text-[10px] uppercase font-bold text-muted mb-1">Verification</p>
                           <p className="text-lg font-bold text-emerald-400">92%</p>
                        </div>
                     </div>

                     <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">Latest Field Updates</h3>
                     <div className="space-y-4">
                        {localityReviews.map(review => (
                          <div key={review.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                             <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                      {review.user[0]}
                                   </div>
                                   <div>
                                      <p className="text-sm font-bold">{review.user}</p>
                                      <p className="text-[10px] text-muted">{review.region} · {review.date}</p>
                                   </div>
                                </div>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                                  review.type === 'Crisis' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                                }`}>
                                  {review.type.toUpperCase()}
                                </span>
                             </div>
                             <p className="text-sm text-white/80 leading-relaxed italic mb-4">
                                "{review.comment}"
                             </p>
                             <div className="flex items-center gap-6">
                                <button className="flex items-center gap-2 text-[10px] font-bold text-muted hover:text-white transition-colors">
                                   <ThumbsUp className="w-4 h-4" /> {review.upvotes} UPVOTES
                                </button>
                                <button className="flex items-center gap-2 text-[10px] font-bold text-muted hover:text-white transition-colors">
                                   <MessageSquare className="w-4 h-4" /> DISCUSS
                                </button>
                                <button className="flex items-center gap-2 text-[10px] font-bold text-muted hover:text-white transition-colors">
                                   <Share2 className="w-4 h-4" /> SHARE
                                </button>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                ) : (
                  <div className="max-w-2xl mx-auto space-y-6">
                     {/* Success Message */}
                     <AnimatePresence>
                       {submitSuccess && (
                         <motion.div
                           initial={{ opacity: 0, y: -10, scale: 0.95 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           exit={{ opacity: 0, y: -10, scale: 0.95 }}
                           className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-4"
                         >
                           <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                             <CheckCircle className="w-6 h-6 text-emerald-400" />
                           </div>
                           <div>
                             <p className="text-base font-bold text-emerald-400">Review Uploaded Successfully!</p>
                             <p className="text-xs text-emerald-400/70">Your report has been added to the globe. A green marker has been placed at the location.</p>
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>

                     {!submitSuccess && (
                       <>
                         <div className="text-center mb-8">
                            <PenLine className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-bold">Submit Local Intelligence</h3>
                            <p className="text-sm text-muted">Your observations help thousands make better decisions.</p>
                         </div>

                         <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-2">
                                  <label className="text-xs font-bold text-muted uppercase">Report Category</label>
                                  <select className="w-full bg-[#0e0e12] border border-white/10 rounded-xl p-3 text-sm text-white/90 outline-none focus:border-primary/50 appearance-none" style={{ colorScheme: 'dark' }}>
                                     <option className="bg-[#0e0e12] text-white/90">Locality News</option>
                                     <option className="bg-[#0e0e12] text-white/90">Product Shortage</option>
                                     <option className="bg-[#0e0e12] text-white/90">Price Hike / Crisis</option>
                                     <option className="bg-[#0e0e12] text-white/90">Natural Disaster</option>
                                     <option className="bg-[#0e0e12] text-white/90">Logistics Strike</option>
                                     <option className="bg-[#0e0e12] text-white/90">Local Observation</option>
                                  </select>
                               </div>
                               <div className="space-y-2">
                                  <label className="text-xs font-bold text-muted uppercase">Severity Level</label>
                                  <select className="w-full bg-[#0e0e12] border border-white/10 rounded-xl p-3 text-sm text-white/90 outline-none focus:border-primary/50 appearance-none" style={{ colorScheme: 'dark' }}>
                                     <option className="bg-[#0e0e12] text-white/90">Low - Minor Delay</option>
                                     <option className="bg-[#0e0e12] text-white/90">Medium - Noticeable Hike</option>
                                     <option className="bg-[#0e0e12] text-white/90">High - Severe Shortage</option>
                                     <option className="bg-[#0e0e12] text-white/90">Critical - Emergency</option>
                                  </select>
                               </div>
                            </div>

                            <div className="space-y-2">
                               <label className="text-xs font-bold text-muted uppercase">Region</label>
                                <input 
                                   type="text" 
                                   placeholder="Enter your region (e.g. Mumbai, Maharashtra)"
                                   value={regionInput}
                                   onChange={(e) => setRegionInput(e.target.value)}
                                   className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-primary/50 text-white placeholder:text-muted"
                                />
                            </div>

                            <div className="space-y-2">
                               <label className="text-xs font-bold text-muted uppercase">Intelligence Details</label>
                                <textarea 
                                  rows={5}
                                  placeholder="Write your locality news or share observations here. Be specific about shortages, price changes, or any ongoing crisis/disaster..."
                                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-primary/50 resize-none"
                                />
                            </div>

                            <button 
                              onClick={handleSubmitReport}
                              className="w-full btn btn-primary py-4 text-base mt-4"
                            >
                               <Send className="w-5 h-5" /> BROADCAST REPORT
                            </button>
                         </div>
                       </>
                     )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Locality
