import { Mail, MessageCircle, HelpCircle } from "lucide-react";

export default function Footer() {
    return (
      <footer className="
      bg-gray-100 text-gray-700 
      dark:bg-gray-900 dark:text-gray-200 
      py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto gap-2">
          <span>&copy; {new Date().getFullYear()} TON Stake. Все права защищены.</span>
          <div className="flex gap-4 items-center text-gray-600">
  <a href="mailto:support@tonstake.app" className="hover:text-blue-600 flex items-center gap-1">
    <Mail size={16} />
    Поддержка
  </a>
  <a href="https://t.me/tonstake" target="_blank" className="hover:text-blue-600 flex items-center gap-1">
    <MessageCircle size={16} />
    Telegram
  </a>
  <a href="/faq" className="hover:text-blue-600 flex items-center gap-1">
    <HelpCircle size={16} />
    FAQ
  </a>
</div>

        </div>
      </footer>
    );
  }
  