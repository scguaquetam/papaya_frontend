'use client';

import { useEffect, useState } from 'react';

interface ApplePayCheckerProps {
  children: (isAvailable: boolean) => React.ReactNode;
}

/**
 * Component that checks Apple Pay availability and passes the result to children
 * Uses the same logic as ApplePayButton to avoid code duplication
 */
export default function ApplePayChecker({ children }: ApplePayCheckerProps) {
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);

  useEffect(() => {
    const checkApplePayAvailability = async () => {
      if (!window.PaymentRequest) {
        console.log('Payment Request API not available');
        return;
      }

      try {
        const supportedInstruments: PaymentMethodData[] = [
          {
            supportedMethods: 'https://apple.com/apple-pay',
            data: {
              version: 3,
              merchantIdentifier: 'merchant.com.paypayer',
              merchantCapabilities: ['supports3DS'],
              supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
              countryCode: 'US',
            },
          },
        ];

        const details: PaymentDetailsInit = {
          total: {
            label: 'Availability Check',
            amount: { currency: 'USD', value: '0.01' },
          },
        };

        const request = new PaymentRequest(supportedInstruments, details);
        const canMakePayment = await request.canMakePayment();
        setIsApplePayAvailable(!!canMakePayment);
        console.log('Apple Pay available:', canMakePayment);
      } catch (error) {
        console.error('Error checking Apple Pay availability:', error);
        setIsApplePayAvailable(false);
      }
    };

    checkApplePayAvailability();
  }, []);

  return <>{children(isApplePayAvailable)}</>;
}

