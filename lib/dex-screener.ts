// DEX Screener API client for fetching memecoin data
const DEX_SCREENER_API = "https://api.dexscreener.com/latest/dex/tokens"

export interface TokenPair {
  chainId: string
  dexId: string
  url: string
  pairAddress: string
  baseToken: {
    address: string
    name: string
    symbol: string
  }
  quoteToken: {
    address: string
    name: string
    symbol: string
  }
  priceNative: string
  priceUsd: string
  txns: {
    m5: { buys: number; sells: number }
    h1: { buys: number; sells: number }
    h24: { buys: number; sells: number }
  }
  volume: {
    m5: number
    h1: number
    h24: number
  }
  priceChange: {
    m5: number
    h1: number
    h24: number
  }
  liquidity: {
    usd: number
    base: number
    quote: number
  }
  fdv: number
  marketCap: number
  pairCreatedAt: number
  info?: {
    imageUrl?: string
    header?: string
    socials?: Array<{ type: string; url: string }>
  }
}

export interface TokenResponse {
  schemaVersion: string
  pairs: TokenPair[] | null
}

export async function fetchTokenByAddress(address: string): Promise<TokenResponse> {
  try {
    const response = await fetch(`${DEX_SCREENER_API}/${address}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) throw new Error("Failed to fetch token data")
    return await response.json()
  } catch (error) {
    console.error("Error fetching token:", error)
    return { schemaVersion: "1.0", pairs: null }
  }
}

export async function fetchTrendingTokens(): Promise<TokenResponse> {
  try {
    const response = await fetch("https://api.dexscreener.com/latest/dex/search?q=solana", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) throw new Error("Failed to fetch trending tokens")
    const data = await response.json()

    if (data.pairs && Array.isArray(data.pairs)) {
      data.pairs = data.pairs
        .filter((pair: any) => {
          // Validate every property that might be accessed
          if (!pair || typeof pair !== "object") return false
          if (pair.chainId !== "solana") return false
          if (!pair.liquidity || typeof pair.liquidity !== "object") return false
          if (typeof pair.liquidity.usd !== "number" || isNaN(pair.liquidity.usd)) return false
          if (!pair.volume || typeof pair.volume !== "object") return false
          if (typeof pair.volume.h24 !== "number" || isNaN(pair.volume.h24)) return false
          // Ensure baseToken exists
          if (!pair.baseToken || !pair.baseToken.symbol) return false
          return true
        })
        .slice(0, 30)
    } else {
      // If no pairs array, return empty
      data.pairs = []
    }

    return data
  } catch (error) {
    console.error("Error fetching trending tokens:", error)
    return { schemaVersion: "1.0", pairs: [] }
  }
}

export async function searchDexScreener(query: string): Promise<TokenPair[]> {
  try {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      console.error(`[v0] DEX Screener search failed with status ${response.status}`)
      return []
    }

    const data = await response.json()
    return data.pairs || []
  } catch (error) {
    console.error("[v0] Error searching DEX Screener:", error)
    return []
  }
}
