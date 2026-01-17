"use client"

import { useMemecoinData } from "@/hooks/use-memecoin-data"
import { getRiskColor } from "@/lib/risk-scorer"
import { ArrowLeft, AlertCircle, TrendingDown, TrendingUp, BarChart3, Zap } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useMemo } from "react"

export default function CoinDetailPage() {
  const params = useParams()
  const symbol = params.symbol as string
  const { data } = useMemecoinData()

  const coin = useMemo(() => data.find((c) => c.pair.baseToken.symbol === symbol), [data, symbol])

  if (!coin) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
          </div>
        </header>
        <div className="flex min-h-96 items-center justify-center">
          <p className="text-muted-foreground">Coin not found</p>
        </div>
      </div>
    )
  }

  // Defensive checks for all numeric values to prevent undefined errors
  const riskScore = coin.riskScore || {}
  const priceChange24h = coin.pair.priceChange?.h24 ?? 0
  const priceChangeH1 = coin.pair.priceChange?.h1 ?? 0
  const priceChangeM5 = coin.pair.priceChange?.m5 ?? 0
  const isPositive24h = priceChange24h >= 0
  const isPositive1h = priceChangeH1 >= 0
  const isPositive5m = priceChangeM5 >= 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <Link
            href="/dashboard"
            className="mb-4 inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20">
                <span className="text-2xl font-bold text-primary">{coin.pair.baseToken.symbol[0]}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{coin.pair.baseToken.name}</h1>
                <p className="text-lg text-muted-foreground">{coin.pair.baseToken.symbol}</p>
              </div>
            </div>
            <div
              className={`rounded-full px-4 py-2 text-sm font-semibold ${getRiskColor(riskScore.safetyLevel || "CAUTION")}`}
            >
              {riskScore.safetyLevel || "CAUTION"} Risk
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Section */}
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">Current Price</p>
              <div className="mt-2 flex items-end gap-4">
                <div className="text-4xl font-bold text-foreground">${(coin.priceUsd || 0).toFixed(6)}</div>
                <div className="mb-1 space-y-1">
                  <div
                    className={`flex items-center gap-2 text-sm ${isPositive24h ? "text-green-400" : "text-red-400"}`}
                  >
                    {isPositive24h ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="font-semibold">{Math.abs(priceChange24h).toFixed(2)}%</span>
                    <span className="text-xs text-muted-foreground">(24h)</span>
                  </div>
                </div>
              </div>

              {/* Price Changes */}
              <div className="mt-6 grid gap-4 grid-cols-3">
                <div className="rounded-md bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">5m Change</p>
                  <p className={`mt-1 font-semibold ${isPositive5m ? "text-green-400" : "text-red-400"}`}>
                    {priceChangeM5 >= 0 ? "+" : ""}
                    {priceChangeM5.toFixed(2)}%
                  </p>
                </div>
                <div className="rounded-md bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">1h Change</p>
                  <p className={`mt-1 font-semibold ${isPositive1h ? "text-green-400" : "text-red-400"}`}>
                    {priceChangeH1 >= 0 ? "+" : ""}
                    {priceChangeH1.toFixed(2)}%
                  </p>
                </div>
                <div className="rounded-md bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">24h Change</p>
                  <p className={`mt-1 font-semibold ${isPositive24h ? "text-green-400" : "text-red-400"}`}>
                    {priceChange24h >= 0 ? "+" : ""}
                    {priceChange24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Market Data */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Market Data</h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-md bg-muted/50 p-3">
                  <span className="text-sm text-muted-foreground">Market Cap</span>
                  <span className="font-semibold text-foreground">
                    ${((coin.marketCap || 0) / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted/50 p-3">
                  <span className="text-sm text-muted-foreground">FDV (Fully Diluted Valuation)</span>
                  <span className="font-semibold text-foreground">${((coin.pair.fdv || 0) / 1000000).toFixed(2)}M</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted/50 p-3">
                  <span className="text-sm text-muted-foreground">24h Volume</span>
                  <span className="font-semibold text-foreground">${((coin.volume24h || 0) / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-muted/50 p-3">
                  <span className="text-sm text-muted-foreground">Liquidity (USD)</span>
                  <span className="font-semibold text-foreground">${((coin.liquidity || 0) / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>

            {/* Transaction Data */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Zap size={20} className="text-primary" />
                Transaction Activity
              </h2>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Last 5 Minutes</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                      {coin.pair.txns?.m5?.buys || 0} Buys
                    </span>
                    <span className="inline-block rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                      {coin.pair.txns?.m5?.sells || 0} Sells
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Last 1 Hour</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                      {coin.pair.txns?.h1?.buys || 0} Buys
                    </span>
                    <span className="inline-block rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                      {coin.pair.txns?.h1?.sells || 0} Sells
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Last 24 Hours</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                      {coin.pair.txns?.h24?.buys || 0} Buys
                    </span>
                    <span className="inline-block rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                      {coin.pair.txns?.h24?.sells || 0} Sells
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Risk Analysis */}
          <div className="space-y-6">
            {/* Risk Score Overview */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <BarChart3 size={20} className="text-primary" />
                Risk Analysis
              </h2>

              <div className="mt-4 space-y-4">
                {/* Overall Score */}
                <div className="space-y-2 rounded-md bg-muted/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Overall Risk Score</span>
                    <span className="text-2xl font-bold text-primary">{riskScore.overall || 0}/100</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        (riskScore.overall || 0) < 25
                          ? "bg-green-500"
                          : (riskScore.overall || 0) < 50
                            ? "bg-yellow-500"
                            : (riskScore.overall || 0) < 75
                              ? "bg-orange-500"
                              : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min(riskScore.overall || 0, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Individual Scores */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Liquidity Risk</span>
                    <span className="font-semibold text-foreground">{riskScore.liquidityRisk || 0}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-orange-500"
                      style={{ width: `${riskScore.liquidityRisk || 0}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm pt-2">
                    <span className="text-muted-foreground">Rug Pull Risk</span>
                    <span className="font-semibold text-foreground">{riskScore.rugPullRisk || 0}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{ width: `${riskScore.rugPullRisk || 0}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm pt-2">
                    <span className="text-muted-foreground">Volume Risk</span>
                    <span className="font-semibold text-foreground">{riskScore.volumeRisk || 0}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-yellow-500"
                      style={{ width: `${riskScore.volumeRisk || 0}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm pt-2">
                    <span className="text-muted-foreground">Age Risk</span>
                    <span className="font-semibold text-foreground">{riskScore.ageRisk || 0}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-purple-500"
                      style={{ width: `${riskScore.ageRisk || 0}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm pt-2">
                    <span className="text-muted-foreground">Volatility Risk</span>
                    <span className="font-semibold text-foreground">{riskScore.volatilityRisk || 0}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${riskScore.volatilityRisk || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Red Flags */}
            {(riskScore.redFlags?.length || 0) > 0 && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-destructive">
                  <AlertCircle size={20} />
                  Red Flags
                </h2>
                <ul className="mt-4 space-y-2">
                  {riskScore.redFlags?.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-destructive">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                      {flag}
                    </li>
                  )) || null}
                </ul>
              </div>
            )}

            {/* Safe Badge */}
            {riskScore.safetyLevel === "SAFE" && (
              <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-6">
                <h2 className="text-lg font-semibold text-green-400">✓ This appears to be a relatively safe coin</h2>
                <p className="mt-2 text-sm text-green-300/80">
                  Based on current metrics, this coin has a lower risk profile compared to other memecoins. However,
                  always do your own research before investing.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
