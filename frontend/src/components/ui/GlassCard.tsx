import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
  delay?: number
  onClick?: () => void
}

const GlassCard = ({ children, className, hoverEffect = true, delay = 0, onClick }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      className={cn(
        "glass-card p-6 relative overflow-hidden group",
        onClick && "cursor-pointer",
        className
      )}
    >
      {hoverEffect && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export default GlassCard
