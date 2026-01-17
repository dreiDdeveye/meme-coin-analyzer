"use client"

import { useState, useCallback } from "react"
import { fetchTokenByAddress } from "@/lib/dex-screener"
import { calculateRiskScore } from "@/lib/risk-scorer"
import { analyzeTrenches } from "@/lib/trenches-analyzer"
import { analyzeBundle } from "@/lib/bundle-checker"
import { analyzeNarrative } from "@/lib/narrative-analyzer"
import { generateExplainableAI } from "@/lib/explainable-ai"
import { checkMeta } from "@/lib/meta-checker"
import { checkVolume } from "@/lib/volume-checker"
import { checkPVP } from "@/lib/pvp-checker"
import { generateAIAnalyzerThoughts } from "@/lib/ai-analyzer"
import type { TokenPair } from "@/lib/dex-screener"
import type { TrenchesAnalysis } from "@/lib/trenches-analyzer"
import type { BundleAnalysis } from "@/lib/bundle-checker"
import type { NarrativeAnalysis } from "@/lib/narrative-analyzer"
import type { AnalyzerThoughts } from "@/lib/analyzer-thoughts"
import type { ExplainableAI } from "@/lib/explainable-ai"
import type { MetaCheckResult } from "@/lib/meta-checker"
import type { VolumeCheckResult } from "@/lib/volume-checker"
import type { PVPCheckResult } from "@/lib/pvp-checker"

export interface AnalysisResult {
  token: TokenPair
  trenches: TrenchesAnalysis
  bundle: BundleAnalysis
  narrative: NarrativeAnalysis
  thoughts: AnalyzerThoughts
  explainableAI: ExplainableAI
  metaCheck: MetaCheckResult
  volumeCheck: VolumeCheckResult
  pvpCheck: PVPCheckResult
  chain: string
  dex: string
  url: string
}

interface AnalyzerState {
  data: AnalysisResult | null
  isLoading: boolean
  error: string | null
}

export function useTickerAnalyzer() {
  const [state, setState] = useState<AnalyzerState>({
    data: null,
    isLoading: false,
    error: null,
  })

  const analyze = useCallback(async (input: string) => {
    setState({ data: null, isLoading: true, error: null })

    try {
      if (!input.trim()) {
        throw new Error("Please enter a ticker, pair, or contract address")
      }

      // Fetch token data from DEX Screener only
      const response = await fetchTokenByAddress(input.trim())

      if (!response.pairs || response.pairs.length === 0) {
        throw new Error("Token not found. Please check the ticker, pair, or contract address.")
      }

      const token = response.pairs[0]
      const riskScore = calculateRiskScore(token)
      const trenches = analyzeTrenches(token, riskScore)
      const bundle = analyzeBundle(token)
      const narrative = analyzeNarrative(token)

      const thoughts = await generateAIAnalyzerThoughts(token, trenches, narrative)

      const explainableAI = generateExplainableAI(token)
      const metaCheck = checkMeta(token)
      const volumeCheck = checkVolume(token)
      const pvpCheck = checkPVP(token)

      // Extract chain name from chainId
      const chainMap: Record<string, string> = {
        solana: "Solana",
        ethereum: "Ethereum",
        base: "Base",
        arbitrum: "Arbitrum",
        polygon: "Polygon",
        bsc: "BSC",
      }
      const chain = chainMap[token.chainId.toLowerCase()] || token.chainId

      const result: AnalysisResult = {
        token,
        trenches,
        bundle,
        narrative,
        thoughts,
        explainableAI,
        metaCheck,
        volumeCheck,
        pvpCheck,
        chain,
        dex: token.dexId.toUpperCase(),
        url: token.url,
      }

      setState({ data: result, isLoading: false, error: null })
    } catch (err) {
      setState({
        data: null,
        isLoading: false,
        error: err instanceof Error ? err.message : "An error occurred during analysis",
      })
    }
  }, [])

  return {
    ...state,
    analyze,
  }
}
