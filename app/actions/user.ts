import { db } from "@/kysely"
import { User } from "../lib/types"

export async function createUser(user: Omit<User, "id" | "created_at">): Promise<User> {
  'use server'
  const [dbUser] = await db
    .insertInto("users")
    .values(user)
    .returning(["id", "created_at", "name", "image", "is_admin", "admin_hackathons"])
    .execute()

  if (dbUser) {
    return dbUser as User
  } else {
    throw new Error("Failed to create user")
  }
}

export async function updateUser(user: User): Promise<void> {
  'use server'
  await db
    .updateTable("users")
    .set({
      name: user.name,
      image: user.image,
      is_admin: user.is_admin,
      admin_hackathons: user.admin_hackathons,
    })
    .where("id", "=", user.id)
    .execute()
}

export async function removeUser(userId: number): Promise<void> {
  'use server'
  const result = await db
    .deleteFrom("users")
    .where("id", "=", userId)
    .execute()

  if (result.length === 0) {
    throw new Error("Failed to remove user")
  }
}