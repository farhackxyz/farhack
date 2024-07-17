/* eslint-disable @next/next/no-img-element */
"use client";

import "@farcaster/auth-kit/styles.css";
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react";
import { SignInButton, AuthKitProvider, StatusAPIResponse } from "@farcaster/auth-kit";
import React from "react";
import { karla } from "../lib/utils";

const config = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  siweUri: "http://example.com/login",
  domain: "example.com",
};

export default function SignInWithFarcaster() {
  return (
    <AuthKitProvider config={config}>
      <Content />
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
      console.log("Success response:", res);
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
        <div className="font-sans text-white pt-5">
          <div className="flex flex-row gap-2 items-center border border-white border-1 rounded-md pl-1.5 pr-1.5 px-2.5 py-1">
            <img src={session.user?.image ?? ""} alt="User Image" className="w-8 h-8 rounded-full" />
            <p>
                Signed in as {session.user?.name}
            </p>
          </div>
          <div className="flex justify-center items-center border border-white border-1 rounded-md pl-1.5 pr-1.5 px-2.5 py-1 mt-2 cursor-pointer" onClick={() => signOut()}>
            <p className="font-medium text-red-600">
                Sign out
            </p>
          </div>
        </div>
      )}
    </div>
  );
}