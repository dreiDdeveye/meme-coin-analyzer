"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

export function TimezoneDisplay() {
  const [time, setTime] = useState<Date>(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const timezones = [
    { label: "US EAST", tz: "America/New_York" },
    { label: "US WEST", tz: "America/Los_Angeles" },
    { label: "EU", tz: "Europe/London" },
    { label: "ASIA", tz: "Asia/Tokyo" },
  ]

  const formatTime = (date: Date, timezone: string) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  return (
    <div className="flex items-center justify-center gap-4 text-xs font-mono bg-card/50 border border-border rounded-lg p-3 backdrop-blur-sm">
      <Clock className="h-4 w-4 text-primary shrink-0" />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {timezones.map((tz) => (
          <div key={tz.label} className="flex items-center gap-2">
            <span className="text-primary font-bold uppercase text-[10px]">{tz.label}</span>
            <span className="text-foreground font-semibold">{formatTime(time, tz.tz)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
