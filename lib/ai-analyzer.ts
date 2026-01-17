import type { TokenPair } from "./dex-screener"
import type { TrenchesAnalysis } from "./trenches-analyzer"
import type { NarrativeAnalysis } from "./narrative-analyzer"

export interface AIAnalyzerThoughts {
  summary: string
  riskFactors: string[]
  opportunities: string[]
  tradingContext: string
}

// Groq API - FREE, no credit card required
// Get your free API key at: https://console.groq.com
// Limits: 14,400 requests/day, 6,000 tokens/min
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

export async function generateAIAnalyzerThoughts(
  token: TokenPair,
  trenches: TrenchesAnalysis,
  narrative: NarrativeAnalysis,
): Promise<AIAnalyzerThoughts> {
  console.log(`[v0] Generating AI thoughts for ${token.baseToken.symbol}`)

  // Check if Groq API key is configured
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.GROQ_API_KEY
  if (!apiKey) {
    console.warn("[v0] GROQ_API_KEY not configured, using fallback analysis")
    console.warn("[v0] Get your FREE API key at: https://console.groq.com")
    return generateFallbackThoughts(token, trenches, narrative)
  }

  const prompt = `You are the Oracle, an expert memecoin analyst analyzing Solana trenches tokens. Analyze this token and provide specific, actionable insights.

TOKEN DATA:
- Name: ${token.baseToken.name}
- Symbol: ${token.baseToken.symbol}
- Price: $${token.priceUsd}
- Market Cap: $${token.marketCap?.toLocaleString() || "N/A"}
- Liquidity: $${token.liquidity.usd.toLocaleString()}
- Volume (24h): $${token.volume.h24.toLocaleString()}
- Price Change (24h): ${token.priceChange.h24.toFixed(2)}%
- Buys (1h): ${token.txns?.h1?.buys || 0}
- Sells (1h): ${token.txns?.h1?.sells || 0}
- Chain: ${token.chainId}
- DEX: ${token.dexId}
- Age: ${((Date.now() - token.pairCreatedAt * 1000) / (1000 * 60 * 60)).toFixed(1)} hours

ANALYSIS DATA:
- Risk Score: ${trenches.riskScore}/100
- Status: ${trenches.status}
- Buy Pressure: ${trenches.indicators.buyPressure}%
- Narrative: ${narrative.tags.join(", ")} (${narrative.confidence} confidence)

Provide analysis in this exact JSON format (no markdown, no code blocks, just raw JSON):
{
  "summary": "2-3 sentence overall assessment with specific numbers and trading context",
  "riskFactors": ["3-5 specific risk factors with actual data points"],
  "opportunities": ["2-4 specific opportunities if they exist"],
  "tradingContext": "2-3 sentences on market conditions, timing, and trader considerations"
}

Be specific, use actual numbers from the data, and make each analysis unique to this token's characteristics.`

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Fast & powerful, free on Groq
        messages: [
          {
            role: "system",
            content: "You are the Oracle, a mystical memecoin analyst. Always respond with valid JSON only, no markdown or code blocks."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Groq API error:", response.status, errorText)
      return generateFallbackThoughts(token, trenches, narrative)
    }

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content || ""
    
    // Clean the response - remove any markdown code blocks if present
    const cleanedText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim()

    const parsed = JSON.parse(cleanedText)
    return parsed
  } catch (error) {
    console.error("[v0] AI analysis failed:", error)
    return generateFallbackThoughts(token, trenches, narrative)
  }
}

function generateFallbackThoughts(
  token: TokenPair,
  trenches: TrenchesAnalysis,
  narrative: NarrativeAnalysis,
): AIAnalyzerThoughts {
  const priceChange = token.priceChange.h24
  const liquidityUsd = token.liquidity.usd
  const volumeUsd = token.volume.h24
  const buyPressure = trenches.indicators.buyPressure
  const riskScore = trenches.riskScore

  // Generate dynamic summary based on data
  let summaryTone = ""
  if (riskScore < 30) {
    summaryTone = "showing relatively stable metrics"
  } else if (riskScore < 60) {
    summaryTone = "exhibiting moderate volatility"
  } else {
    summaryTone = "displaying high-risk characteristics"
  }

  // Build risk factors based on actual data
  const riskFactors: string[] = []
  
  if (liquidityUsd < 10000) {
    riskFactors.push(`Very low liquidity ($${liquidityUsd.toLocaleString()}) - high slippage risk`)
  } else if (liquidityUsd < 50000) {
    riskFactors.push(`Limited liquidity ($${liquidityUsd.toLocaleString()}) - moderate slippage expected`)
  }

  if (Math.abs(priceChange) > 50) {
    riskFactors.push(`Extreme volatility: ${priceChange > 0 ? "+" : ""}${priceChange.toFixed(2)}% in 24h`)
  } else if (Math.abs(priceChange) > 20) {
    riskFactors.push(`High volatility: ${priceChange > 0 ? "+" : ""}${priceChange.toFixed(2)}% price swing`)
  }

  if (buyPressure < 30) {
    riskFactors.push(`Low buy pressure (${buyPressure}%) - selling dominance detected`)
  }

  if (riskScore > 70) {
    riskFactors.push(`High risk score (${riskScore}/100) - exercise extreme caution`)
  }

  // Ensure at least 2 risk factors
  if (riskFactors.length < 2) {
    riskFactors.push(`Market cap: $${token.marketCap?.toLocaleString() || "Unknown"}`)
    riskFactors.push(`24h volume: $${volumeUsd.toLocaleString()}`)
  }

  // Build opportunities based on positive signals
  const opportunities: string[] = []
  
  if (buyPressure > 60) {
    opportunities.push(`Strong buy pressure (${buyPressure}%) indicates accumulation`)
  }
  
  if (priceChange < -20 && liquidityUsd > 20000) {
    opportunities.push(`Potential dip buy - ${Math.abs(priceChange).toFixed(1)}% pullback with decent liquidity`)
  }
  
  if (volumeUsd > liquidityUsd * 2) {
    opportunities.push(`High volume-to-liquidity ratio suggests active trading interest`)
  }

  if (narrative.confidence.toLowerCase() === "high") {
    opportunities.push(`Strong ${narrative.tags[0]} narrative with high confidence`)
  }

  // Trading context
  let tradingContext = ""
  if (buyPressure > 50) {
    tradingContext = `Currently seeing ${buyPressure}% buy pressure with `
  } else {
    tradingContext = `Sell pressure dominant at ${100 - buyPressure}% with `
  }
  tradingContext += `$${volumeUsd.toLocaleString()} 24h volume. `
  tradingContext += riskScore > 50 
    ? "High-risk environment - small position sizes recommended." 
    : "Moderate conditions - standard risk management applies."

  return {
    summary: `${token.baseToken.symbol} trading at $${token.priceUsd} ${summaryTone}. Risk score of ${riskScore}/100 with ${narrative.tags[0] || "unknown"} narrative (${narrative.confidence.toLowerCase()} confidence). ${priceChange > 0 ? "Bullish" : "Bearish"} momentum over 24h.`,
    riskFactors,
    opportunities: opportunities.length > 0 ? opportunities : ["No clear opportunities identified - observe and wait"],
    tradingContext,
  }
}