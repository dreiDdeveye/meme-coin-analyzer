"use client"

import { Sparkles } from "lucide-react"
import Image from "next/image"

// Mock trench meta data
const MOCK_TRENCH_META = {
  title: "Degen Season: Animal Memes Dominate",
  description: "Dog and cat themed tokens are leading the trenches with massive community engagement and viral social metrics. Watch for high-conviction plays with strong holder distribution.",
  emoji: "🐕",
  imageUrl: null
}

export function TrenchMetaCard() {
  const customMeta = MOCK_TRENCH_META
  const isLoading = false

  if (isLoading) {
    return (
      <div className="lab-card p-6">
        <div className="flex gap-6">
          <div className="h-24 w-24 rounded-xl bg-muted shimmer shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-32 bg-muted shimmer rounded" />
            <div className="h-4 w-full bg-muted shimmer rounded" />
            <div className="h-4 w-4/5 bg-muted shimmer rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!customMeta) {
    return (
      <div className="lab-card p-6 border-dashed">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Sparkles className="h-5 w-5" />
          <span className="font-medium">Trench Meta</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          No trench meta configured. Please configure via admin panel.
        </p>
      </div>
    )
  }

  return (
    <div className="lab-card overflow-hidden">
      <div className="p-6 bg-card/50">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-primary uppercase tracking-wider">Trench Meta</span>
        </div>

        <div className="flex gap-5 items-start">
          <div className="shrink-0">
            <div className="h-20 w-20 rounded-lg bg-muted border border-border/60 overflow-hidden flex items-center justify-center">
              {customMeta.imageUrl ? (
                <Image
                  src={customMeta.imageUrl || "/placeholder.svg"}
                  alt={customMeta.title}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-4xl">{customMeta.emoji}</span>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold tracking-tight mb-1.5">{customMeta.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{customMeta.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
