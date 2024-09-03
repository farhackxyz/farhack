import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { 
  metaMaskWallet, 
  rainbowWallet, 
  coinbaseWallet, 
} from '@rainbow-me/rainbowkit/wallets'; 
import { connectorsForWallets } from '@rainbow-me/rainbowkit'; 

const connectors = connectorsForWallets( 
  [
    {
      groupName: 'Recommended Wallet',
      wallets: [coinbaseWallet],
    },
    // {
    //   groupName: 'Other Wallets',
    //   wallets: [rainbowWallet, metaMaskWallet],
    // },
  ],
  {
    appName: 'FarHack',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID ?? "",
  },
);
 
export const wagmiConfig = createConfig({
  chains: [base],
  multiInjectedProviderDiscovery: false,
  connectors,
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});