"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import LightRays from "./light-rays"

export function LandingHero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#06b6d4"
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={2.5}
          pulsating={true}
          fadeDistance={1.2}
          saturation={0.9}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.05}
          distortion={0.1}
        />
      </div>

      <div className="absolute inset-0 lab-grid z-[1] opacity-0" />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 pt-48">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 top-55">
            <Image
              src="/images/oracle-eye-logo.png"
              alt=""
              width={800}
              height={600}
              className="opacity-[0.05] scale-[3]"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight tracking-tight">
              <span
                className="block"
                style={{
                  textShadow: "0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 40px #06b6d4, 0 0 80px rgba(6, 182, 212, 0.5)",
                }}
              >
                ORACLE
              </span>
            </h1>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            href="/analyze"
            className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded text-sm font-mono tracking-wider hover:opacity-90 transition-all lab-glow hover:scale-105"
          >
            ANALYZE SPECIMEN
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/chat"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary/50 bg-transparent text-foreground px-8 py-4 rounded text-sm font-mono tracking-wider hover:border-primary hover:bg-primary/10 hover:scale-105 transition-all"
          >
            TALK TO THE ORACLE
          </Link>
        </div>

        {/* CA Placeholder */}
        <div className="flex items-center justify-center pt-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-card/50 border border-border rounded-lg">
            <span className="text-xs font-mono text-muted-foreground">CA:</span>
            <span className="text-sm font-mono text-primary tracking-wider">9bnYDvGLxuNzHq7ZNAvPryn51TjSJRLhdJw694RDpump</span>
            <button 
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() => navigator.clipboard.writeText("9bnYDvGLxuNzHq7ZNAvPryn51TjSJRLhdJw694RDpump")}
              title="Copy CA"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="pt-16 flex items-center justify-center gap-8 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>DEX SCREENER</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>REAL-TIME DATA</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
            <span>RISK ANALYSIS</span>
          </div>
        </div>
      </div>
    </section>
  )
}