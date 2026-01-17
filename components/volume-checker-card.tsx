"use client"

import type { VolumeCheckResult } from "@/lib/volume-checker"
import { TrendingUp, TrendingDown } from "lucide-react"

interface VolumeCheckerCardProps {
  data: VolumeCheckResult
}

const interestLevelColors: Record<string, string> = {
  low: "bg-yellow-900/30 text-yellow-300 border-yellow-700/30",
  moderate: "bg-blue-900/30 text-blue-300 border-blue-700/30",
  high: "bg-green-900/30 text-green-300 border-green-700/30",
  spiking: "bg-green-900/50 text-green-200 border-green-700/50",
}

export function VolumeCheckerCard({ data }: VolumeCheckerCardProps) {
  const isTrendingUp = data.metrics.trend === "increasing"

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-lg">📊</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Volume Check</h3>
          <p className="text-xs text-muted-foreground mt-1">Interest indicator and trend analysis</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Interest Level</p>
          <div
            className={`inline-block px-4 py-2 rounded-lg border capitalize font-semibold ${
              interestLevelColors[data.interest_level]
            }`}
          >
            <div className="flex items-center gap-2">
              {isTrendingUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {data.interest_level}
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Analysis</p>
          <p className="text-sm text-foreground leading-relaxed">{data.explanation}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 p-3 bg-background/50 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground">24h Volume</p>
            <p className="text-sm font-semibold text-foreground">${(data.metrics.volume_24h / 1000000).toFixed(2)}M</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Vol/Liquidity</p>
            <p className="text-sm font-semibold text-foreground">{data.metrics.ratio.toFixed(2)}x</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Liquidity</p>
            <p className="text-sm font-semibold text-foreground">${(data.metrics.liquidity / 1000000).toFixed(2)}M</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Trend</p>
            <p className="text-sm font-semibold text-foreground capitalize">{data.metrics.trend}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
