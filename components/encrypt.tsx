"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Copy, Check } from "lucide-react"

interface EncryptedResponse {
  encrypted_message: string
}

interface EncryptComponentProps {
  cipherKey: string
  onResult: (result: string) => void
  error: string | null
  setError: (error: string | null) => void
}

export default function EncryptComponent({ cipherKey, onResult, error, setError }: EncryptComponentProps) {
  const [plaintext, setPlaintext] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleEncrypt = async () => {
    if (!plaintext.trim()) {
      setError("Please enter text to encrypt")
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
        `https://ashin-cipher-api.vercel.app/en/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: plaintext,
            key: cipherKey,
          }),
        }
      )
      if (!response.ok) {
        throw new Error("Failed to encrypt text")
      }
      const data: EncryptedResponse = await response.json()
      onResult(data.encrypted_message)
    } catch (err) {
        setError("Failed to encrypt text. Please try again.")
        console.error("Encryption error:", err)
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
          <Label htmlFor="plaintext" className="text-lg font-medium">
            Plaintext Input
          </Label>
          {plaintext && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(plaintext, "plaintext")}
              className="h-8 w-8 p-0 hover:bg-muted"
              aria-label="Copy plaintext"
            >
              {copiedField === "plaintext" ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
        <Textarea
          id="plaintext"
          placeholder="Enter your message to encrypt..."
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          className="min-h-[300px] w-full border-border rounded-md p-4 text-base focus:ring-2 focus:ring-ring focus:border-primary resize-none"
          aria-label="Plaintext input field for encryption"
        />
        <Button
          onClick={handleEncrypt}
          disabled={isLoading || !plaintext.trim() || !cipherKey.trim()}
          className="w-full mt-4 py-3 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-[#dc2626] transition-colors disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Encrypting...
            </>
          ) : (
            "Encrypt"
          )}
        </Button>
      </div>
    </div>
  )
}