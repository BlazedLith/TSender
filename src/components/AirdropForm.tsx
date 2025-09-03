'use client';

import { useMemo, useState, useEffect } from 'react';
import InputField from './InputField';
import { chainsToTSender, tsenderAbi, erc20Abi } from '@/constants';
import {
    useChainId,
    useConfig,
    useAccount,
    useWriteContract,
    useReadContracts,
} from 'wagmi';
import { readContract, waitForTransactionReceipt } from '@wagmi/core';
import { calculateTotal } from '@/utils';

export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState('');
    const [recipients, setRecipients] = useState('');
    const [amounts, setAmounts] = useState('');

    const chainId = useChainId();
    const config = useConfig();
    const account = useAccount();
    const total: number = useMemo(() => calculateTotal(amounts), [amounts]);
    const { data: hash, isPending, writeContractAsync } = useWriteContract();
    const [loading, setLoading] = useState(false);
    const { data: tokenData } = useReadContracts({
        contracts: [
            {
                abi: erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: 'decimals',
            },
            {
                abi: erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: 'name',
            },
            {
                abi: erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: 'balanceOf',
                args: [account.address],
            },
        ],
    });

    const decimals = tokenData?.[0]?.result as number | undefined;
    const name = tokenData?.[1]?.result as string | undefined;
    const balance = tokenData?.[2]?.result as bigint | undefined;

    // persist values whenever they change
    useEffect(() => {
        const savedToken = localStorage.getItem('tokenAddress');
        const savedRecipients = localStorage.getItem('recipients');
        const savedAmounts = localStorage.getItem('amounts');

        if (savedToken) setTokenAddress(savedToken);
        if (savedRecipients) setRecipients(savedRecipients);
        if (savedAmounts) setAmounts(savedAmounts);
    }, []);

    // Save on change
    useEffect(() => {
        localStorage.setItem('tokenAddress', tokenAddress);
    }, [tokenAddress]);

    useEffect(() => {
        localStorage.setItem('recipients', recipients);
    }, [recipients]);

    useEffect(() => {
        localStorage.setItem('amounts', amounts);
    }, [amounts]);

    async function getApprovedAmount(
        tsenderAddress: string | null
    ): Promise<number> {
        if (!tsenderAddress) {
            alert('No address found. Please use a supported chain!');
            return 0;
        }

        const response = await readContract(config, {
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'allowance',
            args: [account.address, tsenderAddress as `0x${string}`],
        });

        return response as number;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const tsenderAddress = chainsToTSender[chainId]['tsender'];
            const approvedAmount = await getApprovedAmount(tsenderAddress);

            if (approvedAmount < total) {
                const approvalHash = await writeContractAsync({
                    abi: erc20Abi,
                    address: tokenAddress as `0x${string}`,
                    functionName: 'approve',
                    args: [tsenderAddress as `0x${string}`, BigInt(total)],
                });

                const approvalReceipt = await waitForTransactionReceipt(
                    config,
                    {
                        hash: approvalHash,
                    }
                );

                await writeContractAsync({
                    abi: tsenderAbi,
                    address: tsenderAddress as `0x${string}`,
                    functionName: 'airdropERC20',
                    args: [
                        tokenAddress,
                        recipients
                            .split(/[,\n]+/)
                            .map((addr) => addr.trim())
                            .filter((addr) => addr !== ''),
                        amounts
                            .split(/[,\n]+/)
                            .map((amt) => BigInt(amt.trim()))
                            .filter((amt) => !isNaN(Number(amt))),
                        BigInt(total),
                    ],
                });
            } else {
                await writeContractAsync({
                    abi: tsenderAbi,
                    address: tsenderAddress as `0x${string}`,
                    functionName: 'airdropERC20',
                    args: [
                        tokenAddress,
                        recipients
                            .split(/[,\n]+/)
                            .map((addr) => addr.trim())
                            .filter((addr) => addr !== ''),
                        amounts
                            .split(/[,\n]+/)
                            .map((amt) => BigInt(amt.trim()))
                            .filter((amt) => !isNaN(Number(amt))),
                        BigInt(total),
                    ],
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto p-6 border-2 border-blue-400 rounded-2xl shadow-md bg-white text-black"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">T-Sender</h2>
                <span className="px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-black">
                    Safe Mode
                </span>
            </div>

            {/* Inputs */}
            <InputField
                label="Token Address"
                placeholder="0x"
                value={tokenAddress}
                onChange={setTokenAddress}
            />
            <InputField
                label="Recipients (comma or new line separated)"
                placeholder="0x123..., 0x456..."
                value={recipients}
                onChange={setRecipients}
                textarea
            />
            <InputField
                label="Amounts (wei; comma or new line separated)"
                placeholder="100, 200, 300..."
                value={amounts}
                onChange={setAmounts}
                textarea
            />

            {/* Transaction Details */}
            <div className="border rounded-md p-3 mb-4 bg-gray-50 text-black">
                <h3 className="font-semibold mb-2 text-black">
                    Transaction Details
                </h3>
                <p className="text-sm text-black">Name: {name}</p>
                <p className="text-sm text-black">Decimals: {decimals}</p>
                <p className="text-sm text-black">
                    Amount (wei): {amounts || '0'}
                </p>
                <p className="text-sm text-black">
                    Recipients Count:{' '}
                    {recipients ? recipients.split(/,|\n/).length : 0}
                </p>
                <p className="text-sm text-black">
                    Your Balance: {balance ? balance.toString() : '0'}
                </p>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
            >
                Send Tokens
            </button>
            {loading && (
                <p className="mt-2 text-sm text-gray-600 text-center">
                    ⏳ Waiting for confirmation in MetaMask...
                </p>
            )}
        </form>
    );
}
