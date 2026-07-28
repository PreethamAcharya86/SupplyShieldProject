import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import CrisisTicker from '../ui/CrisisTicker'
import { ShieldCheck } from 'lucide-react'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-white relative">
      {/* Ambient background glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-[80px] pointer-events-none opacity-40 z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-radial from-purple-500/15 to-transparent rounded-full blur-[80px] pointer-events-none opacity-30 z-0" />

      <Navbar />

      <main className="pt-32 pb-12 min-h-[calc(100vh-200px)] relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>

      <footer className="border-t border-white/5 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight">SupplyShield</span>
              <p className="text-xs text-muted">Price Intelligence for Crisis</p>
            </div>
          </div>

          <div className="flex gap-8 text-muted text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">API</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>

          <div className="text-muted text-sm">
            © 2026 SupplyShield. Built for crisis intelligence.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
