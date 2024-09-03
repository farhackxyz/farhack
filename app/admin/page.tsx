import { auth } from '@/auth';
import { db } from '@/kysely';
import { headers } from 'next/headers';
import AdminClientPage from '../components/admin-client-page';

export default async function AdminPage() {
  const session = await auth();
  const users = await db
    .selectFrom('users')
    .select([
      'id',
      'image',
      'created_at',
      'name',
      'is_admin',
      'admin_hackathons',
    ])
    .execute();

  const teams = await db
    .selectFrom('teams')
    .select([
      'id',
      'name',
      'fids',
      'description',
      'hackathon_id',
      'submitted_at',
      'wallet_address',
      'embeds',
    ])
    .execute();

  const hackathons = await db
    .selectFrom('hackathons')
    .select([
      'id',
      'name',
      'description',
      'start_date',
      'end_date',
      'created_at',
      'square_image',
      'slug',
    ])
    .execute();

  const tables = {
    users: users.map((user) => ({
      id: user.id.toString(),
      image: user.image,
      created_at: user.created_at.toISOString(),
      name: user.name,
      is_admin: user.is_admin,
      admin_hackathons: user.admin_hackathons,
    })),
    teams: teams.map((team) => ({
      id: team.id.toString(),
      name: team.name,
      fids: team.fids,
      description: team.description,
      hackathon_id: team.hackathon_id.toString(),
      submitted_at: team.submitted_at ? team.submitted_at.toISOString() : undefined,
      wallet_address: team.wallet_address,
      embeds: team.embeds,
    })),
    hackathons: hackathons.map((hackathon) => ({
      id: hackathon.id.toString(),
      name: hackathon.name,
      description: hackathon.description,
      start_date: hackathon.start_date.toISOString(),
      end_date: hackathon.end_date.toISOString(),
      created_at: hackathon.created_at.toISOString(),
      square_image: hackathon.square_image,
      slug: hackathon.slug,
    })),
  };

  return (
    <AdminClientPage
      session={{
        user: {
          name: session?.user?.name || '',
          image: session?.user?.image || '',
        },
      }}
      tables={tables}
    />
  );
}