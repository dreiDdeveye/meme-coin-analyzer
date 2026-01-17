import { NextResponse } from "next/server"
import { fetchVolumeSnapshot, fetchNewPairsFlow, generateAIMarketRead } from "@/lib/market-snapshot"

export async function GET() {
  try {
    // Fetch all data in parallel
    const [volume, pairs] = await Promise.all([fetchVolumeSnapshot(), fetchNewPairsFlow()])

    // Generate AI market read based on collected data
    const aiRead = await generateAIMarketRead(volume, pairs, null)

    return NextResponse.json({
      volume,
      pairs,
      aiRead,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("[v0] Failed to generate market snapshot:", error)
    return NextResponse.json(
      {
        error: "Failed to generate market snapshot",
        volume: null,
        pairs: null,
        aiRead: null,
        timestamp: Date.now(),
      },
      { status: 500 },
    )
  }
}
