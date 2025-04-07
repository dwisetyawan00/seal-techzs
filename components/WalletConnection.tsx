import * as React from "react"
import { useIsMobile } from "@/hooks/useIsMobile" // Hook yang sudah Anda buat
import { useWalletConnector } from "@/hooks/useWalletConnector" // Hook baru
import { Button } from "@/components/ui/button" // Button yang sudah ada

export function WalletConnection() {
  const isMobile = useIsMobile()
  const { 
    isConnected, 
    shortenedAddress, 
    walletType, 
    connectWallet, 
    disconnectWallet 
  } = useWalletConnector()

  const handleConnectClick = async () => {
    // Pilih tipe wallet berdasarkan perangkat
    const selectedWallet = isMobile ? 'WalletConnect' : 'MetaMask'
    await connectWallet(selectedWallet)
  }

  return (
    <div className="flex items-center gap-2">
      {isConnected ? (
        <>
          <div className="px-4 py-2 bg-gray-100 rounded-md text-sm">
            {shortenedAddress}
            <span className="ml-2 text-xs text-gray-500">
              ({walletType})
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={disconnectWallet}
          >
            Disconnect
          </Button>
        </>
      ) : (
        <Button 
          variant="default" 
          onClick={handleConnectClick}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  )
}
