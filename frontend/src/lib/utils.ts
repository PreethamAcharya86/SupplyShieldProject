import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency = '₹'): string {
  return `${currency}${price.toLocaleString('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'critical': return 'text-red-400'
    case 'high': case 'danger': return 'text-orange-400'
    case 'medium': case 'warning': return 'text-yellow-400'
    case 'low': case 'success': return 'text-emerald-400'
    default: return 'text-muted'
  }
}

export function getStatusBg(status: string): string {
  switch (status) {
    case 'critical': return 'bg-red-500/10 border-red-500/20'
    case 'high': case 'danger': return 'bg-orange-500/10 border-orange-500/20'
    case 'medium': case 'warning': return 'bg-yellow-500/10 border-yellow-500/20'
    case 'low': case 'success': return 'bg-emerald-500/10 border-emerald-500/20'
    default: return 'bg-white/5 border-white/10'
  }
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
