import Link from "next/link"
import { TrendingUp, Twitter, Github } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold text-foreground">ORACLE Laboratory</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time memecoin intelligence platform. Data-driven analysis. No predictions. No hype.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="hover:text-foreground transition-colors">
                  Ticker Analyzer
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://twitter.com"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="text-sm">Follow on X</span>
              </a>
              <a
                href="https://github.com/dreiDdeveye/meme-coin-analyzer?fbclid=IwY2xjawPa6RNleHRuA2FlbQIxMABicmlkETFRbjBJQU5GYllGWnRTM1d1c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHmiQhHwpSVU-moYYsWEaigxCLrnZLA1htPJn9vEfk4q3ERcRFd7ue21kwMHK_aem_M_h1GJS7_oySncazkw2AGw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 space-y-4 text-sm text-muted-foreground">
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-4 mb-4">
            <p className="text-sm text-foreground/80">
              <strong>This site is free to use.</strong> Creator fees are allocated toward adding new features,
              improving analysis accuracy, and expanding API capabilities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <p>© 2026 ORACLE Laboratory. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Disclaimer
              </a>
            </div>
          </div>
          <p className="text-xs">
            Disclaimer: Not financial advice. Cryptocurrency investments carry risk. Analyze at your own risk.
          </p>
        </div>
      </div>
    </footer>
  )
}
