import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function LandingPreview() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-primary/20 via-background to-background border border-primary/30 rounded-xl p-12 text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-sm text-primary font-medium">
              <Sparkles className="h-4 w-4" />
              Try It Now
            </div>
            <h2 className="text-4xl font-bold text-foreground">Ready to Analyze Your First Memecoin?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No signup required. Enter a ticker and get instant analysis with real DEX data.
            </p>
          </div>

          <Link
            href="/analyze"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Start Analyzing
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
