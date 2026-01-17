// Real Solana blockchain API for fetching token holder data
import type { HolderData, TokenHolderStats } from "@/lib/holder-analyzer"

const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"

interface SolanaTokenAccount {
  pubkey: string
  account: {
    data: {
      parsed: {
        info: {
          tokenAmount: {
            amount: string
            decimals: number
            uiAmount: number
          }
          owner: string
        }
      }
    }
  }
}

export async function fetchRealSolanaHolders(
  tokenMintAddress: string,
  tokenName: string,
  tokenSymbol: string,
): Promise<TokenHolderStats> {
  console.log("[v0] Fetching real Solana holder data for", tokenSymbol, tokenMintAddress)

  try {
    // Fetch token accounts for this mint
    const response = await fetch(SOLANA_RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getProgramAccounts",
        params: [
          "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA", // Token Program ID
          {
            encoding: "jsonParsed",
            filters: [
              {
                dataSize: 165, // Token account data size
              },
              {
                memcmp: {
                  offset: 0,
                  bytes: tokenMintAddress,
                },
              },
            ],
          },
        ],
      }),
    })

    const data = await response.json()

    if (data.error) {
      console.error("[v0] Solana RPC error:", data.error)
      throw new Error(data.error.message)
    }

    const accounts: SolanaTokenAccount[] = data.result || []

    // Calculate total supply
    const totalSupply = accounts.reduce((sum, acc) => {
      return sum + Number(acc.account.data.parsed.info.tokenAmount.amount)
    }, 0)

    // Group by owner and calculate balances
    const ownerBalances = new Map<string, number>()
    accounts.forEach((acc) => {
      const owner = acc.account.data.parsed.info.owner
      const amount = Number(acc.account.data.parsed.info.tokenAmount.amount)
      ownerBalances.set(owner, (ownerBalances.get(owner) || 0) + amount)
    })

    // Sort holders by balance
    const sortedHolders = Array.from(ownerBalances.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100) // Top 100 holders

    // Convert to HolderData format
    const holders: HolderData[] = sortedHolders.map(([address, balance], index) => {
      const percentage = (balance / totalSupply) * 100
      return {
        address: `${address.slice(0, 6)}...${address.slice(-4)}`,
        balance: balance.toString(),
        percentage: Number(percentage.toFixed(2)),
        rank: index + 1,
        interactions: [], // Would need additional API calls to fetch
        isContract: false, // Would need additional checks
        firstSeen: new Date(),
        lastActivity: new Date(),
      }
    })

    const top10Percentage = holders.slice(0, 10).reduce((sum, h) => sum + h.percentage, 0)
    const top20Percentage = holders.slice(0, 20).reduce((sum, h) => sum + h.percentage, 0)

    let concentrationRisk: "low" | "medium" | "high" | "critical"
    if (top10Percentage > 70) concentrationRisk = "critical"
    else if (top10Percentage > 50) concentrationRisk = "high"
    else if (top10Percentage > 30) concentrationRisk = "medium"
    else concentrationRisk = "low"

    console.log(
      `[v0] Fetched ${holders.length} real holders, Top 10: ${top10Percentage.toFixed(2)}%, Risk: ${concentrationRisk}`,
    )

    return {
      tokenAddress: tokenMintAddress,
      tokenName,
      tokenSymbol,
      chain: "solana",
      totalSupply: totalSupply.toString(),
      holdersCount: ownerBalances.size,
      topHolders: holders,
      concentrationRisk,
      top10Percentage: Number(top10Percentage.toFixed(2)),
      top20Percentage: Number(top20Percentage.toFixed(2)),
    }
  } catch (error) {
    console.error("[v0] Error fetching Solana holders:", error)
    // Fallback to estimation if API fails
    throw error
  }
}
