"use client"

import { MainNav } from "@/components/main-nav"
import { TrenchMetaCard } from "@/components/trench-meta-card"
import { TimezoneDisplay } from "@/components/timezone-display"
import { AIMarketReadCard } from "@/components/ai-market-read-card"
import { VolumeSnapshotCard } from "@/components/volume-snapshot-card"
import { NewPairsCard } from "@/components/new-pairs-card"
import { MetaOfTheDayCard } from "@/components/meta-of-the-day-card"
import { FindGemsCard } from "@/components/find-gems-card"
import { Activity, BarChart3, AlertCircle, Loader2 } from "lucide-react"
import { TrendingTokensTable } from "@/components/trending-tokens-table"

// Mock data for the Lab page
const MOCK_TOKENS = [
  {
    pair: {
      chainId: "solana",
      dexId: "raydium",
      url: "#",
      pairAddress: "mock1",
      baseToken: { address: "mock1", name: "Mock Dog Token", symbol: "MDOG" },
      quoteToken: { address: "So11111111111111111111111111111111111111112", name: "Wrapped SOL", symbol: "SOL" },
      priceNative: "0.0001234",
      priceUsd: "0.0234",
      txns: { m5: { buys: 45, sells: 32 }, h1: { buys: 320, sells: 245 }, h24: { buys: 1250, sells: 980 } },
      volume: { m5: 5200, h1: 32000, h24: 125000 },
      priceChange: { m5: 3.5, h1: 12.3, h24: 45.6 },
      liquidity: { usd: 85000, base: 3500000, quote: 820 },
      fdv: 450000,
      marketCap: 450000,
      pairCreatedAt: Date.now() - 86400000 * 2,
      info: { imageUrl: "/placeholder.svg" }
    },
    riskScore: { score: 65, level: "MEDIUM" as const, factors: {} },
    priceUsd: 0.0234,
    marketCap: 450000,
    liquidity: 85000,
    volume24h: 125000
  },
  {
    pair: {
      chainId: "solana",
      dexId: "raydium",
      url: "#",
      pairAddress: "mock2",
      baseToken: { address: "mock2", name: "Mock Cat Coin", symbol: "MCAT" },
      quoteToken: { address: "So11111111111111111111111111111111111111112", name: "Wrapped SOL", symbol: "SOL" },
      priceNative: "0.0005678",
      priceUsd: "0.0897",
      txns: { m5: { buys: 28, sells: 41 }, h1: { buys: 210, sells: 298 }, h24: { buys: 890, sells: 1120 } },
      volume: { m5: 4100, h1: 24500, h24: 98000 },
      priceChange: { m5: -2.1, h1: -8.4, h24: -22.8 },
      liquidity: { usd: 62000, base: 2100000, quote: 595 },
      fdv: 320000,
      marketCap: 320000,
      pairCreatedAt: Date.now() - 86400000 * 5,
      info: { imageUrl: "/placeholder.svg" }
    },
    riskScore: { score: 72, level: "MEDIUM" as const, factors: {} },
    priceUsd: 0.0897,
    marketCap: 320000,
    liquidity: 62000,
    volume24h: 98000
  }
]

const MOCK_META_DATA = {
  meta: "Animal / Classic Meme",
  confidence: "high" as const,
  reasoning: "Strong presence of dog and cat-themed tokens dominating recent launches with high community engagement",
  exampleTokens: [
    { symbol: "MDOG", name: "Mock Dog Token", confidence: 0.92 },
    { symbol: "MCAT", name: "Mock Cat Coin", confidence: 0.88 }
  ],
  totalTokensAnalyzed: 45,
  timestamp: Date.now()
}

const MOCK_GEMS_DATA = [
  {
    token: { symbol: "MGEM1", name: "Mock Gem 1", address: "mockgem1" },
    score: 85,
    status: "WATCH" as const,
    factors: {
      pumpTraction: 78,
      dexMomentum: 82,
      bundleRisk: 15,
      narrativeStrength: 88,
      volumeTrend: 90
    },
    reasoning: "High community engagement with strong volume growth and low bundle risk",
    source: "dex" as const,
    riskLevel: "low" as const
  },
  {
    token: { symbol: "MGEM2", name: "Mock Gem 2", address: "mockgem2" },
    score: 78,
    status: "EARLY" as const,
    factors: {
      pumpTraction: 72,
      dexMomentum: 75,
      bundleRisk: 22,
      narrativeStrength: 80,
      volumeTrend: 85
    },
    reasoning: "Strong liquidity growth with emerging narrative strength",
    source: "dex" as const,
    riskLevel: "medium" as const
  }
]

