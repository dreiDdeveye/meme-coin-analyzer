import type { MergedTokenData } from "@/lib/dual-data-merger"

export interface EnhancedExplainableAI {
  dataSources: {
    pumpFun: boolean
    dexScreener: boolean
    mergedInsight: string
  }
  signalStrength: {
    volumeSignal: "strong" | "moderate" | "weak" | "absent"
    liquiditySignal: "strong" | "moderate" | "weak" | "absent"
    narrativeSignal: "strong" | "moderate" | "weak" | "absent"
    earlyAdoptionSignal: "strong" | "moderate" | "weak" | "absent"
  }
  reasoning: {
    whyConclusionsReached: string
    whichSignalsStrong: string[]
    whichSignalsWeak: string[]
    defensiveNotes: string
  }
}

export function generateEnhancedExplainableAI(mergedData: MergedTokenData): EnhancedExplainableAI {
  const dexData = mergedData.dexData
  const pumpData = mergedData.pumpData

  // Analyze data sources
  const dataSources = {
    pumpFun: !!pumpData,
    dexScreener: !!dexData,
    mergedInsight:
      mergedData.source === "both"
        ? "Token found on both Pump.fun (early stage) and DEX Screener (market validation). Analysis combines early adoption metrics with real market interest."
        : mergedData.source === "pump"
          ? "Token still on Pump.fun bonding curve. Analysis based on early-stage metrics. Monitor for DEX migration."
          : "Token validated on DEX Screener. Analysis based on real market data with established liquidity.",
  }

  // Analyze signal strength
  let volumeSignal: "strong" | "moderate" | "weak" | "absent" = "absent"
  let liquiditySignal: "strong" | "moderate" | "weak" | "absent" = "absent"
  let narrativeSignal: "strong" | "moderate" | "weak" | "absent" = "absent"
  let earlyAdoptionSignal: "strong" | "moderate" | "weak" | "absent" = "absent"

  // Volume signal
  if (dexData?.volume?.h24 && dexData.volume.h24 > 500000) {
    volumeSignal = "strong"
  } else if (dexData?.volume?.h24 && dexData.volume.h24 > 100000) {
    volumeSignal = "moderate"
  } else if (dexData?.volume?.h24 && dexData.volume.h24 > 10000) {
    volumeSignal = "weak"
  }

  // Liquidity signal
  if (dexData?.liquidity?.usd && dexData.liquidity.usd > 200000) {
    liquiditySignal = "strong"
  } else if (dexData?.liquidity?.usd && dexData.liquidity.usd > 50000) {
    liquiditySignal = "moderate"
  } else if (dexData?.liquidity?.usd && dexData.liquidity.usd > 5000) {
    liquiditySignal = "weak"
  }

  // Narrative signal
  const hasDescription = (pumpData?.description?.length || 0) > 20 || (dexData?.baseToken.name?.length || 0) > 5
  const hasSocials =
    (pumpData?.metadata && Object.values(pumpData.metadata).some((v) => v)) || (dexData?.info?.socials?.length || 0) > 0
  if (hasDescription && hasSocials) {
    narrativeSignal = "strong"
  } else if (hasDescription || hasSocials) {
    narrativeSignal = "moderate"
  } else if (dexData?.baseToken.name) {
    narrativeSignal = "weak"
  }

  // Early adoption signal
  if (pumpData) {
    if (pumpData.uniqueHolders > 1000 && pumpData.transactionCount > 5000) {
      earlyAdoptionSignal = "strong"
    } else if (pumpData.uniqueHolders > 500 || pumpData.transactionCount > 2000) {
      earlyAdoptionSignal = "moderate"
    } else {
      earlyAdoptionSignal = "weak"
    }
  } else {
    earlyAdoptionSignal = "absent"
  }

  // Generate reasoning
  const strongSignals: string[] = []
  const weakSignals: string[] = []

  if (volumeSignal === "strong") strongSignals.push("High 24h volume showing active trading")
  if (volumeSignal === "weak" || volumeSignal === "absent")
    weakSignals.push("Low volume indicates limited market interest")

  if (liquiditySignal === "strong") strongSignals.push("Deep liquidity pool providing trading safety")
  if (liquiditySignal === "weak" || liquiditySignal === "absent")
    weakSignals.push("Shallow liquidity increases slippage risk")

  if (narrativeSignal === "strong") strongSignals.push("Clear narrative and community engagement")
  if (narrativeSignal === "weak") weakSignals.push("Weak narrative signals - limited story differentiation")

  if (earlyAdoptionSignal === "strong") strongSignals.push("Strong early adoption with many holders and transactions")
  if (earlyAdoptionSignal === "weak" || earlyAdoptionSignal === "absent")
    weakSignals.push("Limited early adoption - uncertain market interest")

  return {
    dataSources,
    signalStrength: {
      volumeSignal,
      liquiditySignal,
      narrativeSignal,
      earlyAdoptionSignal,
    },
    reasoning: {
      whyConclusionsReached: `Analysis synthesizes ${dataSources.pumpFun && dataSources.dexScreener ? "early-stage and market data" : dataSources.pumpFun ? "early adoption metrics" : "market validation data"}. Conclusions based on observed metrics across available sources.`,
      whichSignalsStrong: strongSignals,
      whichSignalsWeak: weakSignals,
      defensiveNotes:
        mergedData.dataQuality === "low"
          ? "⚠️ Data quality is low. Limited information available. Analyze with caution."
          : mergedData.dataQuality === "medium"
            ? "⚠️ Data quality is moderate. Some metrics limited. Supplement with additional research."
            : "Data quality is high. Sufficient information for confidence.",
    },
  }
}
