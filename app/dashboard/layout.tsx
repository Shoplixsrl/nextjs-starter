import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { organizations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { DashboardNav } from '@/components/dashboard-nav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/signin');
  }

  const organization = await db.query.organizations.findFirst({
    where: eq(organizations.id, session.organizationId),
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardNav
        user={{
          name: session.email.split('@')[0],
          email: session.email,
          role: session.role,
        }}
        organization={{
          name: organization?.name || 'Organization',
        }}
      />
      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
        {children}
      </main>
    </div>
  );
}
