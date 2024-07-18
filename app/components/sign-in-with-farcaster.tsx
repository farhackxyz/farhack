/* eslint-disable @next/next/no-img-element */
"use client";

import "@farcaster/auth-kit/styles.css";
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react";
import { SignInButton, AuthKitProvider, StatusAPIResponse } from "@farcaster/auth-kit";
import React from "react";
import { karla } from "../lib/utils";
import { usePathname } from "next/navigation";

const config = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  siweUri: "http://example.com/login",
  domain: "example.com",
};

export default function SignInWithFarcaster() {
  const pathname = usePathname();
  const restrictedPathname = '/hackathons/farhack-at-farcon-2024';

  return (
    <AuthKitProvider config={config}>
      {pathname !== restrictedPathname && <Content />}
    </AuthKitProvider>
  );
}

function Content() {
  const { data: session } = useSession();
  const [error, setError] = React.useState(false);

  const getNonce = React.useCallback(async () => {
    const nonce = await getCsrfToken();
    if (!nonce) throw new Error("Unable to generate nonce");
    return nonce;
  }, []);

  const handleSuccess = React.useCallback(
    (res: StatusAPIResponse) => {
      signIn("credentials", {
        message: res.message,
        signature: res.signature,
        name: res.username,
        pfp: res.pfpUrl,
        csrfToken: (res as unknown as any).csrfToken,
        redirect: false,
      });
    },
    []
  );

  return (
    <div>
      {!session ? (
        <div className={karla.className}>
          <SignInButton
            nonce={getNonce}
            onSuccess={handleSuccess}
            onError={() => setError(true)}
            onSignOut={() => signOut()}
          />
          {error && <div>Unable to sign in at this time.</div>}
        </div>
      ) : (
        <div className="text-white pt-2 flex flex-row gap-2 items-center">
          <a href={`/profiles/${session.user?.name}`} className="flex flex-row gap-2 items-center border border-white border-1 rounded-md pl-1.5 pr-1.5 px-2.5 py-1">
            <img src={session.user?.image ?? ""} alt="User Image" className="w-8 h-8 rounded-full" />
            <p>
                {session.user?.name}
            </p>
          </a>
          <div className="flex justify-center items-center border border-white border-1 rounded-md pl-1.5 pr-1.5 px-2.5 py-2 cursor-pointer" onClick={() => signOut()}>
            <p className="font-medium text-red-500">
                Sign out
            </p>
          </div>
        </div>
      )}
    </div>
  );
}