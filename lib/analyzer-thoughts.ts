import type { TokenPair } from "./dex-screener"
import type { TrenchesAnalysis } from "./trenches-analyzer"
import type { BundleAnalysis } from "./bundle-checker"
import type { NarrativeAnalysis } from "./narrative-analyzer"

export interface AnalyzerThoughts {
  summary: string
  riskFactors: string[]
  opportunities: string[]
  tradingContext: string
}

export async function generateAnalyzerThoughtsWithAI(
  token: TokenPair,
  trenches: TrenchesAnalysis,
  bundle: BundleAnalysis,
  narrative: NarrativeAnalysis,
): Promise<AnalyzerThoughts> {
  const { generateText } = await import("ai")

  console.log(`[v0] Generating AI-powered thoughts for ${token.baseToken.symbol}`)

  const prompt = `You are the Oracle, an expert Solana memecoin analyst. Analyze this token and provide unique, specific insights.

TOKEN: ${token.baseToken.name} (${token.baseToken.symbol})
Price: $${token.priceUsd} | MCap: $${token.marketCap?.toLocaleString() || "N/A"}
Liquidity: $${token.liquidity.usd.toLocaleString()} | Volume 24h: $${token.volume.h24.toLocaleString()}
24h Change: ${token.priceChange.h24.toFixed(2)}% | Buys: ${token.txns?.h1?.buys || 0} | Sells: ${token.txns?.h1?.sells || 0}
Risk: ${trenches.riskScore}/100 | Buy Pressure: ${trenches.indicators.buyPressure}%
Narrative: ${narrative.tags.join(", ")} (${narrative.confidence})
Bundle Risk: ${bundle.riskLevel}

Provide detailed analysis as JSON:
{
  "summary": "Unique 2-3 sentence assessment with specific numbers and context for THIS token",
  "riskFactors": ["List 3-5 SPECIFIC risks with actual data points"],
  "opportunities": ["List 2-4 SPECIFIC opportunities if they exist"],
  "tradingContext": "2-3 sentences on market timing and trader considerations specific to this token"
}

Make each analysis completely unique - reference the token name, specific metrics, and provide actionable insights.`

  try {
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
      temperature: 0.8,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("[v0] AI analysis error:", error)
    // Fallback to algorithmic analysis
    return generateAnalyzerThoughts(token, trenches, bundle, narrative)
  }
}

export function generateAnalyzerThoughts(
  token: TokenPair,
  trenches: TrenchesAnalysis,
  bundle: BundleAnalysis,
  narrative: NarrativeAnalysis,
): AnalyzerThoughts {
  console.log(`[v0] Generating thoughts for ${token.baseToken.symbol} (${token.baseToken.name})`)
  console.log(`[v0] Price: $${token.priceUsd}, Liquidity: $${token.liquidity.usd.toLocaleString()}`)

  const riskFactors: string[] = []
  const opportunities: string[] = []

  if (bundle.riskLevel === "HIGHLY_BUNDLED") {
    riskFactors.push(
      `${token.baseToken.symbol}: Concentrated early holder positions suggest exit risk if bundles rotate`,
    )
  }
  if (bundle.riskLevel === "POSSIBLE_BUNDLE") {
    riskFactors.push(
      `${token.baseToken.symbol}: Some early holder concentration detected; monitor for synchronized selling`,
    )
  }

  if (trenches.riskScore > 70) {
    riskFactors.push(
      `${token.baseToken.symbol}: Overall risk profile elevated at ${trenches.riskScore}/100 across multiple metrics`,
    )
  }

  if (token.liquidity.usd < 50000) {
    riskFactors.push(
      `${token.baseToken.symbol}: Low liquidity of $${token.liquidity.usd.toLocaleString()} creates slippage risk`,
    )
  }

  if (token.priceChange.h24 < -30) {
    riskFactors.push(
      `${token.baseToken.symbol}: Down ${Math.abs(token.priceChange.h24).toFixed(1)}% in 24h indicates selling pressure`,
    )
  }

  if (trenches.indicators.buyPressure < 45) {
    riskFactors.push(
      `${token.baseToken.symbol}: Only ${trenches.indicators.buyPressure}% buy pressure - more sellers than buyers`,
    )
  }

  if (trenches.status === "EARLY_TRENCHES" && bundle.riskLevel !== "HIGHLY_BUNDLED") {
    opportunities.push(
      `${token.baseToken.symbol}: Early-stage entry at $${token.priceUsd} with organic buying patterns`,
    )
  }

  if (narrative.confidence === "HIGH" && trenches.riskScore < 50) {
    opportunities.push(
      `${token.baseToken.symbol}: Strong ${narrative.tags[0]} narrative with acceptable risk score of ${trenches.riskScore}/100`,
    )
  }

  if (token.priceChange.h24 > 50 && trenches.indicators.buyPressure > 60) {
    opportunities.push(
      `${token.baseToken.symbol}: Up ${token.priceChange.h24.toFixed(1)}% with ${trenches.indicators.buyPressure}% buy pressure`,
    )
  }

  if (
    token.volume.h24 > token.liquidity.usd * 2 &&
    trenches.indicators.buyPressure > 55 &&
    bundle.riskLevel === "NO_BUNDLE_DETECTED"
  ) {
    opportunities.push(
      `${token.baseToken.symbol}: $${(token.volume.h24 / 1000).toFixed(0)}K volume with distributed buying`,
    )
  }

  // Generate trading context summary
  const tradingContext = generateTradingContext(token, trenches, bundle, narrative)

  // Generate overall summary
  const summary = generateThoughtsSummary(token, trenches, bundle, narrative, riskFactors, opportunities)

  return {
    summary,
    riskFactors,
    opportunities,
    tradingContext,
  }
}

