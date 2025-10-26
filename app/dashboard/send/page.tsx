"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, DollarSign, CreditCard, Wallet, User, Search, Loader2, CheckCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function SendMoneyPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [recipientType, setRecipientType] = useState<"paypal" | "pylink">("pylink")
  const [email, setEmail] = useState("")
  const [pylinkUsername, setPylinkUsername] = useState("")
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"apple-pay" | "crypto" | null>(null)

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleNext = () => {
    if (step === 1 && (email || pylinkUsername)) {
      setStep(2)
    } else if (step === 2 && amount) {
      setStep(3)
    } else if (step === 3 && paymentMethod) {
      setStep(4)
    }
  }

  const handlePaymentConfirm = () => {
    if (step === 4) {
      setShowPaymentModal(true)
    }
  }

  const processPayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500))

    setIsProcessing(false)
    setShowPaymentModal(false)

    // Redirect to success page
    router.push("/dashboard/success")
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isNextDisabled = () => {
    if (step === 1) {
      if (recipientType === "paypal") {
        return !email || !email.includes("@")
      } else {
        return !pylinkUsername || pylinkUsername.length < 3
      }
    }
    if (step === 2) return !amount || Number.parseFloat(amount) <= 0
    if (step === 3) return !paymentMethod
    return false
  }

  const getRecipientDisplay = () => {
    return recipientType === "paypal" ? email : `@${pylinkUsername}`
  }

  const getTotalAmount = () => {
    if (!amount) return "0.00"
    return recipientType === "paypal"
      ? (Number.parseFloat(amount) * 1.02).toFixed(2)
      : Number.parseFloat(amount).toFixed(2)
  }

  return (
    <ProtectedRoute requireWallet={true}>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack} disabled={step === 1}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Send Money</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                    s <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                {s < 4 && <div className={`flex-1 h-1 mx-2 ${s < step ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Recipient</span>
            <span>Amount</span>
            <span>Payment</span>
            <span>Review</span>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Send Money To
              </CardTitle>
              <CardDescription>Choose who you want to send money to</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={recipientType} onValueChange={(v) => setRecipientType(v as "paypal" | "pylink")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pylink">PyLink User</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal Account</TabsTrigger>
                </TabsList>

                <TabsContent value="pylink" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">PyLink Username</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="username"
                        value={pylinkUsername}
                        onChange={(e) => setPylinkUsername(e.target.value.replace("@", ""))}
                        className="text-base pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Enter the PyLink username without the @ symbol</p>
                  </div>

                  {pylinkUsername.length >= 2 && (
                    <div className="border border-border rounded-lg divide-y divide-border">
                      {[
                        { username: pylinkUsername, name: "John Doe", verified: true },
                        { username: `${pylinkUsername}123`, name: "Jane Smith", verified: false },
                      ].map((user, idx) => (
                        <button
                          key={idx}
                          onClick={() => setPylinkUsername(user.username)}
                          className="w-full p-3 hover:bg-muted transition-colors text-left flex items-center gap-3"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">@{user.username}</p>
                              {user.verified && (
                                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{user.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="paypal" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">PayPal Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="recipient@paypal.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-base pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">The recipient doesn't need a PyLink account</p>
                  </div>
                </TabsContent>
              </Tabs>

              <Button onClick={handleNext} disabled={isNextDisabled()} className="w-full" size="lg">
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Enter Amount */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Enter Amount
              </CardTitle>
              <CardDescription>How much would you like to send to {getRecipientDisplay()}?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">$</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-2xl font-semibold pl-8 h-14"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[10, 25, 50, 100].map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount.toString())}
                  >
                    ${quickAmount}
                  </Button>
                ))}
              </div>

              {amount && Number.parseFloat(amount) > 0 && (
                <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">${Number.parseFloat(amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Fee {recipientType === "paypal" ? "(2%)" : "(0% - PyLink)"}
                    </span>
                    <span className="font-medium">
                      ${recipientType === "paypal" ? (Number.parseFloat(amount) * 0.02).toFixed(2) : "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${getTotalAmount()}</span>
                  </div>
                  {recipientType === "pylink" && (
                    <p className="text-xs text-accent pt-2">No fees for PyLink-to-PyLink transfers!</p>
                  )}
                </div>
              )}

              <Button onClick={handleNext} disabled={isNextDisabled()} className="w-full" size="lg">
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Choose Payment Method */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Choose Payment Method
              </CardTitle>
              <CardDescription>Select how you'd like to pay for this transaction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <button
                onClick={() => setPaymentMethod("apple-pay")}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  paymentMethod === "apple-pay"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Apple Pay</h3>
                    <p className="text-sm text-muted-foreground">Fast and secure payment</p>
                  </div>
                  {paymentMethod === "apple-pay" && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-primary-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("crypto")}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  paymentMethod === "crypto" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Crypto Wallet</h3>
                    <p className="text-sm text-muted-foreground">Pay with PYUSD or other crypto</p>
                  </div>
                  {paymentMethod === "crypto" && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-primary-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>

              <Button onClick={handleNext} disabled={isNextDisabled()} className="w-full" size="lg">
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Review & Confirm */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Review & Confirm
              </CardTitle>
              <CardDescription>Please review your transaction details before confirming</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Recipient Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Recipient</h3>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
                    {recipientType === "pylink" ? "@" : <Mail className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{getRecipientDisplay()}</p>
                    <p className="text-sm text-muted-foreground">
                      {recipientType === "paypal" ? "PayPal Account" : "PyLink User"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amount Breakdown */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Amount</h3>
                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Send amount</span>
                    <span className="font-semibold">${Number.parseFloat(amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Transaction fee {recipientType === "paypal" ? "(2%)" : "(0%)"}
                    </span>
                    <span className="font-semibold">
                      ${recipientType === "paypal" ? (Number.parseFloat(amount) * 0.02).toFixed(2) : "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="font-bold">Total to pay</span>
                    <span className="font-bold text-xl">${getTotalAmount()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Payment Method</h3>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {paymentMethod === "apple-pay" ? (
                      <CreditCard className="w-6 h-6 text-primary" />
                    ) : (
                      <Wallet className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{paymentMethod === "apple-pay" ? "Apple Pay" : "Crypto Wallet"}</p>
                    <p className="text-sm text-muted-foreground">
                      {paymentMethod === "apple-pay" ? "Fast and secure" : "Pay with PYUSD"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rewards Info */}
              {recipientType === "pylink" && (
                <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg">
                  <p className="text-sm text-accent font-medium">
                    You'll earn ${(Number.parseFloat(amount) * 0.01).toFixed(2)} in rewards for this transaction!
                  </p>
                </div>
              )}

              <Button onClick={handlePaymentConfirm} className="w-full" size="lg">
                Confirm & Pay ${getTotalAmount()}
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {paymentMethod === "apple-pay" ? (
                <>
                  <CreditCard className="w-5 h-5" />
                  Apple Pay
                </>
              ) : (
                <>
                  <Wallet className="w-5 h-5" />
                  Crypto Wallet
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {paymentMethod === "apple-pay"
                ? "Confirm your payment with Apple Pay"
                : "Confirm your payment with your crypto wallet"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Payment Summary */}
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Recipient</span>
                <span className="font-medium">{getRecipientDisplay()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">${amount}</span>
              </div>
              {recipientType === "paypal" && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fee (2%)</span>
                  <span className="font-medium">${(Number.parseFloat(amount) * 0.02).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-lg">${getTotalAmount()}</span>
              </div>
            </div>

            {/* Payment Method Specific UI */}
            {paymentMethod === "apple-pay" && !isProcessing && (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Double-click the side button to pay with Apple Pay
                </p>
              </div>
            )}

            {paymentMethod === "crypto" && !isProcessing && (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium">Wallet Connected</p>
                  <p className="text-xs text-muted-foreground">0x742d...3f4a</p>
                </div>
                <div className="w-full bg-muted p-3 rounded-lg text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Available PYUSD</span>
                    <span className="font-medium">$1,234.56</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gas Fee (est.)</span>
                    <span className="font-medium">$0.12</span>
                  </div>
                </div>
              </div>
            )}

            {/* Processing State */}
            {isProcessing && (
              <div className="flex flex-col items-center gap-3 py-8">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-sm font-medium">Processing payment...</p>
                <p className="text-xs text-muted-foreground">Please wait while we confirm your transaction</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {!isProcessing && (
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowPaymentModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={processPayment} className="flex-1">
                {paymentMethod === "apple-pay" ? "Pay with Apple Pay" : "Confirm Transaction"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
    </ProtectedRoute>
  )
}
