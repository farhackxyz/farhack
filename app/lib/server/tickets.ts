"use server";

import { db } from "@/kysely";
  
export const addTicket = async (
    userId: number,
    userAddress: string,
    hackathonId: number,
    txnHash: string,
    ticketType: 'priority' | 'day',
    amount: number
  ) => {
    return await db.insertInto('tickets').values({
      user_id: userId,
      user_address: userAddress,
      hackathon_id: hackathonId,
      txn_hash: txnHash,
      ticket_type: ticketType,
      amount: amount
    }).returningAll().executeTakeFirst();
};

export const getTickets = async () => {
    return await db.selectFrom('tickets').selectAll().execute();
};
  