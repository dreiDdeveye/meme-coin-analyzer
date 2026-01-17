import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Return null if credentials aren't configured
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials not configured. Some features may be unavailable.")
    return null
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}