"use client"

import type { BundleAnalysis } from "@/lib/bundle-checker"
import { getBundleRiskBadgeColor } from "@/lib/bundle-checker"
import { AlertTriangle, CheckCircle, AlertCircle, Activity } from "lucide-react"

interface BundleCheckerCardProps {
  bundle?: BundleAnalysis
}

export function BundleCheckerCard({ bundle }: BundleCheckerCardProps) {
  if (!bundle) {
    return null
  }

  const icons = {
    NO_BUNDLE_DETECTED: <CheckCircle className="h-5 w-5" />,
    POSSIBLE_BUNDLE: <AlertCircle className="h-5 w-5" />,
    HIGHLY_BUNDLED: <AlertTriangle className="h-5 w-5" />,
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Bundle Checker</h3>
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${getBundleRiskBadgeColor(bundle.riskLevel)}`}
        >
          {icons[bundle.riskLevel]}
          <span>{bundle.riskLevel.replace(/_/g, " ")}</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{bundle.explanation}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground mb-1">Holder Concentration</p>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold text-foreground">{bundle.indicators.holderConcentration}%</p>
            <div className="w-16 h-6 bg-muted/50 rounded flex items-end overflow-hidden">
              <div
                className="bg-orange-500/60 h-full transition-all"
                style={{ width: `${bundle.indicators.holderConcentration}%` }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground mb-1">Early Buy Clustering</p>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold text-foreground">{bundle.indicators.earlyBuyClustering}%</p>
            <div className="w-16 h-6 bg-muted/50 rounded flex items-end overflow-hidden">
              <div
                className="bg-orange-500/60 h-full transition-all"
                style={{ width: `${Math.min(bundle.indicators.earlyBuyClustering, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground mb-1">Transaction Uniformity</p>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold text-foreground">{bundle.indicators.transactionSizeUniformity}%</p>
            <div className="w-16 h-6 bg-muted/50 rounded flex items-end overflow-hidden">
              <div
                className="bg-red-500/60 h-full transition-all"
                style={{ width: `${bundle.indicators.transactionSizeUniformity}%` }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground mb-1">Volume Imbalance</p>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold text-foreground">{bundle.indicators.volumeImbalance}%</p>
            <div className="w-16 h-6 bg-muted/50 rounded flex items-end overflow-hidden">
              <div
                className="bg-orange-500/60 h-full transition-all"
                style={{ width: `${Math.min(bundle.indicators.volumeImbalance, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-muted/20 border border-border/50 p-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Bundle Risk Score</p>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                bundle.riskScore > 70 ? "bg-red-500" : bundle.riskScore > 40 ? "bg-orange-500" : "bg-green-500"
              }`}
              style={{ width: `${bundle.riskScore}%` }}
            />
          </div>
          <p className="text-lg font-bold text-foreground w-12 text-right">{bundle.riskScore}/100</p>
        </div>
      </div>
    </div>
  )
}
