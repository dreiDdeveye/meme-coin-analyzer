"use client"

import { BookOpen } from "lucide-react"

interface NarrativeSectionProps {
  narrative?: string
  context?: string
}

export function NarrativeSection({ narrative, context }: NarrativeSectionProps) {
  // Default narrative if none provided
  const displayNarrative = narrative || "This token's narrative is being analyzed..."
  const displayContext = context || "Gathering market context and storytelling elements from on-chain data."

  return (
    <div className="rounded-lg border border-primary/30 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">NARRATIVE</h2>
          <p className="text-sm text-muted-foreground mt-1">Token story and market context</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="prose prose-invert max-w-none">
          <p className="text-base text-foreground leading-relaxed border-l-4 border-primary/50 pl-6 py-2 italic">
            {displayNarrative}
          </p>
        </div>

        {context && (
          <div className="rounded-lg bg-muted/20 p-4 border-l-2 border-primary/30">
            <p className="text-sm text-muted-foreground leading-relaxed">{displayContext}</p>
          </div>
        )}
      </div>
    </div>
  )
}
