"use client"

import type { PVPCheckResult } from "@/lib/pvp-checker"
import { AlertCircle, Lightbulb } from "lucide-react"

interface PVPCheckerCardProps {
  data: PVPCheckResult
}

const pvpStatusColors: Record<string, string> = {
  low_competition: "bg-green-900/30 border-green-700/30 text-green-300",
  moderate_competition: "bg-blue-900/30 border-blue-700/30 text-blue-300",
  highly_saturated: "bg-red-900/30 border-red-700/30 text-red-300",
}

const pvpStatusLabels: Record<string, string> = {
  low_competition: "Low Competition",
  moderate_competition: "Moderate Competition",
  highly_saturated: "Highly Saturated",
}

export function PVPCheckerCard({ data }: PVPCheckerCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-lg">⚔️</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">PVP Check</h3>
          <p className="text-xs text-muted-foreground mt-1">Market saturation and competition analysis</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">PVP Status</p>
          <div className={`inline-block px-4 py-2 rounded-lg border ${pvpStatusColors[data.status]}`}>
            <p className="font-semibold text-sm">{pvpStatusLabels[data.status]}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Market Analysis</p>
          <p className="text-sm text-foreground leading-relaxed">{data.explanation}</p>
        </div>

        {data.risk_factors.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-orange-400" />
              <p className="text-sm font-semibold text-orange-300">Risk Factors</p>
            </div>
            <ul className="space-y-1">
              {data.risk_factors.map((factor, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.opportunity_factors.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-green-400" />
              <p className="text-sm font-semibold text-green-300">Opportunity Factors</p>
            </div>
            <ul className="space-y-1">
              {data.opportunity_factors.map((factor, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
