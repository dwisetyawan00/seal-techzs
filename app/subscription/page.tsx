"use client"

import { useState } from "react"
import Link from "next/link"
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
  Lock,
  Upload,
  Coins,
  Timer,
  Settings,
  FileText,
  Calendar,
  Trash2,
} from "lucide-react"
import { NavigationMenu } from "@/components/navigation-menu"
import { CustomConnectButton } from "@/components/custom-wallet"
import { useCurrentAccount } from '@mysten/dapp-kit'

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
  const currentAccount = useCurrentAccount();
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<(typeof mockSubscriptions)[0] | null>(null)
  const [newSubscriptionName, setNewSubscriptionName] = useState("")
  const [newSubscriptionFee, setNewSubscriptionFee] = useState("")
  const [newSubscriptionDuration, setNewSubscriptionDuration] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'files'>('details')
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions)

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

  // Check if user has any subscriptions yet
  const hasSubscriptions = subscriptions.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-950 to-indigo-950">
      <NavigationMenu />

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-1 rounded-lg max-w-4xl w-full">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.2),transparent_50%)]"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Ticket className="h-8 w-8 text-blue-300" />
                    <span>Your Subscriptions</span>
                  </h1>
                  <p className="text-lg text-blue-200 mt-2 max-w-xl">
                    Create time-based access to your encrypted content with these powerful subscription services
                  </p>
                </div>
                
                {currentAccount ? (
                  <div className="flex-shrink-0">
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogTrigger asChild>
                        <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-2 border-blue-400 font-bold px-6 transition-all duration-300 shadow-md shadow-blue-900/20">
                          <Plus className="h-5 w-5 mr-2" /> Create New Subscription
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                ) : (
                  <div className="flex-shrink-0">
                    <CustomConnectButton className="px-6 py-2" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {currentAccount ? (
          <>
            {/* New Subscription Dialog */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="bg-gradient-to-br from-blue-900 to-indigo-950 border-2 border-blue-400 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                    <Plus className="h-5 w-5 text-blue-300" />
                    Create New Subscription
                  </DialogTitle>
                  <DialogDescription className="text-blue-200">
                    Set up a new subscription service with fee and duration details.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="text-blue-200">
                        Subscription Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter a name for your subscription"
                        value={newSubscriptionName}
                        onChange={(e) => setNewSubscriptionName(e.target.value)}
                        className="bg-blue-800/50 border-blue-500 text-white placeholder:text-blue-300/50 focus-visible:ring-blue-400"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="fee" className="text-blue-200">
                        Subscription Fee (MIST)
                      </Label>
                      <Input
                        id="fee"
                        placeholder="e.g., 1 MIST"
                        value={newSubscriptionFee}
                        onChange={(e) => setNewSubscriptionFee(e.target.value)}
                        className="bg-blue-800/50 border-blue-500 text-white placeholder:text-blue-300/50 focus-visible:ring-blue-400"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="duration" className="text-blue-200">
                        Subscription Duration
                      </Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 30 days, 100 minutes"
                        value={newSubscriptionDuration}
                        onChange={(e) => setNewSubscriptionDuration(e.target.value)}
                        className="bg-blue-800/50 border-blue-500 text-white placeholder:text-blue-300/50 focus-visible:ring-blue-400"
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
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-2 border-blue-400 font-bold transition-all duration-300"
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

            {/* Manage Subscription Modal */}
            <Dialog open={isManageModalOpen} onOpenChange={setIsManageModalOpen}>
              <DialogContent className="bg-gradient-to-br from-blue-900 to-indigo-950 border-2 border-blue-400 text-white max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                    <Ticket className="h-6 w-6 text-blue-300" />
                    {selectedSubscription?.name}
                  </DialogTitle>
                  <DialogDescription className="text-blue-200 flex items-center gap-2">
                    <span className="text-xs bg-blue-800/80 px-2 py-0.5 rounded-full font-mono">
                      ID: {selectedSubscription?.id}
                    </span>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Tabs */}
                  <div className="flex border-b border-blue-700">
                    <button
                      className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                        activeTab === 'details'
                          ? 'text-white border-b-2 border-blue-400'
                          : 'text-blue-300 hover:text-white'
                      }`}
                      onClick={() => setActiveTab('details')}
                    >
                      <Coins className="h-4 w-4" />
                      Subscription Details
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                        activeTab === 'files'
                          ? 'text-white border-b-2 border-blue-400'
                          : 'text-blue-300 hover:text-white'
                      }`}
                      onClick={() => setActiveTab('files')}
                    >
                      <FileText className="h-4 w-4" />
                      Manage Files
                    </button>
                  </div>

                  {activeTab === 'details' ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-800/30 rounded-lg border border-blue-700 p-4 flex items-start gap-3">
                          <div className="bg-blue-700/50 p-2 rounded-lg">
                            <Coins className="h-5 w-5 text-blue-300" />
                          </div>
                          <div>
                            <p className="text-sm text-blue-300 mb-1">Subscription Fee</p>
                            <p className="text-xl font-bold text-white">{selectedSubscription?.fee}</p>
                          </div>
                        </div>
                        
                        <div className="bg-blue-800/30 rounded-lg border border-blue-700 p-4 flex items-start gap-3">
                          <div className="bg-blue-700/50 p-2 rounded-lg">
                            <Timer className="h-5 w-5 text-blue-300" />
                          </div>
                          <div>
                            <p className="text-sm text-blue-300 mb-1">Subscription Duration</p>
                            <p className="text-xl font-bold text-white">{selectedSubscription?.duration}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-800/30 rounded-lg border border-blue-700 p-4">
                        <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-blue-300" />
                          Subscription Activity
                        </h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-blue-200">Last Updated</span>
                            <span className="text-white">{selectedSubscription?.lastUpdated}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-blue-200">Active Subscribers</span>
                            <span className="text-white">0</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-blue-200">Total Revenue</span>
                            <span className="text-white">0 MIST</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-red-500/80 hover:bg-red-600/80 text-white border-0">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Subscription
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Associated Files</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-blue-200">Select Storage Service:</Label>
                          <Select defaultValue="staketab.org">
                            <SelectTrigger className="w-[180px] bg-blue-800/80 border-blue-700 text-white">
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent className="bg-blue-900 border-blue-700 text-white">
                              <SelectItem value="staketab.org">Staketab.org</SelectItem>
                              <SelectItem value="redundax.com">Redundax.com</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="bg-blue-800/30 rounded-lg border border-blue-700 p-4">
                          <div className="border-2 border-dashed border-blue-700 rounded-lg p-8 text-center">
                            <Upload className="h-10 w-10 mx-auto mb-4 text-blue-400" />
                            <h4 className="text-lg font-medium text-white mb-2">Upload File</h4>
                            <p className="text-blue-300 mb-4 max-w-md mx-auto">
                              File will be encrypted and associated with this subscription service
                            </p>
                            
                            <Button className="bg-blue-600 hover:bg-blue-500 text-white border-0">
                              <Upload className="h-4 w-4 mr-2" />
                              Choose File
                            </Button>
                            
                            <p className="text-xs text-blue-400 mt-4">
                              File size must be less than 10 MiB. Only image files are allowed.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <Button className="w-full bg-blue-700/80 hover:bg-blue-600/80 text-white">
                            Encrypt and upload to Walrus
                          </Button>
                          <Button className="w-full bg-blue-700/80 hover:bg-blue-600/80 text-white">
                            Associate file to Sui object
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {hasSubscriptions ? (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                  {subscriptions.map((subscription) => (
                    <Card
                      key={subscription.id}
                      className={`bg-gradient-to-br from-blue-800/90 to-indigo-900/90 border-2 text-white overflow-hidden transform hover:translate-y-[-4px] transition-all duration-300 shadow-lg shadow-blue-950/50 ${
                        highlightedCard === subscription.id
                          ? "animate-pulse border-yellow-300 border-4 scale-105"
                          : "border-blue-400"
                      }`}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Ticket className="h-5 w-5 text-blue-300" />
                          {subscription.name}
                        </CardTitle>
                        <CardDescription className="text-blue-200 flex items-center gap-1">
                          <span className="text-xs bg-blue-700/50 px-2 py-0.5 rounded-full font-mono">{subscription.id}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4 text-blue-300" />
                            <span className="text-blue-200">Fee:</span>
                          </div>
                          <span className="font-medium text-white">{subscription.fee}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Timer className="h-4 w-4 text-blue-300" />
                            <span className="text-blue-200">Duration:</span>
                          </div>
                          <span className="font-medium text-white">{subscription.duration}</span>
                        </div>
                        <div className="flex justify-center items-center">
                          <div className="bg-blue-700/30 rounded-lg p-2 text-center">
                            <Clock className="h-4 w-4 text-blue-300 mx-auto mb-1" />
                            <span className="text-blue-200 text-xs">Last updated {subscription.lastUpdated}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button
                          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white border-2 border-blue-400 font-bold group"
                          onClick={() => {
                            handleHighlightCard(subscription.id)
                            handleManage(subscription)
                          }}
                        >
                          <Settings className="h-4 w-4 mr-2 text-blue-200 group-hover:animate-spin" /> Manage
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-blue-700/50 hover:bg-blue-600/50 text-white border-2 border-blue-400/50"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}

                  {/* Add New Subscription Card */}
                  <Card
                    className="bg-gradient-to-br from-blue-800/40 to-indigo-900/40 border-2 border-dashed border-blue-400/50 text-white overflow-hidden transform hover:translate-y-[-4px] transition-all duration-300 shadow-lg shadow-blue-950/50 flex flex-col items-center justify-center p-8 cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <div className="rounded-full bg-blue-700/50 p-4 mb-4 border border-blue-400/30">
                      <Plus className="h-8 w-8 text-blue-300" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Create New Subscription</h3>
                    <p className="text-sm text-blue-200 text-center mb-4">
                      Start offering time-based access to your encrypted content
                    </p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsModalOpen(true)
                      }}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-2 border-blue-400 font-bold px-6"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Create New
                    </Button>
                  </Card>
                </div>

                <div className="flex justify-center">
                  <div className="bg-blue-800/50 border-2 border-blue-400/70 rounded-lg p-4 max-w-md text-center shadow-lg shadow-blue-900/30">
                    <h3 className="text-lg font-bold text-blue-200 mb-2">Subscription Stats</h3>
                    <div className="flex justify-center mb-4">
                      <div className="bg-blue-700/50 rounded-lg p-3 px-8">
                        <div className="text-2xl font-bold text-white">{subscriptions.length}</div>
                        <div className="text-xs text-blue-300">Total Subscriptions</div>
                      </div>
                    </div>
                    <p className="text-xs text-blue-300 mt-2 font-medium">
                      <Sparkles className="inline h-3 w-3 mr-1 text-yellow-300" />
                      Create more subscription services to earn XP and level up!
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="max-w-md w-full text-center bg-blue-800/30 rounded-lg border border-blue-700 p-8">
                  <div className="mb-6">
                    <div className="bg-blue-700/30 rounded-full p-6 mx-auto w-fit">
                      <Ticket className="h-16 w-16 text-blue-300" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3">No Subscriptions Yet</h2>
                  <p className="text-blue-200 mb-6">
                    Create your first subscription to start offering time-based access to your encrypted content
                  </p>

                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-2 border-blue-400 font-bold px-6 py-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Subscription
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="max-w-md w-full text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full p-8 border-2 border-blue-400/30">
                    <Lock className="h-20 w-20 text-blue-300/50" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-indigo-500/20 rounded-full p-2 border border-indigo-400/30">
                    <Ticket className="h-6 w-6 text-blue-300/70" />
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">Access Locked</h2>
              <p className="text-blue-200 mb-8 max-w-sm mx-auto">
                Your subscription services help you offer time-based access to your encrypted content. Connect your
                wallet to get started.
              </p>

              <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 p-1 rounded-lg">
                <CustomConnectButton className="w-full py-3 text-lg" />
              </div>

              <p className="text-xs text-blue-300/70 mt-4">
                You need to be connected to create and manage subscription services
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-16 py-8 border-t border-blue-800 bg-blue-900/90">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-blue-800/50 p-3 border border-blue-700">
              <Sparkles className="h-6 w-6 text-blue-300" />
            </div>
          </div>
          <p className="text-blue-300 text-sm mb-2">Mojila Seal © 2025 - Decentralized Access Control</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="#" className="text-blue-400 hover:text-white transition-colors">Documentation</Link>
            <Link href="#" className="text-blue-400 hover:text-white transition-colors">GitHub</Link>
            <Link href="#" className="text-blue-400 hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}