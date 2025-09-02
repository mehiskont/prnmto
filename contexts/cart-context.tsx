"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface CartItem {
  id: string
  variantId: string
  title: string
  price: number
  quantity: number
  image?: string
  handle: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  totalItems: number
  totalPrice: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const initialState: CartState = {
  items: [],
  isOpen: false,
  totalItems: 0,
  totalPrice: 0,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.variantId === action.payload.variantId)

      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.variantId === action.payload.variantId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        )
      } else {
        newItems = [...state.items, action.payload]
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.variantId !== action.payload)
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items
        .map((item) =>
          item.variantId === action.payload.id ? { ...item, quantity: Math.max(0, action.payload.quantity) } : item,
        )
        .filter((item) => item.quantity > 0)

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      }

    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: !state.isOpen,
      }

    case "LOAD_CART":
      const totalItems = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return {
        ...state,
        items: action.payload,
        totalItems,
        totalPrice,
      }

    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: cartItems })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (variantId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: variantId })
  }

  const updateQuantity = (variantId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: variantId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
