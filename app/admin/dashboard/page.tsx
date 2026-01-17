"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated, clearAdminSession } from "@/lib/admin-auth"
import { getTrenchMeta, saveTrenchMeta, updateTrenchMeta } from "@/lib/trench-meta-storage"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Eye, LogOut, Save, Sparkles } from "lucide-react"
import Image from "next/image"

const TRENCH_CATEGORIES = [
  {
    name: "None",
    emoji: "⚪",
    description: "No specific meta trend detected in the trenches currently",
  },
  {
    name: "AI",
    emoji: "🤖",
    description: "AI agents and artificial intelligence themed tokens dominating the trenches",
  },
  {
    name: "Animal",
    emoji: "🐾",
    description: "Animal-themed memecoins leading the market with community-driven narratives",
  },
  {
    name: "Viral Meme",
    emoji: "🚀",
    description: "Viral internet memes and trending cultural phenomena taking over social feeds",
  },
  { name: "Current Events", emoji: "📰", description: "Tokens inspired by current events and real-time news cycles" },
  { name: "Anime", emoji: "⚡", description: "Anime and manga culture tokens resonating with the trencher community" },
  { name: "Pokemon", emoji: "🎮", description: "Pokemon-themed tokens capturing nostalgia and gaming culture" },
  {
    name: "Weird Shit",
    emoji: "👽",
    description: "Unconventional and bizarre tokens pushing the boundaries of memecoin culture",
  },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [emoji, setEmoji] = useState("🔥")
  const [imageUrl, setImageUrl] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentMetaId, setCurrentMetaId] = useState<string | null>(null)

  useEffect(() => {
    const authenticated = isAdminAuthenticated()
    if (!authenticated) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      async function loadExisting() {
        const existing = await getTrenchMeta()
        if (existing) {
          setCurrentMetaId(existing.id)
          setTitle(existing.title)
          setDescription(existing.description)
          setEmoji(existing.emoji)
          setImageUrl(existing.imageUrl)
          setPreviewUrl(existing.imageUrl)
          setSelectedCategories(existing.categories || [])
        }
      }
      loadExisting()
    }
  }, [router])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage("")

    const finalImageUrl = previewUrl || imageUrl || "/images/611252578-1660028608490268-5448069045277775738-n.png"

    try {
      if (currentMetaId) {
        await updateTrenchMeta(currentMetaId, {
          title,
          description,
          emoji,
          imageUrl: finalImageUrl,
          categories: selectedCategories,
        })
      } else {
        const newMeta = await saveTrenchMeta({
          title,
          description,
          emoji,
          imageUrl: finalImageUrl,
          categories: selectedCategories,
        })
        if (newMeta) {
          setCurrentMetaId(newMeta.id)
        }
      }

      setSaveMessage("Trench Meta saved successfully to database!")
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      console.error("[v0] Error saving trench meta:", error)
      setSaveMessage("Error saving Trench Meta. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    clearAdminSession()
    router.push("/admin/login")
  }

  const handleCategorySelect = (category: (typeof TRENCH_CATEGORIES)[0]) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category.name)) {
        return prev.filter((name) => name !== category.name)
      } else {
        return [...prev, category.name]
      }
    })

    const newSelection = selectedCategories.includes(category.name)
      ? selectedCategories.filter((name) => name !== category.name)
      : [...selectedCategories, category.name]

    if (newSelection.length === 0) {
      setTitle("")
      setDescription("")
      setEmoji("🔥")
    } else {
      const selectedCats = TRENCH_CATEGORIES.filter((cat) => newSelection.includes(cat.name))
      const titles = selectedCats.map((cat) => cat.name).join(" + ")
      const emojis = selectedCats.map((cat) => cat.emoji).join(" ")
      const descriptions = selectedCats.map((cat) => cat.description).join(". ")

      setTitle(titles)
      setEmoji(emojis)
      setDescription(descriptions)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-8">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary font-mono tracking-wider">ADMIN DASHBOARD</h1>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Trench Meta Editor */}
        <Card className="lab-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-primary font-mono tracking-wider">TRENCH META EDITOR</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Quick Select Category (Multiple Selection)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {TRENCH_CATEGORIES.map((category) => (
                  <Button
                    key={category.name}
                    variant="outline"
                    size="sm"
                    onClick={() => handleCategorySelect(category)}
                    className={`border-primary/30 hover:border-primary hover:bg-primary/10 ${
                      selectedCategories.includes(category.name) ? "bg-primary/20 border-primary" : ""
                    }`}
                  >
                    <span className="mr-1.5">{category.emoji}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
              {selectedCategories.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2">Selected: {selectedCategories.join(", ")}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Meta Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., AI Agents, Dog Memecoins, Anime Culture"
                className="bg-muted/50 border-primary/30"
              />
            </div>

            {/* Emoji */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Emoji</label>
              <Input
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                placeholder="🔥"
                className="bg-muted/50 border-primary/30 text-3xl h-16"
                maxLength={2}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the current trench meta and what's trending..."
                className="bg-muted/50 border-primary/30 min-h-[120px]"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Meta Image (Optional)</label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="bg-muted/50 border-primary/30"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Upload a custom image or it will use the emoji</p>
                </div>
                {previewUrl && (
                  <div className="h-24 w-24 rounded-lg border border-primary/30 overflow-hidden shrink-0">
                    <Image
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Save Message */}
            {saveMessage && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-3 rounded text-sm">
                {saveMessage}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={handleSave} disabled={isSaving} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Trench Meta"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
