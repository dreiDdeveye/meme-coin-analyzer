import useSWR from "swr"
import { fetchHolderData, type TokenHolderStats } from "@/lib/holder-analyzer"

export function useHolderAnalysis(
  tokenAddress: string | null,
  chain: "ethereum" | "bsc" | "solana" = "ethereum",
  topN = 100,
) {
  const { data, error, isLoading, mutate } = useSWR<TokenHolderStats>(
    tokenAddress ? `/api/holders/${chain}/${tokenAddress}?top=${topN}` : null,
    () => (tokenAddress ? fetchHolderData(tokenAddress, chain, topN) : null),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // Cache for 1 minute
    },
  )

  return {
    data,
    isLoading,
    error,
    refetch: mutate,
  }
}
