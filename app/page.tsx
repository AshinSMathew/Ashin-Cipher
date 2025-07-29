"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck, Lock, Unlock, Check, Copy } from "lucide-react"
import EncryptComponent from "@/components/encrypt"
import DecryptComponent from "@/components/decrypt"

export default function CipherPage() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt")
  const [result, setResult] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleResult = (newResult: string) => {
    setResult(newResult)
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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-4">
            <ShieldCheck className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">ASHIN CIPHER</h1>
          <p className="text-lg text-muted-foreground">Encrypt and decrypt your messages with confidence</p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-border bg-muted p-1">
            <Button
              variant={mode === "encrypt" ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode("encrypt")}
              className="flex items-center gap-2 px-4 py-2"
            >
              <Lock className="h-4 w-4" />
              Encrypt
            </Button>
            <Button
              variant={mode === "decrypt" ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode("decrypt")}
              className="flex items-center gap-2 px-4 py-2"
            >
              <Unlock className="h-4 w-4" />
              Decrypt
            </Button>
          </div>
        </div>

        {/* Component Display */}
        <div className="flex justify-center">
          {mode === "encrypt" ? (
            <EncryptComponent onResult={handleResult} error={error} setError={setError} />
          ) : (
            <DecryptComponent onResult={handleResult} error={error} setError={setError} />
          )}
        </div>

        {/* Result Display */}
        {result && (
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">
                  {mode === "encrypt" ? "Encrypted Result:" : "Decrypted Result:"}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(result, "result")}
                  className="h-8 w-8 p-0 hover:bg-muted"
                  aria-label="Copy result"
                >
                  {copiedField === "result" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="bg-muted rounded-md p-4 font-mono text-sm break-all">{result}</div>
            </div>
          </div>
        )}


        {/* Footer */}
        <div className="mt-12 text-center">
          <Separator className="mb-6" />
          <p className="text-sm text-muted-foreground">
            Powered by 
            <a  href="https://ashin-cipher-api.vercel.app/"><strong> ASHIN CIPHER API </strong></a> 
            • Secure • Fast • Reliable
          </p>
        </div>
      </div>
    </div>
  )
}
