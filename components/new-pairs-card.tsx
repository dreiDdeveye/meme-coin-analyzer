"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Skull, Rocket } from "lucide-react"
import type { NewPairsFlow } from "@/lib/market-snapshot"

interface NewPairsCardProps {
  data: NewPairsFlow | null
  isLoading: boolean
}

export function NewPairsCard({ data, isLoading }: NewPairsCardProps) {
  if (isLoading) {
    return (
      <Card className="lab-card animate-pulse">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-mono flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            NEW PAIRS FLOW
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
            <Rocket className="h-4 w-4" />
            NEW PAIRS FLOW
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Pairs data unavailable</p>
        </CardContent>
      </Card>
    )
  }

  const velocityColors = {
    SLOW: "bg-muted text-muted-foreground",
    NORMAL: "bg-primary/20 text-primary",
    FAST: "bg-accent/20 text-accent",
    HYPERDRIVE: "bg-destructive/20 text-destructive animate-pulse",
  }

  return (
    <Card className="lab-card border-accent/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-mono flex items-center gap-2">
            <Rocket className="h-4 w-4 text-accent" />
            NEW PAIRS FLOW
          </CardTitle>
          <Badge className={`text-[10px] font-mono ${velocityColors[data.launchVelocity]}`}>
            <Zap className="h-3 w-3 mr-1" />
            {data.launchVelocity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Launch Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded bg-muted/30 border border-border/50">
            <p className="text-[10px] text-muted-foreground font-mono mb-1">LAST 1H</p>
            <p className="text-2xl font-bold font-mono text-primary">{data.pairs1h}</p>
            <p className="text-[10px] text-muted-foreground font-mono">new pairs</p>
          </div>
          <div className="text-center p-3 rounded bg-muted/30 border border-border/50">
            <p className="text-[10px] text-muted-foreground font-mono mb-1">LAST 24H</p>
            <p className="text-2xl font-bold font-mono text-foreground">{data.pairs24h}</p>
            <p className="text-[10px] text-muted-foreground font-mono">new pairs</p>
          </div>
        </div>

        {/* Survival Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
              <Skull className="h-3 w-3" />
              SURVIVAL RATE
            </span>
            <span
              className={`text-sm font-bold font-mono ${
                data.survivalRate < 20 ? "text-destructive" : data.survivalRate < 40 ? "text-yellow-500" : "text-accent"
              }`}
            >
              {data.survivalRate.toFixed(1)}%
            </span>
          </div>
          <Progress value={data.survivalRate} className="h-2" />
          <p className="text-[10px] text-muted-foreground font-mono">{data.deadTokens24h} tokens died in 24h</p>
        </div>

        {/* Top Platforms */}
        <div className="space-y-2">
          <p className="text-[10px] font-mono text-muted-foreground">TOP PLATFORMS</p>
          <div className="flex flex-wrap gap-2">
            {data.topPlatforms.map((platform) => (
              <Badge key={platform.name} variant="outline" className="text-[10px] font-mono">
                {platform.name}: {platform.count}
              </Badge>
            ))}
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
