// Trenches classification engine for memecoin analysis
import type { TokenPair } from "./dex-screener"
import type { RiskScore } from "./risk-scorer"

export type TrenchesStatus = "EARLY_TRENCHES" | "DEGEN_ZONE" | "MID_CAP_STABLE" | "HIGH_RUG_RISK"
export type ConfidenceLevel = "LOW" | "MEDIUM" | "HIGH"

export interface TrenchesAnalysis {
  status: TrenchesStatus
  riskScore: number
  confidenceLevel: ConfidenceLevel
  verdict: string
  pairAgeDisplay: string
  liquidity: number
  volume24h: number
  buyPressureRatio: number
  indicators: {
    pairAge: string
    liquidityDepth: string
    volumeToLiquidityRatio: number
    buyPressure: number
    rugRiskLevel: string
  }
  warningBanners: string[]
}

export function analyzeTrenches(token: TokenPair, riskScore: RiskScore): TrenchesAnalysis {
  const liquidityUsd = token.liquidity?.usd || 0
  const volume24h = token.volume?.h24 || 0
  const fdv = token.fdv || 0
  const marketCap = token.marketCap || 0

  // Calculate pair age in various units
  const tokenAgeMs = Date.now() - token.pairCreatedAt * 1000
  const tokenAgeMinutes = tokenAgeMs / (1000 * 60)
  const tokenAgeHours = tokenAgeMs / (1000 * 60 * 60)
  const tokenAgeDays = tokenAgeMs / (1000 * 60 * 60 * 24)

  // Calculate volume to liquidity ratio
  const volumeToLiquidityRatio = liquidityUsd > 0 ? volume24h / liquidityUsd : 0

  // Calculate buy pressure (buy ratio from 24h transactions)
  const h24Buys = token.txns?.h24?.buys || 0
  const h24Sells = token.txns?.h24?.sells || 0
  const totalTxns = h24Buys + h24Sells
  const buyPressure = totalTxns > 0 ? (h24Buys / totalTxns) * 100 : 50

  // Format pair age
  let pairAgeStr = ""
  if (tokenAgeMinutes < 60) {
    pairAgeStr = `${Math.floor(tokenAgeMinutes)}m`
  } else if (tokenAgeHours < 24) {
    pairAgeStr = `${Math.floor(tokenAgeHours)}h`
  } else {
    pairAgeStr = `${Math.floor(tokenAgeDays)}d`
  }

  // Determine trenches status based on multiple factors
  let status: TrenchesStatus
  let verdict: string
  let confidenceLevel: ConfidenceLevel

  const warningBanners: string[] = []

  // Check for extreme rug risk conditions
  if (riskScore.overall > 75 && liquidityUsd < 50000) {
    status = "HIGH_RUG_RISK"
    verdict = "Extreme rug pull risk detected. Multiple critical warning signs present."
    confidenceLevel = "HIGH"
    warningBanners.push("🚨 EXTREME RUG RISK - Very low liquidity with high volatility")
  }
  // Early trenches: brand new, low liquidity, high volume/liquidity ratio
  else if (tokenAgeDays < 1 && liquidityUsd < 100000 && volumeToLiquidityRatio > 0.5) {
    status = "EARLY_TRENCHES"
    verdict = "Early stage token with active trading. High volatility and opportunity."
    confidenceLevel = buyPressure > 55 ? "HIGH" : "MEDIUM"
  }
  // Degen zone: very new, moderate to high volatility, good buy pressure
  else if (tokenAgeDays < 7 && liquidityUsd < 250000 && buyPressure > 50) {
    status = "DEGEN_ZONE"
    verdict = "High risk, high reward zone. Active trading with significant volatility."
    confidenceLevel = "HIGH"
    if (riskScore.volatilityRisk > 70) {
      warningBanners.push("⚠️  Extreme volatility detected - Price swings over 100% in 24h")
    }
  }
  // Mid cap stable: established, decent liquidity, reasonable volume
  else if (tokenAgeDays > 30 && liquidityUsd > 250000 && riskScore.overall < 50) {
    status = "MID_CAP_STABLE"
    verdict = "Established token with stable metrics. Lower risk profile suitable for longer holds."
    confidenceLevel = "HIGH"
  }
  // Default: reassess based on risk profile
  else if (riskScore.overall < 40) {
    status = "MID_CAP_STABLE"
    verdict = "Moderate risk metrics suggest a more stable investment profile."
    confidenceLevel = "MEDIUM"
  } else if (riskScore.overall < 65) {
    status = "DEGEN_ZONE"
    verdict = "Moderate to high risk profile. Suitable for experienced traders only."
    confidenceLevel = "MEDIUM"
    if (volumeToLiquidityRatio > 2) {
      warningBanners.push("⚠️  High volume relative to liquidity - Potential price manipulation")
    }
  } else {
    status = "HIGH_RUG_RISK"
    verdict = "High overall risk score indicates potential safety concerns."
    confidenceLevel = "HIGH"
  }

  // Add specific warning banners based on risk factors
  if (riskScore.redFlags.includes("Brand new token (less than 24 hours)")) {
    warningBanners.push("🆕 Brand new token - Very high uncertainty")
  }
  if (riskScore.redFlags.includes("Very low liquidity")) {
    warningBanners.push("💧 Low liquidity - Slippage and exit risks")
  }
  if (riskScore.redFlags.includes("More sellers than buyers")) {
    warningBanners.push("📉 More sellers than buyers - Negative momentum")
  }

  return {
    status,
    riskScore: riskScore.overall,
    confidenceLevel,
    verdict,
    pairAgeDisplay: pairAgeStr,
    liquidity: liquidityUsd,
    volume24h: volume24h,
    buyPressureRatio: totalTxns > 0 ? h24Buys / h24Sells : 1,
    indicators: {
      pairAge: pairAgeStr,
      liquidityDepth: liquidityUsd > 0 ? `$${(liquidityUsd / 1000).toFixed(0)}K` : "N/A",
      volumeToLiquidityRatio: Math.round(volumeToLiquidityRatio * 100) / 100,
      buyPressure: Math.round(buyPressure),
      rugRiskLevel:
        riskScore.rugPullRisk > 70
          ? "CRITICAL"
          : riskScore.rugPullRisk > 50
            ? "HIGH"
            : riskScore.rugPullRisk > 25
              ? "MEDIUM"
              : "LOW",
    },
    warningBanners,
  }
}

export function getTrenchesStatusColor(status: TrenchesStatus): string {
  switch (status) {
    case "EARLY_TRENCHES":
      return "bg-blue-950 text-blue-400 border-blue-700"
    case "DEGEN_ZONE":
      return "bg-orange-950 text-orange-400 border-orange-700"
    case "MID_CAP_STABLE":
      return "bg-green-950 text-green-400 border-green-700"
    case "HIGH_RUG_RISK":
      return "bg-red-950 text-red-400 border-red-700"
  }
}

export function getTrenchesStatusBadgeColor(status: TrenchesStatus): string {
  switch (status) {
    case "EARLY_TRENCHES":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "DEGEN_ZONE":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "MID_CAP_STABLE":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "HIGH_RUG_RISK":
      return "bg-red-500/20 text-red-400 border-red-500/30"
  }
}
