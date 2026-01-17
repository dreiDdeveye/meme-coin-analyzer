// Find Gems - discovers early-stage opportunities with multi-factor scoring
import type { TokenPair } from "@/lib/dex-screener"

export interface GemScore {
  token: {
    symbol: string
    name: string
    mint?: string
    address?: string
  }
  score: number
  status: "EARLY" | "WATCH" | "SKIP"
  factors: {
    pumpTraction: number
    dexMomentum: number
    bundleRisk: number
    narrativeStrength: number
    volumeTrend: number
  }
  reasoning: string
  source: "dex"
  riskLevel: "low" | "medium" | "high" | "extreme"
}

export function calculateGemScore(dexData: TokenPair): GemScore | null {
  if (!dexData) {
    return null
  }

  const symbol = dexData.baseToken.symbol
  const name = dexData.baseToken.name
  const address = dexData.baseToken.address

  // Score based on DEX metrics
  let dexMomentum = 0

  // Volume scoring
  if (dexData.volume?.h24) {
    dexMomentum += Math.min((dexData.volume.h24 / 100000) * 100, 40)
  }

  // Price momentum scoring
  if (dexData.priceChange?.h1) {
    if (dexData.priceChange.h1 > 10) dexMomentum += 30
    else if (dexData.priceChange.h1 > 5) dexMomentum += 15
  }

  // Liquidity scoring
  if (dexData.liquidity?.usd && dexData.liquidity.usd > 50000) {
    dexMomentum += 30
  }

  // Bundle risk assessment
  let bundleRisk = 0
  const fdvToMcRatio = dexData.fdv / Math.max(dexData.marketCap, 1)
  if (fdvToMcRatio < 1.5) {
    bundleRisk = 10
  } else if (fdvToMcRatio < 3) {
    bundleRisk = 40
  } else {
    bundleRisk = 80
  }

  // Narrative strength
  let narrativeStrength = 0
  const text = `${name} ${symbol}`.toLowerCase()
  const strongNarratives = ["ai", "agent", "defi", "gaming", "nft", "meme", "utility"]
  for (const narrative of strongNarratives) {
    if (text.includes(narrative)) {
      narrativeStrength += 20
    }
  }
  narrativeStrength = Math.min(narrativeStrength, 100)

  // Volume trend analysis
  let volumeTrend = 0
  if (dexData.volume) {
    const h1Vol = dexData.volume.h1 || 0
    const h24Vol = dexData.volume.h24 || 1
    const trend = h1Vol / Math.max(h24Vol / 24, 1)
    if (trend > 2) volumeTrend = 80
    else if (trend > 1.5) volumeTrend = 60
    else if (trend > 1) volumeTrend = 40
    else volumeTrend = 20
  }

  // Transaction velocity (buy pressure)
  let pumpTraction = 0
  if (dexData.txns?.h1) {
    const buyRatio = dexData.txns.h1.buys / Math.max(dexData.txns.h1.sells, 1)
    if (buyRatio > 1.5) pumpTraction += 60
    else if (buyRatio > 1.2) pumpTraction += 40
    else if (buyRatio > 1) pumpTraction += 20
  }

  // Calculate composite score
  const weights = {
    pumpTraction: 0.2,
    dexMomentum: 0.4,
    narrativeStrength: 0.2,
    volumeTrend: 0.2,
  }

  const score =
    (pumpTraction * weights.pumpTraction +
      dexMomentum * weights.dexMomentum +
      narrativeStrength * weights.narrativeStrength +
      volumeTrend * weights.volumeTrend) *
    (1 - bundleRisk / 200)

  // Determine status
  let status: "EARLY" | "WATCH" | "SKIP"
  if (score > 70) status = "EARLY"
  else if (score > 40) status = "WATCH"
  else status = "SKIP"

  // Determine risk level
  let riskLevel: "low" | "medium" | "high" | "extreme"
  if (bundleRisk > 70) riskLevel = "extreme"
  else if (bundleRisk > 50) riskLevel = "high"
  else if (bundleRisk > 25) riskLevel = "medium"
  else riskLevel = "low"

  // Generate reasoning
  let reasoning = `This token scores ${Math.round(score)}/100 based on `
  const factors = []
  if (pumpTraction > 50) factors.push(`strong buy pressure (${Math.round(pumpTraction)}/100)`)
  if (dexMomentum > 50) factors.push(`solid DEX momentum (${Math.round(dexMomentum)}/100)`)
  if (narrativeStrength > 50) factors.push(`compelling narrative`)
  if (bundleRisk < 30) factors.push(`low bundle risk`)

  if (factors.length > 0) {
    reasoning += factors.join(", ") + "."
  } else {
    reasoning += `mixed signals across metrics.`
  }

  return {
    token: { symbol, name, address },
    score: Math.round(score),
    status,
    factors: {
      pumpTraction: Math.round(pumpTraction),
      dexMomentum: Math.round(dexMomentum),
      bundleRisk,
      narrativeStrength: Math.round(narrativeStrength),
      volumeTrend: Math.round(volumeTrend),
    },
    reasoning,
    source: "dex",
    riskLevel,
  }
}

export function calculateGemScoreFromDex(dexData: TokenPair): GemScore | null {
  return calculateGemScore(dexData)
}

export function findTopGems(gems: GemScore[]): GemScore[] {
  return gems
    .filter((g) => g.status !== "SKIP")
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
}
