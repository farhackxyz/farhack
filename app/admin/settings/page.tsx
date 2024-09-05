import * as React from "react"
import { db } from "@/kysely"
import AdminTable from "@/app/components/admin-table"
import { createUser, removeUser, updateUser } from "@/app/actions/user"
import { User } from "@/app/lib/types"

const getAdmins = async (): Promise<User[]> => {
  const dbUsers = await db
    .selectFrom("users")
    .select(["id", "created_at", "name", "image", "is_admin", "admin_hackathons"])
    .where("admin_hackathons", "=", "all")
    .limit(10)
    .execute()

  return dbUsers;
}

export default async function SettingsPage() {
  const users = await getAdmins()

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <AdminTable createUser={createUser} updateUser={updateUser} removeUser={removeUser} users={users} />
    </div>
  )
}