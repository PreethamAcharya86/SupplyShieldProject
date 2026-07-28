import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell, Activity, BarChart2, AlertCircle,
  Globe, ShieldCheck, Zap
} from 'lucide-react'
import { cn } from '../../lib/utils'

const navLinks = [
  { name: 'Dashboard', path: '/', icon: Activity },
  { name: 'Market', path: '/market', icon: BarChart2 },
  { name: 'Alerts', path: '/alerts', icon: AlertCircle },
  { name: 'Locality', path: '/locality', icon: Globe },
  { name: 'Awareness', path: '/awareness', icon: ShieldCheck },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "py-2" : "py-4")}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={cn(
          "flex items-center justify-between px-5 py-2.5 rounded-2xl border transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-white/[0.03] backdrop-blur-xl border-white/[0.06]"
        )}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-transform group-hover:scale-110">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                SupplyShield
              </span>
              <span className="text-[10px] text-muted -mt-1 hidden sm:block">Price Intelligence</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn("nav-link", isActive && "active")}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">

            {/* Mobile menu button */}
            <button
              className="btn-icon lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 px-4 pt-2 lg:hidden"
          >
            <div className="bg-background/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex flex-col gap-1 shadow-2xl">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn("nav-link text-base py-3", isActive && "active")}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
