"use client"

import type { ExplainableAI } from "@/lib/explainable-ai"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface ExplainableAICardProps {
  data: ExplainableAI
}

export function ExplainableAICard({ data }: ExplainableAICardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-lg">🔍</span>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-foreground">What the Analyzer Looked At</h3>
            <p className="text-xs text-muted-foreground mt-1">Real-time data sources and methodology</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-4 border-t border-border pt-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Methodology</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{data.what_analyzed.methodology}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Data Sources</h4>
            <ul className="space-y-2">
              {data.what_analyzed.data_sources.map((source, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>{source}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Key Metrics Examined</h4>
            <div className="grid grid-cols-1 gap-2">
              {data.what_analyzed.key_metrics_examined.map((metric, idx) => (
                <div key={idx} className="text-sm text-muted-foreground bg-background/50 rounded px-3 py-2">
                  {metric}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
