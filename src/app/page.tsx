'use client';

import HomeContent from '@/components/HomeContent';
import { useAccount } from 'wagmi';

export default function Home() {
    const { isConnected } = useAccount();

    return (
        <main className="p-6 min-h-screen bg-black text-black">
            {!isConnected ? (
                <div className="flex items-center justify-center h-full text-lg font-semibold">
                    Please connect a wallet to use the airdropper!!!
                </div>
            ) : (
                <HomeContent />
            )}
        </main>
    );
}
