import { render, screen } from '@testing-library/react';
import { RequireAdmin } from '@/components/RequireAdmin';

jest.mock('@tonconnect/ui-react', () => ({
  useTonWallet: jest.fn(),
}));
jest.mock('@/lib/ton/useTonReady', () => ({
  useTonReady: jest.fn(),
}));

const useTonWallet = require('@tonconnect/ui-react').useTonWallet as jest.Mock;
const useTonReady = require('@/lib/ton/useTonReady').useTonReady as jest.Mock;

const Child = () => <div>SECRET</div>;

describe('RequireAdmin', () => {
  it('показывает лоадер, пока не ready', () => {
    useTonWallet.mockReturnValue({}); // провайдер есть
    useTonReady.mockReturnValue(false);
    render(<RequireAdmin><Child/></RequireAdmin>);
    expect(screen.getByText(/Восстанавливаем подключение/i)).toBeInTheDocument();
  });

  it('просит подключить, если нет кошелька', () => {
    useTonWallet.mockReturnValue({}); // ready, но пусто
    useTonReady.mockReturnValue(true);
    render(<RequireAdmin><Child/></RequireAdmin>);
    expect(screen.getByText(/Подключите кошелёк/i)).toBeInTheDocument();
  });

  it('рендерит детей, если кошелёк есть', () => {
    useTonWallet.mockReturnValue({ account: { address: 'EQxxx' } });
    useTonReady.mockReturnValue(true);
    render(<RequireAdmin><Child/></RequireAdmin>);
    expect(screen.getByText('SECRET')).toBeInTheDocument();
  });
});
