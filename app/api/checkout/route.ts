import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { items, customerInfo } = await req.json()

    // Calculate total amount
    const amount = items.reduce((total: number, item: any) => {
      return total + item.price * item.quantity
    }, 0)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For now, we'll just return a mock session ID
    // In production, this would create a real Stripe session
    const mockSessionId = `mock_session_${Date.now()}`

    console.log("Mock checkout session created:", {
      sessionId: mockSessionId,
      amount,
      items: items.length,
      customer: customerInfo.email,
    })

    return NextResponse.json({
      sessionId: mockSessionId,
      success: true,
      message: "Checkout session created (demo mode)",
    })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 })
  }
}
