"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertCircle } from "lucide-react"
import type { MetaOfTheDayResult } from "@/lib/meta-of-the-day"

interface MetaOfTheDayCardProps {
  data: MetaOfTheDayResult | null
  isLoading: boolean
  error?: string
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

  if (!data || !data.confidence) {
    return (
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle>Meta of the Day</CardTitle>
          <CardDescription>Daily narrative intelligence</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No dominant meta detected today. Market conditions are mixed.</p>
        </CardContent>
      </Card>
    )
  }

  const confidenceColor =
    data.confidence === "high"
      ? "bg-success/20 text-success"
      : data.confidence === "medium"
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
          <Badge className={confidenceColor}>{(data.confidence || "low").toUpperCase()}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg border border-border/50 bg-background/50 p-4">
          <div className="text-lg font-bold text-primary mb-2">{data.meta || "Unknown Meta"}</div>
          <p className="text-sm text-foreground/80">{data.reasoning || "No reasoning available"}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-muted-foreground mb-2">Example Tokens</h4>
          <div className="space-y-2">
            {(data.exampleTokens || []).map((token) => (
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
          Based on analysis of {data.totalTokensAnalyzed || 0} recent launches
        </div>
      </CardContent>
    </Card>
  )
}
