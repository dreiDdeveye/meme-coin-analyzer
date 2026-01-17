"use client"

import type { NarrativeAnalysis } from "@/lib/narrative-analyzer"
import { getNarrativeCategoryLabel } from "@/lib/narrative-analyzer"
import { BookOpen } from "lucide-react"

interface NarrativeAnalysisCardProps {
  narrative?: NarrativeAnalysis | null
}

export function NarrativeAnalysisCard({ narrative }: NarrativeAnalysisCardProps) {
  if (!narrative) {
    return null
  }

  const confidenceColors = {
    LOW: "bg-red-500/20 text-red-400 border-red-500/30",
    MEDIUM: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    HIGH: "bg-green-500/20 text-green-400 border-green-500/30",
  }

  const categoryColors: Record<string, string> = {
    ANIMAL_MEME: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    AI_TECH: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    PARODY_SATIRE: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    POP_CULTURE: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    CHAIN_META: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    EXPERIMENTAL: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Narrative Analysis</h3>
        </div>
        <div
          className={`px-3 py-1 rounded-full border text-xs font-semibold ${confidenceColors[narrative.confidence]}`}
        >
          {narrative.confidence} Confidence
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Primary Narrative</p>
          <div
            className={`inline-flex items-center px-3 py-2 rounded-full border text-sm font-semibold ${categoryColors[narrative.primary]}`}
          >
            {getNarrativeCategoryLabel(narrative.primary)}
          </div>
        </div>

        {narrative.secondary && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Secondary Narrative</p>
            <div
              className={`inline-flex items-center px-3 py-2 rounded-full border text-sm font-semibold ${categoryColors[narrative.secondary]}`}
            >
              {getNarrativeCategoryLabel(narrative.secondary)}
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{narrative.explanation}</p>

      {narrative.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {narrative.tags.map((tag, idx) => (
            <span key={idx} className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground">
              #{tag.replace(" / ", "-").replace(" ", "-").toLowerCase()}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
