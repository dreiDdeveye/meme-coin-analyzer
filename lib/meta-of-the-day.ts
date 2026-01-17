// Meta of the Day - detects dominant narrative patterns in recent launches
import type { TokenPair } from "@/lib/dex-screener"

export interface MetaPattern {
  name: string
  keywords: string[]
  description: string
  category: string
}

export interface MetaOfTheDayResult {
  meta: string
  confidence: "low" | "medium" | "high"
  reasoning: string
  exampleTokens: Array<{
    symbol: string
    name: string
    confidence: number
  }>
  totalTokensAnalyzed: number
  timestamp: number
}

const META_PATTERNS: MetaPattern[] = [
  {
    name: "AI Agent",
    keywords: ["ai", "agent", "bot", "neural", "model", "intelligence", "llm", "gpt", "transformer"],
    description: "AI and LLM-themed tokens",
    category: "tech",
  },
  {
    name: "Dog Memecoin",
    keywords: ["dog", "doge", "pup", "woof", "shiba", "floki", "bonk", "doggo"],
    description: "Dog and puppy-themed memecoins",
    category: "meme",
  },
  {
    name: "Cat Memecoin",
    keywords: ["cat", "kitten", "feline", "meow", "purr", "whisker"],
    description: "Cat and feline-themed memecoins",
    category: "meme",
  },
  {
    name: "Anime/Manga",
    keywords: ["anime", "manga", "otaku", "waifu", "kawaii", "chibi", "ghibli", "naruto", "dragon ball", "one piece"],
    description: "Anime and manga culture references",
    category: "culture",
  },
  {
    name: "Sports/Gaming",
    keywords: ["sports", "gaming", "esports", "play2earn", "p2e", "game", "sport"],
    description: "Sports and gaming themed tokens",
    category: "gaming",
  },
]

export function detectMetaPatternsFromDex(pairs: TokenPair[]): MetaOfTheDayResult | null {
  if (pairs.length === 0) {
    return null
  }

  console.log(`[v0] Analyzing ${pairs.length} pairs for meta patterns...`)

  // Count pattern matches based on token names and symbols
  const patternMatches: Record<
    string,
    { count: number; tokens: Array<{ symbol: string; name: string; confidence: number }> }
  > = {}

  for (const pattern of META_PATTERNS) {
    patternMatches[pattern.name] = { count: 0, tokens: [] }
  }

  for (const pair of pairs) {
    const text = `${pair.baseToken.name} ${pair.baseToken.symbol}`.toLowerCase()

    for (const pattern of META_PATTERNS) {
      const matchCount = pattern.keywords.filter((keyword) => text.includes(keyword)).length
      if (matchCount > 0) {
        const confidence = Math.min((matchCount / pattern.keywords.length) * 1.5, 1)
        patternMatches[pattern.name].count += matchCount

        // Avoid duplicate tokens in same pattern
        const alreadyAdded = patternMatches[pattern.name].tokens.find((t) => t.symbol === pair.baseToken.symbol)
        if (!alreadyAdded) {
          patternMatches[pattern.name].tokens.push({
            symbol: pair.baseToken.symbol,
            name: pair.baseToken.name,
            confidence,
          })
        }
      }
    }
  }

  // Log pattern distribution
  for (const [metaName, data] of Object.entries(patternMatches)) {
    if (data.count > 0) {
      console.log(`[v0] ${metaName}: ${data.count} matches (${data.tokens.length} unique tokens)`)
    }
  }

  // Find dominant meta
  let dominantMeta: string | null = null
  let maxCount = 0

  for (const [metaName, data] of Object.entries(patternMatches)) {
    if (data.count > maxCount) {
      maxCount = data.count
      dominantMeta = metaName
    }
  }

  if (!dominantMeta || maxCount === 0) {
    console.log("[v0] No dominant meta pattern found")
    return null
  }

  const uniqueMatchedTokens = patternMatches[dominantMeta].tokens.length
  const totalPercentage = uniqueMatchedTokens / pairs.length
  const confidence: "low" | "medium" | "high" =
    totalPercentage > 0.3 ? "high" : totalPercentage > 0.15 ? "medium" : "low"

  const matchedTokens = patternMatches[dominantMeta].tokens.sort((a, b) => b.confidence - a.confidence).slice(0, 5)

  console.log(
    `[v0] Dominant meta: ${dominantMeta}, confidence: ${confidence}, tokens: ${uniqueMatchedTokens}/${pairs.length}`,
  )

  return {
    meta: dominantMeta,
    confidence,
    reasoning: `Out of ${pairs.length} trending tokens analyzed, ${uniqueMatchedTokens} matched the "${dominantMeta}" narrative (${Math.round(totalPercentage * 100)}%). This represents ${confidence} confidence that ${dominantMeta.toLowerCase()} is the current dominant meta in the memecoin market.`,
    exampleTokens: matchedTokens,
    totalTokensAnalyzed: pairs.length,
    timestamp: Date.now(),
  }
}
