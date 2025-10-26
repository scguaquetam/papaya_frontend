"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, QrCode, Scan, Download, Share2 } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function QRPaymentPage() {
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")

  return (
    <ProtectedRoute requireWallet={true}>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">QR Payment</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <Tabs defaultValue="receive" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="receive">Receive</TabsTrigger>
            <TabsTrigger value="scan">Scan & Pay</TabsTrigger>
          </TabsList>

          {/* Receive Tab - Show QR Code */}
          <TabsContent value="receive" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Your Payment QR Code
                </CardTitle>
                <CardDescription>Share this QR code to receive payments instantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Amount Input */}
                <div className="space-y-2">
                  <Label htmlFor="amount">Request Amount (Optional)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                {/* Note Input */}
                <div className="space-y-2">
                  <Label htmlFor="note">Add a Note (Optional)</Label>
                  <Input
                    id="note"
                    type="text"
                    placeholder="e.g., Coffee payment, Lunch split"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                {/* QR Code Display */}
                <div className="flex justify-center py-8">
                  <div className="w-64 h-64 bg-white rounded-2xl p-4 shadow-lg border-4 border-primary/10">
                    {/* QR Code SVG Placeholder */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect width="100" height="100" fill="white" />
                      {/* QR Code Pattern */}
                      <g fill="black">
                        {/* Top-left corner */}
                        <rect x="5" y="5" width="20" height="20" />
                        <rect x="8" y="8" width="14" height="14" fill="white" />
                        <rect x="11" y="11" width="8" height="8" />
                        {/* Top-right corner */}
                        <rect x="75" y="5" width="20" height="20" />
                        <rect x="78" y="8" width="14" height="14" fill="white" />
                        <rect x="81" y="11" width="8" height="8" />
                        {/* Bottom-left corner */}
                        <rect x="5" y="75" width="20" height="20" />
                        <rect x="8" y="78" width="14" height="14" fill="white" />
                        <rect x="11" y="81" width="8" height="8" />
                        {/* Random pattern for demo */}
                        <rect x="30" y="10" width="4" height="4" />
                        <rect x="38" y="10" width="4" height="4" />
                        <rect x="46" y="10" width="4" height="4" />
                        <rect x="54" y="10" width="4" height="4" />
                        <rect x="30" y="18" width="4" height="4" />
                        <rect x="46" y="18" width="4" height="4" />
                        <rect x="62" y="18" width="4" height="4" />
                        <rect x="10" y="30" width="4" height="4" />
                        <rect x="18" y="30" width="4" height="4" />
                        <rect x="30" y="30" width="4" height="4" />
                        <rect x="46" y="30" width="4" height="4" />
                        <rect x="62" y="30" width="4" height="4" />
                        <rect x="78" y="30" width="4" height="4" />
                        <rect x="86" y="30" width="4" height="4" />
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Payment Info */}
                {amount && (
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Requesting</p>
                    <p className="text-3xl font-bold">${Number.parseFloat(amount).toFixed(2)}</p>
                    {note && <p className="text-sm text-muted-foreground mt-2">{note}</p>}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Save QR
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* Info Text */}
                <p className="text-xs text-center text-muted-foreground">
                  Anyone can scan this QR code to send you money instantly
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scan Tab - Scan QR Code */}
          <TabsContent value="scan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="w-5 h-5" />
                  Scan QR Code to Pay
                </CardTitle>
                <CardDescription>Point your camera at a PyLink QR code to send payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Camera View Placeholder */}
                <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden flex items-center justify-center">
                  {/* Scanning Frame */}
                  <div className="relative w-64 h-64">
                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-2xl" />

                    {/* Scanning Line Animation */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-primary animate-pulse" />
                  </div>

                  {/* Camera Icon */}
                  <div className="absolute">
                    <Scan className="w-16 h-16 text-muted-foreground/30" />
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      1
                    </div>
                    <p className="text-sm text-foreground">Position the QR code within the frame</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      2
                    </div>
                    <p className="text-sm text-foreground">Hold steady while the camera focuses</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      3
                    </div>
                    <p className="text-sm text-foreground">Review payment details and confirm</p>
                  </div>
                </div>

                {/* Enable Camera Button */}
                <Button size="lg" className="w-full">
                  Enable Camera Access
                </Button>

                {/* Alternative Option */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <Button variant="outline" size="lg" className="w-full bg-transparent">
                  Upload QR Code Image
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
    </ProtectedRoute>
  )
}
