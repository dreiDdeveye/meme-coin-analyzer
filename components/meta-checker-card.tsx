"use client"

import type { MetaCheckResult } from "@/lib/meta-checker"
import { Badge } from "@/components/ui/badge"

interface MetaCheckerCardProps {
  data?: MetaCheckResult
}

const metaLabels: Record<string, string> = {
  animal_meme: "Animal / Classic Meme",
  ai_agent: "AI Agent",
  gaming_metaverse: "Gaming / Metaverse",
  defi_utility: "DeFi Utility",
  anime_culture: "Anime Culture",
  celebrity_trend: "Celebrity Trend",
  community_dao: "Community DAO",
  unknown: "Unknown / Unique",
}

const confidenceColors: Record<string, string> = {
  low: "bg-yellow-900/30 text-yellow-300 border-yellow-700/30",
  medium: "bg-blue-900/30 text-blue-300 border-blue-700/30",
  high: "bg-green-900/30 text-green-300 border-green-700/30",
}

const metaEmojis: Record<string, string> = {
  animal_meme: "🐕",
  ai_agent: "🤖",
  gaming_metaverse: "🎮",
  defi_utility: "💰",
  anime_culture: "🎌",
  celebrity_trend: "⭐",
  community_dao: "🏛️",
  unknown: "❓",
}

export function MetaCheckerCard({ data }: MetaCheckerCardProps) {
  if (!data) {
    return (
      <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg">🏷️</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Meta Checker</h3>
            <p className="text-xs text-muted-foreground mt-1">Coin type classification</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          No meta data detected. Unable to classify this token's narrative.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-lg">{metaEmojis[data.primary_meta] || "🏷️"}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Meta Checker</h3>
          <p className="text-xs text-muted-foreground mt-1">Coin type classification</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Primary Meta */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Primary Meta</span>
            <Badge variant="outline" className={`capitalize border ${confidenceColors[data.confidence]}`}>
              {data.confidence} confidence
            </Badge>
          </div>
          <p className="text-base font-semibold text-foreground">
            {metaLabels[data.primary_meta] || data.primary_meta}
          </p>
        </div>

        {/* Secondary Meta */}
        {data.secondary_meta && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Secondary Meta</p>
            <p className="text-sm text-foreground">
              {metaEmojis[data.secondary_meta]} {metaLabels[data.secondary_meta] || data.secondary_meta}
            </p>
          </div>
        )}

        {/* Explanation */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Classification</p>
          <p className="text-sm text-foreground leading-relaxed">{data.explanation}</p>
        </div>
      </div>
    </div>
  )
}