const MOCK_SNAPSHOT_DATA = {
  aiMarketRead: {
    overallSentiment: "BULLISH" as const,
    confidenceScore: 0.78,
    summary: "Mock market conditions show favorable trends for memecoin trading with increased volume and positive sentiment",
    dataAnalyzed: ["Volume trends", "New pair launches", "Social metrics", "DEX activity"],
    keyFactors: [
      { factor: "24h Volume Growth", impact: "POSITIVE" as const, weight: 0.85 },
      { factor: "New Pair Velocity", impact: "POSITIVE" as const, weight: 0.72 },
      { factor: "Market Saturation", impact: "NEGATIVE" as const, weight: 0.45 }
    ],
    recommendation: "Monitor high-volume tokens with strong community engagement and low bundle risk",
    warnings: ["High volatility expected", "Demo data - not for actual trading decisions"],
    timestamp: new Date()
  },
  volumeSnapshot: {
    volume1h: 420000,
    volume6h: 1835000,
    volume24h: 5240000,
    change1h: 12.5,
    change6h: 8.3,
    change24h: 23.7,
    intensity: "MODERATE" as const,
    aiInsight: "Trading volume shows steady growth with moderate market intensity"
  },
  newPairsFlow: {
    pairs1h: 8,
    pairs24h: 127,
    launchVelocity: "NORMAL" as const,
    survivalRate: 68,
    deadTokens24h: 41,
    topPlatforms: [
      { name: "Raydium", count: 82 },
      { name: "Orca", count: 34 },
      { name: "Jupiter", count: 11 }
    ],
    aiInsight: "Steady launch rate with 68% survival - healthy market conditions"
  }
}

export default function Dashboard() {
  // Using mock data instead of API calls
  const tokens = MOCK_TOKENS
  const tokensLoading = false
  const metaData = MOCK_META_DATA
  const metaLoading = false
  const metaError = undefined
  const gemsData = MOCK_GEMS_DATA
  const gemsLoading = false
  const gemsError = undefined
  const snapshotData = MOCK_SNAPSHOT_DATA
  const snapshotLoading = false

  const totalVolume = 0
  const totalTxns = 0

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 lab-grid opacity-30 pointer-events-none" />

      <MainNav />

      <main className="mx-auto max-w-7xl px-6 py-8 pt-28 relative z-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Research Lab</h1>
            <p className="text-muted-foreground mt-1">Real-time Solana memecoin intelligence</p>
          </div>
          <TimezoneDisplay />
        </div>

        {/* Trench Meta */}
        <div className="mb-8">
          <TrenchMetaCard />
        </div>

        {/* Market Briefing Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Market Briefing</h2>
              <p className="text-sm text-muted-foreground">AI-powered market analysis</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <AIMarketReadCard data={snapshotData?.aiMarketRead || null} isLoading={snapshotLoading} />
            <VolumeSnapshotCard data={snapshotData?.volumeSnapshot || null} isLoading={snapshotLoading} />
            <NewPairsCard data={snapshotData?.newPairsFlow || null} isLoading={snapshotLoading} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetaOfTheDayCard data={metaData} isLoading={metaLoading} error={metaError} />
            <FindGemsCard gems={gemsData} isLoading={gemsLoading} error={gemsError} />
          </div>
        </section>

        {/* Trending Tokens Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-accent/10">
                <Activity className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Trending Tokens</h2>
                <p className="text-sm text-muted-foreground">Top performing Solana tokens</p>
              </div>
            </div>
            {tokensLoading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Syncing...</span>
              </div>
            )}
          </div>

          <TrendingTokensTable
            tokens={tokens.slice(0, 10)}
            isLoading={tokensLoading}
            totalVolume={totalVolume}
            totalTxns={totalTxns}
          />
        </section>
      </main>
    </div>
  )
}
