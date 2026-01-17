"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Zap, ArrowUp, Rocket, Settings, Megaphone, ChevronDown, ChevronUp } from "lucide-react"
import { fetchTodayEvents, type MarketEvent } from "@/lib/market-intelligence"

export function IntelEventsCard() {
  const [events, setEvents] = useState<MarketEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  useEffect(() => {
    fetchTodayEvents().then((data) => {
      setEvents(data)
      setLoading(false)
    })
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "launch":
        return <Rocket className="h-3.5 w-3.5" />
      case "unlock":
        return <ArrowUp className="h-3.5 w-3.5" />
      case "upgrade":
        return <Settings className="h-3.5 w-3.5" />
      case "announcement":
        return <Megaphone className="h-3.5 w-3.5" />
      default:
        return <Calendar className="h-3.5 w-3.5" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "HIGH":
        return "bg-red-100 text-red-700 border-red-300"
      case "MEDIUM":
        return "bg-amber-100 text-amber-700 border-amber-300"
      default:
        return "bg-gray-100 text-gray-600 border-gray-300"
    }
  }

  if (loading) {
    return (
      <Card className="lab-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-mono tracking-wider flex items-center gap-2 text-foreground">
            <Calendar className="h-4 w-4 text-primary animate-pulse" />
            EVENTS TODAY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-muted/30 animate-pulse rounded" />
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
          <Calendar className="h-4 w-4 text-primary" />
          EVENTS TODAY
          <Badge
            variant="outline"
            className="ml-auto text-[10px] font-mono bg-primary/10 text-primary border-primary/30"
          >
            {events.length} SCHEDULED
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {events.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-xs font-mono">No events scheduled for today</div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="p-3 rounded border border-primary/20 bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-primary/20 text-primary">{getTypeIcon(event.type)}</div>
                  <div>
                    <span className="font-bold text-foreground text-sm block">{event.title}</span>
                    <span className="text-[10px] text-muted-foreground">{event.description}</span>
                  </div>
                </div>
                <Badge variant="outline" className={`text-[9px] shrink-0 ${getImpactColor(event.impactLevel)}`}>
                  <Zap className="h-2.5 w-2.5 mr-1" />
                  {event.impactLevel}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-[10px] font-mono mb-2">
                <div className="flex items-center gap-1 text-primary">
                  <Clock className="h-3 w-3" />
                  {event.timeUTC}
                </div>
                {event.affectedPlatforms.length > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">PLATFORMS:</span>
                    {event.affectedPlatforms.slice(0, 2).map((p, i) => (
                      <Badge key={i} variant="outline" className="text-[8px] bg-muted/30 border-primary/30">
                        {p}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                className="text-[10px] text-primary flex items-center gap-1 hover:text-primary/80 transition-colors"
              >
                {expandedEvent === event.id ? (
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

              {expandedEvent === event.id && (
                <div className="mt-3 pt-3 border-t border-primary/20 space-y-2 text-[10px]">
                  <div>
                    <span className="text-muted-foreground">WHY IT MATTERS:</span>
                    <p className="text-foreground mt-0.5">{event.aiAnalysis.whyItMatters}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">WHO IT AFFECTS:</span>
                    <p className="text-foreground mt-0.5">{event.aiAnalysis.whoItAffects}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">WHAT TO WATCH:</span>
                    <p className="text-foreground mt-0.5">{event.aiAnalysis.whatToWatch}</p>
                  </div>
                  <Badge variant="outline" className="text-[8px] bg-muted/30 border-primary/30">
                    CONFIDENCE: {event.aiAnalysis.confidence}
                  </Badge>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
