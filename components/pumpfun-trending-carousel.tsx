"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, MessageCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface PumpFunToken {
  mint: string
  name: string
  symbol: string
  description?: string
  image?: string
  twitter?: string
  telegram?: string
  website?: string
  marketCapSol?: number
  traderCount?: number
  createdTimestamp: number
}

export function PumpFunTrendingCarousel() {
  const [tokens, setTokens] = useState<PumpFunToken[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    async function loadTrending() {
      setIsLoading(true)
      try {
        console.log("[v0] Fetching real Pump.fun tokens from PumpPortal API...")
        const response = await fetch("/api/pumpfun/trending")
        const data = await response.json()

        if (data.tokens) {
          console.log(`[v0] Loaded ${data.tokens.length} real Pump.fun tokens`)
          setTokens(data.tokens)
        }
      } catch (error) {
        console.error("[v0] Error loading Pump.fun tokens:", error)
      }
      setIsLoading(false)
    }
    loadTrending()
  }, [])

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("trending-carousel")
    if (!container) return

    const scrollAmount = 320
    const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount

    container.scrollTo({ left: newPosition, behavior: "smooth" })
    setScrollPosition(newPosition)
  }

  const formatMarketCap = (marketCapSol?: number) => {
    if (!marketCapSol) return "$0"
    const usdValue = marketCapSol * 100 // Approximate SOL to USD
    if (usdValue >= 1000000) return `$${(usdValue / 1000000).toFixed(1)}M`
    if (usdValue >= 1000) return `$${(usdValue / 1000).toFixed(1)}K`
    return `$${usdValue.toFixed(0)}`
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono uppercase tracking-wider">Now Trending</h2>
            <p className="text-xs text-muted-foreground font-mono">LIVE PUMP.FUN LAUNCHES</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-primary/20 hover:border-primary/40 bg-transparent"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-primary/20 hover:border-primary/40 bg-transparent"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        id="trending-carousel"
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="min-w-[300px] p-4 animate-pulse bg-card/50">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                    <div className="h-3 bg-muted rounded w-1/4" />
                  </div>
                </div>
                <div className="mt-3 h-12 bg-muted rounded" />
              </Card>
            ))
          : tokens.map((token) => (
              <Card
                key={token.mint}
                className="min-w-[300px] p-4 bg-card/80 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all cursor-pointer"
                onClick={() => window.open(`https://pump.fun/coin/${token.mint}`, "_blank")}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    {token.image ? (
                      <img
                        src={token.image || "/placeholder.svg"}
                        alt={token.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">🚀</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{token.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">({token.symbol})</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono text-green-500">
                        market cap: {formatMarketCap(token.marketCapSol)}
                      </span>
                    </div>
                    {token.traderCount && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{token.traderCount}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {token.description || `${token.name} just launched on Pump.fun`}
                </p>
              </Card>
            ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
