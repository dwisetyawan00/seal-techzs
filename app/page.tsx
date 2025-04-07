"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Sparkles, Trophy, Users, Zap, Home, ListChecks, 
  Ticket, Lock, LogIn, ArrowDown, ChevronRight 
} from "lucide-react"
import { NavigationMenu } from "@/components/navigation-menu"
import { useCurrentAccount } from '@mysten/dapp-kit'
import { CustomConnectButton } from "@/components/custom-wallet"

export default function Page() {
  const [highlightTarget, setHighlightTarget] = useState<string | null>(null)
  const currentAccount = useCurrentAccount()
  
  const connectWalletRef = useRef<HTMLDivElement>(null)
  const level2Ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Handle the Start Exploring button click
  const handleStartExploring = () => {
    if (currentAccount) {
      // If logged in, scroll to Level 2
      setHighlightTarget("level2")
      setTimeout(() => {
        level2Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 100)
    } else {
      // If not logged in, highlight the connect wallet button
      setHighlightTarget("connectWallet")
      setTimeout(() => {
        connectWalletRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 100)
    }
  }

  const handleTryAllowlist = () => {
    router.push("/allowlist")
  }

  const handleSubscription = () => {
    router.push("/subscription")
  }  

  // Reset highlight after animation completes
  useEffect(() => {
    if (highlightTarget) {
      const timer = setTimeout(() => {
        setHighlightTarget(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [highlightTarget])

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900">
      <NavigationMenu />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center space-y-8 text-center mb-12">
          <div className="relative bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-1 rounded-lg">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.2),transparent_40%)]"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="bg-white/10 p-4 rounded-full border border-indigo-400/30">
                    <Sparkles className="h-12 w-12 text-indigo-200" />
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                  Techzs Seal
                </h1>
                
                <p className="text-xl text-indigo-200 max-w-2xl mx-auto mb-8">
                  Unlock the power of decentralized access control with fun and ease!
                </p>
                
                <div ref={connectWalletRef} className={`inline-block ${
                  highlightTarget === "connectWallet" ? "ring-4 ring-yellow-300 rounded-lg animate-pulse" : ""
                }`}>
                  <CustomConnectButton className="px-8 py-3 text-base" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card className="bg-gradient-to-br from-cyan-600/90 to-blue-700/90 border-2 border-cyan-400 text-white overflow-hidden shadow-lg shadow-cyan-950/30 transform transition-all hover:scale-105 duration-300">
            <div className="absolute top-0 right-0 p-2">
              <Badge variant="outline" className="bg-cyan-500/70 text-white border-cyan-400 font-bold">
                <Trophy className="h-3 w-3 mr-1 text-yellow-300" /> Level 1
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-cyan-300" />
                Getting Started
              </CardTitle>
              <CardDescription className="text-cyan-100">Your adventure begins here</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-cyan-700/70 text-cyan-100 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>
                    Code is available{" "}
                    <Link href="#" className="text-cyan-300 underline underline-offset-2 font-medium">
                      here
                    </Link>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-cyan-700/70 text-cyan-100 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>
                    These examples are for Testnet only. Make sure your wallet is set to Testnet and has some balance.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-cyan-700/70 text-cyan-100 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>
                    Blobs are only stored on Walrus Testnet for 1 epoch by default, older files cannot be retrieved.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-cyan-700/70 text-cyan-100 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>
                    Currently only image files are supported, designed for demo purposes only.
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleStartExploring}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-white border-2 border-cyan-300 font-bold group"
              >
                <Zap className="h-4 w-4 mr-2 text-yellow-300" />
                Start Exploring
                <ArrowDown
                  className={`h-4 w-4 ml-2 transition-all duration-500 ${!currentAccount ? "opacity-100" : "opacity-0"}`}
                />
              </Button>
            </CardFooter>
          </Card>

          {currentAccount ? (
            <>
              <Card
                ref={level2Ref}
                className={`bg-gradient-to-br from-emerald-600/90 to-green-700/90 border-2 text-white overflow-hidden shadow-lg shadow-emerald-950/30 transform transition-all hover:scale-105 duration-300 ${
                  highlightTarget === "level2"
                    ? "animate-pulse border-yellow-300 border-4 scale-105"
                    : "border-emerald-400"
                }`}
              >
                <div className="absolute top-0 right-0 p-2">
                  <Badge variant="outline" className="bg-emerald-500/70 text-white border-emerald-400 font-bold">
                    <Trophy className="h-3 w-3 mr-1 text-yellow-300" /> Level 2
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-emerald-300" />
                    Allowlist
                  </CardTitle>
                  <CardDescription className="text-emerald-100">Control who can access your content</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Define an allowlist based access system. Create an allowlist and add or remove users as needed. Associate encrypted files to your allowlist, ensuring only authorized users can decrypt them.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs bg-emerald-700/70 text-emerald-100 px-2 py-1 rounded-full font-bold">
                      +25 XP
                    </span>
                    <div className="h-2 bg-emerald-800 rounded-full flex-1">
                      <div className="h-2 bg-gradient-to-r from-emerald-400 to-green-300 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleTryAllowlist} className="w-full bg-emerald-500 hover:bg-emerald-400 text-white border-2 border-emerald-300 font-bold group">
                    <Users className="h-4 w-4 mr-2 text-yellow-300 group-hover:animate-bounce" /> Try it
                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-amber-600/90 to-orange-700/90 border-2 border-amber-400 text-white overflow-hidden shadow-lg shadow-amber-950/30 transform transition-all hover:scale-105 duration-300">
                <div className="absolute top-0 right-0 p-2">
                  <Badge variant="outline" className="bg-amber-500/70 text-white border-amber-400 font-bold">
                    <Trophy className="h-3 w-3 mr-1 text-yellow-300" /> Level 3
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-amber-300" />
                    Subscription
                  </CardTitle>
                  <CardDescription className="text-amber-100">Create time-based access to your content</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Define subscription based access to your published files. Set subscription fees and validity periods, then associate encrypted files to the service. Only users with active subscriptions can decrypt the content.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs bg-amber-700/70 text-amber-100 px-2 py-1 rounded-full font-bold">
                      +50 XP
                    </span>
                    <div className="h-2 bg-amber-800 rounded-full flex-1">
                      <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-300 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSubscription} className="w-full bg-amber-500 hover:bg-amber-400 text-white border-2 border-amber-300 font-bold group">
                    <Zap className="h-4 w-4 mr-2 text-yellow-300 group-hover:animate-ping" /> Try it
                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </>
          ) : (
            <>
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700 text-white overflow-hidden transform transition-all relative shadow-lg shadow-gray-950/50">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="bg-black/60 rounded-full p-4">
                    <Lock className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-2 z-10">
                  <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                    <Trophy className="h-3 w-3 mr-1 text-gray-400" /> Level 2
                  </Badge>
                </div>
                <CardHeader className="relative z-[5]">
                  <CardTitle className="flex items-center gap-2 text-gray-400">
                    <ListChecks className="h-5 w-5" />
                    Allowlist
                  </CardTitle>
                  <CardDescription className="text-gray-500">Control who can access your content</CardDescription>
                </CardHeader>
                <CardContent className="text-sm blur-sm relative z-[5]">
                  <p className="text-gray-500">
                    Define an allowlist based access system. Create an allowlist and add or remove users as needed.
                  </p>
                </CardContent>
                <CardFooter className="relative z-[5]">
                  <Button
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white border-2 border-gray-600 font-bold"
                    onClick={handleStartExploring}
                  >
                    <LogIn className="h-4 w-4 mr-2" /> Connect to Unlock
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700 text-white overflow-hidden transform transition-all relative shadow-lg shadow-gray-950/50">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="bg-black/60 rounded-full p-4">
                    <Lock className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-2 z-10">
                  <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                    <Trophy className="h-3 w-3 mr-1 text-gray-400" /> Level 3
                  </Badge>
                </div>
                <CardHeader className="relative z-[5]">
                  <CardTitle className="flex items-center gap-2 text-gray-400">
                    <Ticket className="h-5 w-5" />
                    Subscription
                  </CardTitle>
                  <CardDescription className="text-gray-500">Create time-based access to your content</CardDescription>
                </CardHeader>
                <CardContent className="text-sm blur-sm relative z-[5]">
                  <p className="text-gray-500">
                    Define subscription based access to your published files. Set subscription fees and validity periods.
                  </p>
                </CardContent>
                <CardFooter className="relative z-[5]">
                  <Button
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white border-2 border-gray-600 font-bold"
                    onClick={handleStartExploring}
                  >
                    <LogIn className="h-4 w-4 mr-2" /> Connect to Unlock
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </div>

        {/* Progress Section */}
        {currentAccount ? (
          <div className="flex justify-center">
            <div className="bg-indigo-800/50 border-2 border-indigo-400/70 rounded-lg p-6 max-w-md text-center shadow-lg shadow-indigo-900/30">
              <h3 className="text-xl font-bold text-indigo-200 mb-4">Your Progress</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-indigo-300 font-bold">Level 1</span>
                <span className="text-sm text-indigo-300 font-bold">75 XP / 100 XP</span>
              </div>
              <div className="h-4 bg-indigo-900/70 rounded-full border border-indigo-500/50 p-[1px]">
                <div className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full w-3/4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                </div>
              </div>
              <p className="text-sm text-indigo-300 mt-3 font-medium flex items-center justify-center">
                <Sparkles className="h-4 w-4 mr-2 text-yellow-300" />
                Complete all examples to level up!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className={`bg-indigo-800/50 border-2 rounded-lg p-6 max-w-md text-center shadow-lg shadow-indigo-900/30 transition-all duration-300 ${
                highlightTarget === "connectWallet" ? "border-yellow-300 border-4" : "border-indigo-400/70"
              }`}
            >
              <h3 className="text-xl font-bold text-indigo-200 mb-3">Connect to Track Progress</h3>
              <p className="text-indigo-300 mb-5">
                Connect your wallet to unlock all features and track your progress
              </p>
              <div className={`${highlightTarget === "connectWallet" ? "animate-pulse" : ""}`}>
                <CustomConnectButton className="px-6 py-2" />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-16 py-8 border-t border-indigo-800 bg-indigo-900/90">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-indigo-800/50 p-3 border border-indigo-700">
              <Sparkles className="h-6 w-6 text-indigo-300" />
            </div>
          </div>
          <p className="text-indigo-300 text-sm mb-2">Techzs Seal © 2025 - Decentralized Access Control</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="#" className="text-indigo-400 hover:text-white transition-colors">Documentation</Link>
            <Link href="#" className="text-indigo-400 hover:text-white transition-colors">GitHub</Link>
            <Link href="#" className="text-indigo-400 hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
