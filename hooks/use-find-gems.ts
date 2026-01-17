"use client"

import useSWR from "swr"
import type { GemScore } from "@/lib/gem-finder"

interface GemsResponse {
  gems: GemScore[]
  totalAnalyzed: number
  timestamp: number
}

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch gems")
  }
  return response.json()
}

export function useFindGems() {
  const { data, error, isLoading } = useSWR<GemsResponse>("/api/gems/find", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 600000, // 10 minutes
    focusThrottleInterval: 600000,
  })

  return {
    gems: data?.gems || null,
    totalAnalyzed: data?.totalAnalyzed || 0,
    isLoading,
    error: error?.message,
  }
}
