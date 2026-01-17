"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import { fetchMajorNews, formatTimeAgo, type MajorNews } from "@/lib/market-intelligence"

export function IntelNewsCard() {
  const [news, setNews] = useState<MajorNews[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedNews, setExpandedNews] = useState<string | null>(null)

  useEffect(() => {
    fetchMajorNews().then((data) => {
      setNews(data)
      setLoading(false)
    })
  }, [])

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "BULLISH":
        return <TrendingUp className="h-3.5 w-3.5 text-green-600" />
      case "BEARISH":
        return <TrendingDown className="h-3.5 w-3.5 text-red-600" />
      default:
        return <Minus className="h-3.5 w-3.5 text-gray-400" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "BULLISH":
        return "bg-green-100 text-green-700 border-green-300"
      case "BEARISH":
        return "bg-red-100 text-red-700 border-red-300"
      default:
        return "bg-gray-100 text-gray-600 border-gray-300"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "solana":
        return "bg-purple-100 text-purple-700 border-purple-300"
      case "memecoin":
        return "bg-teal-100 text-teal-700 border-teal-300"
      case "defi":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "market":
        return "bg-green-100 text-green-700 border-green-300"
      default:
        return "bg-gray-100 text-gray-600 border-gray-300"
    }
  }

  if (loading) {
    return (
      <Card className="lab-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-mono tracking-wider flex items-center gap-2 text-foreground">
            <Newspaper className="h-4 w-4 text-primary animate-pulse" />
            MAJOR NEWS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted/30 animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="lab-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-mono tracking-wider flex items-center gap-2 text-foreground">
          <Newspaper className="h-4 w-4 text-primary" />
          MAJOR NEWS
          <Badge
            variant="outline"
            className="ml-auto text-[10px] font-mono flex items-center gap-1 bg-primary/10 text-primary border-primary/30"
          >
            <Sparkles className="h-2.5 w-2.5" />
            AI FILTERED
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {news.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-xs font-mono">No major news at this time</div>
        ) : (
          news.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded border border-primary/20 bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={`text-[8px] ${getCategoryColor(item.category)}`}>
                      {item.category.toUpperCase()}
                    </Badge>
                    <span className="text-[9px] text-muted-foreground font-mono">{formatTimeAgo(item.timestamp)}</span>
                  </div>
                  <span className="font-bold text-foreground text-sm block">{item.headline}</span>
                  <span className="text-[10px] text-muted-foreground">{item.summary}</span>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[9px] shrink-0 ${getImpactColor(item.aiAnalysis.marketImpact)}`}
                >
                  {getImpactIcon(item.aiAnalysis.marketImpact)}
                  <span className="ml-1">{item.aiAnalysis.marketImpact}</span>
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setExpandedNews(expandedNews === item.id ? null : item.id)}
                  className="text-[10px] text-primary flex items-center gap-1 hover:text-primary/80 transition-colors"
                >
                  {expandedNews === item.id ? (
                    <>
                      <ChevronUp className="h-3 w-3" />
                      HIDE AI ANALYSIS
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3" />
                      VIEW AI ANALYSIS
                    </>
                  )}
                </button>
                <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
                  <span>RELEVANCE: {item.relevanceScore}%</span>
                  <ExternalLink className="h-3 w-3 cursor-pointer hover:text-primary transition-colors" />
                </div>
              </div>

              {expandedNews === item.id && (
                <div className="mt-3 pt-3 border-t border-primary/20 space-y-2 text-[10px]">
                  <div>
                    <span className="text-muted-foreground">WHY IT MATTERS:</span>
                    <p className="text-foreground mt-0.5">{item.aiAnalysis.whyItMatters}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">MEMECOIN RELEVANCE:</span>
                    <p className="text-foreground mt-0.5">{item.aiAnalysis.memecoinRelevance}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[8px] bg-muted/30 border-primary/30">
                      SOURCE: {item.source}
                    </Badge>
                    <Badge variant="outline" className="text-[8px] bg-muted/30 border-primary/30">
                      CONFIDENCE: {item.aiAnalysis.confidence}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
