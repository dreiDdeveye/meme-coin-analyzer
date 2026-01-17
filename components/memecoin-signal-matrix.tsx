"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface SignalMatrixProps {
  signals: {
    volumeMomentum: number
    narrativeStrength: number
    bundleRisk: number
    pvpSaturation: number
    smartWalletPresence: number
  }
  overallScore: number
}

export function MemeCoinSignalMatrix({ signals, overallScore }: SignalMatrixProps) {
  const data = [
    {
      name: "Volume",
      value: signals.volumeMomentum,
      description: "24h momentum",
      icon: "🔥",
    },
    {
      name: "Narrative",
      value: signals.narrativeStrength,
      description: "Story strength",
      icon: "🧠",
    },
    {
      name: "Bundle Risk",
      value: 100 - signals.bundleRisk, // Inverse for visualization
      description: "Safety score",
      icon: "⚠️",
    },
    {
      name: "PVP Saturation",
      value: 100 - signals.pvpSaturation, // Inverse for visualization
      description: "Opportunity score",
      icon: "🧬",
    },
    {
      name: "Smart Wallets",
      value: signals.smartWalletPresence,
      description: "Whale presence",
      icon: "🐳",
    },
  ]

  const getColor = (value: number) => {
    if (value > 75) return "hsl(var(--success))"
    if (value > 50) return "hsl(var(--accent))"
    if (value > 25) return "hsl(var(--destructive))"
    return "hsl(var(--destructive))"
  }

  return (
    <Card className="w-full border-primary/20 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span>MemeCoin Signal Matrix</span>
            </CardTitle>
            <CardDescription>Research-grade signal analysis</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-primary">{overallScore}</div>
            <div className="text-xs text-muted-foreground">Overall Score</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {data.map((signal) => (
            <div key={signal.name} className="rounded-lg border border-border/50 bg-background/50 p-3 text-center">
              <div className="mb-2 text-2xl">{signal.icon}</div>
              <div className="text-sm font-semibold">{signal.name}</div>
              <div className="text-xs text-muted-foreground mb-2">{signal.description}</div>
              <div
                className={`text-lg font-bold ${getColor(signal.value) === "hsl(var(--success))" ? "text-success" : getColor(signal.value) === "hsl(var(--accent))" ? "text-accent" : "text-destructive"}`}
              >
                {signal.value}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border/30 bg-accent/5 p-3 text-sm text-foreground/80">
          <p className="text-xs font-semibold text-accent mb-1">Analysis Note:</p>
          <p>
            This Signal Matrix synthesizes five key metrics to provide research-grade intelligence. High overall scores
            indicate strong momentum with manageable risk. Use in conjunction with other analysis tools for
            comprehensive evaluation.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
