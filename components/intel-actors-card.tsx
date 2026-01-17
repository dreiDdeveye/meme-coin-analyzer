"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, AlertTriangle, CheckCircle, EyeIcon, Activity, AlertCircleIcon } from "lucide-react"
import { fetchKeyActors, formatTimeAgo, type KeyActor } from "@/lib/market-intelligence"

export function IntelActorsCard() {
  const [actors, setActors] = useState<KeyActor[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedActor, setExpandedActor] = useState<string | null>(null)

  useEffect(() => {
    fetchKeyActors().then((data) => {
      setActors(data)
      setLoading(false)
    })
  }, [])

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "LOW":
        return "bg-green-100 text-green-700 border-green-300"
      case "MEDIUM":
        return "bg-amber-100 text-amber-700 border-amber-300"
      case "HIGH":
        return "bg-red-100 text-red-700 border-red-300"
      default:
        return "bg-gray-100 text-gray-600 border-gray-300"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "LOW":
        return <CheckCircle className="h-3 w-3" />
      case "MEDIUM":
        return <AlertCircleIcon className="h-3 w-3" />
      case "HIGH":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <EyeIcon className="h-3 w-3" />
    }
  }

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case "active":
        return "text-green-600 bg-green-50 border-green-300"
      case "migrated":
        return "text-teal-600 bg-teal-50 border-teal-300"
      case "rugged":
        return "text-red-600 bg-red-50 border-red-300"
      default:
        return "text-gray-600 bg-gray-50 border-gray-300"
    }
  }

  if (loading) {
    return (
      <Card className="lab-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-mono tracking-wider flex items-center gap-2 text-foreground">
            <Users className="h-4 w-4 text-primary animate-pulse" />
            KEY ACTORS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-muted/30 animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="lab-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-mono tracking-wider flex items-center gap-2 text-foreground">
          <Users className="h-4 w-4 text-primary" />
          KEY ACTORS
          <Badge
            variant="outline"
            className="ml-auto text-[10px] font-mono bg-primary/10 text-primary border-primary/30"
          >
            {actors.length} TRACKED
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-[10px] text-muted-foreground font-mono mb-3 border-l-2 border-primary pl-2">
          Informational tracking only. Activity patterns do not imply wrongdoing.
        </p>

        {actors.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-xs font-mono">
            No key actors currently tracked
          </div>
        ) : (
          actors.map((actor) => (
            <div
              key={actor.id}
              className="p-3 rounded border border-primary/20 bg-card/50 hover:bg-card/80 transition-colors cursor-pointer"
              onClick={() => setExpandedActor(expandedActor === actor.id ? null : actor.id)}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="font-bold text-foreground text-sm">{actor.alias}</span>
                  <span className="text-[10px] text-muted-foreground font-mono ml-2">{actor.walletHash}</span>
                </div>
                <Badge variant="outline" className={`text-[9px] ${getRiskColor(actor.riskPattern)}`}>
                  {getRiskIcon(actor.riskPattern)}
                  <span className="ml-1">{actor.riskPattern} RISK</span>
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono mb-2">
                <div>
                  <span className="text-muted-foreground block">LAUNCHES</span>
                  <span className="text-foreground">{actor.totalLaunches}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">SUCCESS RATE</span>
                  <span className={actor.successRate >= 50 ? "text-accent" : "text-destructive"}>
                    {actor.successRate}%
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block">TOKENS</span>
                  <span className="text-foreground">{actor.associatedTokens.length}</span>
                </div>
              </div>

              {expandedActor === actor.id && (
                <div className="mt-3 pt-3 border-t border-primary/20 space-y-3">
                  <div>
                    <span className="text-[10px] text-muted-foreground font-mono block mb-1">ASSOCIATED TOKENS</span>
                    <div className="flex flex-wrap gap-1">
                      {actor.associatedTokens.map((token, i) => (
                        <a
                          key={i}
                          href={token.dexScreenerUrl || `https://dexscreener.com/solana/${token.contractAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Badge
                            variant="outline"
                            className={`text-[9px] ${getOutcomeColor(token.outcome)} hover:opacity-80 transition-opacity cursor-pointer`}
                          >
                            {token.symbol}
                            <span className="ml-1 opacity-60">({token.outcome})</span>
                          </Badge>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-muted-foreground font-mono block mb-1">RECENT ACTIONS</span>
                    <div className="space-y-1">
                      {actor.recentActions.slice(0, 3).map((action, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px]">
                          <Activity className="h-3 w-3 text-primary" />
                          <span className="text-foreground">{action.description}</span>
                          <span className="text-muted-foreground ml-auto">{formatTimeAgo(action.timestamp)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
