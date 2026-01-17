import { MainNav } from "@/components/main-nav"
import Aurora from "@/components/aurora"
import { Clock } from "lucide-react"

export default function MonitorPage() {
  return (
    <>
      <MainNav />
      <div className="min-h-screen bg-background lab-grid relative">
        <div className="fixed inset-0 pointer-events-none z-0">
          <Aurora colorStops={["#06b6d4", "#3b82f6", "#06b6d4"]} amplitude={0.8} blend={0.6} />
        </div>

        <div className="mx-auto max-w-7xl w-full px-4 py-8 pt-28 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <div className="lab-card p-12 text-center space-y-6 max-w-2xl">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-6">
                  <Clock className="h-16 w-16 text-primary animate-pulse" />
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl font-bold font-mono uppercase tracking-wider">Coming Soon</h1>
                <p className="text-xl text-muted-foreground">Recent Token Monitor</p>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-muted-foreground">
                  Real-time token monitoring is currently under development. This feature will allow you to track
                  recently launched tokens across the Solana trenches with live updates and instant notifications.
                </p>
              </div>

              <div className="pt-2">
                <p className="text-sm text-muted-foreground/70">Stay tuned for updates from The Oracle.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
