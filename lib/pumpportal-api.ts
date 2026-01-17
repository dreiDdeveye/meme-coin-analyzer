export interface PumpFunToken {
  mint: string
  name: string
  symbol: string
  uri: string
  description?: string
  image?: string
  twitter?: string
  telegram?: string
  website?: string
  marketCapSol?: number
  traderCount?: number
  createdTimestamp: number
}

export async function fetchRecentPumpFunTokens(limit = 10): Promise<PumpFunToken[]> {
  try {
    console.log("[v0] Connecting to PumpPortal WebSocket for real Pump.fun data...")

    // Create a promise that will resolve with collected tokens
    return new Promise((resolve, reject) => {
      const tokens: PumpFunToken[] = []
      const timeout = setTimeout(() => {
        console.log(`[v0] Collected ${tokens.length} Pump.fun tokens from WebSocket`)
        resolve(tokens.slice(0, limit))
      }, 5000) // Collect for 5 seconds

      try {
        const WebSocket = require("ws")
        const ws = new WebSocket("wss://pumpportal.fun/api/data")

        ws.on("open", () => {
          console.log("[v0] Connected to PumpPortal WebSocket")
          // Subscribe to new token creation events
          ws.send(
            JSON.stringify({
              method: "subscribeNewToken",
            }),
          )
        })

        ws.on("message", (data: any) => {
          try {
            const message = JSON.parse(data.toString())

            if (message.mint && message.name) {
              tokens.push({
                mint: message.mint,
                name: message.name,
                symbol: message.symbol || "",
                uri: message.uri || "",
                description: message.description,
                image: message.image,
                twitter: message.twitter,
                telegram: message.telegram,
                website: message.website,
                marketCapSol: message.marketCapSol,
                traderCount: message.traderCount,
                createdTimestamp: message.timestamp || Date.now(),
              })

              console.log(`[v0] Received Pump.fun token: ${message.name} (${message.symbol})`)
            }
          } catch (err) {
            console.error("[v0] Error parsing WebSocket message:", err)
          }
        })

        ws.on("error", (error: Error) => {
          console.error("[v0] PumpPortal WebSocket error:", error)
          clearTimeout(timeout)
          reject(error)
        })

        ws.on("close", () => {
          console.log("[v0] PumpPortal WebSocket closed")
          clearTimeout(timeout)
          resolve(tokens.slice(0, limit))
        })
      } catch (err) {
        console.error("[v0] Error creating WebSocket connection:", err)
        clearTimeout(timeout)
        reject(err)
      }
    })
  } catch (error) {
    console.error("[v0] Error fetching Pump.fun tokens:", error)
    return []
  }
}
