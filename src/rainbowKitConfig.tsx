'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { anvil, zksync } from 'wagmi/chains';

export default getDefaultConfig({
    appName: 'Tsender',
    projectId: process.env.NEXT_PUBLIC_WALLET_PROJECT_ID!,
    chains: [anvil, zksync],
    ssr: false,
});
