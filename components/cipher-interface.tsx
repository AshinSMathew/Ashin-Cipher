"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ShieldCheck } from "lucide-react"

interface CipherInterfaceProps {
  className?: string
}

export default function CipherInterface({ className }: CipherInterfaceProps) {
  const [plaintext, setPlaintext] = useState("")
  const [ciphertext, setCiphertext] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEncrypt = async () => {
    if (!plaintext.trim()) {
      setError("Please enter text to encrypt")
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`https://ashin-cipher-api.vercel.app/en/${encodeURIComponent(plaintext)}`)
      if (!response.ok) {
        throw new Error("Failed to encrypt text")
      }
      const data = await response.text()
      setCiphertext(data)
    } catch (err) {
      setError("Failed to encrypt text. Please try again.")
      console.error("Encryption error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDecrypt = async () => {
    if (!ciphertext.trim()) {
      setError("Please enter text to decrypt")
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`https://ashin-cipher-api.vercel.app/dec/${encodeURIComponent(ciphertext)}`)
      if (!response.ok) {
        throw new Error("Failed to decrypt text")
      }
      const data = await response.text()
      setPlaintext(data)
    } catch (err) {
      setError("Failed to decrypt text. Please check the ciphertext and try again.")
      console.error("Decryption error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen bg-background p-4 md:p-8 ${className || ""}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-4">
            <ShieldCheck className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            Ashin Cipher
          </h1>
          <p className="text-lg text-muted-foreground">
            Encrypt and decrypt your messages with confidence
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <Label htmlFor="plaintext" className="block text-lg font-medium mb-4">
              Plaintext Input
            </Label>
            <Textarea
              id="plaintext"
              placeholder="Enter your message to encrypt..."
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              className="min-h-[300px] w-full border-border rounded-md p-4 text-base focus:ring-2 focus:ring-ring focus:border-primary"
              aria-label="Plaintext input field for encryption"
            />
            <Button
              onClick={handleEncrypt}
              disabled={isLoading || !plaintext.trim()}
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

          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <Label htmlFor="ciphertext" className="block text-lg font-medium mb-4">
              Ciphertext Input
            </Label>
            <Textarea
              id="ciphertext"
              placeholder="Enter ciphertext to decrypt..."
              value={ciphertext}
              onChange={(e) => setCiphertext(e.target.value)}
              className="min-h-[300px] w-full border-border rounded-md p-4 text-base focus:ring-2 focus:ring-ring focus:border-primary"
              aria-label="Ciphertext input field for decryption"
            />
            <Button
              onClick={handleDecrypt}
              disabled={isLoading || !ciphertext.trim()}
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
      </div>
    </div>
  )
}