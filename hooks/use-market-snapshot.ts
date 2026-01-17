"use client"

import useSWR from "swr"
import type { VolumeSnapshot, NewPairsFlow, AIMarketRead } from "@/lib/market-snapshot"

interface MarketSnapshotResponse {
  volume: VolumeSnapshot
  pairs: NewPairsFlow
  aiRead: AIMarketRead
  timestamp: number
}

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch market snapshot")
  }
  return response.json()
}

export function useMarketSnapshot() {
  const { data, error, isLoading, mutate } = useSWR<MarketSnapshotResponse>("/api/market/snapshot", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // 1 minute
    refreshInterval: 120000, // Auto-refresh every 2 minutes
  })

  return {
    volume: data?.volume || null,
    pairs: data?.pairs || null,
    aiRead: data?.aiRead || null,
    isLoading,
    error: error?.message,
    refresh: mutate,
  }
}
