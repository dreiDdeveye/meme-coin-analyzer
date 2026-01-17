// Integrated Pump.fun analyzer combining all detection features
// Note: On-chain analysis disabled in browser-only environment

import type { TokenPair } from "./dex-screener"

export interface PumpfunAnalysis {
  isPumpfunToken: boolean
  bondingCurve: any | null
  migrationProb: any | null
  earlyBuyers: any[]
  rugRisk: any | null
  isRealTimeData: boolean
  disabledReason?: string
}

/**
 * Main analyzer function - integrates all Pump.fun features
 * Note: On-chain analysis currently disabled due to WebSocket limitations in browser environment
 */
export async function analyzePumpfunToken(token: TokenPair): Promise<PumpfunAnalysis> {
  // WebSocket connections from @solana/web3.js don't work in browser-only environment

  // Only analyze Solana tokens
  if (token.chainId !== "solana") {
    return {
      isPumpfunToken: false,
      bondingCurve: null,
      migrationProb: null,
      earlyBuyers: [],
      rugRisk: null,
      isRealTimeData: false,
    }
  }

  // Check if token is from Pump.fun based on DEX ID or other indicators
  const isPumpfun =
    token.dexId?.toLowerCase().includes("pump") ||
    token.pairAddress?.toLowerCase().includes("pump") ||
    (token.liquidity?.usd || 0) < 100000 // Likely pre-migration

  if (!isPumpfun) {
    return {
      isPumpfunToken: false,
      bondingCurve: null,
      migrationProb: null,
      earlyBuyers: [],
      rugRisk: null,
      isRealTimeData: false,
    }
  }

  // Return with disabled message
  return {
    isPumpfunToken: true,
    bondingCurve: null,
    migrationProb: null,
    earlyBuyers: [],
    rugRisk: null,
    isRealTimeData: false,
    disabledReason: "On-chain analysis requires WebSocket support. Use DEX Screener data for analysis.",
  }
}
