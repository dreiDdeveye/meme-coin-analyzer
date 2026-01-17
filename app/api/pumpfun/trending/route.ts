import { NextResponse } from "next/server"
import { fetchRecentPumpFunTokens } from "@/lib/pumpportal-api"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const tokens = await fetchRecentPumpFunTokens(10)

    return NextResponse.json({
      tokens,
      count: tokens.length,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("[v0] Error in pump.fun trending API:", error)
    return NextResponse.json({ error: "Failed to fetch Pump.fun trending tokens" }, { status: 500 })
  }
}
