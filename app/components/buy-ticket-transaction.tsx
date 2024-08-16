"use client";
import React, { useCallback } from 'react';
import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { 
  Transaction, 
  TransactionButton, 
  TransactionSponsor, 
  TransactionStatus, 
  TransactionStatusLabel, 
  TransactionStatusAction,
  TransactionError,
  TransactionResponse, 
} from '@coinbase/onchainkit/transaction'; 
import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import { base } from 'viem/chains';
import { encodeFunctionData, parseUnits } from 'viem';

export const usdcContractAddress = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913';
export const usdcAbi = [
  {
    type: 'function',
    name: 'transfer',
    inputs: [
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
] as const;

export default function BuyTicketTransaction({ userId }: { userId: string }) {
  const { address } = useAccount();
  const [txHash, setTxHash] = React.useState<string>('');

  const priorityTicketUSDCPrice = '750';
  const farhackWalletAdress = '0xda4a934f5770b73d2eb9e08713599331b5380704';
  const farhackHackathonId = 3;
 
  const contracts = [
    {
      address: usdcContractAddress,
      abi: usdcAbi,
      functionName: 'transfer',
      args: [farhackWalletAdress, parseUnits(priorityTicketUSDCPrice, 6)],
    },
  ];

  const handleTxnSuccess = async (response: TransactionResponse) => {
    const tx = response.transactionReceipts[0];
    const txHash = tx.transactionHash;
    setTxHash(txHash);
    try {
      const res = await fetch('/api/hackathons/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          user_address: address,
          hackathon_id: farhackHackathonId,
          txn_hash: txHash,
        }),
      });

      if (!res.ok) {
        console.error('Failed to create ticket:', await res.json());
      }
    } catch (error) {
      console.error('Error during ticket creation:', error);
    }
  }

  return txHash ? <p>You have already purchsaed a ticket</p> : address ? (
    <Transaction
      address={address}
      chainId={base.id}
      contracts={contracts as any}
      onSuccess={(response) => handleTxnSuccess(response)}
      className="flex items-center justify-center text-center"
    >
      <TransactionButton className={'rounded-lg bg-white text-black w-auto max-w-[60%] px-4 py-1.5'} text={`Pay ${priorityTicketUSDCPrice} USDC on Base`} />
      <TransactionSponsor />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>  
  ) : (
    <Wallet>
      <ConnectWallet>
        <Avatar className='h-6 w-6' />
        <Name />
      </ConnectWallet>
    </Wallet>
  );
}