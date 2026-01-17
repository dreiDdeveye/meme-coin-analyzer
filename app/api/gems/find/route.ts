import { calculateGemScoreFromDex, findTopGems } from "@/lib/gem-finder"

export async function GET() {
  try {
    console.log("[v0] Fetching tokens from DEX Screener for gem analysis...")

    const allPairs: any[] = []

    // Strategy 1: Get latest boosted tokens (these are often new launches)
    try {
      const boostsResponse = await fetch("https://api.dexscreener.com/token-boosts/latest/v1", {
        headers: { Accept: "application/json" },
      })

      if (boostsResponse.ok) {
        const boosts = await boostsResponse.json()
        console.log(`[v0] Fetched ${boosts?.length || 0} boosted tokens`)

        // For each boosted token, get its pairs
        if (Array.isArray(boosts)) {
          for (const boost of boosts.slice(0, 10)) {
            try {
              const pairsResponse = await fetch(
                `https://api.dexscreener.com/token-pairs/v1/${boost.chainId}/${boost.tokenAddress}`,
                { headers: { Accept: "application/json" } },
              )
              if (pairsResponse.ok) {
                const pairs = await pairsResponse.json()
                if (Array.isArray(pairs)) {
                  allPairs.push(...pairs)
                }
              }
            } catch (error) {
              console.log(`[v0] Failed to fetch pairs for boost:`, error)
            }
          }
        }
      }
    } catch (error) {
      console.log("[v0] Failed to fetch boosted tokens:", error)
    }

    // Strategy 2: Search for common memecoin patterns
    const searchQueries = ["pepe", "doge", "inu", "elon", "shib", "wojak", "chad"]

    for (const query of searchQueries) {
      try {
        const searchResponse = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${query}`, {
          headers: { Accept: "application/json" },
        })

        if (searchResponse.ok) {
          const data = await searchResponse.json()
          if (data.pairs && Array.isArray(data.pairs)) {
            allPairs.push(...data.pairs.slice(0, 5))
          }
        }
      } catch (error) {
        console.log(`[v0] Failed to search for ${query}:`, error)
      }
    }

    console.log(`[v0] Total pairs collected: ${allPairs.length}`)

    if (allPairs.length === 0) {
      return Response.json({
        gems: [],
        message: "No tokens available for analysis at this time",
        totalAnalyzed: 0,
        timestamp: Date.now(),
      })
    }

    // Filter for recent pairs (created in last 7 days) with decent activity
    const now = Date.now()
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000

    const recentPairs = allPairs.filter((pair: any) => {
      const pairAge = pair.pairCreatedAt ? pair.pairCreatedAt * 1000 : 0
      const isRecent = pairAge > sevenDaysAgo
      const hasVolume = pair.volume?.h24 && pair.volume.h24 > 500
      const hasLiquidity = pair.liquidity?.usd && pair.liquidity.usd > 2000

      return isRecent && hasVolume && hasLiquidity
    })

    console.log(`[v0] Found ${recentPairs.length} recent pairs (< 7 days old) with activity`)

    if (recentPairs.length === 0) {
      return Response.json({
        gems: [],
        message: "No qualifying new tokens found (need recent launch, volume > $500, liquidity > $2K)",
        totalAnalyzed: allPairs.length,
        timestamp: Date.now(),
      })
    }

    // Calculate gem scores for recent pairs
    const gemScores = recentPairs
      .map((pair: any) => calculateGemScoreFromDex(pair))
      .filter((gem: any) => gem !== null && gem.status !== "SKIP")

    console.log(`[v0] Calculated ${gemScores.length} valid gem scores`)

    // Find top gems
    const topGems = findTopGems(gemScores as any[])

    console.log(`[v0] Returning top ${topGems.length} gems`)

    return Response.json({
      gems: topGems.slice(0, 5),
      totalAnalyzed: recentPairs.length,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("[v0] Find Gems API error:", error)
    return Response.json(
      {
        gems: [],
        message: "Gem analysis temporarily unavailable",
        totalAnalyzed: 0,
        timestamp: Date.now(),
      },
      { status: 200 },
    )
  }
}
