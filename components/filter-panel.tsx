"use client"

import { useCallback } from "react"
import { X } from "lucide-react"

export interface FilterState {
  minLiquidity: number
  maxRiskScore: number
  minVolume: number
  minAge: number
  hasNoRedFlags: boolean
}

interface FilterPanelProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onReset: () => void
  isOpen: boolean
  onClose: () => void
}

export function FilterPanel({ filters, onChange, onReset, isOpen, onClose }: FilterPanelProps) {
  const handleMinLiquidityChange = useCallback(
    (value: number) => {
      onChange({ ...filters, minLiquidity: value })
    },
    [filters, onChange],
  )

  const handleMaxRiskChange = useCallback(
    (value: number) => {
      onChange({ ...filters, maxRiskScore: value })
    },
    [filters, onChange],
  )

  const handleMinVolumeChange = useCallback(
    (value: number) => {
      onChange({ ...filters, minVolume: value })
    },
    [filters, onChange],
  )

  const handleMinAgeChange = useCallback(
    (value: number) => {
      onChange({ ...filters, minAge: value })
    },
    [filters, onChange],
  )

  const handleRedFlagsChange = useCallback(
    (value: boolean) => {
      onChange({ ...filters, hasNoRedFlags: value })
    },
    [filters, onChange],
  )

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} />}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-80 transform bg-card shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-border px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Advanced Filters</h2>
            <button
              onClick={onClose}
              className="rounded-md p-1 hover:bg-muted transition-colors"
              aria-label="Close filters"
            >
              <X size={20} className="text-muted-foreground" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-4">
            {/* Minimum Liquidity */}
            <div>
              <label className="block text-sm font-medium text-foreground">
                Minimum Liquidity: ${(filters.minLiquidity / 1000).toFixed(0)}K
              </label>
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={filters.minLiquidity}
                onChange={(e) => handleMinLiquidityChange(Number(e.target.value))}
                className="mt-2 w-full cursor-pointer"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>$500K</span>
              </div>
            </div>

            {/* Maximum Risk Score */}
            <div>
              <label className="block text-sm font-medium text-foreground">
                Maximum Risk Score: {filters.maxRiskScore}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={filters.maxRiskScore}
                onChange={(e) => handleMaxRiskChange(Number(e.target.value))}
                className="mt-2 w-full cursor-pointer"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Safest</span>
                <span>Riskiest</span>
              </div>
            </div>

            {/* Minimum Volume */}
            <div>
              <label className="block text-sm font-medium text-foreground">
                Minimum 24h Volume: ${(filters.minVolume / 1000).toFixed(0)}K
              </label>
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={filters.minVolume}
                onChange={(e) => handleMinVolumeChange(Number(e.target.value))}
                className="mt-2 w-full cursor-pointer"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>$500K</span>
              </div>
            </div>

            {/* Minimum Age */}
            <div>
              <label className="block text-sm font-medium text-foreground">Minimum Age: {filters.minAge} days</label>
              <input
                type="range"
                min="0"
                max="365"
                step="1"
                value={filters.minAge}
                onChange={(e) => handleMinAgeChange(Number(e.target.value))}
                className="mt-2 w-full cursor-pointer"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Brand new</span>
                <span>1 year old</span>
              </div>
            </div>

            {/* No Red Flags */}
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasNoRedFlags}
                  onChange={(e) => handleRedFlagsChange(e.target.checked)}
                  className="h-4 w-4 rounded border-border bg-card accent-primary cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground">No red flags detected</span>
              </label>
              <p className="text-xs text-muted-foreground ml-7">Only show coins without warning signs</p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border space-y-2 px-6 py-4">
            <button
              onClick={onReset}
              className="w-full rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
