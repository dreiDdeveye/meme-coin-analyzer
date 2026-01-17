// Solana blockchain data APIs (using public RPC endpoint)
const SOLANA_RPC_ENDPOINT = "https://api.mainnet-beta.solana.com"

export interface SolanaTokenHolder {
  address: string
  amount: string
  uiAmount: number
  decimals: number
}

export interface SolanaTokenAccount {
  pubkey: string
  account: {
    data: {
      parsed: {
        info: {
          mint: string
          owner: string
          tokenAmount: {
            amount: string
            decimals: number
            uiAmount: number
          }
        }
      }
    }
  }
}

// Fetch token largest holders from Solana blockchain via public RPC
export async function fetchSolanaTokenHolders(tokenAddress: string, limit = 20): Promise<SolanaTokenHolder[]> {
  try {
    console.log(`[v0] Fetching real Solana holder data for ${tokenAddress} via RPC`)

    const response = await fetch(SOLANA_RPC_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenLargestAccounts",
        params: [tokenAddress, { commitment: "confirmed" }],
      }),
    })

    if (!response.ok) {
      console.error("[v0] Solana RPC error:", response.status)
      return []
    }

    const data = await response.json()

    if (data.error) {
      console.error("[v0] Solana RPC returned error:", data.error.message)
      return []
    }

    const accounts = data.result?.value || []
    console.log(`[v0] Fetched ${accounts.length} largest Solana token holders`)

    return accounts.slice(0, limit).map((account: any) => ({
      address: account.address,
      amount: account.amount,
      uiAmount: account.uiAmount || 0,
      decimals: account.decimals || 9,
    }))
  } catch (error) {
    console.error("[v0] Error fetching Solana holders:", error)
    return []
  }
}

// Fetch token supply information
export async function fetchSolanaTokenSupply(
  tokenAddress: string,
): Promise<{ total: string; decimals: number } | null> {
  try {
    const response = await fetch(SOLANA_RPC_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenSupply",
        params: [tokenAddress],
      }),
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    if (data.error) {
      return null
    }

    return {
      total: data.result?.value?.amount || "0",
      decimals: data.result?.value?.decimals || 9,
    }
  } catch (error) {
    console.error("[v0] Error fetching token supply:", error)
    return null
  }
}
