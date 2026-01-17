// Risk scoring engine for memecoin analysis
import type { TokenPair } from "./dex-screener"

export interface RiskScore {
  overall: number // 0-100, higher is riskier
  rugPullRisk: number
  liquidityRisk: number
  volumeRisk: number
  ageRisk: number
  volatilityRisk: number
  redFlags: string[]
  safetyLevel: "SAFE" | "CAUTION" | "RISKY" | "EXTREME"
}

export function calculateRiskScore(token: TokenPair): RiskScore {
  const redFlags: string[] = []
  const scores = {
    rugPullRisk: 0,
    liquidityRisk: 0,
    volumeRisk: 0,
    ageRisk: 0,
    volatilityRisk: 0,
  }

  // Check liquidity
  const liquidityUsd = token.liquidity?.usd || 0
  if (liquidityUsd < 10000) {
    scores.liquidityRisk = 100
    redFlags.push("Very low liquidity")
  } else if (liquidityUsd < 50000) {
    scores.liquidityRisk = 75
    redFlags.push("Low liquidity")
  } else if (liquidityUsd < 100000) {
    scores.liquidityRisk = 50
  } else if (liquidityUsd < 500000) {
    scores.liquidityRisk = 25
  }

  // Check FDV (Fully Diluted Valuation)
  const fdv = token.fdv || 0
  if (fdv === 0 || fdv > 1000000000) {
    scores.rugPullRisk += 30
    redFlags.push("Extremely high or unknown FDV")
  } else if (fdv < 50000) {
    scores.rugPullRisk += 20
    redFlags.push("Very low FDV")
  }

  // Check volume
  const h24Volume = token.volume?.h24 || 0
  if (h24Volume < 5000) {
    scores.volumeRisk = 80
    redFlags.push("Very low 24h volume")
  } else if (h24Volume < 20000) {
    scores.volumeRisk = 60
  } else if (h24Volume < 100000) {
    scores.volumeRisk = 40
  } else if (h24Volume < 500000) {
    scores.volumeRisk = 20
  }

  // Check token age
  const tokenAgeMs = Date.now() - token.pairCreatedAt * 1000
  const tokenAgeDays = tokenAgeMs / (1000 * 60 * 60 * 24)
  if (tokenAgeDays < 1) {
    scores.ageRisk = 100
    redFlags.push("Brand new token (less than 24 hours)")
  } else if (tokenAgeDays < 7) {
    scores.ageRisk = 80
    redFlags.push("Very new token (less than 7 days)")
  } else if (tokenAgeDays < 30) {
    scores.ageRisk = 50
  } else if (tokenAgeDays < 90) {
    scores.ageRisk = 25
  }

  // Check volatility (price changes)
  const h24PriceChange = Math.abs(token.priceChange?.h24 || 0)
  if (h24PriceChange > 300) {
    scores.volatilityRisk = 90
    redFlags.push("Extreme volatility (>300% in 24h)")
  } else if (h24PriceChange > 100) {
    scores.volatilityRisk = 75
    redFlags.push("Very high volatility (>100% in 24h)")
  } else if (h24PriceChange > 50) {
    scores.volatilityRisk = 50
  } else if (h24PriceChange > 20) {
    scores.volatilityRisk = 25
  }

  // Check buy/sell ratio
  const h24Buys = token.txns?.h24?.buys || 0
  const h24Sells = token.txns?.h24?.sells || 0
  const totalTxns = h24Buys + h24Sells
  if (totalTxns > 0) {
    const buyRatio = h24Buys / totalTxns
    if (buyRatio < 0.3) {
      scores.rugPullRisk += 25
      redFlags.push("More sellers than buyers")
    } else if (buyRatio < 0.4) {
      scores.rugPullRisk += 10
    }
  }

  // Calculate overall score (weighted average)
  const overall = Math.round(
    (scores.rugPullRisk * 0.3 +
      scores.liquidityRisk * 0.25 +
      scores.volumeRisk * 0.2 +
      scores.ageRisk * 0.15 +
      scores.volatilityRisk * 0.1) /
      5,
  )

  // Determine safety level
  let safetyLevel: RiskScore["safetyLevel"] = "SAFE"
  if (overall < 25) {
    safetyLevel = "SAFE"
  } else if (overall < 50) {
    safetyLevel = "CAUTION"
  } else if (overall < 75) {
    safetyLevel = "RISKY"
  } else {
    safetyLevel = "EXTREME"
  }

  return {
    overall,
    rugPullRisk: scores.rugPullRisk,
    liquidityRisk: scores.liquidityRisk,
    volumeRisk: scores.volumeRisk,
    ageRisk: scores.ageRisk,
    volatilityRisk: scores.volatilityRisk,
    redFlags,
    safetyLevel,
  }
}

export function getRiskColor(safetyLevel: RiskScore["safetyLevel"]): string {
  switch (safetyLevel) {
    case "SAFE":
      return "text-green-400 bg-green-950"
    case "CAUTION":
      return "text-yellow-400 bg-yellow-950"
    case "RISKY":
      return "text-orange-400 bg-orange-950"
    case "EXTREME":
      return "text-red-400 bg-red-950"
  }
}
