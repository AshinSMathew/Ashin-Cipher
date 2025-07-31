"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Check, Key } from "lucide-react"
import { useState } from "react"

interface KeyInputProps {
  value: string
  onChange: (value: string) => void
  onError: (error: string | null) => void
}

export default function KeyInput({ value, onChange, onError }: KeyInputProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      onError("Failed to copy to clipboard")
      console.error("Copy error:", err)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="cipher-key" className="text-lg font-medium flex items-center gap-2">
            <Key className="h-4 w-4" />
            Cipher Key
          </Label>
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(value, "key")}
              className="h-8 w-8 p-0 hover:bg-muted"
              aria-label="Copy key"
            >
              {copiedField === "key" ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            </Button>
          )}
        </div>
        <Input
          id="cipher-key"
          type="text"
          placeholder="Enter your cipher key..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-border rounded-md p-3 text-base focus:ring-2 focus:ring-ring focus:border-primary"
          aria-label="Cipher key input field"
        />
        <p className="text-sm text-muted-foreground mt-2">
          This key will be used for both encryption and decryption operations.
        </p>
      </div>
    </div>
  )
}