"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Ticket,
  Plus,
  Clock,
  ChevronRight,
  Sparkles,
  Loader2,
  LogIn,
  Lock,
  Upload,
  Coins,
  Timer,
  Settings,
} from "lucide-react"
import { NavigationMenu } from "@/components/navigation-menu"

// Mock data for subscriptions
const mockSubscriptions = [
  {
    id: "0x0dfd213e...",
    name: "Reading Premium Book",
    fee: "1 MIST",
    duration: "100 minutes",
    lastUpdated: "2 days ago",
  },
  {
    id: "0x45a8b72c...",
    name: "Monthly Newsletter",
    fee: "0.5 MIST",
    duration: "30 days",
    lastUpdated: "1 week ago",
  },
  {
    id: "0x9e7d3f1a...",
    name: "Premium Content Access",
    fee: "2 MIST",
    duration: "7 days",
    lastUpdated: "3 days ago",
  },
]

export default function SubscriptionPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Default to not logged in
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<(typeof mockSubscriptions)[0] | null>(null)
  const [newSubscriptionName, setNewSubscriptionName] = useState("")
  const [newSubscriptionFee, setNewSubscriptionFee] = useState("")
  const [newSubscriptionDuration, setNewSubscriptionDuration] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions)

  // Handle wallet connect
  const handleConnect = () => {
    setIsLoggedIn(true)
    // You could also add any additional logic here like fetching user data
  }

  // Handle card highlight animation
  const handleHighlightCard = (id: string) => {
    setHighlightedCard(id)
    setTimeout(() => setHighlightedCard(null), 1500)
  }

  // Handle manage subscription
  const handleManage = (subscription: (typeof mockSubscriptions)[0]) => {
    setSelectedSubscription(subscription)
    setIsManageModalOpen(true)
  }

  // Handle form submission for new subscription
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSubscriptionName.trim() || !newSubscriptionFee.trim() || !newSubscriptionDuration.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Generate a random ID
      const newId = "0x" + Math.random().toString(16).substring(2, 10) + "..."

      // Add new subscription to the list
      setSubscriptions([
        ...subscriptions,
        {
          id: newId,
          name: newSubscriptionName,
          fee: newSubscriptionFee,
          duration: newSubscriptionDuration,
          lastUpdated: "just now",
        },
      ])

      // Reset form and close modal
      setNewSubscriptionName("")
      setNewSubscriptionFee("")
      setNewSubscriptionDuration("")
      setIsSubmitting(false)
      setIsModalOpen(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-orange-800 to-amber-900">
      <NavigationMenu isLoggedIn={isLoggedIn} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Your Subscriptions
              <span className="absolute -top-2 -right-2">
                <Ticket className="h-6 w-6 text-amber-300 animate-pulse" />
              </span>
            </h1>
          </div>
          <p className="text-xl text-amber-200 max-w-2xl">
            Create time-based access to your encrypted content with these powerful subscription services
          </p>

          {isLoggedIn ? (
            <div className="flex items-center gap-2 bg-amber-800/50 rounded-full px-4 py-2 border border-amber-500/50">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              <p className="text-sm text-amber-200">me.mojila@gmail.com</p>
            </div>
          ) : null}
        </div>

        {isLoggedIn ? (
          <>
            <div className="flex justify-end mb-6">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white border-2 border-amber-400 font-bold px-6 py-2 transition-all duration-300 shadow-lg shadow-amber-700/20">
                    <Plus className="h-4 w-4 mr-2" /> Create New Subscription
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gradient-to-br from-amber-800 to-orange-900 border-2 border-amber-400 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                      <Plus className="h-5 w-5 text-amber-300" />
                      Create New Subscription
                    </DialogTitle>
                    <DialogDescription className="text-amber-200">
                      Set up a new subscription service with fee and duration details.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name" className="text-amber-200">
                          Subscription Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter a name for your subscription"
                          value={newSubscriptionName}
                          onChange={(e) => setNewSubscriptionName(e.target.value)}
                          className="bg-amber-800/50 border-amber-500 text-white placeholder:text-amber-300/50 focus-visible:ring-amber-400"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="fee" className="text-amber-200">
                          Subscription Fee (MIST)
                        </Label>
                        <Input
                          id="fee"
                          placeholder="e.g., 1 MIST"
                          value={newSubscriptionFee}
                          onChange={(e) => setNewSubscriptionFee(e.target.value)}
                          className="bg-amber-800/50 border-amber-500 text-white placeholder:text-amber-300/50 focus-visible:ring-amber-400"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="duration" className="text-amber-200">
                          Subscription Duration
                        </Label>
                        <Input
                          id="duration"
                          placeholder="e.g., 30 days, 100 minutes"
                          value={newSubscriptionDuration}
                          onChange={(e) => setNewSubscriptionDuration(e.target.value)}
                          className="bg-amber-800/50 border-amber-500 text-white placeholder:text-amber-300/50 focus-visible:ring-amber-400"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        disabled={
                          isSubmitting ||
                          !newSubscriptionName.trim() ||
                          !newSubscriptionFee.trim() ||
                          !newSubscriptionDuration.trim()
                        }
                        className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white border-2 border-amber-400 font-bold transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Subscription
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Manage Subscription Modal */}
            <Dialog open={isManageModalOpen} onOpenChange={setIsManageModalOpen}>
              <DialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-amber-400 text-white max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-amber-300" />
                    Admin View: {selectedSubscription?.name} (ID {selectedSubscription?.id})
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  <p className="text-gray-300">
                    This is all the services that you have created. Click manage to upload new files to the service.
                  </p>

                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Coins className="h-4 w-4 text-amber-300" />
                        <span className="text-gray-300">Subscription Fee:</span>
                        <span className="text-white font-medium">{selectedSubscription?.fee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4 text-amber-300" />
                        <span className="text-gray-300">Subscription Duration:</span>
                        <span className="text-white font-medium">{selectedSubscription?.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Upload File Section */}
                  <div className="space-y-4 border-t border-gray-700 pt-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Select Walrus service:</Label>
                      <Select defaultValue="staketab.org">
                        <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="staketab.org">staketab.org</SelectItem>
                          <SelectItem value="other">Other service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="bg-gray-800 border-gray-700 text-white w-full justify-start">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                      <p className="text-xs text-gray-400">
                        File size must be less than 10 MiB. Only image files are allowed.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                        First step: Encrypt and upload to Walrus
                      </Button>
                      <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                        Second step: Associate file to Sui object
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {subscriptions.map((subscription) => (
                <Card
                  key={subscription.id}
                  className={`bg-gradient-to-br from-amber-600/90 to-orange-700/90 border-2 text-white overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20 ${
                    highlightedCard === subscription.id
                      ? "animate-pulse border-yellow-300 border-4 scale-105"
                      : "border-amber-400"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Ticket className="h-5 w-5 text-amber-300" />
                      {subscription.name}
                    </CardTitle>
                    <CardDescription className="text-amber-100 flex items-center gap-1">
                      <span className="text-xs bg-amber-700/50 px-2 py-0.5 rounded-full">{subscription.id}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Coins className="h-4 w-4 text-amber-300" />
                        <span className="text-amber-100">Fee:</span>
                      </div>
                      <span className="font-medium text-white">{subscription.fee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Timer className="h-4 w-4 text-amber-300" />
                        <span className="text-amber-100">Duration:</span>
                      </div>
                      <span className="font-medium text-white">{subscription.duration}</span>
                    </div>
                    <div className="flex justify-center items-center">
                      <div className="bg-amber-700/30 rounded-lg p-2 text-center">
                        <Clock className="h-4 w-4 text-amber-300 mx-auto mb-1" />
                        <span className="text-amber-100 text-xs">Last updated {subscription.lastUpdated}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      className="flex-1 bg-amber-500 hover:bg-amber-400 text-white border-2 border-amber-300 font-bold group"
                      onClick={() => {
                        handleHighlightCard(subscription.id)
                        handleManage(subscription)
                      }}
                    >
                      <Settings className="h-4 w-4 mr-2 text-yellow-300 group-hover:animate-spin" /> Manage
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-amber-700/50 hover:bg-amber-600/50 text-white border-2 border-amber-300/50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {/* Add New Subscription Card */}
              <Card
                className="bg-gradient-to-br from-amber-600/40 to-orange-700/40 border-2 border-dashed border-amber-400/50 text-white overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20 flex flex-col items-center justify-center p-8 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="rounded-full bg-amber-700/50 p-4 mb-4 border border-amber-400/30">
                  <Plus className="h-8 w-8 text-amber-300" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Create New Subscription</h3>
                <p className="text-sm text-white text-center mb-4">
                  Start offering time-based access to your encrypted content
                </p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsModalOpen(true)
                  }}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white border-2 border-amber-400 font-bold px-6"
                >
                  <Plus className="h-4 w-4 mr-2" /> Create New
                </Button>
              </Card>
            </div>

            <div className="flex justify-center">
              <div className="bg-amber-800/50 border-2 border-amber-400/70 rounded-lg p-4 max-w-md text-center shadow-lg shadow-amber-700/30">
                <h3 className="text-lg font-bold text-amber-200 mb-2">Subscription Stats</h3>
                <div className="flex justify-center mb-4">
                  <div className="bg-amber-700/50 rounded-lg p-3 px-8">
                    <div className="text-2xl font-bold text-white">{subscriptions.length}</div>
                    <div className="text-xs text-amber-300">Total Subscriptions</div>
                  </div>
                </div>
                <p className="text-xs text-amber-300 mt-2 font-medium">
                  <Sparkles className="inline h-3 w-3 mr-1 text-yellow-300" />
                  Create more subscription services to earn XP and level up!
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="max-w-md w-full text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full p-8 border-2 border-amber-400/30">
                    <Lock className="h-20 w-20 text-gray-300" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-red-500/20 rounded-full p-2 border border-red-400/30">
                    <Ticket className="h-6 w-6 text-gray-300" />
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">Access Locked</h2>
              <p className="text-amber-200 mb-8 max-w-sm mx-auto">
                Your subscription services help you offer time-based access to your encrypted content. Connect your
                wallet to get started.
              </p>

              <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-1 rounded-lg">
                <Button
                  onClick={() => handleConnect()}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white border-2 border-amber-400 font-bold px-6 py-6 text-lg w-full"
                >
                  <LogIn className="h-5 w-5 mr-2" /> Connect Wallet
                </Button>
              </div>

              <p className="text-xs text-amber-300/70 mt-4">
                You need to be connected to create and manage subscription services
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 py-6 border-t-2 border-amber-500/50 bg-amber-900/70">
        <div className="container mx-auto px-4 text-center text-amber-300 text-sm">
          <p>Mojila Seal © 2025 - Decentralized Access Control</p>
        </div>
      </footer>
    </div>
  )
}