import { Connection, PublicKey } from "@solana/web3.js"

const RAYDIUM_PROGRAM = new PublicKey(
  "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"
)

const connection = new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
)

console.log("🟢 Raydium listener started")

connection.onLogs(RAYDIUM_PROGRAM, (log) => {
  if (log.logs.some(l => l.includes("initialize"))) {
    console.log("🔥 New Raydium pool detected:", log.signature)
    // save to DB / queue / cache
  }
})
