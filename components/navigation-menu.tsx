"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ListChecks, Ticket, Sparkles, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CustomConnectButton } from "@/components/custom-wallet"
import { useCurrentAccount } from '@mysten/dapp-kit'

interface NavigationMenuProps {
  isLoggedIn?: boolean
}

export function NavigationMenu({ isLoggedIn }: NavigationMenuProps) {
  const pathname = usePathname()
  const currentAccount = useCurrentAccount()
  
  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-900/20 bg-gradient-to-r from-indigo-900 to-violet-900 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-full bg-white/10 p-1">
                <Sparkles className="h-6 w-6 text-indigo-200" />
              </div>
              <span className="text-xl font-bold text-white">Mojila Seal</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'} 
                className={`${isActive('/') ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'}`}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            
            <Link href="/allowlist">
              <Button 
                variant={isActive('/allowlist') ? 'default' : 'ghost'} 
                className={`${isActive('/allowlist') ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'}`}
              >
                <ListChecks className="h-4 w-4 mr-2" />
                Allowlist
              </Button>
            </Link>
            
            <Link href="/subscription">
              <Button 
                variant={isActive('/subscription') ? 'default' : 'ghost'} 
                className={`${isActive('/subscription') ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'}`}
              >
                <Ticket className="h-4 w-4 mr-2" />
                Subscription
              </Button>
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            {currentAccount ? (
              <div className="bg-indigo-800/50 text-indigo-200 px-3 py-1 rounded-md text-sm border border-indigo-700 hidden md:block">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                Connected
              </div>
            ) : null}
            
            <CustomConnectButton />
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="border-t border-indigo-800 md:hidden">
        <div className="grid grid-cols-3 divide-x divide-indigo-800">
          <Link href="/" className={`flex flex-col items-center justify-center py-2 ${isActive('/') ? 'bg-indigo-800 text-white' : 'text-indigo-200'}`}>
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link href="/allowlist" className={`flex flex-col items-center justify-center py-2 ${isActive('/allowlist') ? 'bg-indigo-800 text-white' : 'text-indigo-200'}`}>
            <ListChecks className="h-5 w-5" />
            <span className="text-xs mt-1">Allowlist</span>
          </Link>
          
          <Link href="/subscription" className={`flex flex-col items-center justify-center py-2 ${isActive('/subscription') ? 'bg-indigo-800 text-white' : 'text-indigo-200'}`}>
            <Ticket className="h-5 w-5" />
            <span className="text-xs mt-1">Subscription</span>
          </Link>
        </div>
      </div>
    </header>
  )
}