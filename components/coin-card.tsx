import type React from "react"
import type { MemecoinData } from "@/hooks/use-memecoin-data"
import { getRiskColor } from "@/lib/risk-scorer"
import { TrendingUp, TrendingDown, Activity, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface CoinCardProps {
  coin: MemecoinData
}

export function CoinCard({ coin }: CoinCardProps) {
  const riskScore = coin.riskScore
  const priceChange = coin.pair.priceChange.h24
  const isPositive = priceChange >= 0

  return (
    <Link href={`/coin/${coin.pair.baseToken.symbol}`}>
      <div className="lab-card group cursor-pointer rounded p-4 transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded bg-primary/10 border border-primary/30">
                <span className="text-sm font-bold text-primary font-mono">{coin.pair.baseToken.symbol[0]}</span>
                <Activity className="absolute -bottom-1 -right-1 h-3 w-3 text-accent animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors text-sm">
                  {coin.pair.baseToken.name}
                </h3>
                <p className="text-[10px] text-muted-foreground font-mono tracking-wider">
                  {coin.pair.baseToken.symbol}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`rounded px-2 py-1 text-[10px] font-mono tracking-wider border ${getRiskColor(riskScore.safetyLevel)}`}
          >
            {riskScore.safetyLevel}
          </div>
        </div>

        <div className="space-y-3 font-mono">
          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="data-label">PRICE</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-card-foreground">${coin.priceUsd.toFixed(6)}</span>
              <div className={`flex items-center gap-1 text-[10px] ${isPositive ? "text-accent" : "text-destructive"}`}>
                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{Math.abs(priceChange).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Market Cap */}
          <div className="flex items-center justify-between">
            <span className="data-label">MCAP</span>
            <span className="text-xs text-card-foreground">${(coin.marketCap / 1000000).toFixed(2)}M</span>
          </div>

          {/* Liquidity */}
          <div className="flex items-center justify-between">
            <span className="data-label">LIQ</span>
            <span className="text-xs text-card-foreground">${(coin.liquidity / 1000).toFixed(0)}K</span>
          </div>

          {/* Volume */}
          <div className="flex items-center justify-between">
            <span className="data-label">VOL 24H</span>
            <span className="text-xs text-card-foreground">${(coin.volume24h / 1000).toFixed(0)}K</span>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between">
              <span className="data-label">RISK INDEX</span>
              <span className="text-[10px] text-primary">{riskScore.overall}/100</span>
            </div>
            <div
              className="lab-meter"
              style={{ "--meter-value": `${Math.min(riskScore.overall, 100)}%` } as React.CSSProperties}
            />
          </div>

          {riskScore.redFlags.length > 0 && (
            <div className="space-y-1.5 rounded border border-destructive/30 bg-destructive/10 p-2 mt-3">
              <div className="flex items-center gap-1 text-[10px] text-destructive font-mono tracking-wider">
                <AlertTriangle size={10} />
                WARNINGS DETECTED
              </div>
              {riskScore.redFlags.slice(0, 2).map((flag, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-destructive" />
                  <p className="text-[10px] text-destructive/80">{flag}</p>
                </div>
              ))}
              {riskScore.redFlags.length > 2 && (
                <p className="text-[10px] text-destructive/60">+{riskScore.redFlags.length - 2} more</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
