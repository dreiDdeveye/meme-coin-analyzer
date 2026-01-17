import type { TickerAnalysisData } from "@/lib/dex-screener"

export type PVPStatus = "low_competition" | "moderate_competition" | "highly_saturated"

export interface PVPCheckResult {
  status: PVPStatus
  explanation: string
  risk_factors: string[]
  opportunity_factors: string[]
}

export function checkPVP(data: TickerAnalysisData, allCoins?: TickerAnalysisData[]): PVPCheckResult {
  const tokenName = (data.name || "").toLowerCase()
  const tokenSymbol = (data.symbol || "").toLowerCase()

  // Detect common narrative keywords
  const narrativeKeywords = ["inu", "doge", "shib", "pepe", "moon", "rocket", "ai", "gpt", "nft", "dao"]

  const matchedKeywords = narrativeKeywords.filter(
    (keyword) => tokenName.includes(keyword) || tokenSymbol.includes(keyword),
  )

  let status: PVPStatus = "low_competition"
  let explanation = ""
  const risk_factors: string[] = []
  const opportunity_factors: string[] = []

  if (matchedKeywords.length >= 3) {
    status = "highly_saturated"
    explanation = `Multiple tokens with similar naming and narrative have appeared recently within the "${matchedKeywords.join(", ")}" meta space. Saturation may limit long-term attention unless differentiation emerges.`
    risk_factors.push("Crowded narrative space with many similar tokens")
    risk_factors.push("Difficulty standing out among competitors")
    risk_factors.push("Potential meta fatigue among traders")
  } else if (matchedKeywords.length >= 1) {
    status = "moderate_competition"
    explanation = `The token operates within an established narrative (${matchedKeywords.join(", ")}) that has multiple competitors. Moderate saturation with some differentiation opportunity.`
    risk_factors.push("Established meta with existing competitors")
    opportunity_factors.push("Proven narrative attracts traders familiar with the space")
    opportunity_factors.push("Network effects from related tokens")
  } else {
    status = "low_competition"
    explanation = `The token operates in a relatively unique narrative space with limited direct competitors. Lower saturation may allow for differentiated positioning.`
    opportunity_factors.push("Unique positioning in untested narrative space")
    opportunity_factors.push("Potential to establish new meta trend")
  }

  return {
    status,
    explanation,
    risk_factors,
    opportunity_factors,
  }
}
