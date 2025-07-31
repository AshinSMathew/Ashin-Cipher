"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Copy, Check } from "lucide-react"

interface DecryptedResponse {
  decrypted_message: string
}

interface DecryptComponentProps {
  cipherKey: string
  onResult: (result: string) => void
  error: string | null
  setError: (error: string | null) => void
}

export default function DecryptComponent({ cipherKey, onResult, error, setError }: DecryptComponentProps) {
  const [ciphertext, setCiphertext] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleDecrypt = async () => {
    if (!ciphertext.trim()) {
      setError("Please enter text to decrypt")
      return
    }

    if (!cipherKey.trim()) {
      setError("Please enter a key")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://ashin-cipher-api.vercel.app/dec/${cipherKey}?text=${ciphertext}`,
      )
      if (!response.ok) {
        throw new Error("Failed to decrypt text")
      }
      const data: DecryptedResponse = await response.json()
      onResult(data.decrypted_message)
    } catch (err) {
      setError("Failed to decrypt text. Please check the ciphertext and key, then try again.")
      console.error("Decryption error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      setError("Failed to copy to clipboard")
      console.error("Copy error:", err)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="bg-card rounded-lg shadow-sm border border-border p-6 min-h-[400px]">
        <div className="flex items-center justify-between mb-4">
          <Label htmlFor="ciphertext" className="text-lg font-medium">
            Ciphertext Input
          </Label>
          {ciphertext && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(ciphertext, "ciphertext")}
              className="h-8 w-8 p-0 hover:bg-muted"
              aria-label="Copy ciphertext"
            >
              {copiedField === "ciphertext" ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
        <Textarea
          id="ciphertext"
          placeholder="Enter ciphertext to decrypt..."
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value)}
          className="min-h-[300px] w-full border-border rounded-md p-4 text-base focus:ring-2 focus:ring-ring focus:border-primary resize-none"
          aria-label="Ciphertext input field for decryption"
        />
        <Button
          onClick={handleDecrypt}
          disabled={isLoading || !ciphertext.trim() || !cipherKey.trim()}
          className="w-full mt-4 py-3 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-[#dc2626] transition-colors disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Decrypting...
            </>
          ) : (
            "Decrypt"
          )}
        </Button>
      </div>
    </div>
  )
}