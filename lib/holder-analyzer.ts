// Holder Analysis with Solana RPC fallback handling
import type { TokenPair } from "./dex-screener"

export interface HolderData {
  totalHolders: number
  topHolders: HolderItem[]
  concentration: {
    top10Percent: number
    top25Percent: number
  }
  whaleCount: number
  retailCount: number
}

interface HolderItem {
  address: string
  balance: number
  percentage: number
}

interface RpcHolderResult {
  address: string
  amount: string
}

// Free public Solana RPC endpoints (fallback chain)
const SOLANA_RPC_ENDPOINTS = [
  "https://api.mainnet-beta.solana.com",
  "https://solana-mainnet.g.alchemy.com/v2/demo",
  "https://rpc.ankr.com/solana",
]

async function fetchWithFallback(mint: string): Promise<any> {
  let lastError: Error | null = null

  for (const endpoint of SOLANA_RPC_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getTokenLargestAccounts",
          params: [mint],
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error.message || "RPC error")
      }

      return data.result
    } catch (error) {
      console.warn(`[v0] RPC endpoint ${endpoint} failed:`, error)
      lastError = error as Error
      continue
    }
  }

  throw lastError || new Error("All RPC endpoints failed")
}

export async function fetchRealSolanaHolders(mint: string): Promise<HolderData | null> {
  try {
    console.log(`[v0] Fetching holder data for ${mint}`)
    
    const result = await fetchWithFallback(mint)
    
    if (!result?.value || result.value.length === 0) {
      console.warn("[v0] No holder data returned from RPC")
      return null
    }

    const holders = result.value as RpcHolderResult[]
    const totalSupply = holders.reduce((sum: number, h: RpcHolderResult) => sum + parseFloat(h.amount), 0)

    const topHolders: HolderItem[] = holders.slice(0, 20).map((h: RpcHolderResult) => {
      const balance = parseFloat(h.amount)
      return {
        address: h.address,
        balance,
        percentage: totalSupply > 0 ? (balance / totalSupply) * 100 : 0,
      }
    })

    // Calculate concentration metrics
    const top10Balance = topHolders.slice(0, 10).reduce((sum: number, h: HolderItem) => sum + h.balance, 0)
    const top25Balance = topHolders.slice(0, 25).reduce((sum: number, h: HolderItem) => sum + h.balance, 0)

    // Count whales (>1% supply) and retail (<0.1% supply)
    const whaleCount = topHolders.filter((h: HolderItem) => h.percentage > 1).length
    const retailCount = topHolders.filter((h: HolderItem) => h.percentage < 0.1).length

    return {
      totalHolders: holders.length,
      topHolders,
      concentration: {
        top10Percent: totalSupply > 0 ? (top10Balance / totalSupply) * 100 : 0,
        top25Percent: totalSupply > 0 ? (top25Balance / totalSupply) * 100 : 0,
      },
      whaleCount,
      retailCount,
    }
  } catch (error) {
    console.error("[v0] Solana RPC error:", error)
    // Return null instead of throwing - let the UI handle missing data gracefully
    return null
  }
}

export async function fetchHolderData(
  addressOrToken: string | TokenPair,
  chain?: string,
  name?: string,
  symbol?: string,
  limit?: number
): Promise<HolderData | null> {
  // Handle both TokenPair object and individual parameters
  let mint: string
  let chainId: string

  if (typeof addressOrToken === "string") {
    mint = addressOrToken
    chainId = chain || "solana"
  } else {
    // It's a TokenPair object
    mint = addressOrToken.baseToken?.address || ""
    chainId = addressOrToken.chainId || "solana"
  }

  // Only works for Solana tokens
  if (chainId !== "solana") {
    console.log("[v0] Holder analysis only supported for Solana tokens")
    return null
  }

  if (!mint) {
    console.warn("[v0] No mint address found for token")
    return null
  }

  console.log(`[v0] Fetching holders for ${symbol || mint} on ${chainId}`)
  return fetchRealSolanaHolders(mint)
}

// Generate fallback/mock holder data for UI when RPC fails
export function generateFallbackHolderData(): HolderData {
  return {
    totalHolders: 0,
    topHolders: [],
    concentration: {
      top10Percent: 0,
      top25Percent: 0,
    },
    whaleCount: 0,
    retailCount: 0,
  }
}