// Moralis API client for real blockchain data
const MORALIS_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjQxMDkxNTRkLWU5OWUtNGViOC05YjI0LWMxYzFkY2ZlODBmMiIsIm9yZ0lkIjoiNDkwMjEwIiwidXNlcklkIjoiNTA0MzU5IiwidHlwZUlkIjoiZGVmYmZlYzAtZmVjNS00NzZkLWJiYTAtYWU1NDU5YjA5NjViIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NjgyOTk4MTAsImV4cCI6NDkyNDA1OTgxMH0.SN3ngM1rgP9k-pZyKDygN38TaVwlo48pcMnEVAJmHOo"

const MORALIS_API_BASE = "https://deep-index.moralis.io/api/v2.2"

export interface MoralisTokenHolder {
  owner_address: string
  balance: string
  balance_formatted: string
  percentage_relative_to_total_supply: number
}

export interface MoralisTokenMetadata {
  address: string
  name: string
  symbol: string
  decimals: number
  total_supply: string
  total_supply_formatted: string
}

export interface MoralisTokenHolders {
  cursor: string | null
  page: number
  page_size: number
  result: MoralisTokenHolder[]
  token_metadata: MoralisTokenMetadata
}

// Fetch token holders from Moralis
export async function fetchTokenHolders(
  tokenAddress: string,
  chain = "solana",
  limit = 100,
): Promise<MoralisTokenHolders | null> {
  try {
    console.log(`[v0] Fetching real holder data from Moralis for ${tokenAddress} on ${chain}`)

    // Map chain names to Moralis chain identifiers
    const chainMap: Record<string, string> = {
      solana: "mainnet",
      ethereum: "eth",
      bsc: "bsc",
    }

    const moralisChain = chainMap[chain.toLowerCase()] || chain

    const response = await fetch(
      `${MORALIS_API_BASE}/${tokenAddress}/owners?chain=${moralisChain}&limit=${limit}&order=DESC`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-Key": MORALIS_API_KEY,
        },
      },
    )

    if (!response.ok) {
      console.error(`[v0] Moralis API error: ${response.status} ${response.statusText}`)
      return null
    }

    const data: MoralisTokenHolders = await response.json()
    console.log(`[v0] Successfully fetched ${data.result.length} holders from Moralis`)
    return data
  } catch (error) {
    console.error("[v0] Error fetching Moralis holder data:", error)
    return null
  }
}

// Fetch token metadata
export async function fetchTokenMetadata(tokenAddress: string, chain = "solana"): Promise<MoralisTokenMetadata | null> {
  try {
    console.log(`[v0] Fetching token metadata from Moralis for ${tokenAddress}`)

    const chainMap: Record<string, string> = {
      solana: "mainnet",
      ethereum: "eth",
      bsc: "bsc",
    }

    const moralisChain = chainMap[chain.toLowerCase()] || chain

    const response = await fetch(
      `${MORALIS_API_BASE}/erc20/metadata?chain=${moralisChain}&addresses[]=${tokenAddress}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-Key": MORALIS_API_KEY,
        },
      },
    )

    if (!response.ok) {
      console.error(`[v0] Moralis metadata API error: ${response.status}`)
      return null
    }

    const data = await response.json()
    return data[0] || null
  } catch (error) {
    console.error("[v0] Error fetching token metadata:", error)
    return null
  }
}

// Fetch wallet token balances
export async function fetchWalletBalances(walletAddress: string, chain = "solana"): Promise<any[]> {
  try {
    const chainMap: Record<string, string> = {
      solana: "mainnet",
      ethereum: "eth",
      bsc: "bsc",
    }

    const moralisChain = chainMap[chain.toLowerCase()] || chain

    const response = await fetch(`${MORALIS_API_BASE}/${walletAddress}/erc20?chain=${moralisChain}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-Key": MORALIS_API_KEY,
      },
    })

    if (!response.ok) {
      console.error(`[v0] Moralis wallet balance API error: ${response.status}`)
      return []
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching wallet balances:", error)
    return []
  }
}
