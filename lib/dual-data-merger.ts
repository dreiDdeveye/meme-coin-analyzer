// Merges data from Pump.fun and DEX Screener for comprehensive analysis
import type { TokenPair } from "@/lib/dex-screener"
import type { PumpFunToken } from "@/lib/pump-fun"

export interface MergedTokenData {
  source: "pump" | "dex" | "both"
  dexData?: TokenPair
  pumpData?: PumpFunToken
  discoveryStage: "early" | "established" | "mature"
  narrativeConfidence: number
  dataQuality: "low" | "medium" | "high"
  timestamps: {
    pumpCreated?: number
    dexCreated?: number
  }
}

export function mergeTokenData(dexData?: TokenPair, pumpData?: PumpFunToken): MergedTokenData {
  if (!dexData && !pumpData) {
    throw new Error("No data provided")
  }

  const source = dexData && pumpData ? "both" : dexData ? "dex" : "pump"

  // Determine discovery stage based on available data
  let discoveryStage: "early" | "established" | "mature" = "mature"
  if (pumpData && !dexData) {
    discoveryStage = "early"
  } else if (pumpData && dexData) {
    // Recently moved to DEX
    const pumpAge = Date.now() - pumpData.createdAt
    const dexAge = dexData.pairCreatedAt ? Date.now() - dexData.pairCreatedAt * 1000 : 0
    if (pumpAge < 86400000 && dexAge < 3600000) {
      // Less than 24h on Pump, less than 1h on DEX
      discoveryStage = "early"
    } else if (dexAge < 604800000) {
      // Less than 7 days on DEX
      discoveryStage = "established"
    }
  }

  // Assess data quality
  let dataQuality: "low" | "medium" | "high" = "high"
  if (!dexData || !dexData.liquidity?.usd || dexData.liquidity.usd < 1000) {
    dataQuality = "low"
  } else if (!dexData.volume?.h24 || dexData.volume.h24 < 10000) {
    dataQuality = "medium"
  }

  // Calculate narrative confidence based on data sources
  let narrativeConfidence = 0
  if (pumpData && pumpData.description && pumpData.description.length > 10) {
    narrativeConfidence += 0.3
  }
  if (pumpData && (pumpData.metadata?.twitter || pumpData.metadata?.telegram || pumpData.metadata?.website)) {
    narrativeConfidence += 0.2
  }
  if (dexData && dexData.info?.socials && dexData.info.socials.length > 0) {
    narrativeConfidence += 0.2
  }
  if (dexData && dexData.volume?.h24 && dexData.volume.h24 > 100000) {
    narrativeConfidence += 0.3
  }

  return {
    source,
    dexData,
    pumpData,
    discoveryStage,
    narrativeConfidence,
    dataQuality,
    timestamps: {
      pumpCreated: pumpData?.createdAt,
      dexCreated: dexData?.pairCreatedAt ? dexData.pairCreatedAt * 1000 : undefined,
    },
  }
}

// Extract common symbol/name for matching Pump.fun with DEX tokens
export function normalizeTokenSymbol(symbol: string): string {
  return symbol
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 10)
}
