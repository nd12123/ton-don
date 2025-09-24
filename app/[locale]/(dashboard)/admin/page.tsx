export const dynamic = 'force-dynamic';
export const revalidate = 0;

import AdminClient from './AdminClient'; // или StakingClient
export default function Page() {
  return <AdminClient />;
}
