"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { validateAdminCredentials, setAdminSession } from "@/lib/admin-auth"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Image from "next/image"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    setTimeout(() => {
      if (validateAdminCredentials(username, password)) {
        setAdminSession()
        router.push("/admin/dashboard")
      } else {
        setError("Invalid username or password")
        setIsLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="lab-card p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4 relative h-20 w-20">
            <Image
              src="/images/611252578-1660028608490268-5448069045277775738-n.png"
              alt="Oracle Logo"
              fill
              className="object-contain opacity-80"
            />
          </div>
          <h1 className="text-3xl font-bold text-primary font-mono tracking-wider mb-2">ORACLE ADMIN</h1>
          <p className="text-sm text-muted-foreground">Trench Meta Management System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="bg-muted/50 border-primary/30"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="bg-muted/50 border-primary/30"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 p-3 rounded border border-red-500/30">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
