"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchPumpFunTokensFromBitQuery, type BitQueryPumpFunToken } from "@/lib/bitquery-pumpfun"

interface RecentToken {
  mint: string
  symbol: string
  name: string
  creator: string
  timestamp: number
  liquidityUsd: number
  age: string
}

export function PumpfunMonitor() {
  const [recentTokens, setRecentTokens] = useState<RecentToken[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchRecentTokens = async () => {
    try {
      setIsLoading(true)
      setError(null)

      console.log("[v0] Fetching real Pump.fun launches from BitQuery...")

      const bitqueryTokens = await fetchPumpFunTokensFromBitQuery()

      if (bitqueryTokens.length > 0) {
        const tokens: RecentToken[] = bitqueryTokens.slice(0, 20).map((token: BitQueryPumpFunToken) => ({
          mint: token.mintAddress,
          symbol: token.tokenSymbol,
          name: token.tokenName,
          creator: token.creator.slice(0, 8) + "...",
          timestamp: new Date(token.blockTime).getTime(),
          liquidityUsd: 0, // BitQuery doesn't provide liquidity directly
          age: formatAge(new Date(token.blockTime).getTime()),
        }))

        console.log("[v0] Mapped BitQuery tokens:", tokens)
        setRecentTokens(tokens)
        setLastUpdate(new Date())
      } else {
        console.log("[v0] No Pump.fun launches found in BitQuery")
        setError("No recent Pump.fun launches detected. BitQuery API may be rate-limited.")
      }
    } catch (err) {
      console.error("[v0] Failed to fetch real Pump.fun tokens:", err)
      setError("Failed to fetch Pump.fun data. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatAge = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  useEffect(() => {
    fetchRecentTokens()

    // Poll every 30 seconds
    const interval = setInterval(fetchRecentTokens, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="lab-card p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold font-mono uppercase">Pump.fun Token Launches</h3>
          </div>
          <div className="flex items-center gap-2">
            {lastUpdate && (
              <span className="text-xs text-muted-foreground">Updated {lastUpdate.toLocaleTimeString()}</span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={fetchRecentTokens}
              disabled={isLoading}
              className="h-8 bg-transparent"
            >
              <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded">
            <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Token List */}
        {recentTokens.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-mono">REAL PUMP.FUN LAUNCHES (BITQUERY ON-CHAIN DATA)</p>
            {recentTokens.map((token, i) => (
              <div key={i} className="bg-muted/30 p-3 rounded text-xs font-mono space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{token.symbol}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{token.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {token.age}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Creator: {token.creator}</span>
                  <a
                    href={`https://dexscreener.com/solana/${token.mint}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View on DEX →
                  </a>
                </div>

                <div className="text-muted-foreground break-all text-[10px]">{token.mint}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            {isLoading ? (
              <p className="text-sm">Loading real Pump.fun launches...</p>
            ) : (
              <>
                <p className="text-sm">No recent Pump.fun launches found</p>
                <p className="text-xs mt-2">New tokens will appear here when created on Pump.fun</p>
              </>
            )}
          </div>
        )}

        {/* Info */}
        <div className="border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            Showing real Pump.fun token launches from BitQuery on-chain data. Only tokens created via Pump.fun program
            (6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P) are displayed. Data refreshes every 30 seconds.
          </p>
        </div>
      </div>
    </Card>
  )
}
