import type { TokenPair } from "./dex-screener"

export type NarrativeCategory =
  | "ANIMAL_MEME"
  | "AI_TECH"
  | "PARODY_SATIRE"
  | "POP_CULTURE"
  | "CHAIN_META"
  | "EXPERIMENTAL"

export type NarrativeConfidence = "LOW" | "MEDIUM" | "HIGH"

export interface NarrativeAnalysis {
  primary: NarrativeCategory
  secondary: NarrativeCategory | null
  confidence: NarrativeConfidence
  explanation: string
  tags: string[]
}

const narrativeKeywords: Record<NarrativeCategory, { name: string; keywords: string[] }> = {
  ANIMAL_MEME: {
    name: "Animal / Classic Meme",
    keywords: ["doge", "pepe", "shib", "dog", "cat", "ape", "gme", "safemoon", "hoge", "elonmusk", "elon", "musk"],
  },
  AI_TECH: {
    name: "AI / Tech",
    keywords: [
      "ai",
      "gpt",
      "neural",
      "agent",
      "bot",
      "circuit",
      "tech",
      "compute",
      "inference",
      "model",
      "llm",
      "oracle",
      "crypto",
    ],
  },
  PARODY_SATIRE: {
    name: "Parody / Satire",
    keywords: ["fake", "spam", "troll", "joke", "lol", "meme", "parody", "mock", "haha", "rofl", "irony"],
  },
  POP_CULTURE: {
    name: "Pop Culture / Trend Hijack",
    keywords: ["trump", "bitcoin", "eth", "solana", "base", "trump20", "tiktok", "viral", "trending", "hype"],
  },
  CHAIN_META: {
    name: "Chain Meta",
    keywords: ["sol", "solana", "base", "arb", "polygon", "eth", "ethereum", "bsc", "binance"],
  },
  EXPERIMENTAL: {
    name: "Experimental / Unknown",
    keywords: ["new", "beta", "alpha", "experiment", "test", "proto"],
  },
}

export function analyzeNarrative(token: TokenPair): NarrativeAnalysis {
  const name = token.baseToken.name.toLowerCase()
  const symbol = token.baseToken.symbol.toLowerCase()
  const combined = `${name} ${symbol}`

  console.log(`[v0] Analyzing narrative for: ${token.baseToken.name} (${token.baseToken.symbol})`)

  const scores: Record<NarrativeCategory, number> = {
    ANIMAL_MEME: 0,
    AI_TECH: 0,
    PARODY_SATIRE: 0,
    POP_CULTURE: 0,
    CHAIN_META: 0,
    EXPERIMENTAL: 0,
  }

  // Score each category based on keyword matches
  for (const [category, data] of Object.entries(narrativeKeywords)) {
    for (const keyword of data.keywords) {
      const matches = (combined.match(new RegExp(keyword, "g")) || []).length
      scores[category as NarrativeCategory] += matches * 10
    }
  }

  // Find top 2 categories
  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a)
  const primary = sorted[0][0] as NarrativeCategory
  const primaryScore = sorted[0][1]
  const secondaryScore = sorted[1][1]

  const secondary = primaryScore > 0 && secondaryScore > primaryScore * 0.3 ? (sorted[1][0] as NarrativeCategory) : null

  // Determine confidence
  let confidence: NarrativeConfidence
  if (primaryScore > 30) {
    confidence = "HIGH"
  } else if (primaryScore > 10) {
    confidence = "MEDIUM"
  } else {
    confidence = "LOW"
  }

  const primaryName = narrativeKeywords[primary].name
  const explanation = generateNarrativeExplanation(primary, token, confidence)

  const tags = generateNarrativeTags(primary, secondary)

  console.log(`[v0] ${token.baseToken.symbol} narrative: ${primaryName} (${confidence} confidence)`)

  return {
    primary,
    secondary,
    confidence,
    explanation,
    tags,
  }
}

function generateNarrativeExplanation(
  narrative: NarrativeCategory,
  token: TokenPair,
  confidence: NarrativeConfidence,
): string {
  const narrativeName = narrativeKeywords[narrative].name
  const tokenAge = (Date.now() - token.pairCreatedAt * 1000) / (1000 * 60 * 60) // hours

  const baseExplanations: Record<NarrativeCategory, string> = {
    ANIMAL_MEME: `${token.baseToken.symbol} taps into the timeless appeal of animal memes and classic internet culture. The narrative rides on community humor and nostalgia, which has proven resilient across cycles.`,
    AI_TECH: `${token.baseToken.symbol} positions itself in the AI / technology narrative, capitalizing on growing market interest in AI infrastructure and agent-based systems. Strong thematic appeal in current market conditions.`,
    PARODY_SATIRE: `${token.baseToken.symbol} embraces satire and self-aware humor, positioning itself as a playful commentary rather than a serious project. These often gain traction through community irony and viral moments.`,
    POP_CULTURE: `${token.baseToken.symbol} leverages current pop culture or trending topics to capture attention. Success depends on narrative momentum and sustained cultural relevance.`,
    CHAIN_META: `${token.baseToken.symbol} embodies chain-specific narratives and local culture on ${token.chainId}. These often perform well with chain-native communities familiar with ecosystem meta.`,
    EXPERIMENTAL: `${token.baseToken.symbol}'s narrative is ambiguous or emerging. Without clear thematic positioning, success will depend heavily on trading activity and community building.`,
  }

  let explanation = baseExplanations[narrative]

  // Add age context
  if (tokenAge < 24) {
    explanation += ` Launched ${tokenAge.toFixed(1)}h ago, still in early narrative establishment phase.`
  }

  return explanation
}

function generateNarrativeTags(primary: NarrativeCategory, secondary: NarrativeCategory | null): string[] {
  const tags = [narrativeKeywords[primary].name]
  if (secondary) tags.push(narrativeKeywords[secondary].name)
  return tags
}

export function getNarrativeCategoryLabel(category: NarrativeCategory): string {
  return narrativeKeywords[category].name
}
