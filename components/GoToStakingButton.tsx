// components/GoToStakingButton.tsx
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';

type Props = {
  children: ReactNode;      // текст или JSX внутри кнопки
  className?: string;       // класс для стилизации (опционально)
};

export default function GoToStakingButton({ children, className }: Props) {
  const router = useRouter();
  const userAddress = useTonAddress();       // вернёт undefined/null, если кошелёк не подключён
  const [tonConnectUI] = useTonConnectUI();  // экземпляр TonConnect UI

  const handleClick = () => {
    if (userAddress) {
      // если пользователь уже подключил кошелёк, перенаправляем на страницу стейкинга
      router.push('/staking');
    } else {
      // иначе открываем модальное окно для подключения
      tonConnectUI.openModal();
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
