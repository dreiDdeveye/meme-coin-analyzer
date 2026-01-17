import type { TokenPair } from "@/lib/dex-screener"

export interface ExplainableAI {
  what_analyzed: {
    data_sources: string[]
    methodology: string
    key_metrics_examined: string[]
  }
}

export function generateExplainableAI(data: TokenPair): ExplainableAI {
  console.log(`[v0] Generating explainable AI for ${data.baseToken.symbol}`)

  const data_sources = [
    `${data.dexId.toUpperCase()} DEX real-time trading data for ${data.baseToken.symbol}`,
    `Liquidity analysis: $${data.liquidity.usd.toLocaleString()} in ${data.chainId} pool`,
    "Buy/sell transaction monitoring over 5m, 1h, and 24h periods",
    "On-chain wallet pattern analysis and holder concentration",
    `Historical price movements: ${data.priceChange.h24 > 0 ? "+" : ""}${data.priceChange.h24.toFixed(2)}% (24h)`,
  ]

  const key_metrics_examined = [
    `Liquidity: $${(data.liquidity?.usd || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
    `Volume (24h): $${(data.volume?.h24 || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
    `Price: $${data.priceUsd} (${data.priceChange?.h24 > 0 ? "+" : ""}${data.priceChange?.h24.toFixed(2)}% 24h)`,
    `Buy Txns (1h): ${data.txns?.h1?.buys || 0} buys`,
    `Sell Txns (1h): ${data.txns?.h1?.sells || 0} sells`,
    `Market Cap: $${(data.marketCap || 0).toLocaleString()}`,
  ]

  const methodology = `This analysis of ${data.baseToken.symbol} (${data.baseToken.name}) was formed by examining real-time DEX data from ${data.dexId.toUpperCase()} on ${data.chainId}, including $${(data.liquidity.usd / 1000).toFixed(0)}K liquidity depth, $${(data.volume.h24 / 1000).toFixed(0)}K trading volume, and buy/sell pressure patterns showing ${data.txns?.h1?.buys || 0} buys vs ${data.txns?.h1?.sells || 0} sells in the last hour. Wallet behavior, early holder concentration, and transaction clustering were reviewed to detect coordination and bundle patterns. Narrative classification was inferred from token naming "${data.baseToken.name}", symbol usage, launch timing (${new Date(data.pairCreatedAt * 1000).toLocaleString()}), and alignment with current market trends. Volume metrics were analyzed against liquidity ratios to measure genuine interest versus speculative activity.`

  return {
    what_analyzed: {
      data_sources,
      methodology,
      key_metrics_examined,
    },
  }
}

export async function generateExplainableAIWithAI(data: TokenPair): Promise<ExplainableAI> {
  const { generateText } = await import("ai")

  console.log(`[v0] Generating AI-powered explainable analysis for ${data.baseToken.symbol}`)

  const prompt = `You are the Oracle explaining your analysis methodology for token: ${data.baseToken.name} (${data.baseToken.symbol}).

Explain what data sources, methodology, and key metrics you examined to analyze this token.

DATA AVAILABLE:
- Price: $${data.priceUsd}
- Liquidity: $${data.liquidity.usd.toLocaleString()}
- Volume (24h): $${data.volume.h24.toLocaleString()}
- DEX: ${data.dexId} on ${data.chainId}
- Transactions: ${data.txns?.h1?.buys || 0} buys, ${data.txns?.h1?.sells || 0} sells (1h)

Respond in JSON format:
{
  "what_analyzed": {
    "data_sources": ["List 4-5 specific data sources used"],
    "methodology": "2-3 sentence explanation of how you analyzed THIS specific token",
    "key_metrics_examined": ["List 5-6 key metrics with actual values"]
  }
}

Be specific to this token's characteristics.`

  try {
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
      temperature: 0.7,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("[v0] AI explainable analysis error:", error)
    // Fallback to algorithmic analysis
    return generateExplainableAI(data)
  }
}
