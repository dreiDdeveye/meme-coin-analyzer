"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface CAHeaderProps {
  contractAddress: string
  symbol?: string
  name?: string
  chain?: string
  dex?: string
  url?: string
  chainId?: string
  imageUrl?: string
  headerUrl?: string
}

export function CAHeader({
  contractAddress,
  symbol,
  name,
  chain,
  dex,
  url,
  chainId,
  imageUrl,
  headerUrl,
}: CAHeaderProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayAddress = `${contractAddress.slice(0, 6)}...${contractAddress.slice(-6)}`

  return (
    <div
      className="relative bg-primary/10 border border-primary/20 rounded-lg overflow-hidden mb-6 min-h-[300px]"
      style={{
        backgroundImage: headerUrl || imageUrl ? `url(${headerUrl || imageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for better text readability */}
      {(headerUrl || imageUrl) && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
      )}

      <div className="relative z-10 p-6">
        {(symbol || name) && (
          <div className="mb-6 flex items-center gap-4">
            {imageUrl && !headerUrl && (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={`${name || symbol} logo`}
                className="w-16 h-16 rounded-full border-2 border-primary/30"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-1">{name || symbol}</h1>
              {name && symbol && <p className="text-xl text-gray-200 font-semibold drop-shadow-md">${symbol}</p>}
            </div>
          </div>
        )}

        {(chain || dex) && (
          <div className="flex gap-4 mb-4">
            {chain && (
              <div className="rounded-md bg-black/40 backdrop-blur-sm px-3 py-1.5 border border-white/10">
                <p className="text-xs text-gray-300">Chain</p>
                <p className="text-sm font-semibold text-white">{chain}</p>
              </div>
            )}
            {dex && (
              <div className="rounded-md bg-black/40 backdrop-blur-sm px-3 py-1.5 border border-white/10">
                <p className="text-xs text-gray-300">DEX</p>
                <p className="text-sm font-semibold text-white">{dex}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-300">Contract Address</p>
            <p className="text-sm font-mono text-white">{displayAddress}</p>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/30 backdrop-blur-sm hover:bg-primary/40 transition-colors text-sm text-white border border-primary/30"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
        </div>

        {url && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-foreground hover:text-cyan-300 transition-colors font-medium"
            >
              View on DEX Screener →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
