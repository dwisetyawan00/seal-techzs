"use client"

import type React from "react"

import { useCallback, useEffect, useState } from "react"
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
  ListChecks,
  Plus,
  Shield,
  Settings,
  Clock,
  ChevronRight,
  Sparkles,
  Loader2,
  LogIn,
  Lock,
  LinkIcon,
  Upload,
  UserPlus,
  PersonStanding,
} from "lucide-react"
import { NavigationMenu } from "@/components/navigation-menu"
import { ConnectButton, useCurrentAccount, useSuiClient } from "@mysten/dapp-kit"
import { useNetworkVariable } from "@/lib/networkConfig"

export interface CardItem {
  cap_id: string;
  allowlist_id: string;
  list: string[];
  name: string;
}

export interface Cap {
  id: string;
  allowlist_id: string;
}

export default function AllowlistPage() {
  const currentAccount = useCurrentAccount();
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)
  const [selectedAllowlist, setSelectedAllowlist] = useState<CardItem | null>(null)
  const [newAllowlistName, setNewAllowlistName] = useState("")
  const [newAddress, setNewAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const packageId = useNetworkVariable('packageId');
  const suiClient = useSuiClient();

  const [cardItems, setCardItems] = useState<CardItem[]>([]);

  const getCapObj = useCallback(async () => {
    if (!currentAccount?.address) return;

    const res = await suiClient.getOwnedObjects({
      owner: currentAccount?.address,
      options: {
        showContent: true,
        showType: true,
      },
      filter: {
        StructType: `${packageId}::allowlist::Cap`,
      },
    });
    const caps = res.data
      .map((obj) => {
        const fields = (obj!.data!.content as { fields: any }).fields;
        return {
          id: fields?.id.id,
          allowlist_id: fields?.allowlist_id,
        };
      })
      .filter((item) => item !== null) as Cap[];
    const cardItems: CardItem[] = await Promise.all(
      caps.map(async (cap) => {
        const allowlist = await suiClient.getObject({
          id: cap.allowlist_id,
          options: { showContent: true },
        });
        const fields = (allowlist.data?.content as { fields: any })?.fields || {};
        return {
          cap_id: cap.id,
          allowlist_id: cap.allowlist_id,
          list: fields.list,
          name: fields.name,
        };
      }),
    );
    setCardItems(cardItems);
  }, [currentAccount?.address]);

  useEffect(() => {
    getCapObj();
  }, [getCapObj]);

  // Handle card highlight animation
  const handleHighlightCard = (id: string) => {
    setHighlightedCard(id)
    setTimeout(() => setHighlightedCard(null), 1500)
  }

  // Handle manage allowlist
  const handleManage = (allowlist: CardItem) => {
    setSelectedAllowlist(allowlist)
    setIsManageModalOpen(true)
  }

  // Handle form submission for new allowlist
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAllowlistName.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Generate a random ID
      const newId = "0x" + Math.random().toString(16).substring(2, 10) + "..."

      // Add new allowlist to the list
      setCardItems([
        ...cardItems,
        {
          cap_id: newId,
          name: newAllowlistName,
          allowlist_id: newId,
          list: [],
        },
      ])

      // Reset form and close modal
      setNewAllowlistName("")
      setIsSubmitting(false)
      setIsModalOpen(false)
    }, 1000)
  }

  // Handle adding a new address to allowlist
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would add the address to the allowlist
    setNewAddress("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-900 via-fuchsia-900 to-purple-900">
      <NavigationMenu isLoggedIn={!!currentAccount} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Your Allowlists
              <span className="absolute -top-2 -right-2">
                <Shield className="h-6 w-6 text-green-300 animate-pulse" />
              </span>
            </h1>
          </div>
          <p className="text-xl text-fuchsia-200 max-w-2xl">
            Manage who can access your encrypted content with these powerful allowlists
          </p>

          {!!currentAccount ? (
            <ConnectButton className="bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 !text-white border-2 border-fuchsia-400 font-bold px-6 py-2 transition-all duration-300"></ConnectButton>
          ) : null}
        </div>

        {currentAccount ? (
          <>
            <div className="flex justify-end mb-6">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white border-2 border-green-400 font-bold px-6 py-2 transition-all duration-300 shadow-lg shadow-green-700/20">
                    <Plus className="h-4 w-4 mr-2" /> Create New Allowlist
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gradient-to-br from-violet-800 to-fuchsia-900 border-2 border-fuchsia-400 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                      <Plus className="h-5 w-5 text-green-300" />
                      Create New Allowlist
                    </DialogTitle>
                    <DialogDescription className="text-fuchsia-200">
                      Give your allowlist a name to get started. You can add members after creation.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name" className="text-fuchsia-200">
                          Allowlist Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter a name for your allowlist"
                          value={newAllowlistName}
                          onChange={(e) => setNewAllowlistName(e.target.value)}
                          className="bg-fuchsia-800/50 border-fuchsia-500 text-white placeholder:text-fuchsia-300/50 focus-visible:ring-green-400"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        disabled={isSubmitting || !newAllowlistName.trim()}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white border-2 border-green-400 font-bold transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Allowlist
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Manage Allowlist Modal */}
            <Dialog open={isManageModalOpen} onOpenChange={setIsManageModalOpen}>
              <DialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-green-400 text-white max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-green-300" />
                    Admin View: Allowlist {selectedAllowlist?.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Share Link Section */}
                  <div className="space-y-2">
                    <div>
                    <span className="text-sm">ID {selectedAllowlist?.allowlist_id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-green-300" />
                      <span className="font-semibold text-white">Share</span>
                      <span className="text-blue-400 underline cursor-pointer">this link</span>
                      <span className="text-white">with users to access the files associated with this allowlist.</span>
                    </div>
                  </div>

                  {/* Add Users Section */}
                  <div className="space-y-2">
                    <form onSubmit={handleAddAddress} className="flex gap-2">
                      <Input
                        placeholder="Add new address"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        className="bg-gray-800/80 border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-green-400 flex-1"
                      />
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </form>

                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-gray-300">Allowed Users:</h3>
                      <p className="text-sm text-gray-400">No user in this allowlist.</p>
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
                          <SelectItem value="staketab.org">Staketab.org</SelectItem>
                          <SelectItem value="redundax.com">Redundax.com</SelectItem>
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
              {cardItems.map((list) => (
                <Card
                  key={list.allowlist_id}
                  className={`bg-gradient-to-br from-green-600/90 to-emerald-700/90 border-2 text-white overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 ${
                    highlightedCard === list.allowlist_id
                      ? "animate-pulse border-yellow-300 border-4 scale-105"
                      : "border-green-400"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ListChecks className="h-5 w-5 text-green-300" />
                      {list.name}
                    </CardTitle>
                    <CardDescription className="text-green-100 flex items-center gap-1">
                      <span className="text-xs bg-green-700/50 px-2 py-0.5 rounded-full">{list.allowlist_id}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="flex justify-center items-center">
                      <div className="bg-green-700/30 rounded-lg p-3 text-center">
                        <PersonStanding className="h-5 w-5 text-green-300 mx-auto mb-1" />
                        <span className="text-green-100">User {list.list.length}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      className="flex-1 bg-green-500 hover:bg-green-400 text-white border-2 border-green-300 font-bold group"
                      onClick={() => {
                        handleHighlightCard(list.allowlist_id)
                        handleManage(list)
                      }}
                    >
                      <Settings className="h-4 w-4 mr-2 text-yellow-300 group-hover:animate-spin" /> Manage
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-green-700/50 hover:bg-green-600/50 text-white border-2 border-green-300/50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {/* Add New Allowlist Card */}
              <Card
                className="bg-gradient-to-br from-fuchsia-600/40 to-violet-700/40 border-2 border-dashed border-fuchsia-400/50 text-white overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-500/20 flex flex-col items-center justify-center p-8 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="rounded-full bg-fuchsia-700/50 p-4 mb-4 border border-fuchsia-400/30">
                  <Plus className="h-8 w-8 text-fuchsia-300" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Create New Allowlist</h3>
                <p className="text-sm text-white text-center mb-4">
                  Start controlling access to your encrypted content
                </p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsModalOpen(true)
                  }}
                  className="bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white border-2 border-fuchsia-400 font-bold px-6"
                >
                  <Plus className="h-4 w-4 mr-2" /> Create New
                </Button>
              </Card>
            </div>

            <div className="flex justify-center">
              <div className="bg-fuchsia-800/50 border-2 border-fuchsia-400/70 rounded-lg p-4 max-w-md text-center shadow-lg shadow-fuchsia-700/30">
                <h3 className="text-lg font-bold text-fuchsia-200 mb-2">Allowlist Stats</h3>
                <div className="flex justify-center mb-4">
                  <div className="bg-fuchsia-700/50 rounded-lg p-3 px-8">
                    <div className="text-2xl font-bold text-white">{cardItems.length}</div>
                    <div className="text-xs text-fuchsia-300">Total Lists</div>
                  </div>
                </div>
                <p className="text-xs text-fuchsia-300 mt-2 font-medium">
                  <Sparkles className="inline h-3 w-3 mr-1 text-yellow-300" />
                  Create more allowlists to earn XP and level up!
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="max-w-md w-full text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full p-8 border-2 border-violet-400/30">
                    <Lock className="h-20 w-20 text-gray-300" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-red-500/20 rounded-full p-2 border border-red-400/30">
                    <Shield className="h-6 w-6 text-gray-300" />
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">Access Locked</h2>
              <p className="text-fuchsia-200 mb-8 max-w-sm mx-auto">
                Your allowlists help you control who can access your encrypted content. Connect your wallet to get
                started.
              </p>

              <div className="bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 p-1 rounded-lg">
                <ConnectButton className="!text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-2 border-violet-400 font-bold px-6 py-6 text-lg w-full"></ConnectButton>
              </div>

              <p className="text-xs text-fuchsia-300/70 mt-4">
                You need to be connected to create and manage allowlists
              </p>
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

