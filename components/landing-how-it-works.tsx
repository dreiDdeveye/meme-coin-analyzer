import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Enter a Ticker",
    description: "Input any memecoin symbol, pair address, or contract address",
  },
  {
    number: "02",
    title: "Fetch Real-time Data",
    description: "System retrieves live DEX data, liquidity, volume, and transaction history",
  },
  {
    number: "03",
    title: "Multi-layer Analysis",
    description: "Analyzer evaluates risk, narrative, bundles, volume, and market saturation",
  },
  {
    number: "04",
    title: "Explainable Insights",
    description: "Receive human-readable analysis with exact metrics and methodology shown",
  },
]

export function LandingHowItWorks() {
  return (
    <section className="py-20 px-4 bg-card/30 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Simple. Fast. Transparent.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="space-y-4">
                <div className="text-4xl font-bold text-primary/30">{step.number}</div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-3 text-primary/30">
                  <ArrowRight className="h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
