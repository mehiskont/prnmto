"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Bot, Sparkles } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  title: string
  handle: string
  description: string
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  availableForSale: boolean
  tags: string[]
  productType: string
  vendor: string
}

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  products?: Product[]
  filters?: {
    category?: string
    priceRange?: string
    availability?: string
    searchTerm?: string
  }
}

interface AISalesmanChatbotProps {
  products: Product[]
  onFilterChange: (filters: {
    category?: string
    priceRange?: string
    availability?: string
    searchTerm?: string
  }) => void
}

export function AISalesmanChatbot({ products, onFilterChange }: AISalesmanChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Tere! Olen teie isiklik mootorratta konsultant! Kuidas saan teid aidata? Otsite mootorratast, varuosi, aksessuaare või varustust?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat("et-EE", {
      style: "currency",
      currency: currencyCode,
    }).format(Number.parseFloat(amount))
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          products: products.slice(0, 20), // Send subset to avoid token limits
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.message,
        products: data.recommendedProducts || [],
        filters: data.filters,
      }

      setMessages((prev) => [...prev, botMessage])

      // Apply filters if provided
      if (data.filters && onFilterChange) {
        onFilterChange(data.filters)
      }
    } catch (error) {
      console.error("Chat error:", error)

      // Fallback response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "Vabandust, mul on hetkel tehnilisi probleeme! Proovige palun hiljem uuesti või vaadake meie tooteid allpool olevast kataloogist!",
      }

      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-zinc-700 bg-zinc-800/50">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-400" />
          <span className="text-white font-medium text-sm">Konsultant</span>
        </div>
        <div className="flex items-center gap-1 ml-auto"></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] ${message.type === "user" ? "order-2" : "order-1"}`}>
              <div
                className={`rounded-lg p-2 text-sm ${
                  message.type === "user" ? "bg-blue-600 text-white" : "bg-zinc-700 text-zinc-100"
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.type === "bot" && <Sparkles className="w-3 h-3 mt-0.5 text-yellow-400 flex-shrink-0" />}
                  <span className="leading-relaxed">{message.content}</span>
                </div>
              </div>

              {/* Product recommendations */}
              {message.products && message.products.length > 0 && (
                <div className="mt-2 space-y-1">
                  {message.products.slice(0, 2).map((product) => (
                    <Link key={product.id} href={`/products/${product.handle}`}>
                      <Card className="bg-zinc-800 border-zinc-600 hover:bg-zinc-750 transition-colors cursor-pointer">
                        <CardContent className="p-2">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium text-xs truncate">{product.title}</h4>
                              <p className="text-zinc-400 text-xs mt-0.5 line-clamp-1">
                                {product.description.substring(0, 40)}...
                              </p>
                            </div>
                            <div className="ml-2 text-right flex-shrink-0">
                              <span className="text-green-400 font-bold text-xs">
                                {formatPrice(
                                  product.priceRange.minVariantPrice.amount,
                                  product.priceRange.minVariantPrice.currencyCode,
                                )}
                              </span>
                              {!product.availableForSale && (
                                <div className="text-xs text-red-400 mt-0.5">Pole saadaval</div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              {/* Applied filters */}
              {message.filters && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {Object.entries(message.filters).map(([key, value]) => (
                    <span
                      key={key}
                      className="px-2 py-0.5 bg-blue-600/20 text-blue-400 rounded text-xs border border-blue-600/30"
                    >
                      {key}: {value}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-700 rounded-lg p-2 text-zinc-100">
              <div className="flex items-center gap-1">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-xs ml-2">Mõtlen...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-zinc-700">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Küsi minult toodete kohta..."
            className="flex-1 bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400 text-sm"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3"
          >
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
