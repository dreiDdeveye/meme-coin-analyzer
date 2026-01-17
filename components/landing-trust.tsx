import { CheckCircle, TrendingUp, AlertTriangle, Zap } from "lucide-react"

const trustPoints = [
  {
    icon: TrendingUp,
    title: "Trench",
    description: "Live blockchain data sourced directly from the meme coin trenches, no delays or cached metrics.",
  },
  {
    icon: Zap,
    title: "Explainable AI",
    description: "Every analysis shows exactly what the system examined, why, and how conclusions were drawn.",
  },
  {
    icon: AlertTriangle,
    title: "No Hype, No Predictions",
    description: "Pure observational analysis. We report what the data shows, never what we think will happen.",
  },
  {
    icon: CheckCircle,
    title: "Built for Trenches Traders",
    description: "Designed by traders who understand the mechanics of memecoin launches and market behavior.",
  },
]

export function LandingTrust() {
  return (
    <section className="py-20 px-4 bg-card/30 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">Why Traders Trust This Analyzer</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built on transparency, real data, and explainable intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <div
                key={index}
                className="p-6 bg-background/50 border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.description}</p>
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
