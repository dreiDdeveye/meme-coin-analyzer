"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import type { EnhancedExplainableAI } from "@/lib/explainable-ai-enhanced"
import { DataSourceBadge } from "@/components/data-source-badge"

interface EnhancedExplainableAICardProps {
  data: EnhancedExplainableAI
}

export function EnhancedExplainableAICard({ data }: EnhancedExplainableAICardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getSignalColor = (signal: string) => {
    if (signal === "strong") return "bg-success/20 text-success"
    if (signal === "moderate") return "bg-accent/20 text-accent"
    if (signal === "weak") return "bg-destructive/20 text-destructive/70"
    return "bg-muted/20 text-muted-foreground"
  }

  const dataSource =
    data.dataSources.pumpFun && data.dataSources.dexScreener ? "both" : data.dataSources.pumpFun ? "pump" : "dex"

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50 w-full">
      <CardHeader>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between hover:opacity-80 transition-opacity text-left"
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-lg">🔍</span>
            </div>
            <div className="flex-1">
              <CardTitle>What the Analyzer Looked At</CardTitle>
              <CardDescription>Data sources and signal analysis</CardDescription>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          )}
        </button>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6 border-t border-border pt-6">
          {/* Data Sources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Data Sources Used</h4>
            <div className="flex gap-2 mb-3">
              <DataSourceBadge source={dataSource} />
            </div>
            <p className="text-sm text-foreground/80">{data.dataSources.mergedInsight}</p>
          </div>

          {/* Signal Strength */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Signal Strength Analysis</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-border/50 bg-background/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">Volume Signal</div>
                <Badge className={getSignalColor(data.signalStrength.volumeSignal)}>
                  {data.signalStrength.volumeSignal.toUpperCase()}
                </Badge>
              </div>
              <div className="rounded-lg border border-border/50 bg-background/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">Liquidity Signal</div>
                <Badge className={getSignalColor(data.signalStrength.liquiditySignal)}>
                  {data.signalStrength.liquiditySignal.toUpperCase()}
                </Badge>
              </div>
              <div className="rounded-lg border border-border/50 bg-background/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">Narrative Signal</div>
                <Badge className={getSignalColor(data.signalStrength.narrativeSignal)}>
                  {data.signalStrength.narrativeSignal.toUpperCase()}
                </Badge>
              </div>
              <div className="rounded-lg border border-border/50 bg-background/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">Early Adoption</div>
                <Badge className={getSignalColor(data.signalStrength.earlyAdoptionSignal)}>
                  {data.signalStrength.earlyAdoptionSignal.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>

          {/* Strong Signals */}
          {data.reasoning.whichSignalsStrong.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-success">Strong Signals</h4>
              <ul className="space-y-1">
                {data.reasoning.whichSignalsStrong.map((signal, idx) => (
                  <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                    <span className="text-success mt-1">✓</span>
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Weak Signals */}
          {data.reasoning.whichSignalsWeak.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-destructive">Weak Signals</h4>
              <ul className="space-y-1">
                {data.reasoning.whichSignalsWeak.map((signal, idx) => (
                  <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                    <span className="text-destructive">⚠</span>
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Defensive Notes */}
          <div
            className={`rounded-lg border p-3 text-sm ${data.reasoning.defensiveNotes.includes("low") ? "border-destructive/50 bg-destructive/5 text-destructive" : data.reasoning.defensiveNotes.includes("moderate") ? "border-accent/50 bg-accent/5 text-accent" : "border-success/50 bg-success/5 text-success"}`}
          >
            {data.reasoning.defensiveNotes}
          </div>

          {/* Why Conclusions */}
          <div className="rounded-lg border border-border/30 bg-background/50 p-3">
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">Why These Conclusions</h4>
            <p className="text-sm text-foreground/80">{data.reasoning.whyConclusionsReached}</p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
