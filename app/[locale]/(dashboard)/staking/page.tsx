// Никакого next/dynamic здесь не нужно

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import StakingClient from './StakingClient';

export default function Page() {
  return <StakingClient />;
}
