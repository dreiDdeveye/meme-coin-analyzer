"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export function WelcomeDialog() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-primary/30">
        <DialogHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30">
              <Eye className="h-10 w-10 text-primary" />
            </div>
          </div>

          <DialogTitle className="text-3xl font-bold text-center text-primary">
            Welcome, Trencher!
          </DialogTitle>

          {/* 👇 Use div instead of DialogDescription */}
          <div className="text-base leading-relaxed text-foreground/90 space-y-4 pt-4">
            <p>
              Welcome to{" "}
              <span className="text-primary font-semibold">The Oracle</span>! The
              Oracle is a free-to-use site that provides real-time analytical
              data on the Solana Trenches.
            </p>

            <p>
              From token analysis to current meta trends, The Oracle removes the
              hassle of opening multiple tabs to find analytical information.
            </p>

            <p className="text-primary/90 font-medium">
              The Oracle aims to become the go-to website and app for every
              Trencher out there.
            </p>
          </div>
        </DialogHeader>

        <div className="flex justify-center pt-4">
          <Button
            onClick={() => setOpen(false)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-mono tracking-wide"
          >
            ENTER THE ORACLE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
