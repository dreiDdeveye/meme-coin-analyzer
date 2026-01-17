"use client"

import { Badge } from "@/components/ui/badge"
import { Flame, BarChart3 } from "lucide-react"

interface DataSourceBadgeProps {
  source: "pump" | "dex" | "both"
  className?: string
}

export function DataSourceBadge({ source, className }: DataSourceBadgeProps) {
  if (source === "pump") {
    return (
      <Badge variant="outline" className={`gap-1 ${className}`}>
        <Flame className="h-3 w-3 text-orange-500" />
        Pump.fun
      </Badge>
    )
  }

  if (source === "dex") {
    return (
      <Badge variant="outline" className={`gap-1 ${className}`}>
        <BarChart3 className="h-3 w-3 text-blue-400" />
        DEX Screener
      </Badge>
    )
  }

  return (
    <div className={`flex gap-1 ${className}`}>
      <Badge variant="outline" className="gap-1">
        <Flame className="h-3 w-3 text-orange-500" />
        Pump.fun
      </Badge>
      <Badge variant="outline" className="gap-1">
        <BarChart3 className="h-3 w-3 text-blue-400" />
        DEX
      </Badge>
    </div>
  )
}
