"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertCircle } from "lucide-react"
import Image from "next/image"
import type { MetaOfTheDayResult } from "@/lib/meta-of-the-day"

interface MetaOfTheDayCardProps {
  data: MetaOfTheDayResult | null
  isLoading: boolean
  error?: string
}

// Mock data fallback
const MOCK_DATA: MetaOfTheDayResult = {
  meta: "Animals with Weapons & Tek Devs",
  reasoning: "Meta seems to be dominated by animals wielding weapons, cows and some random tek devs that no one understands but are getting bids since finnbags been cookin. Trenchers still waiting for Alon to call a 14k token.",
  confidence: "high",
  exampleTokens: [
    { symbol: "COWGUN", name: "Armed Cow", confidence: 0.92 },
    { symbol: "TEKDEV", name: "Mystery Dev Token", confidence: 0.85 },
    { symbol: "FINNBAG", name: "Finnbags Kitchen", confidence: 0.78 },
  ],
  totalTokensAnalyzed: 847,
  timestamp: Date.now(),
}

export function MetaOfTheDayCard({ data, isLoading, error }: MetaOfTheDayCardProps) {
  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Meta of the Day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Meta of the Day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Analyzing trends...</p>
        </CardContent>
      </Card>
    )
  }

  // Use mock data if no data provided
  const displayData = data && data.confidence ? data : MOCK_DATA

  const confidenceColor =
    displayData.confidence === "high"
      ? "bg-success/20 text-success"
      : displayData.confidence === "medium"
        ? "bg-accent/20 text-accent"
        : "bg-destructive/20 text-destructive"

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Meta of the Day</CardTitle>
            <CardDescription>Daily narrative intelligence</CardDescription>
          </div>
          <Badge className={confidenceColor}>{(displayData.confidence || "low").toUpperCase()}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Meta Image */}
        <div className="relative w-full h-44 rounded-lg overflow-hidden bg-muted/50">
          <Image
            src="/images/metaoftheday.jpeg"
            alt="Meta of the day"
            fill
            className="object-cover"
          />
        </div>

        <div className="rounded-lg border border-border/50 bg-background/50 p-4">
          <div className="text-lg font-bold text-primary mb-2">{displayData.meta || "Unknown Meta"}</div>
          <p className="text-sm text-foreground/80">{displayData.reasoning || "No reasoning available"}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-muted-foreground mb-2">Example Tokens</h4>
          <div className="space-y-2">
            {(displayData.exampleTokens || []).map((token) => (
              <div
                key={`${token.symbol}-example`}
                className="flex items-center justify-between rounded-lg border border-border/30 bg-background/50 px-3 py-2"
              >
                <div>
                  <div className="text-sm font-semibold">{token.symbol}</div>
                  <div className="text-xs text-muted-foreground">{token.name}</div>
                </div>
                <Badge variant="outline">{Math.round((token.confidence || 0) * 100)}%</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground border-t border-border/30 pt-3">
          Based on analysis of {displayData.totalTokensAnalyzed || 0} recent launches
        </div>
      </CardContent>
    </Card>
  )
}