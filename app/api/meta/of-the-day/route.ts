import { detectMetaPatternsFromDex } from "@/lib/meta-of-the-day"

export async function GET() {
  try {
    console.log("[v0] Fetching Solana trending tokens for Meta of the Day analysis...")

    const searches = ["solana pepe", "solana doge", "solana bonk", "solana cat", "sol ai", "sol meme"]
    const allPairs: any[] = []

    for (const query of searches) {
      try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${query}`, {
          headers: { Accept: "application/json" },
        })

        if (response.ok) {
          const data = await response.json()
          if (data.pairs && data.pairs.length > 0) {
            const solanaPairs = data.pairs.filter((pair: any) => pair.chainId === "solana")
            allPairs.push(...solanaPairs.slice(0, 10))
          }
        }
      } catch (error) {
        console.log(`[v0] Failed to fetch ${query} tokens:`, error)
      }
    }

    console.log(`[v0] Total Solana pairs collected: ${allPairs.length}`)

    if (allPairs.length === 0) {
      return Response.json({
        confidence: "low",
        meta: "Insufficient Data",
        reasoning: "No trending tokens available for analysis at this time.",
        exampleTokens: [],
        totalTokensAnalyzed: 0,
      })
    }

    // Remove duplicates by pair address
    const uniquePairs = Array.from(new Map(allPairs.map((pair) => [pair.pairAddress, pair])).values())

    console.log(`[v0] Unique pairs after deduplication: ${uniquePairs.length}`)

    // Analyze patterns
    const metaResult = detectMetaPatternsFromDex(uniquePairs)

    if (!metaResult) {
      return Response.json({
        confidence: "low",
        meta: "Mixed Market Conditions",
        reasoning: "No clear dominant narrative emerged from recent trending tokens.",
        exampleTokens: [],
        totalTokensAnalyzed: uniquePairs.length,
      })
    }

    console.log(`[v0] Detected meta: ${metaResult.meta} with confidence: ${metaResult.confidence}`)

    return Response.json(metaResult)
  } catch (error) {
    console.error("[v0] Meta of the Day API error:", error)
    return Response.json(
      {
        confidence: "low",
        meta: "Service Error",
        reasoning: "Unable to analyze market narratives at this time.",
        exampleTokens: [],
        totalTokensAnalyzed: 0,
      },
      { status: 200 },
    )
  }
}
