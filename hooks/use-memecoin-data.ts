"use client"

import useSWR from "swr"
import type { TokenPair } from "@/lib/dex-screener"
import { calculateRiskScore } from "@/lib/risk-scorer"

export interface MemecoinData {
  pair: TokenPair
  riskScore: ReturnType<typeof calculateRiskScore>
  priceUsd: number
  marketCap: number
  liquidity: number
  volume24h: number
}

async function fetchMemecoinsData(): Promise<MemecoinData[]> {
  try {
    // Fetch from our server-side API route to avoid CORS issues
    const response = await fetch("/api/tokens/trending", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const { pairs, error } = await response.json()

    if (error || !pairs || pairs.length === 0) {
      throw new Error(error || "No tokens found")
    }

    // Process and enrich the data with risk scores
    const data: MemecoinData[] = pairs.map((pair: TokenPair) => ({
      pair,
      riskScore: calculateRiskScore(pair),
      priceUsd: Number.parseFloat(pair.priceUsd) || 0,
      marketCap: pair.marketCap || 0,
      liquidity: pair.liquidity?.usd || 0,
      volume24h: pair.volume?.h24 || 0,
    }))

    return data
  } catch (error) {
    console.error("[v0] Failed to fetch memecoin data:", error)
    return []
  }
}

export function useMemecoinData() {
  const { data, error, isLoading } = useSWR("memecoin-data", fetchMemecoinsData, {
    revalidateOnFocus: false,
    dedupingInterval: 30000,
    focusThrottleInterval: 30000,
  })

  return {
    data: data || [],
    isLoading,
    error: error?.message || null,
  }
}
