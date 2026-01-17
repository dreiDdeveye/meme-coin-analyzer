"use client"
import { X, Globe, Twitter } from "lucide-react"
import type { TokenPair } from "@/lib/dex-screener"

interface TokenInfoModalProps {
  token: TokenPair
  isOpen: boolean
  onClose: () => void
}

export function TokenInfoModal({ token, isOpen, onClose }: TokenInfoModalProps) {
  if (!isOpen) return null

  const socials = token.info?.socials || []
  const websiteLink = socials.find((s) => s.type === "website")?.url
  const twitterLink = socials.find((s) => s.type === "twitter")?.url

  const description =
    (token as any).info?.description ||
    "No description available for this token. Visit DEX Screener for more information."

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <div
        className="relative w-full max-w-md bg-background border border-primary/20 rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Token Image */}
        <div className="flex justify-center pt-8 pb-4">
          {token.info?.imageUrl ? (
            <img
              src={token.info.imageUrl || "/placeholder.svg"}
              alt={token.baseToken.name}
              className="w-24 h-24 rounded-lg border-2 border-primary/20"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg border-2 border-primary/20 bg-muted flex items-center justify-center">
              <span className="text-4xl">{token.baseToken.symbol.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Token Name */}
        <h2 className="text-2xl font-bold text-center px-6">{token.baseToken.name}</h2>

        {/* Social Links */}
        <div className="flex justify-center gap-3 mt-4 px-6">
          {websiteLink && (
            <a
              href={websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm font-medium"
            >
              <Globe className="w-4 h-4" />
              Website
            </a>
          )}
          {twitterLink && (
            <a
              href={twitterLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm font-medium"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </a>
          )}
        </div>

        {/* Description */}
        <div className="p-6">
          <p className="text-sm text-center leading-relaxed text-muted-foreground">{description}</p>
        </div>

        {/* DEX Screener Link */}
        <div className="p-6 pt-0">
          <a
            href={token.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg transition-colors text-sm font-medium"
          >
            💎 View on DEX Screener
          </a>
        </div>
      </div>
    </div>
  )
}
