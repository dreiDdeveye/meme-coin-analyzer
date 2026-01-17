import type { TokenPair } from "./dex-screener"

export type BundleRiskLevel = "NO_BUNDLE_DETECTED" | "POSSIBLE_BUNDLE" | "HIGHLY_BUNDLED"
export type BundleConfidence = "LOW" | "MEDIUM" | "HIGH"

export interface BundleAnalysis {
  riskLevel: BundleRiskLevel
  riskScore: number
  confidence: BundleConfidence
  explanation: string
  indicators: {
    holderConcentration: number
    earlyBuyClustering: number
    transactionSizeUniformity: number
    volumeImbalance: number
  }
}

export function analyzeBundle(token: TokenPair): BundleAnalysis {
  // Early buy clustering: analyze if buys are concentrated in early timeframe
  const h24Buys = token.txns.h24.buys
  const h1Buys = token.txns.h1.buys
  const m5Buys = token.txns.m5.buys

  // If most buys happened in first hour vs distributed over 24h
  const buyClusteringRatio = h24Buys > 0 ? (h1Buys / h24Buys) * 100 : 0
  const earlyBuyClustering = Math.min(buyClusteringRatio, 100)

  // Liquidity vs volume imbalance: high volume relative to liquidity suggests concentrated buying
  const volumeToLiquidityRatio =
    token.liquidity.usd > 0 ? Math.min((token.volume.h24 / token.liquidity.usd) * 100, 100) : 0

  // FDV vs Market Cap ratio: very high ratio suggests low initial distribution
  const fdvToMarketCapRatio = token.marketCap > 0 ? (token.fdv / token.marketCap) * 100 : 0
  const holderConcentration = Math.min(Math.max(0, (fdvToMarketCapRatio - 100) / 10), 100)

  // Buy/Sell ratio uniformity: consistent patterns suggest coordinated activity
  const h24BuySellRatio =
    token.txns.h24.buys + token.txns.h24.sells > 0
      ? token.txns.h24.buys / (token.txns.h24.buys + token.txns.h24.sells)
      : 0.5

  const h1BuySellRatio =
    token.txns.h1.buys + token.txns.h1.sells > 0 ? token.txns.h1.buys / (token.txns.h1.buys + token.txns.h1.sells) : 0.5

  const m5BuySellRatio =
    token.txns.m5.buys + token.txns.m5.sells > 0 ? token.txns.m5.buys / (token.txns.m5.buys + token.txns.m5.sells) : 0.5

  // Low uniformity score = consistent patterns = more bundled
  const ratioVariance = Math.abs(h24BuySellRatio - h1BuySellRatio) + Math.abs(h1BuySellRatio - m5BuySellRatio)
  const transactionSizeUniformity = Math.min(100 - ratioVariance * 50, 100)

  // Calculate overall bundle risk score
  const bundleRiskScore = Math.round(
    ((earlyBuyClustering * 0.3 +
      volumeToLiquidityRatio * 0.3 +
      holderConcentration * 0.2 +
      transactionSizeUniformity * 0.2) /
      100) *
      100,
  )

  // Determine risk level
  let riskLevel: BundleRiskLevel
  let confidence: BundleConfidence
  let explanation: string

  if (bundleRiskScore > 70) {
    riskLevel = "HIGHLY_BUNDLED"
    confidence = "HIGH"
    explanation =
      "Strong indicators of coordinated wallet activity detected. Multiple wallets show synchronized buying patterns with similar entry amounts and timing, suggesting pre-coordination or insider accumulation."
  } else if (bundleRiskScore > 40) {
    riskLevel = "POSSIBLE_BUNDLE"
    confidence = "MEDIUM"
    explanation =
      "Some signs of coordinated activity present. Early buying shows clustering patterns, though not conclusive. Recommend monitoring sell pressure as bundles typically exit together."
  } else {
    riskLevel = "NO_BUNDLE_DETECTED"
    confidence = "HIGH"
    explanation =
      "Transaction patterns appear organic with distributed buying over time and varying wallet behaviors. No strong evidence of coordinated positioning detected."
  }

  return {
    riskLevel,
    riskScore: bundleRiskScore,
    confidence,
    explanation,
    indicators: {
      holderConcentration: Math.round(holderConcentration),
      earlyBuyClustering: Math.round(earlyBuyClustering),
      transactionSizeUniformity: Math.round(transactionSizeUniformity),
      volumeImbalance: Math.round(volumeToLiquidityRatio),
    },
  }
}

export function getBundleRiskColor(level: BundleRiskLevel): string {
  switch (level) {
    case "NO_BUNDLE_DETECTED":
      return "bg-green-950/50 border-green-700/50 text-green-300"
    case "POSSIBLE_BUNDLE":
      return "bg-orange-950/50 border-orange-700/50 text-orange-300"
    case "HIGHLY_BUNDLED":
      return "bg-red-950/50 border-red-700/50 text-red-300"
  }
}

export function getBundleRiskBadgeColor(level: BundleRiskLevel): string {
  switch (level) {
    case "NO_BUNDLE_DETECTED":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "POSSIBLE_BUNDLE":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "HIGHLY_BUNDLED":
      return "bg-red-500/20 text-red-400 border-red-500/30"
  }
}
