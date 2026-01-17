"use client"

import { MainNav } from "@/components/main-nav"
import { TrenchMetaCard } from "@/components/trench-meta-card"
import { TimezoneDisplay } from "@/components/timezone-display"
import { AIMarketReadCard } from "@/components/ai-market-read-card"
import { VolumeSnapshotCard } from "@/components/volume-snapshot-card"
import { NewPairsCard } from "@/components/new-pairs-card"
import { MetaOfTheDayCard } from "@/components/meta-of-the-day-card"
import { FindGemsCard } from "@/components/find-gems-card"
import { useMemecoinData } from "@/hooks/use-memecoin-data"
import { useMetaOfTheDay } from "@/hooks/use-meta-of-the-day"
import { useFindGems } from "@/hooks/use-find-gems"
import { useMarketSnapshot } from "@/hooks/use-market-snapshot"
import { Activity, Loader2, BarChart3 } from "lucide-react"
import { TrendingTokensTable } from "@/components/trending-tokens-table"

export default function Dashboard() {
  const { data: tokens, isLoading: tokensLoading } = useMemecoinData()
  const { data: metaData, isLoading: metaLoading, error: metaError } = useMetaOfTheDay()
  const { data: gemsData, isLoading: gemsLoading, error: gemsError } = useFindGems()
  const { data: snapshotData, isLoading: snapshotLoading } = useMarketSnapshot()

  const totalVolume = tokens.reduce((acc, token) => acc + (token.volume24h || 0), 0)
  const totalTxns = tokens.reduce(
    (acc, token) => acc + ((token.pair.txns?.h24?.buys || 0) + (token.pair.txns?.h24?.sells || 0)),
    0,
  )

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
