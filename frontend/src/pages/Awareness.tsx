import { motion } from 'framer-motion'
import {
  BookOpen, ShieldCheck, Zap, Info, ChevronRight,
  HelpCircle, Lightbulb, CheckSquare, ListChecks,
  TrendingUp, CloudRain, Cpu, Fuel, ShoppingCart, Scale, HeartPulse,
  Globe, Clock, ExternalLink, Newspaper
} from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import { awarenessCards } from '../data/mockData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

import { useState, useEffect } from 'react'
import axios from 'axios'

const Awareness = () => {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY
        if (!apiKey) {
          console.warn('News API Key missing - please add VITE_NEWS_API_KEY to your .env')
          setLoading(false)
          return
        }

        // Fetching Indian supply chain / disaster news
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'India AND (disaster OR "price hike" OR "supply chain" OR "inflation" OR "commodity shortage")',
            sortBy: 'relevancy',
            language: 'en',
            pageSize: 50,
            apiKey: apiKey
          }
        })

        const allArticles = response.data.articles || []
        
        // Advanced filtering for high relevance keywords
        const relevantKeywords = ['flood', 'cyclone', 'hike', 'war', 'shortage', 'crisis', 'inflation', 'disruption', 'supply']
        const filtered = allArticles.filter((article: any) => {
          const content = (article.title + article.description).toLowerCase()
          return relevantKeywords.some(keyword => content.includes(keyword))
        })

        // Pick 3 random articles from the filtered list (or the whole list if filtering returned too few)
        const pool = filtered.length >= 3 ? filtered : allArticles
        const shuffled = [...pool].sort(() => 0.5 - Math.random())
        setNews(shuffled.slice(0, 3))
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span className="text-gradient">Supply Chain Awareness</span>
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Educate yourself on how global events impact your local prices and learn how to prepare for supply disruptions.
        </p>
      </motion.div>

      {/* Live Intelligence Section (Real News API) */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary border border-primary/30">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Live Indian Crisis Feed</h2>
            <p className="text-xs text-muted font-medium tracking-wide">Real-time headlines from top news sources</p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="glass-card p-6 h-64 animate-pulse bg-white/5 border-white/10" />
            ))
          ) : news.length > 0 ? (
            news.map((article, i) => (
              <motion.div key={i} variants={itemVariants}>
                <GlassCard className="p-0 h-full flex flex-col glass-card-hover border-white/10 bg-white/2 group relative overflow-hidden">
                  {/* News Image Header */}
                  <div className="h-40 w-full overflow-hidden relative">
                    <img 
                      src={article.urlToImage || 'https://images.unsplash.com/photo-1504711432869-efd5971ee14b?auto=format&fit=crop&q=80&w=800'} 
                      alt={article.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                      onError={(e: any) => {
                        e.target.src = 'https://images.unsplash.com/photo-1504711432869-efd5971ee14b?auto=format&fit=crop&q=80&w=800'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-primary/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black text-primary border border-primary/30">
                      LIVE FEED
                    </div>
                  </div>

                  <div className="p-6 pt-2 flex flex-col flex-1 relative z-10">
                    <div className="flex items-center gap-2 mb-3 text-muted">
                      <Globe className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{article.source?.name || 'News Source'}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed mb-6 line-clamp-3">
                      {article.description}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-muted">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">
                          {new Date(article.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[10px] font-black text-primary hover:gap-2 transition-all"
                      >
                         READ FULL STORY <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center glass-card border-white/5">
              <p className="text-muted italic">No live news available at the moment. Please verify your API key.</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* Main Educational Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-muted uppercase tracking-widest">General Awareness</h2>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
      >
        {awarenessCards.map((card, i) => {
          const iconsMap: any = { Fuel, CloudRain, Cpu, ShoppingCart, Scale, HeartPulse }
          const Icon = iconsMap[card.icon] || Info

          return (
            <motion.div key={card.title} variants={itemVariants}>
              <GlassCard className="p-6 h-full flex flex-col glass-card-hover border-white/5 group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${card.impact === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    card.impact === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                    {card.impact} Impact
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
                  {card.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{card.category}</span>
                  <button className="p-2 rounded-lg bg-white/5 text-primary hover:bg-white/10 transition-colors">
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Preparation Checklist Section */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Emergency Buy Checklist</h2>
          <p className="text-muted">Stay prepared without panic buying. Focus on what matters.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard className="p-8 border-emerald-500/10">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
              <ListChecks className="w-5 h-5 text-emerald-400" />
              Essential Stocks (2-4 Weeks)
            </h3>
            <ul className="space-y-4">
              {[
                'Non-perishable grains (Rice, Lentils, Millets)',
                'Cooking oil and essential spices',
                'LPG backup or alternative fuel sources',
                'Common medicines (Paracetamol, First-aid)',
                'Water storage (at least 3 liters per person/day)',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1 w-4 h-4 rounded border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-emerald-500 rounded-sm" />
                  </div>
                  <span className="text-sm text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-8 border-blue-500/10">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-blue-400" />
              Intelligence Best Practices
            </h3>
            <ul className="space-y-4">
              {[
                'Monitor local news for route disruptions',
                'Watch global oil prices for transport hike signals',
                'Check weather forecasts for production regions',
                'Diversify local alternative supply sources',
                'Avoid bulk buying during early peak surge',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1 w-4 h-4 rounded border border-blue-500/30 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-sm" />
                  </div>
                  <span className="text-sm text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

    </div>
  )
}

export default Awareness
