import { BarChart3, Users, Gauge, TrendingDown, PieChart, Lightbulb } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Ticker-Based Analysis",
    description:
      "Enter any token symbol or contract address and get instant real-time analysis powered by various analytical API's.",
  },
  {
    icon: Users,
    title: "Bundle Checker",
    description: "Detects coordinated wallet behavior and bundled positions that indicate potential rug pulls.",
  },
  {
    icon: Gauge,
    title: "Narrative Detection",
    description: "Identifies the meta or story driving the coin—from AI hype to pop culture trends.",
  },
  {
    icon: TrendingDown,
    title: "Volume & Interest Tracking",
    description: "Measures real interest through volume ratios, buy pressure, and transaction patterns.",
  },
  {
    icon: PieChart,
    title: "PVP / Market Saturation Check",
    description: "Evaluates market conditions and identifies when an entry is crowded or has opportunity.",
  },
  {
    icon: Lightbulb,
    title: "Explainable Analyzer Thoughts",
    description: "Human-like interpretation of all metrics, synthesized into actionable market insights.",
  },
]

export function LandingFeatures() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">Complete Analysis Toolkit</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to evaluate memecoin risk before entering a position
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-card/80 transition-all"
              >
                <div className="flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 text-lg">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
