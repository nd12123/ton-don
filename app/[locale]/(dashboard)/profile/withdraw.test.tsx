import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfilePage from '@/app/(dashboard)/profile/page';
import { useStakeStore } from '@/lib/store';

const withdrawAmount = jest.fn().mockResolvedValue(undefined);
const update = jest.fn().mockResolvedValue({ data: {}, error: null });

jest.mock('@/lib/ton/useContract', () => ({
  useStakeContract: () => ({ withdrawAmount }),
}));

jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: () => ({ update, eq: () => ({ select: () => ({}) }) }),
    // или упрощённо: from: jest.fn().mockReturnValue({ update, eq: jest.fn().mockReturnThis(), select: jest.fn() })
  },
}));

jest.mock('@/components/WithdrawModal', () => ({
  WithdrawModal: ({ open, onConfirm }: any) =>
    open ? <button onClick={() => onConfirm({} as any, 1)}>CONFIRM</button> : null
}));

jest.mock('@tonconnect/ui-react', () => ({
  useTonAddress: () => 'EQADDRESS',
}));

beforeEach(() => {
  useStakeStore.setState({
    history: [
      { id: 42, validator:'Basic', amount:3, apr:4, duration:30, status:'active', created_at: new Date().toISOString(), wallet:'EQME' },
    ],
    loading: false,
    fetchHistory: jest.fn(),
  } as any);
  withdrawAmount.mockClear();
  update.mockClear();
});

it('нажатие Withdraw вызывает контракт и апдейт в БД', async () => {
  render(<ProfilePage />);
  fireEvent.click(screen.getByText(/Withdraw/i));       // открыли «модалку»
  fireEvent.click(screen.getByText('CONFIRM'));         // подтвердили 1 TON

  await waitFor(() => {
    expect(withdrawAmount).toHaveBeenCalledWith(1);
    expect(update).toHaveBeenCalled(); // проверка факта обновления
  });
});
