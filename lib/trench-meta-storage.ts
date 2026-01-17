import { createClient } from "@/lib/supabase/client"

export interface TrenchMetaData {
  id: string
  title: string
  description: string
  imageUrl: string
  emoji: string
  categories?: string[]
  createdAt: string
  updatedAt: string
}

export async function saveTrenchMeta(
  meta: Omit<TrenchMetaData, "id" | "createdAt" | "updatedAt">,
): Promise<TrenchMetaData | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("trench_meta")
    .insert({
      title: meta.title,
      description: meta.description,
      emoji: meta.emoji,
      image_url: meta.imageUrl,
      categories: meta.categories || [],
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error saving trench meta:", error)
    return null
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    emoji: data.emoji,
    imageUrl: data.image_url,
    categories: data.categories,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

export async function getTrenchMeta(): Promise<TrenchMetaData | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("trench_meta")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)

  if (error) {
    console.error("[v0] Error fetching trench meta:", error)
    return null
  }

  // Handle empty table
  if (!data || data.length === 0) {
    console.log("[v0] No trench meta found in database")
    return null
  }

  const record = data[0]
  return {
    id: record.id,
    title: record.title,
    description: record.description,
    emoji: record.emoji,
    imageUrl: record.image_url,
    categories: record.categories,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  }
}

export async function updateTrenchMeta(
  id: string,
  updates: Partial<Omit<TrenchMetaData, "id" | "createdAt" | "updatedAt">>,
): Promise<TrenchMetaData | null> {
  const supabase = createClient()

  const updateData: Record<string, unknown> = {}
  if (updates.title !== undefined) updateData.title = updates.title
  if (updates.description !== undefined) updateData.description = updates.description
  if (updates.emoji !== undefined) updateData.emoji = updates.emoji
  if (updates.imageUrl !== undefined) updateData.image_url = updates.imageUrl
  if (updates.categories !== undefined) updateData.categories = updates.categories

  const { data, error } = await supabase.from("trench_meta").update(updateData).eq("id", id).select().single()

  if (error) {
    console.error("[v0] Error updating trench meta:", error)
    return null
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    emoji: data.emoji,
    imageUrl: data.image_url,
    categories: data.categories,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}
