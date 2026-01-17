export interface BitQueryPumpFunToken {
  blockTime: string
  creator: string
  tokenSymbol: string
  tokenName: string
  mintAddress: string
  supply: number
  decimals: number
  uri: string | null
  verified: boolean
}

export interface BitQueryResponse {
  data: {
    Solana: {
      TokenSupplyUpdates: Array<{
        Block: { Time: string }
        Transaction: { Signer: string }
        TokenSupplyUpdate: {
          Amount: number
          PostBalance: number
          Currency: {
            Symbol: string
            Name: string
            MintAddress: string
            Decimals: number
            Uri: string | null
            VerifiedCollection: boolean
            ProgramAddress: string
          }
        }
      }>
    }
  }
}

const BITQUERY_GRAPHQL_ENDPOINT = "https://streaming.bitquery.io/graphql"

const PUMPFUN_QUERY = `
query {
  Solana {
    TokenSupplyUpdates(
      limit:{count:100}
      orderBy:{descending:Block_Time}
      where: {Instruction: {Program: {Address: {is: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"}, Method: {in: ["create","create_v2"]}}}}
    ) {
      Block{
        Time
      }
      Transaction{
        Signer
      }
      TokenSupplyUpdate {
        Amount
        PostBalance
        Currency {
          Symbol
          Name
          MintAddress
          Decimals
          Uri
          VerifiedCollection
          ProgramAddress
        }
      }
    }
  }
}
`

export async function fetchPumpFunTokensFromBitQuery(): Promise<BitQueryPumpFunToken[]> {
  try {
    console.log("[v0] Fetching real Pump.fun launches from BitQuery...")

    const response = await fetch(BITQUERY_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: PUMPFUN_QUERY,
      }),
    })

    if (!response.ok) {
      console.error("[v0] BitQuery API returned error:", response.status, response.statusText)
      return []
    }

    const result: BitQueryResponse = await response.json()

    if (!result.data?.Solana?.TokenSupplyUpdates) {
      console.log("[v0] No token supply updates found in BitQuery response")
      return []
    }

    const tokens: BitQueryPumpFunToken[] = result.data.Solana.TokenSupplyUpdates.map((update) => ({
      blockTime: update.Block.Time,
      creator: update.Transaction.Signer,
      tokenSymbol: update.TokenSupplyUpdate.Currency.Symbol || "UNKNOWN",
      tokenName: update.TokenSupplyUpdate.Currency.Name || "Unknown Token",
      mintAddress: update.TokenSupplyUpdate.Currency.MintAddress,
      supply: update.TokenSupplyUpdate.PostBalance,
      decimals: update.TokenSupplyUpdate.Currency.Decimals,
      uri: update.TokenSupplyUpdate.Currency.Uri,
      verified: update.TokenSupplyUpdate.Currency.VerifiedCollection,
    }))

    console.log(`[v0] Successfully fetched ${tokens.length} real Pump.fun tokens from BitQuery`)
    return tokens
  } catch (error) {
    console.error("[v0] Failed to fetch from BitQuery:", error)
    return []
  }
}

export async function getPumpFunTokenDetails(mintAddress: string): Promise<BitQueryPumpFunToken | null> {
  try {
    const query = `
    query {
      Solana {
        TokenSupplyUpdates(
          limit:{count:1}
          where: {
            Instruction: {Program: {Address: {is: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"}}}
            TokenSupplyUpdate: {Currency: {MintAddress: {is: "${mintAddress}"}}}
          }
        ) {
          Block{Time}
          Transaction{Signer}
          TokenSupplyUpdate {
            Amount
            PostBalance
            Currency {
              Symbol
              Name
              MintAddress
              Decimals
              Uri
              VerifiedCollection
            }
          }
        }
      }
    }
    `

    const response = await fetch(BITQUERY_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) return null

    const result: BitQueryResponse = await response.json()
    const updates = result.data?.Solana?.TokenSupplyUpdates

    if (!updates || updates.length === 0) return null

    const update = updates[0]
    return {
      blockTime: update.Block.Time,
      creator: update.Transaction.Signer,
      tokenSymbol: update.TokenSupplyUpdate.Currency.Symbol || "UNKNOWN",
      tokenName: update.TokenSupplyUpdate.Currency.Name || "Unknown Token",
      mintAddress: update.TokenSupplyUpdate.Currency.MintAddress,
      supply: update.TokenSupplyUpdate.PostBalance,
      decimals: update.TokenSupplyUpdate.Currency.Decimals,
      uri: update.TokenSupplyUpdate.Currency.Uri,
      verified: update.TokenSupplyUpdate.Currency.VerifiedCollection,
    }
  } catch (error) {
    console.error("[v0] Failed to fetch token details:", error)
    return null
  }
}
