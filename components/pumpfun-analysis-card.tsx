"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertTriangle, Users, Activity, AlertCircle } from "lucide-react"
import type { PumpfunAnalysis } from "@/lib/pumpfun-analyzer"

interface PumpfunAnalysisCardProps {
  analysis: PumpfunAnalysis
}

export function PumpfunAnalysisCard({ analysis }: PumpfunAnalysisCardProps) {
  if (!analysis.isPumpfunToken) {
    return null
  }

  if (analysis.disabledReason) {
    return (
      <Card className="lab-card p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold font-mono uppercase">Pump.fun Detection</h3>
            </div>
            <Badge variant="outline" className="bg-muted">
              DETECTED
            </Badge>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted/30 border border-border rounded">
            <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-sm font-medium">On-Chain Analysis Unavailable</p>
              <p className="text-xs text-muted-foreground">{analysis.disabledReason}</p>
              <p className="text-xs text-muted-foreground">
                This token appears to be a Pump.fun token. Use the standard risk metrics and DEX Screener data above for
                analysis.
              </p>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="lab-card p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold font-mono uppercase">Pump.fun On-Chain Analysis</h3>
          </div>
          <Badge variant="outline" className="bg-primary/10">
            {analysis.isRealTimeData ? "REAL-TIME" : "LIMITED DATA"}
          </Badge>
        </div>

        {/* Bonding Curve Progress */}
        {analysis.bondingCurve && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-muted-foreground">BONDING CURVE PROGRESS</span>
              <span className="text-lg font-bold text-primary">
                {analysis.bondingCurve.progressPercent.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${analysis.bondingCurve.progressPercent}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground font-mono">SOL DEPOSITED</div>
                <div className="font-bold">{analysis.bondingCurve.totalSolDeposited.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground font-mono">BUY/SELL</div>
                <div className="font-bold">
                  {analysis.bondingCurve.buyCount}/{analysis.bondingCurve.sellCount}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground font-mono">UNIQUE BUYERS</div>
                <div className="font-bold">{analysis.bondingCurve.uniqueBuyers}</div>
              </div>
            </div>
          </div>
        )}

        {/* Migration Probability */}
        {analysis.migrationProb && (
          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-sm font-mono text-muted-foreground">MIGRATION PROBABILITY</span>
              </div>
              <Badge variant={analysis.migrationProb.confidence === "high" ? "default" : "secondary"}>
                {analysis.migrationProb.confidence.toUpperCase()}
              </Badge>
            </div>
            <div className="text-3xl font-bold text-accent">{analysis.migrationProb.probability}%</div>
            <p className="text-sm text-muted-foreground">{analysis.migrationProb.explanation}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-muted/50 p-2 rounded">
                <div className="text-muted-foreground">Liquidity Growth</div>
                <div className="font-bold">{analysis.migrationProb.factors.liquidityGrowth}%</div>
              </div>
              <div className="bg-muted/50 p-2 rounded">
                <div className="text-muted-foreground">Buy Pressure</div>
                <div className="font-bold">{analysis.migrationProb.factors.buyPressure}%</div>
              </div>
            </div>
          </div>
        )}

        {/* Rug Risk */}
        {analysis.rugRisk && (
          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle
                  className={`h-4 w-4 ${
                    analysis.rugRisk.riskLevel === "critical"
                      ? "text-red-500"
                      : analysis.rugRisk.riskLevel === "high"
                        ? "text-orange-500"
                        : analysis.rugRisk.riskLevel === "medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                  }`}
                />
                <span className="text-sm font-mono text-muted-foreground">RUG RISK ASSESSMENT</span>
              </div>
              <Badge
                variant={
                  analysis.rugRisk.riskLevel === "critical" || analysis.rugRisk.riskLevel === "high"
                    ? "destructive"
                    : "secondary"
                }
              >
                {analysis.rugRisk.riskLevel.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm">{analysis.rugRisk.explanation}</p>
            {analysis.rugRisk.indicators.length > 0 && (
              <div className="space-y-1">
                {analysis.rugRisk.indicators.slice(0, 3).map((indicator, i) => (
                  <div key={i} className="text-xs text-muted-foreground">
                    • {indicator}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Early Buyers */}
        {analysis.earlyBuyers.length > 0 && (
          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-mono text-muted-foreground">EARLY BUYERS DETECTED</span>
            </div>
            <div className="space-y-2">
              {analysis.earlyBuyers.slice(0, 5).map((buyer, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-muted/30 p-2 rounded">
                  <span className="font-mono">
                    {buyer.address.slice(0, 8)}...{buyer.address.slice(-6)}
                  </span>
                  <Badge variant={buyer.type === "sniper" ? "destructive" : "secondary"} className="text-xs">
                    {buyer.type.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
