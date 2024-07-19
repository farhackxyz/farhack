import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createAppClient, viemConnector } from "@farcaster/auth-client";
import { sql } from 'kysely';
import { db } from "./kysely";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Sign in with Farcaster",
      credentials: {
        message: { label: "Message", type: "text", placeholder: "0x0" },
        signature: { label: "Signature", type: "text", placeholder: "0x0" },
        name: { label: "Name", type: "text", placeholder: "0x0" },
        pfp: { label: "Pfp", type: "text", placeholder: "0x0" },
        csrfToken: { label: "CSRF Token", type: "text", placeholder: "0x0" },
      },
      async authorize(credentials) {
        const appClient = createAppClient({
          ethereum: viemConnector(),
        });

        const verifyResponse = await appClient.verifySignInMessage({
          message: credentials?.message as string,
          signature: credentials?.signature as `0x${string}`,
          domain: "example.com",
          nonce: credentials.csrfToken as string,
        });

        const { success, fid } = verifyResponse;
  
        if (!success) {
          return null;
        }

        let user = await db.selectFrom('users')
          .selectAll()
          .where('id', '=', fid)
          .executeTakeFirst();

        if (!user) {
          await db.insertInto('users').values({
            id: fid,
            name: credentials?.name as string,
            image: credentials?.pfp as string,
            is_admin: false,
          }).execute();

          user = await db.selectFrom('users')
            .selectAll()
            .where('id', '=', fid)
            .executeTakeFirst();
        }

        if (!user) {
          return null;
        }
        return {
          id: user.id.toString(),
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
});