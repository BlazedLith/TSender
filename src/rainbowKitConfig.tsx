'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    arbitrum,
    base,
    mainnet,
    optimism,
    anvil,
    zksync,
    sepolia,
} from 'wagmi/chains';

export default getDefaultConfig({
    appName: 'Tsender',
    projectId: process.env.NEXT_PUBLIC_WALLET_PROJECT_ID!,
    chains: [arbitrum, base, mainnet, optimism, anvil, zksync, sepolia],
    ssr: false,
});
