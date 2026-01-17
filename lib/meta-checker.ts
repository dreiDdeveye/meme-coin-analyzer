import type { TokenPair } from "@/lib/dex-screener"

export type MetaType =
  | "animal_meme"
  | "ai_agent"
  | "gaming_metaverse"
  | "defi_utility"
  | "anime_culture"
  | "celebrity_trend"
  | "community_dao"
  | "unknown"

export type Confidence = "low" | "medium" | "high"

export interface MetaCheckResult {
  primary_meta: MetaType
  secondary_meta?: MetaType
  confidence: Confidence
  explanation: string
}

interface MetaPattern {
  keywords: string[]
  symbolPatterns: string[] // Patterns that commonly appear in token symbols
  description: string
  priority: number
}

const metaPatterns: Record<MetaType, MetaPattern> = {
  animal_meme: {
    keywords: [
      "dog", "doge", "shib", "shiba", "inu", "cat", "kitty", "kitten", "meow",
      "pepe", "frog", "kek", "monkey", "ape", "chimp", "gorilla",
      "bear", "bull", "whale", "fish", "shark", "duck", "bird", "owl",
      "pup", "puppy", "bonk", "wif", "hat", "mog", "popcat", "neiro",
      "floki", "cheems", "dinger", "snail", "rat", "mouse",
      "penguin", "pingu", "seal", "goat", "cow", "pig", "hamster"
    ],
    symbolPatterns: ["INU", "DOG", "CAT", "PEPE", "FROG", "APE", "BONK", "WIF", "MOG", "NEIRO", "FLOKI"],
    description: "Animal-themed memecoin following classic meme culture",
    priority: 2,
  },
  ai_agent: {
    keywords: [
      "ai", "gpt", "llm", "chat", "agent", "neural", "bot", "intelligence",
      "machine", "learn", "artificial", "cognitive", "sentient", "agi",
      "openai", "claude", "anthropic", "brain", "mind", "virtual", "assistant",
      "autonomous", "compute", "gpu", "tensor", "model", "inference"
    ],
    symbolPatterns: ["AI", "GPT", "BOT", "AGI", "LLM"],
    description: "AI and artificial intelligence themed token",
    priority: 3,
  },
  gaming_metaverse: {
    keywords: [
      "game", "gamer", "gaming", "play", "player", "minecraft", "mario", "sonic",
      "pixel", "quest", "verse", "meta", "metaverse", "vr", "virtual",
      "arcade", "retro", "nintendo", "xbox", "playstation", "esport",
      "level", "boss", "npc", "rpg", "mmorpg", "pvp", "raid"
    ],
    symbolPatterns: ["GAME", "PLAY", "PIXEL", "META", "VR"],
    description: "Gaming, metaverse, or video game culture themed token",
    priority: 3,
  },
  defi_utility: {
    keywords: [
      "yield", "stake", "staking", "farm", "farming", "vault", "lp", "liquidity",
      "protocol", "finance", "defi", "swap", "dex", "amm", "lending",
      "borrow", "collateral", "apy", "apr", "reward", "governance"
    ],
    symbolPatterns: ["SWAP", "FI", "YIELD", "STAKE", "LP"],
    description: "DeFi utility token with staking, farming, or financial utility",
    priority: 4,
  },
  anime_culture: {
    keywords: [
      "anime", "manga", "kawaii", "waifu", "husbando", "otaku", "weeb",
      "naruto", "pokemon", "pikachu", "neko", "chan", "kun", "san", "sama",
      "senpai", "kohai", "sugoi", "baka", "chibi", "miku", "goku", "luffy",
      "one piece", "dragon ball", "attack on titan", "demon slayer"
    ],
    symbolPatterns: ["NEKO", "WAIFU", "ANIME", "CHAN", "MIKU"],
    description: "Anime and Japanese pop culture themed memecoin",
    priority: 3,
  },
  celebrity_trend: {
    keywords: [
      "trump", "donald", "elon", "musk", "tesla", "biden", "joe", "obama",
      "kardashian", "kanye", "ye", "drake", "taylor", "swift", "celebrity",
      "famous", "president", "politician", "influencer", "tiktok", "viral",
      "breaking", "news", "trend", "trending"
    ],
    symbolPatterns: ["TRUMP", "ELON", "MUSK", "BIDEN"],
    description: "Celebrity-driven or trending news cycle token",
    priority: 4,
  },
  community_dao: {
    keywords: [
      "dao", "community", "collective", "people", "together", "united",
      "coop", "fund", "treasury", "vote", "voting", "governance", "proposal",
      "member", "holder", "council", "decentralized", "organization"
    ],
    symbolPatterns: ["DAO", "COOP", "PEOPLE", "GOV"],
    description: "Community-governed or DAO-structured project",
    priority: 3,
  },
  unknown: {
    keywords: [],
    symbolPatterns: [],
    description: "Unique narrative that doesn't fit standard categories",
    priority: 1,
  },
}

