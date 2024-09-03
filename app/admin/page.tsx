import { auth } from '@/auth';
import { db } from '@/kysely';
import AdminClientPage from '../components/admin-client-page';

export default async function AdminPage() {
  const session = await auth();


  const user = await db
    .selectFrom('users')
    .select(['is_admin', 'admin_hackathons'])
    .where('name', '=', (session as any).user.name ?? "" as any)
    .executeTakeFirstOrThrow();

  const hackathonId = user.admin_hackathons !== 'all' ? parseInt(user.admin_hackathons, 10) : null;

  if (!user.is_admin || (user.is_admin && user.admin_hackathons && !hackathonId && user.admin_hackathons !== 'all')) {
    throw new Error('Unauthorized access');
  }

  const usersQuery = db
    .selectFrom('users')
    .select(['id', 'image', 'created_at', 'name', 'is_admin', 'admin_hackathons']);

  const teamsQuery = db
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
    ]);

  const hackathonsQuery = db
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
    ]);

  if (hackathonId) {
    teamsQuery.where('hackathon_id', '=', hackathonId);
    hackathonsQuery.where('id', '=', hackathonId);
  }

  const users = await usersQuery.execute();
  const teams = await teamsQuery.execute();
  const hackathons = await hackathonsQuery.execute();

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
      canEdit: user.admin_hackathons === 'all' || (hackathonId && team.hackathon_id === hackathonId),
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