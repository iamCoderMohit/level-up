"use client"

import { cn } from "@/lib/utils"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface CodeBlockProps {
  filename: string
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ filename, code, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("rounded-lg border border-border bg-secondary/70 overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="text-xs text-muted-foreground font-mono">{filename}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-sm font-mono overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}
