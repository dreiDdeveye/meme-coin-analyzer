"use client"
import useSWR from "swr"
import type { MetaOfTheDayResult } from "@/lib/meta-of-the-day"

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch meta of the day")
  }
  return response.json()
}

export function useMetaOfTheDay() {
  const { data, error, isLoading } = useSWR<MetaOfTheDayResult>("/api/meta/of-the-day", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 600000, // 10 minutes
    focusThrottleInterval: 600000,
  })

  return {
    data: data || null,
    isLoading,
    error: error?.message,
  }
}
