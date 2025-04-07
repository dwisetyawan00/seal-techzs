import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to truncate addresses for display
export function truncateAddress(address?: string) {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Function to generate gradient classes based on theme
export function getThemeGradient(theme: 'blue' | 'purple' | 'amber' | 'green') {
  switch (theme) {
    case 'blue':
      return {
        background: 'from-blue-600 to-indigo-700',
        hover: 'hover:from-blue-500 hover:to-indigo-600',
        border: 'border-blue-400',
        text: 'text-blue-200'
      }
    case 'purple':
      return {
        background: 'from-violet-600 to-fuchsia-700',
        hover: 'hover:from-violet-500 hover:to-fuchsia-600',
        border: 'border-violet-400',
        text: 'text-violet-200'
      }
    case 'amber':
      return {
        background: 'from-amber-600 to-orange-700',
        hover: 'hover:from-amber-500 hover:to-orange-600',
        border: 'border-amber-400',
        text: 'text-amber-200'
      }
    case 'green':
      return {
        background: 'from-emerald-600 to-green-700',
        hover: 'hover:from-emerald-500 hover:to-green-600',
        border: 'border-emerald-400',
        text: 'text-emerald-200'
      }
    default:
      return {
        background: 'from-blue-600 to-indigo-700',
        hover: 'hover:from-blue-500 hover:to-indigo-600',
        border: 'border-blue-400',
        text: 'text-blue-200'
      }
  }
}