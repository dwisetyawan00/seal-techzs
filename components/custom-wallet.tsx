"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { LogIn, Lock, Shield, ChevronRight, Check, Copy, ExternalLink } from "lucide-react"
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

// Helper function to truncate addresses
const truncateAddress = (address: string) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const WalletModal = ({ isOpen, onClose }: WalletModalProps) => {
  const currentAccount = useCurrentAccount()
  const [copied, setCopied] = useState(false)
  
  const copyAddress = () => {
    if (currentAccount?.address) {
      navigator.clipboard.writeText(currentAccount.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-400 text-white max-w-md rounded-xl p-0 overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-white" />
              <h2 className="text-xl font-bold text-white">Techzs Seal</h2>
            </div>
            <span className="bg-blue-400/20 text-blue-100 text-xs px-2 py-1 rounded-full border border-blue-400/40">
              Testnet
            </span>
          </div>
          <p className="text-sm text-blue-100">
            Connect your wallet to access decentralized features
          </p>
        </div>
        
        <div className="p-4">
          {currentAccount ? (
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Connected Wallet</span>
                  <span className="bg-green-500/20 text-green-300 text-xs px-2 py-0.5 rounded-full border border-green-500/30 flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 mr-1 animate-pulse"></span>
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="font-mono bg-slate-800 text-blue-300 px-3 py-1.5 rounded border border-slate-700 text-sm">
                    {truncateAddress(currentAccount.address)}
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={copyAddress}
                      className="bg-slate-700 hover:bg-slate-600 border-slate-600 h-8 w-8 p-0"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5 text-slate-300" />}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-slate-700 hover:bg-slate-600 border-slate-600 h-8 w-8 p-0"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-slate-300" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
                onClick={onClose}
              >
                <ChevronRight className="h-4 w-4 mr-2" />
                Continue to App
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="bg-slate-700/30 rounded-full p-6 border border-slate-600/50">
                  <Lock className="h-12 w-12 text-slate-300" />
                </div>
              </div>
              
              <ConnectButton className="!bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 !text-white border-2 border-blue-400 font-bold px-6 py-2 transition-all duration-300 w-full" />
              
              <p className="text-xs text-center text-slate-400 mt-2">
                Connect your wallet to access decentralized features
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const CustomConnectButton = ({ className = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentAccount = useCurrentAccount()
  
  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        className={`bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-2 border-blue-400 font-bold transition-all duration-300 ${className}`}
      >
        {currentAccount ? (
          <>
            <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
            {truncateAddress(currentAccount.address)}
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4 mr-2" />
            Connect Wallet
          </>
        )}
      </Button>
      
      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
