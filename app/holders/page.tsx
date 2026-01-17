"use client"
import Aurora from "@/components/aurora"
import { MainNav } from "@/components/main-nav"
import { Clock } from "lucide-react"

export default function HolderAnalysisPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Aurora Background - fixed with proper z-index */}
      <div className="fixed inset-0 z-0">
        <Aurora 
          colorStops={["#5227FF", "#7cff67", "#5227FF"]} 
          amplitude={1.2} 
          blend={0.6}
          speed={0.8}
        />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 lab-grid opacity-20 pointer-events-none z-[1]" />

      {/* Content wrapper - above aurora */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <MainNav />

        <main className="flex-1 pt-28 pb-12">
          <div className="mx-auto max-w-[1600px] w-full px-2">
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
              <div className="lab-card p-12 text-center space-y-6 max-w-2xl backdrop-blur-sm bg-background/80">
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 p-6">
                    <Clock className="h-16 w-16 text-primary animate-pulse" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl font-bold font-mono uppercase tracking-wider">Coming Soon</h1>
                  <p className="text-xl text-muted-foreground">Holder Analysis</p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-muted-foreground">
                    Holder Analysis with bubble map visualization is currently under development. This feature will
                    provide comprehensive token holder distribution analysis.
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-muted-foreground/70">Stay tuned for updates from The Oracle.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}