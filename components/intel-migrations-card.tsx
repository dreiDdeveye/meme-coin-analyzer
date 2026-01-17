"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, AlertTriangle, HelpCircle, Activity, ExternalLink } from "lucide-react"
import { fetchTokenMigrations, formatTimeAgo, type TokenMigration } from "@/lib/market-intelligence"

export function IntelMigrationsCard() {
  const [migrations, setMigrations] = useState<TokenMigration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTokenMigrations().then((data) => {
      setMigrations(data)
      setLoading(false)
    })
  }, [])

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "SAFE":
        return <CheckCircle className="h-3.5 w-3.5 text-green-600" />
      case "CAUTION":
        return <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
      default:
        return <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "SAFE":
        return "bg-green-100 text-green-700 border-green-300"
      case "CAUTION":
        return "bg-amber-100 text-amber-700 border-amber-300"
      default:
        return "bg-gray-100 text-gray-600 border-gray-300"
    }
  }

  const getDexScreenerUrl = (migration: TokenMigration) => {
    return migration.dexScreenerUrl || `https://dexscreener.com/solana/${migration.contractAddress}`
  }

  if (loading) {
    return (
      <Card className="lab-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-mono tracking-wider flex items-center gap-2 text-foreground">
            <Activity className="h-4 w-4 text-primary animate-pulse" />
            TOKEN MIGRATIONS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted/30 animate-pulse rounded" />
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
          <Activity className="h-4 w-4 text-primary" />
          TOKEN MIGRATIONS
          <Badge
            variant="outline"
            className="ml-auto text-[10px] font-mono bg-primary/10 text-primary border-primary/30"
          >
            {migrations.length} DETECTED
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {migrations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-xs font-mono">No recent migrations detected</div>
        ) : (
          migrations.map((migration) => (
            <div
              key={migration.id}
              className="p-3 rounded border border-primary/20 bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <a
                    href={getDexScreenerUrl(migration)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {migration.tokenSymbol}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <Badge
                    variant="outline"
                    className="text-[9px] font-mono bg-primary/10 text-primary border-primary/30"
                  >
                    {migration.sourceplatform.toUpperCase()}
                    <ArrowRight className="h-2.5 w-2.5 mx-1" />
                    {migration.destinationPlatform.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5">
                  {getRiskIcon(migration.riskLevel)}
                  <Badge variant="outline" className={`text-[9px] ${getRiskColor(migration.riskLevel)}`}>
                    {migration.riskLevel}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono mb-2">
                <div>
                  <span className="text-muted-foreground block">LIQUIDITY BEFORE</span>
                  <span className="text-foreground">${migration.liquidityBefore.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">LIQUIDITY AFTER</span>
                  <span className="text-foreground">${migration.liquidityAfter.toLocaleString()}</span>
                </div>
                <div>
                  <span className={migration.liquidityChange >= 0 ? "text-accent" : "text-destructive"}>
                    {migration.liquidityChange >= 0 ? "+" : ""}
                    {migration.liquidityChange.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-muted-foreground border-t border-primary/20 pt-2 mt-2">
                <span className="text-primary font-semibold">AI:</span> {migration.aiExplanation}
              </div>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-primary/20">
                <span className="text-[9px] text-muted-foreground font-mono">{formatTimeAgo(migration.timestamp)}</span>
                <div className="flex items-center gap-2">
                  {migration.dexScreenerConfirmed && (
                    <Badge variant="outline" className="text-[8px] bg-accent/20 text-accent border-accent/30">
                      DEX CONFIRMED
                    </Badge>
                  )}
                  <ExternalLink className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
