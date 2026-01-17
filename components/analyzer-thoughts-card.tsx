"use client"

import type { AnalyzerThoughts } from "@/lib/analyzer-thoughts"
import { Brain, AlertCircle, Zap } from "lucide-react"

interface AnalyzerThoughtsCardProps {
  thoughts?: AnalyzerThoughts
}

export function AnalyzerThoughtsCard({ thoughts }: AnalyzerThoughtsCardProps) {
  if (!thoughts || !thoughts.summary) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Oracle Thoughts</h3>
        </div>
        <p className="text-sm text-muted-foreground">Loading analysis...</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold text-foreground">Oracle Thoughts</h3>
      </div>

      <div className="space-y-4">
        {/* Summary */}
        <div>
          <p className="text-sm leading-relaxed text-foreground italic border-l-2 border-primary pl-4">
            "{thoughts.summary}"
          </p>
        </div>

        {/* Trading Context */}
        <div className="rounded-lg bg-muted/30 p-4 space-y-2">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Market Context</p>
          <p className="text-sm text-foreground leading-relaxed">{thoughts.tradingContext}</p>
        </div>

        {/* Risk Factors */}
        {thoughts.riskFactors && thoughts.riskFactors.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Risk Factors
            </p>
            <ul className="space-y-2">
              {thoughts.riskFactors.map((factor, idx) => (
                <li key={idx} className="text-sm text-foreground flex gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Opportunities */}
        {thoughts.opportunities && thoughts.opportunities.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide flex items-center gap-2">
              <Zap className="h-4 w-4" /> Opportunities
            </p>
            <ul className="space-y-2">
              {thoughts.opportunities.map((opp, idx) => (
                <li key={idx} className="text-sm text-foreground flex gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>{opp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-4">
        <p className="text-xs text-amber-200 leading-relaxed">
          <span className="font-semibold">Disclaimer:</span> All analysis is derived from real-time on-chain data and
          heuristics. This is not financial advice. Always conduct your own research and manage risk accordingly.
        </p>
      </div>
    </div>
  )
}
