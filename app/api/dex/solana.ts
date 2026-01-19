import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const r = await fetch(
      "https://api.dexscreener.com/latest/dex/pairs/solana",
      { headers: { Accept: "application/json" } }
    )

    if (!r.ok) throw new Error("Dex fetch failed")

    const data = await r.json()

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate")
    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({ error: "DEX_UNAVAILABLE" })
  }
}
