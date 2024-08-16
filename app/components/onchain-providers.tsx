'use client';
import { ReactNode } from 'react';
import { base } from 'viem/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '../lib/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 
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
                {children}
            </OnchainKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
  );
};
 
export default OnchainProviders;