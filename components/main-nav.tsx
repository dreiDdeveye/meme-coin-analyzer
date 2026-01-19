"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, TrendingUp, Home, Radio, Radar, Users, MessageCircle } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export function MainNav() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navItems = [
    { href: "/", label: "HOME", icon: Home },
    { href: "/analyze", label: "ANALYZE", icon: Search },
    { href: "/chat", label: "ORACLE", icon: MessageCircle },
    { href: "/dashboard", label: "LAB", icon: TrendingUp },
    { href: "/intelligence", label: "INTEL", icon: Radio },
    { href: "/monitor", label: "MONITOR", icon: Radar },
    { href: "/holders", label: "HOLDERS", icon: Users },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative h-28 w-28">
            <Image src="/images/oracle-full-logo.png" alt="ORACLE" fill className="object-contain" priority />
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`text-xs font-medium px-3 py-2 rounded transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="hidden md:inline">{label}</span>
                <Icon className="md:hidden h-4 w-4" />
              </Link>
            )
          })}
          
          <a
            href="https://x.com/i/communities/2013200869089804524?fbclid=IwY2xjawPa6rtleHRuA2FlbQIxMABicmlkETFRbjBJQU5GYllGWnRTM1d1c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHtojgknonjF16DJ-nnErBBcM_6MIIqjYiEzLDDS952rkk571gcddmysYNdlx_aem_Pg26Kar78S7OXq1rBiX83A"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-3 py-2 rounded transition-colors text-muted-foreground hover:text-foreground"
          >
            <span className="hidden md:inline">COMMUNITY</span>
            <Users className="md:hidden h-4 w-4" />
          </a>
        </div>

        <div className="flex items-center gap-1 text-xs text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="hidden sm:inline">LIVE</span>
        </div>
      </div>
    </nav>
  )
}