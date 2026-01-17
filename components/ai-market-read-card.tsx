"use client"

import { Badge } from "@/components/ui/badge"
import {
  Brain,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"
import type { AIMarketRead } from "@/lib/market-snapshot"

interface AIMarketReadCardProps {
  data: AIMarketRead | null
  isLoading: boolean
}

export function AIMarketReadCard({ data, isLoading }: AIMarketReadCardProps) {
  const [expanded, setExpanded] = useState(false)

  if (isLoading) {
    return (
      <div className="lab-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">AI Market Read</span>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-muted shimmer rounded w-3/4" />
          <div className="h-4 bg-muted shimmer rounded w-full" />
          <div className="h-4 bg-muted shimmer rounded w-5/6" />
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="lab-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">AI Market Read</span>
        </div>
        <p className="text-xs text-muted-foreground">Insufficient data for analysis</p>
      </div>
    )
  }

  const sentimentConfig = {
    BEARISH: { color: "text-destructive", bg: "bg-destructive/10", icon: TrendingDown },
    NEUTRAL: { color: "text-muted-foreground", bg: "bg-muted", icon: Minus },
    BULLISH: { color: "text-accent", bg: "bg-accent/10", icon: TrendingUp },
    EUPHORIC: { color: "text-primary", bg: "bg-primary/10", icon: TrendingUp },
  }

  const config = sentimentConfig[data.overallSentiment]
  const SentimentIcon = config.icon

  return (
    <div className="lab-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">AI Market Read</span>
        </div>
        <Badge className={`${config.bg} ${config.color} border-0 gap-1`}>
          <SentimentIcon className="h-3 w-3" />
          {data.overallSentiment}
        </Badge>
      </div>

      {/* Confidence */}
      <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-muted/50">
        <span className="text-xs text-muted-foreground">Confidence</span>
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${data.confidenceScore}%` }}
            />
          </div>
          <span className="text-sm font-semibold tabular-nums">{data.confidenceScore}%</span>
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-foreground/90 leading-relaxed mb-4">{data.summary}</p>

      {/* Recommendation */}
      <div className="p-3 rounded-lg bg-accent/5 border border-accent/20 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-accent mb-1">
          <CheckCircle className="h-3 w-3" />
          <span className="font-medium">Recommendation</span>
        </div>
        <p className="text-xs text-foreground/80">{data.recommendation}</p>
      </div>

      {/* Warnings */}
      {data.warnings.length > 0 && (
        <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-destructive mb-2">
            <AlertTriangle className="h-3 w-3" />
            <span className="font-medium">Warnings</span>
          </div>
          <ul className="space-y-1">
            {data.warnings.map((warning, i) => (
              <li key={i} className="text-xs text-foreground/70 flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Expand/Collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-2 p-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
      >
        <span>{expanded ? "Hide Details" : "View Details"}</span>
        {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-border space-y-3">
          {data.keyFactors.map((factor, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-foreground/80">{factor.factor}</span>
              <Badge
                variant="outline"
                className={`text-[10px] ${
                  factor.impact === "POSITIVE"
                    ? "text-accent border-accent/30"
                    : factor.impact === "NEGATIVE"
                      ? "text-destructive border-destructive/30"
                      : "text-muted-foreground"
                }`}
              >
                {factor.impact}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
