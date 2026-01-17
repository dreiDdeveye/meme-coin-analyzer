"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

export type SortOption = "marketCap" | "risk" | "volume" | "change" | "liquidity" | "age"

interface AdvancedSortMenuProps {
  value: SortOption
  onChange: (option: SortOption) => void
}

const sortOptions = [
  { value: "marketCap" as const, label: "Market Cap (High to Low)" },
  { value: "risk" as const, label: "Risk Score (Low to High)" },
  { value: "volume" as const, label: "24h Volume (High to Low)" },
  { value: "change" as const, label: "Price Change (High to Low)" },
  { value: "liquidity" as const, label: "Liquidity (High to Low)" },
  { value: "age" as const, label: "Age (Oldest First)" },
]

export function AdvancedSortMenu({ value, onChange }: AdvancedSortMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentLabel = sortOptions.find((opt) => opt.value === value)?.label || "Sort by"

  return (
    <div className="relative inline-block w-full sm:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
      >
        <span>{currentLabel}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-full sm:w-64 rounded-md border border-border bg-card shadow-lg">
          <div className="max-h-96 overflow-y-auto">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                  value === option.value ? "bg-primary/20 text-primary font-semibold" : "text-foreground hover:bg-muted"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
