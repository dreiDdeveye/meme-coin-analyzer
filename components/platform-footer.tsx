"use client"

import { Twitter, Github } from "lucide-react"

interface PlatformFooterProps {
  contractAddress?: string
}

export function PlatformFooter({ contractAddress }: PlatformFooterProps) {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-12">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Transparency Section */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Platform Transparency</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This site is free to use. Creator fees are allocated toward adding new features, improving analysis
              accuracy, and expanding API capabilities.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Connect</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-background hover:bg-primary/10 transition-colors"
                aria-label="Follow on X"
              >
                <Twitter className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="https://github.com/dreiDdeveye"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-background hover:bg-primary/10 transition-colors"
                aria-label="Visit GitHub"
              >
                <Github className="h-5 w-5 text-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright - Updated to ORACLE */}
        <div className="border-t border-border pt-6 flex flex-col gap-2 text-xs text-muted-foreground">
          <p>© 2026 ORACLE Laboratory. All rights reserved.</p>
          <p>Data provided by DEX Screener and Pump.fun APIs. Not financial advice.</p>
        </div>
      </div>
    </footer>
  )
}
