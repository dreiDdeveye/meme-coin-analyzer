"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, AlertCircle, Zap, Copy, Check } from "lucide-react"
import { useState } from "react"
import type { GemScore } from "@/lib/gem-finder"

interface FindGemsCardProps {
  gems: GemScore[] | null
  isLoading: boolean
  error?: string
}

export function FindGemsCard({ gems, isLoading, error }: FindGemsCardProps) {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const truncateAddress = (address: string) => {
    if (address.length <= 12) return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Find Gems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Find Gems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Scanning for opportunities...</p>
        </CardContent>
      </Card>
    )
  }

  if (!gems || gems.length === 0) {
    return (
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle>Find Gems</CardTitle>
          <CardDescription>Early-stage opportunity discovery</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No promising gems identified at this time.</p>
        </CardContent>
      </Card>
    )
  }

  const riskColors = {
    low: "text-success",
    medium: "text-accent",
    high: "text-destructive",
    extreme: "text-destructive/80",
  }

  return (
    <Card className="border-accent/30 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Find Gems
              <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-500 border-amber-500/30">
                Demo Data
              </Badge>
            </CardTitle>
            <CardDescription>Early-stage opportunity discovery</CardDescription>
          </div>
          <Badge variant="secondary">{gems.length} Gems</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {gems.slice(0, 5).map((gem) => (
            <div
              key={`${gem.token.symbol}-gem`}
              className="rounded-lg border border-border/50 bg-background/50 p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-sm">{gem.token.symbol}</div>
                  <div className="text-xs text-muted-foreground">{gem.token.name}</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <code className="text-[10px] text-muted-foreground font-mono bg-muted/50 px-1.5 py-0.5 rounded">
                      {truncateAddress(gem.token.address)}
                    </code>
                    <button
                      onClick={() => copyToClipboard(gem.token.address)}
                      className="p-0.5 hover:bg-muted rounded transition-colors"
                      title="Copy address"
                    >
                      {copiedAddress === gem.token.address ? (
                        <Check className="h-3 w-3 text-success" />
                      ) : (
                        <Copy className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">{gem.score}</div>
                  <Badge
                    variant={gem.status === "EARLY" ? "default" : gem.status === "WATCH" ? "secondary" : "outline"}
                    className="text-xs mt-1"
                  >
                    {gem.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Score</span>
                  <span className="font-semibold">{gem.score}%</span>
                </div>
                <Progress value={gem.score} className="h-1.5" />
              </div>

              <div className="grid grid-cols-2 gap-1 text-xs">
                <div>
                  <span className="text-muted-foreground">Pump Traction:</span>
                  <span className="ml-1 font-semibold">{gem.factors.pumpTraction}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">DEX Momentum:</span>
                  <span className="ml-1 font-semibold">{gem.factors.dexMomentum}</span>
                </div>
              </div>

              <p className="text-xs text-foreground/70 border-t border-border/30 pt-2">{gem.reasoning}</p>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-xs ${riskColors[gem.riskLevel]}`}>
                  {gem.riskLevel.toUpperCase()} RISK
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {gem.source.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border/30 bg-destructive/5 p-2 text-xs text-destructive">
          <strong>Disclaimer:</strong> Scores are based on available data. Not financial advice. Analyze thoroughly
          before investing.
        </div>
      </CardContent>
    </Card>
  )
}