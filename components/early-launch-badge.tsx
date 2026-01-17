"use client"

import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"

interface EarlyLaunchBadgeProps {
  discoveryStage: "early" | "established" | "mature"
  className?: string
}

export function EarlyLaunchBadge({ discoveryStage, className }: EarlyLaunchBadgeProps) {
  if (discoveryStage === "early") {
    return (
      <Badge className={`gap-1 bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 ${className}`}>
        <Zap className="h-3 w-3" />
        Early Launch
      </Badge>
    )
  }

  if (discoveryStage === "established") {
    return (
      <Badge variant="secondary" className={className}>
        Established
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className={className}>
      Mature
    </Badge>
  )
}