function generateTradingContext(
  token: TokenPair,
  trenches: TrenchesAnalysis,
  bundle: BundleAnalysis,
  narrative: NarrativeAnalysis,
): string {
  const pairAgeHours = (Date.now() - token.pairCreatedAt * 1000) / (1000 * 60 * 60)
  const volumeToLiq = trenches.indicators.volumeToLiquidityRatio

  let context = `${token.baseToken.symbol} (${token.baseToken.name}) trading at $${token.priceUsd} on ${token.chainId.toUpperCase()}. `

  if (pairAgeHours < 2) {
    context += `Fresh ${pairAgeHours.toFixed(1)}h old launch with high uncertainty. Early entries face maximum risk but potential for significant upside if narrative gains traction. `
  } else if (pairAgeHours < 12) {
    context += `${pairAgeHours.toFixed(1)}h since launch - still in early trading phase with active price discovery. Momentum can swing quickly. `
  } else if (pairAgeHours < 48) {
    context += `${(pairAgeHours / 24).toFixed(1)} days old, still establishing support levels and key trading ranges. `
  } else {
    context += `${(pairAgeHours / 24).toFixed(0)} days since launch - passed initial hype phase. Persistence suggests strong fundamentals or continued narrative appeal. `
  }

  if (volumeToLiq > 3) {
    context += `$${(token.volume.h24 / 1000).toFixed(0)}K volume vs $${(token.liquidity.usd / 1000).toFixed(0)}K liquidity (${volumeToLiq.toFixed(1)}x ratio) creates fast moves but slippery entries/exits. `
  } else if (volumeToLiq < 0.5) {
    context += `Low ${volumeToLiq.toFixed(2)}x volume-to-liquidity ratio suggests low activity - expect slower price moves. `
  }

  if (narrative.confidence === "HIGH") {
    context += `The ${narrative.tags[0]} narrative is resonating with the market, which typically sustains interest in this phase.`
  } else {
    context +=
      "Narrative positioning is unclear, so success depends more on technical trading patterns than thematic conviction."
  }

  return context
}

function generateThoughtsSummary(
  token: TokenPair,
  trenches: TrenchesAnalysis,
  bundle: BundleAnalysis,
  narrative: NarrativeAnalysis,
  riskFactors: string[],
  opportunities: string[],
): string {
  const buyPressure = trenches.indicators.buyPressure
  const bundleContext = bundle.riskLevel === "NO_BUNDLE_DETECTED" ? "organic" : "potentially coordinated"
  const narrativeStrength = narrative.confidence === "HIGH" ? "strong" : "weak"

  let summary = `${token.baseToken.symbol} analysis: `

  // Opening assessment
  if (trenches.status === "EARLY_TRENCHES" || trenches.status === "DEGEN_ZONE") {
    summary += `Early phase token at $${token.priceUsd} with ${bundleContext} buying patterns and ${narrativeStrength} ${narrative.tags[0]} narrative. `
  } else if (trenches.status === "MID_CAP_STABLE") {
    summary += `Matured token with $${(token.marketCap / 1000000).toFixed(2)}M mcap and ${narrativeStrength} narrative maintaining interest. `
  } else {
    summary += `Risk score ${trenches.riskScore}/100 with elevated metrics across multiple factors - caution warranted. `
  }

  // Middle assessment with specific numbers
  if (buyPressure > 55) {
    summary += `${buyPressure}% buy pressure (${token.txns?.h1?.buys || 0} buys vs ${token.txns?.h1?.sells || 0} sells in last hour) suggests continued strength or potential exhaustion soon. `
  } else if (buyPressure < 45) {
    summary += `Only ${buyPressure}% buy pressure indicates distribution or weakening conviction. `
  } else {
    summary += `Balanced ${buyPressure}% buy pressure suggests price equilibrium without strong directional conviction. `
  }

  // Risk-specific insights
  if (bundle.riskLevel === "HIGHLY_BUNDLED") {
    summary += `Bundled wallet structure introduces exit risk—coordinated sales could trigger cascading liquidation. `
  }

  // Closing context
  if (opportunities.length > 0 && riskFactors.length < 2) {
    summary += `${opportunities.length} opportunities identified with manageable risk for experienced traders.`
  } else if (riskFactors.length > 3) {
    summary += `${riskFactors.length} risk factors detected—setup for experienced traders only with strict position sizing.`
  } else {
    summary += `Mixed signals with ${opportunities.length} opportunities and ${riskFactors.length} risks requiring careful execution.`
  }

  return summary
}
