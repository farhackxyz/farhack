"use client";
import { ClipboardIcon, CheckCircleIcon, ShareIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function CopyClipboardIcon({ value, className, isShare = false }: { value: string, className?: string, isShare?: boolean }) {
    const [copied, setCopied] = React.useState<boolean>(false);

    const handleCopy = async (data: string) => {
        try {
            await navigator.clipboard.writeText(data);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy: ', error);
        }
    };

    return (
        copied ? (
            <CheckCircleIcon className={`w-5 h-5 text-green-500 ml-2 cursor-pointer ${className ? className : ''}`} />
        ) : isShare ? (
            <ShareIcon className={`w-4 h-4 text-white ml-2 cursor-pointer ${className ? className : ''}`} onClick={() => handleCopy(value)} />
        ) : (
            <ClipboardIcon className={`w-4 h-4 text-gray-500 ml-2 cursor-pointer ${className ? className : ''}`} onClick={() => handleCopy(value)} />
        )
    );
}