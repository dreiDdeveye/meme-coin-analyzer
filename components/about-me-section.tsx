"use client"

import { User, TrendingUp, Info } from "lucide-react"
import type { TrenchesData } from "@/lib/trenches-analyzer"
import type { ExplainableAIData } from "@/lib/explainable-ai-enhanced"

interface AboutMeSectionProps {
  trenchesData?: TrenchesData
  aiData?: ExplainableAIData
  description?: string
}

export function AboutMeSection({ trenchesData, aiData, description }: AboutMeSectionProps) {
  const defaultDescription =
    "This section provides background information about the token including market position, holder distribution, and key characteristics derived from on-chain analysis."

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="rounded-lg border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-amber-500/5 backdrop-blur-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <User className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">ABOUT ME</h2>
            <p className="text-sm text-muted-foreground mt-1">Token identity and background</p>
          </div>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed">{description || defaultDescription}</p>
      </div>

      {/* Trenches Analysis */}
      {trenchesData && (
        <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Market Position</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Holder Distribution */}
            <div className="rounded-lg bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Distribution</p>
              <p className="text-2xl font-bold text-foreground">{trenchesData.trench || "Analyzing..."}</p>
            </div>

            {/* Risk Level */}
            <div className="rounded-lg bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Risk Assessment</p>
              <p className="text-2xl font-bold text-foreground">{trenchesData.risk || "Low"}</p>
            </div>

            {/* Market Cap */}
            {trenchesData.marketCap && (
              <div className="rounded-lg bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Market Cap</p>
                <p className="text-2xl font-bold text-foreground">{trenchesData.marketCap}</p>
              </div>
            )}
          </div>

          {trenchesData.explanation && (
            <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-foreground/80 leading-relaxed">{trenchesData.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* AI Analysis */}
      {aiData && (
        <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Key Characteristics</h3>
          </div>

          <div className="space-y-4">
            {aiData.strengths && aiData.strengths.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-green-400 mb-2">Strengths</p>
                <ul className="space-y-2">
                  {aiData.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-foreground flex gap-2">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {aiData.weaknesses && aiData.weaknesses.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-red-400 mb-2">Weaknesses</p>
                <ul className="space-y-2">
                  {aiData.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-sm text-foreground flex gap-2">
                      <span className="text-red-400 mt-0.5">⚠</span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