export function checkMeta(data: TokenPair): MetaCheckResult {
  // Debug: Log the incoming data structure
  console.log(`[MetaChecker] Raw input:`, {
    name: data.baseToken?.name,
    symbol: data.baseToken?.symbol,
    hasInfo: !!data.info,
    infoKeys: data.info ? Object.keys(data.info) : [],
  })

  const name = (data.baseToken?.name || "").toLowerCase()
  const symbol = (data.baseToken?.symbol || "").toUpperCase()
  const symbolLower = symbol.toLowerCase()

  // Early return check - if we have no name or symbol, something is wrong
  if (!name && !symbol) {
    console.error(`[MetaChecker] ERROR: No name or symbol found in data!`)
    return {
      primary_meta: "unknown",
      confidence: "low",
      explanation: "Unable to analyze - no token name or symbol provided.",
    }
  }

  // Safely access optional properties
  const info = data.info as {
    imageUrl?: string
    header?: string
    socials?: { type: string; url: string }[]
    websites?: { url: string }[]
    description?: string
  } | undefined

  // Get all available text data
  const website = (info?.websites?.[0]?.url || "").toLowerCase()
  const socialText = (info?.socials || [])
    .map((s) => `${s.type || ""} ${s.url || ""}`)
    .join(" ")
    .toLowerCase()
  const description = (info?.description || "").toLowerCase()

  // Combine all text sources
  const combinedText = `${name} ${symbolLower} ${socialText} ${description} ${website}`

  console.log(`[MetaChecker] Analyzing: ${name} (${symbol})`)
  console.log(`[MetaChecker] Combined text sample: "${combinedText.substring(0, 150)}..."`)

  const scores: Record<MetaType, { score: number; priority: number; matches: string[] }> = {} as Record<MetaType, { score: number; priority: number; matches: string[] }>

  for (const [metaType, pattern] of Object.entries(metaPatterns)) {
    if (metaType === "unknown") continue

    let matchCount = 0
    const matches: string[] = []

    // Check symbol patterns first (highest confidence)
    for (const symbolPattern of pattern.symbolPatterns) {
      if (symbol.includes(symbolPattern)) {
        matchCount += 5 // Symbol match is very strong signal
        matches.push(`symbol:${symbolPattern}`)
        console.log(`[MetaChecker] ✓ Symbol match: ${symbol} contains ${symbolPattern} (+5)`)
      }
    }

    // Check keywords in combined text
    for (const keyword of pattern.keywords) {
      // Exact word boundary match
      const exactRegex = new RegExp(`\\b${keyword}\\b`, "i")
      if (exactRegex.test(combinedText)) {
        matchCount += 2
        matches.push(`exact:${keyword}`)
        continue
      }

      // Partial match in name or symbol only (lower confidence)
      if (name.includes(keyword) || symbolLower.includes(keyword)) {
        matchCount += 1
        matches.push(`partial:${keyword}`)
      }
    }

    scores[metaType as MetaType] = {
      score: matchCount,
      priority: pattern.priority,
      matches,
    }
  }

  // Sort by score, then by priority
  const sorted = Object.entries(scores)
    .filter(([_, data]) => data.score > 0)
    .sort(([, a], [, b]) => {
      if (b.score !== a.score) return b.score - a.score
      return b.priority - a.priority
    })

  console.log(`[MetaChecker] Scores:`, sorted.map(([type, data]) => 
    `${type}:${data.score} [${data.matches.slice(0, 3).join(", ")}]`
  ).join(" | "))

  // Determine primary and secondary meta
  const primaryMeta = sorted[0] ? (sorted[0][0] as MetaType) : "unknown"
  const primaryScore = sorted[0]?.[1]?.score || 0
  const primaryMatches = sorted[0]?.[1]?.matches || []

  const secondaryMeta = sorted[1] && sorted[1][1].score > 0 
    ? (sorted[1][0] as MetaType) 
    : undefined

  // Calculate confidence based on score and match quality
  let confidence: Confidence = "low"
  const hasSymbolMatch = primaryMatches.some((m: string) => m.startsWith("symbol:"))
  const hasMultipleExactMatches = primaryMatches.filter((m: string) => m.startsWith("exact:")).length >= 2

  if (primaryScore >= 5 || hasSymbolMatch) {
    confidence = "high"
  } else if (primaryScore >= 3 || hasMultipleExactMatches) {
    confidence = "medium"
  } else if (primaryScore >= 1) {
    confidence = "low"
  }

  // Generate explanation
  let explanation: string
  if (primaryMeta === "unknown") {
    explanation = `${symbol} has a unique or unclear narrative that doesn't match standard memecoin categories. This could indicate an original concept or emerging trend.`
  } else {
    const matchedKeywords = primaryMatches
      .slice(0, 3)
      .map((m: string) => m.split(":")[1])
      .join(", ")
    explanation = `${metaPatterns[primaryMeta].description}. Detected patterns: ${matchedKeywords || "general category fit"}.`
  }

  console.log(`[MetaChecker] Result: ${primaryMeta} (${confidence})`)

  return {
    primary_meta: primaryMeta,
    secondary_meta: secondaryMeta,
    confidence,
    explanation,
  }
}