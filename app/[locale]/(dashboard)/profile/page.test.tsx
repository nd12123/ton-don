// app/(dashboard)/profile/page.test.tsx (вверху файла, до импортов React)
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      update: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ data: null, error: null })
      }))
    }))
  }
}));


import { render, screen } from '@testing-library/react';
import ProfilePage from '@/app/(dashboard)/profile/page';
import { useStakeStore } from '@/lib/store';

jest.mock('@tonconnect/ui-react', () => ({
  useTonAddress: () => 'EQADDRESS',
}));
jest.mock('@/lib/hooks/useTonPrice', () => ({
  useTonPrice: () => 0, // чтобы цифры $ не мешали
}));

function seedHistory() {
  useStakeStore.setState({
    history: [
      { id:1, validator:'Basic', amount:3, apr:4, duration:30, status:'active', created_at: new Date().toISOString() },
      { id:2, validator:'Basic', amount:2, apr:4, duration:30, status:'active', created_at: new Date().toISOString() },
      { id:3, validator:'Basic', amount:1, apr:4, duration:30, status:'active', created_at: new Date(Date.now()-864e5).toISOString() },
    ],
    loading: false,
    fetchHistory: jest.fn(),
  } as any);
}

describe('ProfilePage', () => {
  it('рисует корректные агрегаты и строки', () => {
    seedHistory();
    render(<ProfilePage />);

    expect(screen.getByText(/Баланс/i).nextSibling?.textContent).toMatch(/119\.00/);

    // Ежедневный доход = 0.24
    expect(screen.getByText(/Ежедневный доход/i).nextSibling?.textContent).toMatch(/0\.24/);

    // В таблице есть 3 строки и профит 0.12/0.08/0.08
    expect(screen.getAllByText(/Withdraw/i)).toHaveLength(3);
    expect(screen.getByText(/0\.12 TON/)).toBeInTheDocument();
    expect(screen.getAllByText(/0\.08 TON/).length).toBeGreaterThanOrEqual(2);
  });
});
