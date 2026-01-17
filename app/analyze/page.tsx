import { MainNav } from "@/components/main-nav"
import { TickerAnalyzer } from "@/components/ticker-analyzer"
import { PlatformFooter } from "@/components/platform-footer"
import { Search } from "lucide-react"

export const metadata = {
  title: "Ticker Analyzer - Memecoin Analyzer",
  description: "Real-time ticker-based memecoin analysis with trenches classification",
}

export default function AnalyzePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <MainNav />

      {/* Header */}
      <header className="pt-28 border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl w-full px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Search className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Ticker Analyzer</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Real-time DEX Screener data with explainable analysis and risk assessment
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl w-full px-4 py-8 flex-grow">
        <TickerAnalyzer />
      </main>

      <PlatformFooter />
    </div>
  )
}
