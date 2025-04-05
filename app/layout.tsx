"use client"

import { ConnectButton, SuiClientProvider, useCurrentAccount, WalletProvider, useDisconnectWallet } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { networkConfig } from "@/lib/networkConfig"

import './globals.css'
import '@mysten/dapp-kit/dist/index.css';

const metadata = {
  title: 'Mojila Seal 🌟',
  description: 'Seal project demo from Mojila',
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body><QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider autoConnect>
            {children}
          </WalletProvider>
        </SuiClientProvider>
    </QueryClientProvider></body>
    </html>
  )
}
