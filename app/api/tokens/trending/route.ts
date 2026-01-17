export async function GET() {
  try {
    const trendingTokens = ["DOGE", "SHIB", "PEPE", "FLOKI", "BONK", "WIF", "MOG", "BOME", "DOGWIFHAT"]

    const allPairs: any[] = []

    for (const token of trendingTokens) {
      try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${token}`, {
          headers: {
            Accept: "application/json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          if (data.pairs && Array.isArray(data.pairs)) {
            const solanaPairs = data.pairs.filter((pair: any) => pair.chainId === "solana")
            allPairs.push(...solanaPairs.slice(0, 3))
          }
        }
      } catch (e) {
        console.error(`[v0] Error fetching ${token}:`, e)
        continue
      }
    }

    if (allPairs.length === 0) {
      throw new Error("No Solana tokens found from DEX Screener")
    }

    const validPairs = allPairs.filter(
      (pair) =>
        pair &&
        pair.chainId === "solana" &&
        pair.liquidity &&
        typeof pair.liquidity.usd === "number" &&
        pair.volume &&
        typeof pair.volume.h24 === "number",
    )

    if (validPairs.length === 0) {
      throw new Error("No Solana tokens with valid data found")
    }

    const uniquePairs = Array.from(new Map(validPairs.map((pair) => [pair.pairAddress, pair])).values()).slice(0, 10)

    return Response.json({
      pairs: uniquePairs,
    })
  } catch (error) {
    console.error("[v0] API route error:", error)
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch tokens",
        pairs: [],
      },
      { status: 500 },
    )
  }
}
