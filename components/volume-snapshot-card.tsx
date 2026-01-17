"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Minus } from "lucide-react"
import type { VolumeSnapshot } from "@/lib/market-snapshot"

interface VolumeSnapshotCardProps {
  data: VolumeSnapshot | null
  isLoading: boolean
}

export function VolumeSnapshotCard({ data, isLoading }: VolumeSnapshotCardProps) {
  if (isLoading) {
    return (
      <Card className="lab-card animate-pulse">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-mono flex items-center gap-2">
            <Activity className="h-4 w-4" />
            VOLUME SNAPSHOT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-24 bg-muted/50 rounded" />
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card className="lab-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-mono flex items-center gap-2">
            <Activity className="h-4 w-4" />
            VOLUME SNAPSHOT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Volume data unavailable</p>
        </CardContent>
      </Card>
    )
  }

  const formatVolume = (vol: number) => {
    if (vol >= 1e9) return `$${(vol / 1e9).toFixed(1)}B`
    if (vol >= 1e6) return `$${(vol / 1e6).toFixed(1)}M`
    if (vol >= 1e3) return `$${(vol / 1e3).toFixed(1)}K`
    return `$${vol.toFixed(0)}`
  }

  const intensityColors = {
    LOW: "bg-muted text-muted-foreground",
    MODERATE: "bg-primary/20 text-primary",
    HIGH: "bg-accent/20 text-accent",
    EXTREME: "bg-destructive/20 text-destructive",
  }

  const ChangeIndicator = ({ value }: { value: number }) => {
    if (value > 0)
      return (
        <span className="flex items-center gap-0.5 text-accent">
          <TrendingUp className="h-3 w-3" />+{value.toFixed(1)}%
        </span>
      )
    if (value < 0)
      return (
        <span className="flex items-center gap-0.5 text-destructive">
          <TrendingDown className="h-3 w-3" />
          {value.toFixed(1)}%
        </span>
      )
    return (
      <span className="flex items-center gap-0.5 text-muted-foreground">
        <Minus className="h-3 w-3" />
        0%
      </span>
    )
  }

  return (
    <Card className="lab-card border-primary/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-mono flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            VOLUME SNAPSHOT
          </CardTitle>
          <Badge className={`text-[10px] font-mono ${intensityColors[data.intensity]}`}>{data.intensity}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Volume Bars */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground font-mono mb-1">1H VOL</p>
            <p className="text-lg font-bold font-mono text-foreground">{formatVolume(data.volume1h)}</p>
            <div className="text-[10px] font-mono">
              <ChangeIndicator value={data.change1h} />
            </div>
          </div>
          <div className="text-center border-x border-border/50">
            <p className="text-[10px] text-muted-foreground font-mono mb-1">6H VOL</p>
            <p className="text-lg font-bold font-mono text-foreground">{formatVolume(data.volume6h)}</p>
            <div className="text-[10px] font-mono">
              <ChangeIndicator value={data.change6h} />
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground font-mono mb-1">24H VOL</p>
            <p className="text-lg font-bold font-mono text-primary">{formatVolume(data.volume24h)}</p>
            <div className="text-[10px] font-mono">
              <ChangeIndicator value={data.change24h} />
            </div>
          </div>
        </div>

        {/* Intensity Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>LOW</span>
            <span>MODERATE</span>
            <span>HIGH</span>
            <span>EXTREME</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                data.intensity === "EXTREME"
                  ? "w-full bg-destructive"
                  : data.intensity === "HIGH"
                    ? "w-3/4 bg-accent"
                    : data.intensity === "MODERATE"
                      ? "w-1/2 bg-primary"
                      : "w-1/4 bg-muted-foreground"
              }`}
            />
          </div>
        </div>

        {/* AI Insight */}
        <div className="rounded border border-border/50 bg-muted/30 p-2">
          <p className="text-[10px] font-mono text-muted-foreground mb-1">AI INSIGHT</p>
          <p className="text-xs text-foreground/90">{data.aiInsight}</p>
        </div>
      </CardContent>
    </Card>
  )
}
