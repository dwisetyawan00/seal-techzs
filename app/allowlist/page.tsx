"use client"

import { useCallback, useEffect, useState } from "react"
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
  ListChecks,
  Plus,
  Shield,
  Settings,
  ChevronRight,
  Sparkles,
  Loader2,
  Lock,
  LinkIcon,
  Upload,
  UserPlus,
  PersonStanding,
  FileText,
  Share2,
  Trash2,
} from "lucide-react"
import { NavigationMenu } from "@/components/navigation-menu"
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit'
import { CustomConnectButton } from "@/components/custom-wallet"
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
  const [activeTab, setActiveTab] = useState<'users' | 'files'>('users')
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
  }, [currentAccount?.address, packageId, suiClient]);

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

  // Check if user has any allowlists yet
  const hasAllowlists = cardItems.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-indigo-950 to-violet-950">
      <NavigationMenu />

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="bg-gradient-to-r from-indigo-600/20 to-violet-600/20 p-1 rounded-lg max-w-4xl w-full">
            <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(129,140,248,0.2),transparent_50%)]"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Shield className="h-8 w-8 text-indigo-300" />
                    <span>Your Allowlists</span>
                  </h1>
                  <p className="text-lg text-indigo-200 mt-2 max-w-xl">
                    Control who can access your encrypted content with these powerful allowlists
                  </p>
                </div>
                
                {currentAccount ? (
                  <div className="flex-shrink-0">
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogTrigger asChild>
                        <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-2 border-indigo-400 font-bold px-6 transition-all duration-300 shadow-md shadow-indigo-900/20">
                          <Plus className="h-5 w-5 mr-2" /> Create New Allowlist
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
            {/* New Allowlist Dialog */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="bg-gradient-to-br from-indigo-900 to-violet-950 border-2 border-indigo-400 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                    <Plus className="h-5 w-5 text-indigo-300" />
                    Create New Allowlist
                  </DialogTitle>
                  <DialogDescription className="text-indigo-200">
                    Give your allowlist a name to get started. You can add members after creation.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="text-indigo-200">
                        Allowlist Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter a name for your allowlist"
                        value={newAllowlistName}
                        onChange={(e) => setNewAllowlistName(e.target.value)}
                        className="bg-indigo-800/50 border-indigo-500 text-white placeholder:text-indigo-300/50 focus-visible:ring-indigo-400"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !newAllowlistName.trim()}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-2 border-indigo-400 font-bold transition-all duration-300"
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

            {/* Manage Allowlist Modal */}
            <Dialog open={isManageModalOpen} onOpenChange={setIsManageModalOpen}>
              <DialogContent className="bg-gradient-to-br from-indigo-900 to-violet-950 border-2 border-indigo-400 text-white max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                    <ListChecks className="h-6 w-6 text-indigo-300" />
                    {selectedAllowlist?.name}
                  </DialogTitle>
                  <DialogDescription className="text-indigo-200 flex items-center gap-2">
                    <span className="text-xs bg-indigo-800/80 px-2 py-0.5 rounded-full font-mono">
                      ID: {selectedAllowlist?.allowlist_id}
                    </span>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Tabs */}
                  <div className="flex border-b border-indigo-700">
                    <button
                      className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                        activeTab === 'users'
                          ? 'text-white border-b-2 border-indigo-400'
                          : 'text-indigo-300 hover:text-white'
                      }`}
                      onClick={() => setActiveTab('users')}
                    >
                      <PersonStanding className="h-4 w-4" />
                      Manage Users
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                        activeTab === 'files'
                          ? 'text-white border-b-2 border-indigo-400'
                          : 'text-indigo-300 hover:text-white'
                      }`}
                      onClick={() => setActiveTab('files')}
                    >
                      <FileText className="h-4 w-4" />
                      Manage Files
                    </button>
                  </div>

                  {activeTab === 'users' ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-white">Allowlist Members</h3>
                        <Button 
                          size="sm" 
                          className="bg-indigo-600 hover:bg-indigo-700 border-0 text-white"
                          onClick={() => {
                            navigator.clipboard.writeText(`https://techzs-app.com/access/${selectedAllowlist?.allowlist_id}`)
                            // Add toast notification here
                          }}
                        >
                          <Share2 className="h-3.5 w-3.5 mr-1" />
                          Copy Share Link
                        </Button>
                      </div>
                      
                      <form onSubmit={handleAddAddress} className="flex gap-2">
                        <Input
                          placeholder="Add wallet address"
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                          className="bg-indigo-800/50 border-indigo-700 text-white placeholder:text-indigo-400 flex-1"
                        />
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white border-0">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                      </form>

                      <div className="bg-indigo-800/30 rounded-lg border border-indigo-700 overflow-hidden">
                        {selectedAllowlist?.list?.length ? (
                          <div className="divide-y divide-indigo-700/60">
                            {selectedAllowlist.list.map((address, index) => (
                              <div key={index} className="flex items-center justify-between py-3 px-4">
                                <span className="font-mono text-sm text-indigo-200">{address}</span>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-indigo-300 hover:text-white hover:bg-indigo-800">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-6 text-center text-indigo-300">
                            <PersonStanding className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No members added to this allowlist yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Associated Files</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-indigo-200">Select Storage Service:</Label>
                          <Select defaultValue="staketab.org">
                            <SelectTrigger className="w-[180px] bg-indigo-800/80 border-indigo-700 text-white">
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent className="bg-indigo-900 border-indigo-700 text-white">
                              <SelectItem value="staketab.org">Staketab.org</SelectItem>
                              <SelectItem value="redundax.com">Redundax.com</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="bg-indigo-800/30 rounded-lg border border-indigo-700 p-4">
                          <div className="border-2 border-dashed border-indigo-700 rounded-lg p-8 text-center">
                            <Upload className="h-10 w-10 mx-auto mb-4 text-indigo-400" />
                            <h4 className="text-lg font-medium text-white mb-2">Upload File</h4>
                            <p className="text-indigo-300 mb-4 max-w-md mx-auto">
                              File will be encrypted and associated with this allowlist
                            </p>
                            
                            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-0">
                              <Upload className="h-4 w-4 mr-2" />
                              Choose File
                            </Button>
                            
                            <p className="text-xs text-indigo-400 mt-4">
                              File size must be less than 10 MiB. Only image files are allowed.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <Button className="w-full bg-indigo-700/80 hover:bg-indigo-600/80 text-white">
                            Encrypt and upload to Walrus
                          </Button>
                          <Button className="w-full bg-indigo-700/80 hover:bg-indigo-600/80 text-white">
                            Associate file to Sui object
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {hasAllowlists ? (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                  {cardItems.map((list) => (
                    <Card
                      key={list.allowlist_id}
                      className={`bg-gradient-to-br from-indigo-800/90 to-violet-900/90 border-2 text-white overflow-hidden transform hover:translate-y-[-4px] transition-all duration-300 shadow-lg shadow-indigo-950/50 ${
                        highlightedCard === list.allowlist_id
                          ? "animate-pulse border-yellow-300 border-4 scale-105"
                          : "border-indigo-400"
                      }`}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ListChecks className="h-5 w-5 text-indigo-300" />
                          {list.name}
                        </CardTitle>
                        <CardDescription className="text-indigo-200 flex items-center gap-1">
                          <span className="text-xs bg-indigo-700/50 px-2 py-0.5 rounded-full font-mono">{list.allowlist_id}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <div className="flex justify-center items-center">
                          <div className="bg-indigo-700/30 rounded-lg p-3 text-center">
                            <PersonStanding className="h-5 w-5 text-indigo-300 mx-auto mb-1" />
                            <span className="text-indigo-200">
                              {list.list.length} {list.list.length === 1 ? 'User' : 'Users'}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button
                          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white border-2 border-indigo-400 font-bold group"
                          onClick={() => {
                            handleHighlightCard(list.allowlist_id)
                            handleManage(list)
                          }}
                        >
                          <Settings className="h-4 w-4 mr-2 text-indigo-200 group-hover:animate-spin" /> Manage
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-indigo-700/50 hover:bg-indigo-600/50 text-white border-2 border-indigo-400/50"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}

                  {/* Add New Allowlist Card */}
                  <Card
                    className="bg-gradient-to-br from-indigo-800/40 to-violet-900/40 border-2 border-dashed border-indigo-400/50 text-white overflow-hidden transform hover:translate-y-[-4px] transition-all duration-300 shadow-lg shadow-indigo-950/50 flex flex-col items-center justify-center p-8 cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <div className="rounded-full bg-indigo-700/50 p-4 mb-4 border border-indigo-400/30">
                      <Plus className="h-8 w-8 text-indigo-300" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Create New Allowlist</h3>
                    <p className="text-sm text-indigo-200 text-center mb-4">
                      Start controlling access to your encrypted content
                    </p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsModalOpen(true)
                      }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-2 border-indigo-400 font-bold px-6"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Create New
                    </Button>
                  </Card>
                </div>

                <div className="flex justify-center">
                  <div className="bg-indigo-800/50 border-2 border-indigo-400/70 rounded-lg p-4 max-w-md text-center shadow-lg shadow-indigo-900/30">
                    <h3 className="text-lg font-bold text-indigo-200 mb-2">Allowlist Stats</h3>
                    <div className="flex justify-center mb-4">
                      <div className="bg-indigo-700/50 rounded-lg p-3 px-8">
                        <div className="text-2xl font-bold text-white">{cardItems.length}</div>
                        <div className="text-xs text-indigo-300">Total Lists</div>
                      </div>
                    </div>
                    <p className="text-xs text-indigo-300 mt-2 font-medium">
                      <Sparkles className="inline h-3 w-3 mr-1 text-yellow-300" />
                      Create more allowlists to earn XP and level up!
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="max-w-md w-full text-center bg-indigo-800/30 rounded-lg border border-indigo-700 p-8">
                  <div className="mb-6">
                    <div className="bg-indigo-700/30 rounded-full p-6 mx-auto w-fit">
                      <ListChecks className="h-16 w-16 text-indigo-300" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3">No Allowlists Yet</h2>
                  <p className="text-indigo-200 mb-6">
                    Create your first allowlist to start controlling access to your encrypted content
                  </p>

                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-2 border-indigo-400 font-bold px-6 py-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Allowlist
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
                  <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full p-8 border-2 border-indigo-400/30">
                    <Lock className="h-20 w-20 text-indigo-300/50" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-purple-500/20 rounded-full p-2 border border-purple-400/30">
                    <Shield className="h-6 w-6 text-indigo-300/70" />
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">Access Locked</h2>
              <p className="text-indigo-200 mb-8 max-w-sm mx-auto">
                Your allowlists help you control who can access your encrypted content. Connect your wallet to get
                started.
              </p>

              <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-1 rounded-lg">
                <CustomConnectButton className="w-full py-3 text-lg" />
              </div>

              <p className="text-xs text-indigo-300/70 mt-4">
                You need to be connected to create and manage allowlists
              </p>
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
