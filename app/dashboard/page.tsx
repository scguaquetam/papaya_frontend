'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, QrCode, TrendingUp } from "lucide-react"
import ApplePayButton from "@/components/Applepay/ApplePayButton"
import WalletInfo from "@/components/WalletInfo"
import { useState } from "react"

export default function DashboardPage() {
  const [paymentStatus, setPaymentStatus] = useState<string>('');


  const handlePaymentSuccess = (response: PaymentResponse) => {
    console.log('Payment successful:', response);
    setPaymentStatus('✅ Payment completed successfully!');
  };

  const handlePaymentError = (error: Error) => {
    console.error('Payment error:', error);
    setPaymentStatus(`❌ Error: ${error.message}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">PyLink</h1>
          <Button variant="ghost" size="icon">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Wallet Info */}
        <WalletInfo />

        {/* Balance Card */}
        <div className="grid grid-cols-2 gap-3">
          {/* PYUSD Balance */}
          <Card className="bg-primary text-primary-foreground border-0">
            <CardHeader className="pb-2">
              <CardDescription className="text-primary-foreground/90 text-xs font-medium">
                PYUSD Balance
              </CardDescription>
              <CardTitle className="text-2xl font-bold">$1,234.56</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>+$25.20</span>
              </div>
            </CardContent>
          </Card>

          {/* USD Balance */}
          <Card className="bg-accent text-accent-foreground border-0">
            <CardHeader className="pb-2">
              <CardDescription className="text-accent-foreground/90 text-xs font-medium">USD Balance</CardDescription>
              <CardTitle className="text-2xl font-bold">$856.44</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>+$20.00</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/dashboard/send">
            <Button
              size="lg"
              className="w-full h-24 flex flex-col gap-2 bg-card hover:bg-muted text-foreground border border-border"
              variant="outline"
            >
              <ArrowUpRight className="w-6 h-6" />
              <span className="font-medium">Send Money</span>
            </Button>
          </Link>
          <Link href="/dashboard/qr">
            <Button
              size="lg"
              className="w-full h-24 flex flex-col gap-2 bg-card hover:bg-muted text-foreground border border-border"
              variant="outline"
            >
              <QrCode className="w-6 h-6" />
              <span className="font-medium">QR Payment</span>
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <ApplePayButton
            amount="29.99"
            currencyCode="USD"
            countryCode="US"
            merchantName="PayPayer"
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                recipient: "john.doe@paypal.com",
                amount: "$50.00",
                date: "Today, 2:30 PM",
                status: "Completed",
                type: "PayPal",
              },
              {
                recipient: "@janesmithpylink",
                amount: "$125.50",
                date: "Yesterday, 4:15 PM",
                status: "Completed",
                type: "PyLink",
              },
              {
                recipient: "mike.wilson@paypal.com",
                amount: "$75.00",
                date: "Jan 20, 10:45 AM",
                status: "Completed",
                type: "PayPal",
              },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.recipient}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.date} • {transaction.type}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">-{transaction.amount}</p>
                  <p className="text-xs text-accent">{transaction.status}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Empty State for No Transactions */}
        {/* Uncomment this if there are no transactions */}
        {/* <Card>
          <CardContent className="py-12 text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No transactions yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start sending money to see your transaction history
            </p>
            <Link href="/dashboard/send">
              <Button>Send Your First Payment</Button>
            </Link>
          </CardContent>
        </Card> */}
      </main>
    </div>
  )
}
