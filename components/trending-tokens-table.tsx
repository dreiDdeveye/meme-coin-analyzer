"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Info, ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { MemecoinData } from "@/hooks/use-memecoin-data"
import { TokenInfoModal } from "./token-info-modal"

interface TrendingTokensTableProps {
  tokens: MemecoinData[]
  isLoading: boolean
  totalVolume?: number
  totalTxns?: number
}

export function TrendingTokensTable({ tokens, isLoading, totalVolume, totalTxns }: TrendingTokensTableProps) {
  const [selectedToken, setSelectedToken] = useState<MemecoinData["pair"] | null>(null)

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`
    return `$${num.toFixed(2)}`
  }

  const formatPercent = (num: number) => {
    const formatted = Math.abs(num).toFixed(2)
    return num >= 0 ? `${formatted}%` : `${formatted}%`
  }

  if (isLoading) {
    return (
      <div className="lab-card p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">Loading trending tokens...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="lab-card overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-border/50 border-b border-border/50 bg-muted/20">
          <div className="p-5 text-center">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">24H Volume</p>
            <p className="text-2xl font-bold text-primary tabular-nums">{formatNumber(totalVolume || 0)}</p>
          </div>
          <div className="p-5 text-center">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">24H Transactions</p>
            <p className="text-2xl font-bold text-primary tabular-nums">{(totalTxns || 0).toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3.5 border-b border-border/50 bg-muted/10">
          <div className="flex items-center gap-0.5 bg-muted/30 rounded-md p-0.5">
            {["5M", "1H", "6H", "24H"].map((period) => (
              <button
                key={period}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                  period === "24H"
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-auto">Sorted by trending</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/10">
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-2.5">#</th>
                <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-2.5">Token</th>
                <th className="text-right text-xs font-semibold text-muted-foreground px-4 py-2.5">Price</th>
                <th className="text-right text-xs font-semibold text-muted-foreground px-4 py-2.5">Age</th>
                <th className="text-right text-xs font-semibold text-muted-foreground px-4 py-2.5">Volume</th>
                <th className="text-right text-xs font-semibold text-muted-foreground px-4 py-2.5">5M</th>
                <th className="text-right text-xs font-semibold text-muted-foreground px-4 py-2.5">1H</th>
                <th className="text-right text-xs font-semibold text-muted-foreground px-4 py-2.5">24H</th>
                <th className="text-right text-xs font-semibold text-muted-foreground px-4 py-2.5">Liquidity</th>
                <th className="text-right text-xs font-semibold text-muted-foreground px-4 py-2.5">MCap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {tokens.map((token, index) => {
                const { pair } = token
                const age = pair.pairCreatedAt
                  ? formatDistanceToNow(new Date(pair.pairCreatedAt), { addSuffix: false })
                  : "-"

                const PriceChangeCell = ({ value }: { value: number }) => {
                  const isPositive = value >= 0
                  return (
                    <div
                      className={`flex items-center justify-end gap-1 ${isPositive ? "text-accent" : "text-destructive"}`}
                    >
                      {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      <span className="font-medium tabular-nums">{formatPercent(value)}</span>
                    </div>
                  )
                }

                return (
                  <tr key={pair.pairAddress} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4 text-sm text-muted-foreground tabular-nums">{index + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {pair.info?.imageUrl ? (
                          <img
                            src={pair.info.imageUrl || "/placeholder.svg"}
                            alt={pair.baseToken.symbol}
                            className="w-8 h-8 rounded-full bg-muted"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xs font-bold">
                            {pair.baseToken.symbol.slice(0, 2)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{pair.baseToken.symbol}</span>
                            <span className="text-xs text-muted-foreground">/SOL</span>
                            <button
                              onClick={() => setSelectedToken(pair)}
                              className="p-1 hover:bg-muted rounded transition-colors"
                            >
                              <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-primary" />
                            </button>
                          </div>
                          <span className="text-xs text-muted-foreground truncate block max-w-[150px]">
                            {pair.baseToken.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium tabular-nums">
                      ${Number(pair.priceUsd).toFixed(8)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-muted-foreground">{age}</td>
                    <td className="px-4 py-4 text-right text-sm font-medium tabular-nums">
                      {formatNumber(pair.volume?.h24 || 0)}
                    </td>
                    <td className="px-4 py-4">
                      <PriceChangeCell value={pair.priceChange?.m5 || 0} />
                    </td>
                    <td className="px-4 py-4">
                      <PriceChangeCell value={pair.priceChange?.h1 || 0} />
                    </td>
                    <td className="px-4 py-4">
                      <PriceChangeCell value={pair.priceChange?.h24 || 0} />
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium tabular-nums">
                      {formatNumber(pair.liquidity?.usd || 0)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium tabular-nums">
                      {formatNumber(pair.marketCap || 0)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {tokens.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No trending tokens found</p>
          </div>
        )}
      </div>

      {selectedToken && (
        <TokenInfoModal token={selectedToken} isOpen={!!selectedToken} onClose={() => setSelectedToken(null)} />
      )}
    </>
  )
}
