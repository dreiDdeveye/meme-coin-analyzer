"use client"

import { Card } from "@/components/ui/card"
import type { TokenPair } from "@/lib/dex-screener"

interface TokenChartStatsProps {
  token: TokenPair
  chain: string
  dex: string
}

export function TokenChartStats({ token, chain, dex }: TokenChartStatsProps) {
  const formatPrice = (price: number) => {
    if (price < 0.000001) return price.toExponential(4)
    if (price < 1) return price.toFixed(8)
    return price.toFixed(4)
  }

  const formatLarge = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`
    return `$${num.toFixed(0)}`
  }

  const buys = token.txns?.h24?.buys || 0
  const sells = token.txns?.h24?.sells || 0
  const totalTxns = buys + sells

  const buyRatio = totalTxns > 0 ? (buys / totalTxns) * 100 : 50
  const sellRatio = totalTxns > 0 ? (sells / totalTxns) * 100 : 50

  const buyVolUsd = token.volume?.h24 ? (token.volume.h24 * buyRatio) / 100 : 0
  const sellVolUsd = token.volume?.h24 ? (token.volume.h24 * sellRatio) / 100 : 0

  // Estimate makers (unique traders) as ~30% of total transactions
  const estimatedMakers = Math.floor(totalTxns * 0.3)
  const estimatedBuyers = Math.floor(buys * 0.31)
  const estimatedSellers = Math.floor(sells * 0.33)

  const chartUrl = `https://dexscreener.com/${chain.toLowerCase()}/${token.pairAddress}?embed=1&theme=dark&trades=0&info=0`

  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-[#0a0e13] p-0 overflow-hidden">
        <iframe
          src={chartUrl}
          className="w-full h-[500px] border-0"
          title={`${token.baseToken.symbol} Chart on ${dex}`}
        />
      </Card>

      {/* Statistics Panel - Matching the screenshot exactly */}
      <Card className="border-primary/20 bg-[#0a0e13] p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Price USD */}
          <div className="bg-black/40 p-3 rounded border border-primary/10">
            <p className="text-[10px] text-muted-foreground mb-1 tracking-wider">PRICE USD</p>
            <p className="text-xl font-bold text-white">
              ${formatPrice(token.priceUsd ? Number.parseFloat(token.priceUsd) : 0)}
            </p>
          </div>

          {/* Price in Native */}
          <div className="bg-black/40 p-3 rounded border border-primary/10">
            <p className="text-[10px] text-muted-foreground mb-1 tracking-wider">PRICE</p>
            <p className="text-xl font-bold text-white">
              {formatPrice(token.priceNative ? Number.parseFloat(token.priceNative) : 0)}{" "}
              <span className="text-sm">{chain === "Solana" ? "SOL" : "ETH"}</span>
            </p>
          </div>
        </div>

        {/* Liquidity, FDV, Market Cap */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-black/40 p-3 rounded border border-primary/10">
            <p className="text-[10px] text-muted-foreground mb-1 tracking-wider">LIQUIDITY</p>
            <p className="text-lg font-bold text-white flex items-center gap-1">
              {formatLarge(token.liquidity?.usd || 0)}
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
            </p>
          </div>

          <div className="bg-black/40 p-3 rounded border border-primary/10">
            <p className="text-[10px] text-muted-foreground mb-1 tracking-wider">FDV</p>
            <p className="text-lg font-bold text-white">{formatLarge(token.fdv || 0)}</p>
          </div>

          <div className="bg-black/40 p-3 rounded border border-primary/10">
            <p className="text-[10px] text-muted-foreground mb-1 tracking-wider">MKT CAP</p>
            <p className="text-lg font-bold text-white">{formatLarge(token.marketCap || 0)}</p>
          </div>
        </div>

        {/* Time-based Performance */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-black/40 p-3 rounded border border-primary/10 text-center">
            <p className="text-[10px] text-muted-foreground mb-1">5M</p>
            <p className={`text-sm font-bold ${(token.priceChange?.m5 || 0) >= 0 ? "text-green-400" : "text-red-400"}`}>
              {(token.priceChange?.m5 || 0).toFixed(2)}%
            </p>
          </div>
          <div className="bg-black/40 p-3 rounded border border-primary/10 text-center">
            <p className="text-[10px] text-muted-foreground mb-1">1H</p>
            <p className={`text-sm font-bold ${(token.priceChange?.h1 || 0) >= 0 ? "text-green-400" : "text-red-400"}`}>
              {(token.priceChange?.h1 || 0).toFixed(2)}%
            </p>
          </div>
          <div className="bg-black/40 p-3 rounded border border-primary/10 text-center">
            <p className="text-[10px] text-muted-foreground mb-1">6H</p>
            <p className={`text-sm font-bold ${(token.priceChange?.h6 || 0) >= 0 ? "text-green-400" : "text-red-400"}`}>
              {(token.priceChange?.h6 || 0).toFixed(2)}%
            </p>
          </div>
          <div className="bg-black/40 p-3 rounded border border-primary/10 text-center">
            <p className="text-[10px] text-muted-foreground mb-1">24H</p>
            <p
              className={`text-sm font-bold ${(token.priceChange?.h24 || 0) >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {(token.priceChange?.h24 || 0).toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Transactions */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-black/40 p-3 rounded border border-primary/10">
            <p className="text-[10px] text-muted-foreground mb-1 tracking-wider">TXNS</p>
            <p className="text-lg font-bold text-white">{totalTxns.toLocaleString()}</p>
          </div>
          <div className="bg-black/40 p-3 rounded border border-primary/10">
            <p className="text-[10px] text-muted-foreground mb-1 tracking-wider">BUYS</p>
            <p className="text-lg font-bold text-green-400">{buys.toLocaleString()}</p>
          </div>
          <div className="bg-black/40 p-3 rounded border border-primary/10">
            <p className="text-[10px] text-muted-foreground mb-1 tracking-wider">SELLS</p>
            <p className="text-lg font-bold text-red-400">{sells.toLocaleString()}</p>
          </div>
        </div>

        {/* Buy/Sell Ratio Bar */}
        <div className="mb-4">
          <div className="flex h-2 rounded-full overflow-hidden bg-black/40">
            <div className="bg-green-500" style={{ width: `${buyRatio}%` }} />
            <div className="bg-red-500" style={{ width: `${sellRatio}%` }} />
          </div>
        </div>

        {/* Volume Breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-black/40 p-3 rounded border border-primary/10">
            <p className="text-[10px] text-muted-foreground mb-1 tracking-wider">VOLUME</p>
            <p className="text-lg font-bold text-white">{formatLarge(token.volume?.h24 || 0)}</p>
          </div>
          <div className="bg-black/40 p-3 rounded border border-primary/10">
            <p className="text-[10px] text-muted-foreground mb-1 tracking-wider">BUY VOL</p>
            <p className="text-sm font-bold text-green-400">{formatLarge(buyVolUsd)}</p>
          </div>
          <div className="bg-black/40 p-3 rounded border border-primary/10">
            <p className="text-[10px] text-muted-foreground mb-1 tracking-wider">SELL VOL</p>
            <p className="text-sm font-bold text-red-400">{formatLarge(sellVolUsd)}</p>
          </div>
        </div>

        {/* Buy/Sell Volume Ratio Bar */}
        <div className="mb-4">
          <div className="flex h-2 rounded-full overflow-hidden bg-black/40">
            <div className="bg-green-500" style={{ width: `${buyRatio}%` }} />
            <div className="bg-red-500" style={{ width: `${sellRatio}%` }} />
          </div>
        </div>

        {/* Makers Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black/40 p-3 rounded border border-primary/10">
            <p className="text-[10px] text-muted-foreground mb-1 tracking-wider">MAKERS</p>
            <p className="text-lg font-bold text-white">{estimatedMakers.toLocaleString()}</p>
          </div>
          <div className="bg-black/40 p-3 rounded border border-primary/10">
            <p className="text-[10px] text-muted-foreground mb-1 tracking-wider">BUYERS</p>
            <p className="text-sm font-bold text-green-400">{estimatedBuyers.toLocaleString()}</p>
          </div>
          <div className="bg-black/40 p-3 rounded border border-primary/10">
            <p className="text-[10px] text-muted-foreground mb-1 tracking-wider">SELLERS</p>
            <p className="text-sm font-bold text-red-400">{estimatedSellers.toLocaleString()}</p>
          </div>
        </div>

        {/* Makers Ratio Bar */}
        <div className="mt-2">
          <div className="flex h-2 rounded-full overflow-hidden bg-black/40">
            <div className="bg-green-500" style={{ width: `${(estimatedBuyers / estimatedMakers) * 100}%` }} />
            <div className="bg-red-500" style={{ width: `${(estimatedSellers / estimatedMakers) * 100}%` }} />
          </div>
        </div>
      </Card>
    </div>
  )
}
