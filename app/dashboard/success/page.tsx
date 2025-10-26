"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Home, ArrowUpRight } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function SuccessPage() {
  return (
    <ProtectedRoute requireWallet={true}>
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5] text-primary" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-balance">Payment Successful!</h1>
          <p className="text-muted-foreground text-pretty">
            Your money has been sent and will arrive in the recipient's PayPal account within minutes.
          </p>
        </div>

        {/* Transaction Details Card */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Recipient</span>
                <span className="font-medium">john.doe@paypal.com</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount sent</span>
                <span className="font-medium">$50.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction fee</span>
                <span className="font-medium">$1.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment method</span>
                <span className="font-medium">Apple Pay</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold">Total paid</span>
                <span className="font-semibold text-lg">$51.00</span>
              </div>
            </div>

            {/* Rewards Earned */}
            <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 text-center">
              <p className="text-sm text-foreground/70 mb-1">Rewards Earned</p>
              <p className="text-2xl font-bold text-foreground">+$0.50</p>
              <p className="text-xs text-foreground/60 mt-1">1% cashback on this transaction</p>
            </div>

            {/* Transaction ID */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Transaction ID</p>
              <p className="text-xs font-mono text-foreground mt-1">TXN-2025-01-22-ABC123</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/dashboard" className="block">
            <Button size="lg" className="w-full" variant="default">
              <Home className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/send" className="block">
            <Button size="lg" className="w-full bg-transparent" variant="outline">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Send Another Payment
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-xs text-center text-muted-foreground">
          Need help? Contact our support team at support@pylink.com
        </p>
      </div>
    </div>
    </ProtectedRoute>
  )
}
