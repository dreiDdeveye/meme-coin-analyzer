import type { TickerAnalysisData } from "@/lib/dex-screener"

export type InterestLevel = "low" | "moderate" | "high" | "spiking"

export interface VolumeCheckResult {
  interest_level: InterestLevel
  explanation: string
  metrics: {
    volume_24h: number
    volume_1h: number
    volume_5m: number
    liquidity: number
    ratio: number
    trend: "increasing" | "fading" | "stable"
  }
}

export function checkVolume(data: TickerAnalysisData): VolumeCheckResult {
  const volume_24h = data.volume?.h24 || 0
  const volume_1h = data.volume?.h1 || 0
  const volume_5m = data.volume?.h5 || 0
  const liquidity = data.liquidity?.usd || 0

  const ratio = liquidity > 0 ? volume_24h / liquidity : 0

  let trend: "increasing" | "fading" | "stable" = "stable"
  if (volume_1h > (volume_24h / 24) * 1.5) trend = "increasing"
  else if (volume_1h < (volume_24h / 24) * 0.5) trend = "fading"

  let interest_level: InterestLevel = "low"
  let explanation = ""

  if (ratio > 5) {
    interest_level = "spiking"
    explanation =
      "Exceptional trading volume relative to liquidity indicates sudden, intense market attention and rapid price discovery."
  } else if (ratio > 2) {
    interest_level = "high"
    explanation =
      "Recent trading volume significantly outweighs liquidity, indicating strong short-term attention from traders seeking entry/exit."
  } else if (ratio > 0.5) {
    interest_level = "moderate"
    explanation =
      "Trading volume matches typical liquidity levels. Moderate interest with sustainable trading patterns."
  } else {
    interest_level = "low"
    explanation =
      "Low volume relative to liquidity suggests limited trader interest. Few transactions relative to available depth."
  }

  return {
    interest_level,
    explanation,
    metrics: {
      volume_24h,
      volume_1h,
      volume_5m,
      liquidity,
      ratio: Number.parseFloat(ratio.toFixed(2)),
      trend,
    },
  }
}
