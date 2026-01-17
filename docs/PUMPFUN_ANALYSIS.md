# Pump.fun Real-Time Analysis System

## Overview

This system provides real-time on-chain analysis of Pump.fun tokens using ONLY free and publicly available Solana blockchain data. No paid APIs or private endpoints are used.

## Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     User Interface Layer                     │
│  TickerAnalyzer Component → PumpfunAnalysisCard Display     │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   Analyzer Integration                       │
│         use-ticker-analyzer.ts (hook orchestration)         │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Pump.fun Analysis Modules                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ pumpfun-analyzer.ts (main coordinator)               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ pumpfun-onchain.ts (5 core features)                 │  │
│  │                                                        │  │
│  │  1. detectNewPumpfunTokens()                          │  │
│  │  2. trackBondingCurve()                               │  │
│  │  3. estimateMigrationProbability()                    │  │
│  │  4. classifyEarlyBuyers()                             │  │
│  │  5. detectRugPatterns()                               │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Solana Blockchain (Free RPC)                    │
│  • Transaction logs via logsSubscribe                        │
│  • Account signatures via getSignaturesForAddress            │
│  • Parsed transactions via getParsedTransaction              │
└──────────────────────────────────────────────────────────────┘
\`\`\`

## Features Implementation

### 1. Early Token Detection (`detectNewPumpfunTokens`)

**Purpose**: Detect newly launched Pump.fun tokens before they appear on DEX Screener.

**Data Source**: Solana program logs (logsSubscribe)

**How It Works**:
- Subscribes to Pump.fun program ID (6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P)
- Monitors for "initialize" or "create" events in logs
- Extracts token mint address from transaction data
- Emits event for real-time UI updates

**Latency**: 1-2 seconds from on-chain event

**Code Location**: `lib/pumpfun-onchain.ts:detectNewPumpfunTokens()`

---

### 2. Bonding Curve Progress Tracking (`trackBondingCurve`)

**Purpose**: Monitor bonding curve activity and completion progress.

**Data Source**: On-chain transaction history

**Metrics Tracked**:
- Total SOL deposited
- Buy count vs sell count
- Interaction frequency (tx/minute)
- Unique buyer count
- Progress percentage (0-100%)

**How It Works**:
- Fetches last 100 signatures for token mint
- Parses transactions to detect SOL flows
- Positive flow = buy, negative flow = sell
- Estimates progress based on typical 85 SOL curve completion

**Formula**:
\`\`\`typescript
progressPercent = min((totalSol / 85) * 100, 100)
interactionFrequency = (buyCount + sellCount) / ageInMinutes
\`\`\`

**Code Location**: `lib/pumpfun-onchain.ts:trackBondingCurve()`

---

### 3. Migration Probability Estimation (`estimateMigrationProbability`)

**Purpose**: Predict likelihood of Raydium migration based on on-chain signals.

**Signals Used** (all free data):
1. Liquidity growth rate (from DEX Screener)
2. Buy pressure vs sell pressure (on-chain)
3. Bonding curve interaction frequency
4. Token age

**Scoring Formula**:
\`\`\`typescript
liquidityScore = min((liquidityUsd / 50000) * 100, 100)
buyPressureScore = (buyCount / (buyCount + sellCount)) * 100
interactionScore = min((frequency / 5) * 100, 100)
ageScore = tokenAge < 1h ? 20 : <6h ? 60 : <24h ? 90 : 100

probability = (
  liquidityScore * 0.35 +
  buyPressureScore * 0.30 +
  interactionScore * 0.20 +
  ageScore * 0.15
)
\`\`\`

**Output**:
- Probability (0-100%)
- Confidence level (low/medium/high)
- Factor breakdown
- Explanation string

**Code Location**: `lib/pumpfun-onchain.ts:estimateMigrationProbability()`

---

### 4. Sniper vs Organic Buyer Classification (`classifyEarlyBuyers`)

**Purpose**: Identify snipers and bot activity among early buyers.

**Classification Indicators**:

**Sniper Indicators**:
- Same-slot or near-instant buy (within 2 slots of launch)
- Large early deployment (>5 SOL)
- Wallet seen across multiple launches (tracked in session)

**Confidence Calculation**:
\`\`\`typescript
baseConfidence = 50
if (sameSlotBuy) confidence += 20
if (largeBuy > 5 SOL) confidence += 15
if (walletReused) confidence += 25
\`\`\`

**Output**: Array of BuyerClassification objects with:
- Wallet address
- Type (sniper/organic/unknown)
- Confidence score
- List of indicators
- First buy details

**Code Location**: `lib/pumpfun-onchain.ts:classifyEarlyBuyers()`

---

### 5. Rug Pattern Detection (`detectRugPatterns`)

**Purpose**: Detect common rug pull indicators in real-time.

**Patterns Detected**:

1. **Creator Early Sell**
   - Monitors creator wallet for SOL inflow
   - Flags sells within 2 hours of launch (+40 risk)

2. **Liquidity Growth Stall**
   - Checks if liquidity stagnates despite activity
   - Total SOL < 10 with >20 buys = stalled (+25 risk)

3. **Activity Drop**
   - Monitors transaction frequency decline
   - <0.5 tx/min after >50 buys = suspicious (+30 risk)

4. **High Sell Pressure**
   - Calculates sell ratio
   - Sells > 70% of total transactions (+20 risk)

**Risk Level Determination**:
\`\`\`typescript
riskScore >= 70 → CRITICAL
riskScore >= 50 → HIGH
riskScore >= 30 → MEDIUM
riskScore < 30  → LOW
\`\`\`

**Output**: RugRiskAnalysis with:
- Risk level
- Confidence score
- List of triggered indicators
- Creator activity details
- Liquidity and activity trends

**Code Location**: `lib/pumpfun-onchain.ts:detectRugPatterns()`

---

## Integration with Existing System

### Hook Integration (`use-ticker-analyzer.ts`)

The Pump.fun analyzer is integrated into the existing analyzer pipeline:

\`\`\`typescript
// Existing analyzers
const trenches = analyzeTrenches(token, riskScore)
const bundle = analyzeBundle(token)
const narrative = analyzeNarrative(token)

// NEW: Pump.fun analysis
const pumpfunAnalysis = await analyzePumpfunToken(token)

// All results combined in AnalysisResult
return {
  token,
  trenches,
  bundle,
  narrative,
  pumpfunAnalysis, // ← NEW
  // ... other results
}
\`\`\`

### Component Display (`pumpfun-analysis-card.tsx`)

The analysis results are displayed in a dedicated card showing:
- Bonding curve progress bar
- SOL deposited, buy/sell counts
- Migration probability with factor breakdown
- Rug risk assessment with indicators
- Early buyer classifications

---

## RPC Limitations and Handling

### Free RPC Rate Limits

Public Solana RPC endpoints have rate limits:
- ~10 requests/second
- Historical data limited to recent transactions
- WebSocket connections may disconnect

### Fallback Strategy

\`\`\`typescript
try {
  // Attempt on-chain analysis
  const analysis = await analyzePumpfunToken(token)
} catch (err) {
  // Return partial analysis on failure
  return {
    isPumpfunToken: true,
    bondingCurve: null,
    migrationProb: null,
    earlyBuyers: [],
    rugRisk: null,
    isRealTimeData: false // ← Indicates fallback
  }
}
\`\`\`

---

## Real-Time Monitoring Setup

For continuous monitoring, use the WebSocket listener:

\`\`\`typescript
import { detectNewPumpfunTokens, getSolanaConnection } from '@/lib/pumpfun-onchain'

const connection = getSolanaConnection()

const unsubscribe = await detectNewPumpfunTokens(
  connection,
  (token) => {
    console.log('NEW PUMPFUN TOKEN:', token.mint)
    // Trigger UI update or alert
  }
)

// Cleanup on unmount
return () => unsubscribe()
\`\`\`

---

## Deterministic and Explainable

All analysis is fully deterministic and explainable:

✅ No black-box AI models
✅ Clear formulas for all scores
✅ Every indicator has an explanation
✅ Confidence scores based on data quality
✅ Factor breakdowns show calculation inputs

---

## Security and Ethics

**What This System Does**:
- Provides probabilistic risk indicators
- Analyzes public blockchain data
- Helps users make informed decisions

**What This System Does NOT Do**:
- Handle wallet private keys
- Execute trades or transactions
- Provide financial advice
- Guarantee outcomes

**Disclaimer**: All outputs are probabilistic indicators based on on-chain patterns, not guarantees. Users are responsible for their own trading decisions.

---

## Performance Optimization

### Minimize RPC Calls

\`\`\`typescript
// Fetch only necessary data
const signatures = await connection.getSignaturesForAddress(mint, {
  limit: 50 // Only recent 50 transactions
})

// Batch analysis where possible
const buyers = await classifyEarlyBuyers(connection, mint, 10) // Limit to 10
\`\`\`

### Caching Strategy

Results should be cached for 1-5 seconds to avoid redundant RPC calls:

\`\`\`typescript
const cache = new Map()
const cacheKey = `${mintAddress}-${Date.now() / 5000 | 0}` // 5s buckets
if (cache.has(cacheKey)) return cache.get(cacheKey)
\`\`\`

---

## Testing

### Test with Known Tokens

Use these Solana addresses for testing:

- Recent Pump.fun token: Check DEX Screener for new Solana pairs
- High-activity token: Use established memecoin
- Migrated token: Look for tokens on Raydium

### Debugging

Enable verbose logging:

\`\`\`typescript
console.log('[v0] Fetching bonding curve data for', mintAddress)
console.log('[v0] Classifying early buyers...')
console.log('[v0] Analyzing rug risk patterns...')
\`\`\`

---

## Future Enhancements

Possible improvements within free data constraints:

1. **Pattern Learning**: Track historical patterns to improve probability models
2. **Cross-Token Analysis**: Compare metrics across multiple launches
3. **Wallet Reputation**: Build reputation scores based on transaction history
4. **Alert System**: Push notifications for high-risk patterns
5. **Batch Analysis**: Analyze multiple tokens simultaneously

---

## Technical Support

For issues or questions:

1. Check RPC endpoint status
2. Verify token is on Solana chain
3. Ensure sufficient transaction history (>20 transactions)
4. Review console logs for detailed errors

---

## Acknowledgments

Built with:
- @solana/web3.js for blockchain interaction
- DEX Screener API for market data
- Next.js for application framework
