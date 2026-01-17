"use client"

import type React from "react"
import { useTickerAnalyzer } from "@/hooks/use-ticker-analyzer"
import { useState, useEffect } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CAHeader } from "@/components/ca-header"
import { AboutMeSection } from "@/components/about-me-section"
import { AnalyzerThoughtsCard } from "@/components/analyzer-thoughts-card"
import { MetaCheckerCard } from "@/components/meta-checker-card"
import { VolumeCheckerCard } from "@/components/volume-checker-card"
import { PVPCheckerCard } from "@/components/pvp-checker-card"
import { TokenChartStats } from "@/components/token-chart-stats"
import { generateEnhancedExplainableAI } from "@/lib/explainable-ai-enhanced"
import { mergeTokenData } from "@/lib/dual-data-merger"
import { fetchHolderData } from "@/lib/holder-analyzer"

export function TickerAnalyzer() {
  const { data, isLoading, error, analyze } = useTickerAnalyzer()
  const [input, setInput] = useState("")
  const [holderData, setHolderData] = useState<any>(null)
  const [loadingHolders, setLoadingHolders] = useState(false)

  useEffect(() => {
    if (data?.token) {
      const fetchRealHolders = async () => {
        setLoadingHolders(true)
        try {
          const chain = data.chain === "Ethereum" ? "ethereum" : data.chain === "BSC" ? "bsc" : "solana"
          const realHolders = await fetchHolderData(
            data.token.baseToken.address,
            chain,
            data.token.baseToken.name,
            data.token.baseToken.symbol,
            50,
          )
          setHolderData(realHolders)
          console.log("[v0] Real holder data loaded for bubble map")
        } catch (error) {
          console.error("[v0] Failed to load real holder data:", error)
          setHolderData(null)
        } finally {
          setLoadingHolders(false)
        }
      }

      fetchRealHolders()
    }
  }, [data?.token])

  const handleAnalyze = () => {
    if (input.trim()) {
      analyze(input.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAnalyze()
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm p-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Ticker, Pair, or Contract Address
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="e.g., PEPE, DOGE, 0x6b175474e89094c44da98b954eedeac495271d0f"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              <Button onClick={handleAnalyze} disabled={isLoading || !input.trim()} size="lg" className="px-8">
                {isLoading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Enter a token ticker, trading pair, or contract address to perform real-time analysis using DEX Screener
            data.
          </p>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-8 text-center">
          <div className="inline-block mb-4">
            <ChevronDown className="h-8 w-8 animate-spin text-primary" />
          </div>
          <p className="text-muted-foreground">Analyzing token across multiple data sources...</p>
        </div>
      )}

      {/* Analysis Results */}
      {data && (
        <div className="space-y-8">
          {/* 1. TOKEN NAME & TICKER - CA Header */}
          <CAHeader
            symbol={data.token.baseToken.symbol}
            name={data.token.baseToken.name}
            chain={data.chain}
            dex={data.dex}
            contractAddress={data.token.baseToken.address}
            url={data.url}
            imageUrl={data.token.info?.imageUrl}
            headerUrl={data.token.info?.header}
          />

          <TokenChartStats token={data.token} chain={data.chain} dex={data.dex} />

          {/* 2. ORACLE THOUGHTS */}
          <AnalyzerThoughtsCard thoughts={data.thoughts} />

          {/* Token Holder Distribution - Now with real API data */}
          <div className="rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm p-12 text-center">
            <div className="mb-4 text-4xl">🚧</div>
            <h2 className="text-xl font-bold text-primary uppercase tracking-wider mb-2">Token Holder Distribution</h2>
            <p className="text-muted-foreground">Under Construction</p>
            {loadingHolders && <p className="text-xs text-muted-foreground mt-2">Loading holder data...</p>}
            {holderData && (
              <p className="text-xs text-green-400 mt-2">
                ✓ {holderData.totalHolders} holders loaded
              </p>
            )}
          </div>

          {/* Meta Checker - part of narrative understanding */}
          {data.metaCheck && <MetaCheckerCard data={data.metaCheck} />}

          {/* Narrative Analysis - Under Construction Placeholder */}
          <div className="rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm p-12 text-center">
            <div className="mb-4 text-4xl">🚧</div>
            <h2 className="text-xl font-bold text-primary uppercase tracking-wider mb-2">Narrative Analysis</h2>
            <p className="text-muted-foreground">Under Construction</p>
          </div>

          {/* 4. ABOUT ME - New identity section with wrapped trenches & AI data */}
          {(() => {
            const mergedData = mergeTokenData(data.token)
            const enhancedAI = generateEnhancedExplainableAI(mergedData)

            return (
              <AboutMeSection
                trenchesData={data.trenches}
                aiData={enhancedAI}
                description={`${data.token.baseToken.name} (${data.token.baseToken.symbol}) operates on ${data.chain} with ${data.token.txns?.h24?.buys || 0} buy transactions in the last 24 hours.`}
              />
            )
          })()}

          {/* Additional legacy analysis cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">
              Additional Analysis
            </h3>

            <VolumeCheckerCard data={data.volumeCheck} />
            <PVPCheckerCard data={data.pvpCheck} />
          </div>

          {/* Trade Link */}
          <div className="rounded-lg border border-border bg-card/50 p-4 text-center">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              View on {data.dex}
              <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
            </a>
          </div>
        </div>
      )}

      {/* Initial State */}
      {!data && !isLoading && !error && (
        <div className="rounded-lg border border-border/50 bg-card/30 p-12 text-center">
          <div className="mb-4 text-4xl">🔍</div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Ready to Analyze</h2>
          <p className="text-muted-foreground">Enter a token to get started with real-time analysis.</p>
        </div>
      )}
    </div>
  )
}