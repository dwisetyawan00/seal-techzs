"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Trophy, Users, Zap, Home, ListChecks, Ticket, Lock, LogIn, ArrowDown } from "lucide-react"
import { NavigationMenu } from "@/components/navigation-menu"

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [highlightTarget, setHighlightTarget] = useState<string | null>(null)

  const connectWalletRef = useRef<HTMLButtonElement>(null)
  const level2Ref = useRef<HTMLDivElement>(null)

  // Handle the Start Exploring button click
  const handleStartExploring = () => {
    if (isLoggedIn) {
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
    <div className="min-h-screen bg-gradient-to-b from-violet-900 via-fuchsia-900 to-purple-900">
      <NavigationMenu isLoggedIn={isLoggedIn} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Mojila Seal
              <span className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
              </span>
            </h1>
          </div>
          <p className="text-xl text-fuchsia-200 max-w-2xl">
            Unlock the power of decentralized access control with fun and ease!
          </p>

          {isLoggedIn ? (
            <div className="flex items-center gap-2 bg-fuchsia-800/50 rounded-full px-4 py-2 border border-fuchsia-500/50">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              <p className="text-sm text-fuchsia-200">me.mojila@gmail.com</p>
            </div>
          ) : (
            <Button
              ref={connectWalletRef}
              onClick={() => setIsLoggedIn(true)}
              className={`bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white border-2 border-fuchsia-400 font-bold px-6 py-2 transition-all duration-300 ${
                highlightTarget === "connectWallet" ? "animate-pulse ring-4 ring-yellow-300 scale-110" : ""
              }`}
            >
              <LogIn className="h-4 w-4 mr-2" /> Connect Wallet
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="bg-gradient-to-br from-cyan-600/90 to-blue-700/90 border-2 border-cyan-400 text-white overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
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
                    These examples are for Testnet only. Make sure you wallet is set to Testnet and has some balance (
                    <Link
                      href="https://faucet.sui.io"
                      className="text-cyan-300 underline underline-offset-2 font-medium"
                    >
                      request from faucet.sui.io
                    </Link>
                    )
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-cyan-700/70 text-cyan-100 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>
                    Blobs are only stored on Walrus Testnet for 1 epoch by default, older files cannot be retrieved even
                    if you have access.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-cyan-700/70 text-cyan-100 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>
                    Currently only image files are supported, and the UI is minimal, designed for demo purposes only!
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
                  className={`h-4 w-4 ml-2 transition-all duration-500 ${!isLoggedIn ? "opacity-100" : "opacity-0"}`}
                />
              </Button>
            </CardFooter>
          </Card>

          {isLoggedIn ? (
            <>
              <Card
                ref={level2Ref}
                className={`bg-gradient-to-br from-green-600/90 to-emerald-700/90 border-2 text-white overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 ${
                  highlightTarget === "level2"
                    ? "animate-pulse border-yellow-300 border-4 scale-105"
                    : "border-green-400"
                }`}
              >
                <div className="absolute top-0 right-0 p-2">
                  <Badge variant="outline" className="bg-green-500/70 text-white border-green-400 font-bold">
                    <Trophy className="h-3 w-3 mr-1 text-yellow-300" /> Level 2
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-green-300" />
                    Allowlist
                  </CardTitle>
                  <CardDescription className="text-green-100">Control who can access your content</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Shows how a creator can define an allowlist based access. The creator first creates an allowlist and
                    can add or remove users in the list. The creator can then associate encrypted files to the
                    allowlist. Only users in the allowlist have access to decrypt the files.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs bg-green-700/70 text-green-100 px-2 py-1 rounded-full font-bold">
                      +25 XP
                    </span>
                    <div className="h-2 bg-green-800 rounded-full flex-1">
                      <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-300 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-500 hover:bg-green-400 text-white border-2 border-green-300 font-bold group">
                    <Users className="h-4 w-4 mr-2 text-yellow-300 group-hover:animate-bounce" /> Try it
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-amber-600/90 to-orange-700/90 border-2 border-amber-400 text-white overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20">
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
                    Shows how a creator can define a subscription based access to its published files. The creator
                    defines subcription fee and how long a subscription is valid for. The creator can then associate
                    encrypted files to the service. Only users who have purchased a subscription (NFT) have access to
                    decrypt the files, along with the condition that the subscription must not have expired.
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
                  <Button className="w-full bg-amber-500 hover:bg-amber-400 text-white border-2 border-amber-300 font-bold group">
                    <Zap className="h-4 w-4 mr-2 text-yellow-300 group-hover:animate-ping" /> Try it
                  </Button>
                </CardFooter>
              </Card>
            </>
          ) : (
            <>
              <Card className="bg-gradient-to-br from-gray-700/90 to-gray-800/90 border-2 border-gray-500 text-white overflow-hidden transform transition-all opacity-75">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/60 rounded-full p-4">
                    <Lock className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-2">
                  <Badge variant="outline" className="bg-gray-600/70 text-white border-gray-500 font-bold">
                    <Trophy className="h-3 w-3 mr-1 text-gray-300" /> Level 2
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-gray-400" />
                    Allowlist
                  </CardTitle>
                  <CardDescription className="text-gray-400">Control who can access your content</CardDescription>
                </CardHeader>
                <CardContent className="text-sm blur-sm">
                  <p>
                    Shows how a creator can define an allowlist based access. The creator first creates an allowlist and
                    can add or remove users in the list.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gray-600 hover:bg-gray-500 text-white border-2 border-gray-400 font-bold"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    <LogIn className="h-4 w-4 mr-2" /> Connect to Unlock
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-gray-700/90 to-gray-800/90 border-2 border-gray-500 text-white overflow-hidden transform transition-all opacity-75">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/60 rounded-full p-4">
                    <Lock className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-2">
                  <Badge variant="outline" className="bg-gray-600/70 text-white border-gray-500 font-bold">
                    <Trophy className="h-3 w-3 mr-1 text-gray-300" /> Level 3
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-gray-400" />
                    Subscription
                  </CardTitle>
                  <CardDescription className="text-gray-400">Create time-based access to your content</CardDescription>
                </CardHeader>
                <CardContent className="text-sm blur-sm">
                  <p>Shows how a creator can define a subscription based access to its published files.</p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gray-600 hover:bg-gray-500 text-white border-2 border-gray-400 font-bold"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    <LogIn className="h-4 w-4 mr-2" /> Connect to Unlock
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </div>

        {isLoggedIn ? (
          <div className="flex justify-center">
            <div className="bg-fuchsia-800/50 border-2 border-fuchsia-400/70 rounded-lg p-4 max-w-md text-center shadow-lg shadow-fuchsia-700/30">
              <h3 className="text-lg font-bold text-fuchsia-200 mb-2">Your Progress</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-fuchsia-300 font-bold">Level 1</span>
                <span className="text-xs text-fuchsia-300 font-bold">75 XP / 100 XP</span>
              </div>
              <div className="h-3 bg-fuchsia-900 rounded-full border border-fuchsia-500/50">
                <div className="h-2.5 bg-gradient-to-r from-fuchsia-400 to-pink-400 rounded-full w-3/4 mt-[1px]"></div>
              </div>
              <p className="text-xs text-fuchsia-300 mt-2 font-medium">Complete all examples to level up!</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className={`bg-violet-800/50 border-2 rounded-lg p-4 max-w-md text-center shadow-lg shadow-violet-700/30 transition-all duration-300 ${
                highlightTarget === "connectWallet" ? "border-yellow-300 border-4" : "border-violet-400/70"
              }`}
            >
              <h3 className="text-lg font-bold text-violet-200 mb-2">Connect to Track Progress</h3>
              <p className="text-sm text-violet-300 mb-4">
                Connect your wallet to unlock all features and track your progress
              </p>
              <Button
                onClick={() => setIsLoggedIn(true)}
                className={`bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-2 border-violet-400 font-bold px-6 ${
                  highlightTarget === "connectWallet" ? "animate-pulse ring-4 ring-yellow-300" : ""
                }`}
              >
                <LogIn className="h-4 w-4 mr-2" /> Connect Wallet
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 py-6 border-t-2 border-fuchsia-500/50 bg-fuchsia-900/70">
        <div className="container mx-auto px-4 text-center text-fuchsia-300 text-sm">
          <p>Mojila Seal © 2025 - Decentralized Access Control</p>
        </div>
      </footer>
    </div>
  )
}

