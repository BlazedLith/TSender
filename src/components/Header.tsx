// components/Header.tsx
'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
            {/* Left side: Logo + Title */}
            <div className="flex items-center gap-3">
                <Image
                    src="/Logo.png"
                    alt="Tsender Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <h1 className="text-xl font-bold text-black">Tsender</h1>
            </div>

            {/* Right side: GitHub + Wallet */}
            <div className="flex items-center gap-4">
                <Link
                    href="https://github.com/BlazedLith/TSender"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black transition"
                >
                    <FaGithub size={28} />
                </Link>
                <ConnectButton />
            </div>
        </header>
    );
}
