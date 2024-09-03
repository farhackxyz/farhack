'use client';
import { ReactNode } from 'react';
import { base } from 'viem/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '../lib/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css'; 
 
type Props = { children: ReactNode };
const queryClient = new QueryClient(); 
 
function OnchainProviders({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
            <OnchainKitProvider
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY} 
            chain={base}
            >
              <RainbowKitProvider modalSize="compact">
                {children}
              </RainbowKitProvider>
            </OnchainKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
  );
};
 
export default OnchainProviders;