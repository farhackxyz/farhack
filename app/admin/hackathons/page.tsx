import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { db } from "@/kysely"
import { auth } from "@/auth"

type Hackathon = {
  id: number
  name: string
  description: string
  start_date: string
  end_date: string
  created_at: string
  square_image: string
  slug: string
}

const getHackathons = async (): Promise<Hackathon[]> => {
  return await db.selectFrom('hackathons')
    .select([
      'id',
      'name',
      'description',
      'start_date',
      'end_date',
      'created_at',
      'square_image',
      'slug'
    ])
    .orderBy('start_date', 'desc')
    .limit(50)
    .execute() as unknown as Hackathon[]
}

export default async function HackathonsPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40 justify-center items-center">
        <h1 className="text-2xl font-bold">Please log in to view your dashboard</h1>
      </div>
    );
  }

  const user = await db.selectFrom('users').selectAll().where('name', '=', (session as any).user.name ?? "").executeTakeFirst();

  const hackathons = await getHackathons();

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 grid-cols-1">
      </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Hackathons</CardTitle>
          <CardDescription>List of all hackathons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Slug</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hackathons
                  .filter((hackathon) => {
                    if (user?.admin_hackathons === 'all') return true;

                    const adminHackathonIds = user?.admin_hackathons?.split(',').map(Number);

                    if (!Array.isArray(adminHackathonIds)) {
                      console.error(`Invalid admin_hackathons: ${user?.admin_hackathons}`);
                      return false;
                    }

                    console.error(`Checking hackathon ID ${hackathon.id} against admin IDs:`, adminHackathonIds);
                    return adminHackathonIds.includes(hackathon.id);
                  })
                  .map(hackathon => (
                    <TableRow key={hackathon.id}>
                      <TableCell>{hackathon.name}</TableCell>
                      <TableCell>{hackathon.description}</TableCell>
                      <TableCell>{new Date(hackathon.start_date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(hackathon.end_date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(hackathon.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{hackathon.slug}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}