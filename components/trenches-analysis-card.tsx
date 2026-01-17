"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, Zap } from "lucide-react"
import type { TrenchesAnalysis } from "@/lib/trenches-analyzer"

interface TrenchesAnalysisCardProps {
  data: TrenchesAnalysis
}

export function TrenchesAnalysisCard({ data }: TrenchesAnalysisCardProps) {
  const getStatusColor = (status: string) => {
    if (status === "EARLY_TRENCHES") return "bg-orange-500/20 text-orange-300"
    if (status === "DEGEN_ZONE") return "bg-red-500/20 text-red-300"
    if (status === "MID_CAP_STABLE") return "bg-green-500/20 text-green-300"
    if (status === "HIGH_RUG_RISK") return "bg-destructive/20 text-destructive"
    return "bg-muted/20 text-muted-foreground"
  }

  const getConfidenceColor = (level: string) => {
    if (level === "HIGH") return "bg-success/20 text-success"
    if (level === "MEDIUM") return "bg-accent/20 text-accent"
    return "bg-destructive/20 text-destructive"
  }

  const getIndicatorValue = (value: number, isPercentage = false) => {
    if (isPercentage) {
      return `${value.toFixed(1)}%`
    }
    if (value > 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`
    }
    if (value > 1000) {
      return `$${(value / 1000).toFixed(2)}K`
    }
    return `$${value.toFixed(2)}`
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50 w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Trenches Classification</CardTitle>
            </div>
            <CardDescription>Token lifecycle and risk positioning</CardDescription>
          </div>
          <Badge className={getStatusColor(data.status)}>{data.status.replace(/_/g, " ")}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Warning Banners */}
        {data.warningBanners.length > 0 && (
          <div className="space-y-2">
            {data.warningBanners.map((banner, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 flex items-start gap-2"
              >
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{banner}</p>
              </div>
            ))}
          </div>
        )}

        {/* Main Verdict */}
        <div className="rounded-lg border border-border/50 bg-background/50 p-4">
          <p className="text-sm text-foreground/80">{data.verdict}</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border/50 bg-background/50 p-3">
            <p className="text-xs text-muted-foreground">Pair Age</p>
            <p className="text-lg font-bold text-primary mt-1">{data.pairAgeDisplay}</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-background/50 p-3">
            <p className="text-xs text-muted-foreground">Liquidity</p>
            <p className="text-lg font-bold text-primary mt-1">{getIndicatorValue(data.liquidity)}</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-background/50 p-3">
            <p className="text-xs text-muted-foreground">24h Volume</p>
            <p className="text-lg font-bold text-primary mt-1">{getIndicatorValue(data.volume24h)}</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-background/50 p-3">
            <p className="text-xs text-muted-foreground">Buy Pressure</p>
            <p className="text-lg font-bold text-primary mt-1">{data.buyPressureRatio.toFixed(1)}%</p>
          </div>
        </div>

        {/* Detailed Indicators */}
        <div className="space-y-3 border-t border-border/30 pt-4">
          <h4 className="text-sm font-semibold text-foreground">Detailed Indicators</h4>

          <div className="grid gap-2">
            <div className="flex items-center justify-between rounded-lg border border-border/30 bg-background/50 px-3 py-2">
              <span className="text-xs text-muted-foreground">Pair Age</span>
              <span className="text-sm font-semibold text-foreground">{data.indicators.pairAge}</span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border/30 bg-background/50 px-3 py-2">
              <span className="text-xs text-muted-foreground">Liquidity Depth</span>
              <span className="text-sm font-semibold text-foreground">{data.indicators.liquidityDepth}</span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border/30 bg-background/50 px-3 py-2">
              <span className="text-xs text-muted-foreground">Volume/Liquidity Ratio</span>
              <span className="text-sm font-semibold text-foreground">
                {data.indicators.volumeToLiquidityRatio.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border/30 bg-background/50 px-3 py-2">
              <span className="text-xs text-muted-foreground">Buy Pressure</span>
              <span className="text-sm font-semibold text-foreground">{data.indicators.buyPressure.toFixed(1)}%</span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border/30 bg-background/50 px-3 py-2">
              <span className="text-xs text-muted-foreground">Rug Risk Level</span>
              <span className="text-sm font-semibold text-foreground">{data.indicators.rugRiskLevel}</span>
            </div>
          </div>
        </div>

        {/* Confidence Level */}
        <div className="flex items-center gap-2 rounded-lg border border-border/30 bg-background/50 p-3">
          <Zap className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Confidence:</span>
          <Badge className={getConfidenceColor(data.confidenceLevel)}>{data.confidenceLevel}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
