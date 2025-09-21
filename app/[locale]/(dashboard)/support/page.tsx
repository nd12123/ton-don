'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useT } from '@/i18n/react';

export default function Page() {
  const t = useT('support');

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });
      if (res.ok) {
        setStatus('sent');
        setEmail('');
        setMessage('');
      } else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      {/* ЧУТЬ ШИРЕ общий контейнер: было max-w-2xl → стало max-w-3xl */}
      <section className="text-center w-full max-w-3xl mx-auto px-4 pt-2 pb-6">
        {/* ТЕКСТ СЛЕВА, без подложки */}
        
{/* НЕ <Header>, НЕ <header>, без класса "Header" */}
<h1 className="text-white font-bold text-3xl md:text-4xl">
  {t('title')}
</h1>
<p className="mt-2 text-slate-300 text-base md:text-lg">
  {t('intro')}
</p>

        {/* контакты — тоже слева */}
        <ul className="text-center mt-5 text-left text-sm md:text-[15px] text-sky-400 space-y-1.5">
          <li>
            Email:{' '}
            <a href="mailto:support@tonstake.app" className="hover:underline">
              support@tonstake.app
            </a>
          </li>
        </ul>

        {/* ФОРМА: та же подложка, но контейнер тоже чуть шире вместе с секцией */}
        <form
          onSubmit={handleSubmit}
          className="
            mt-8 md:mt-10 space-y-4
            bg-white/6 dark:bg-white/5
            backdrop-blur-md
            border border-white/10
            rounded-xl
            shadow-[0_25px_60px_rgba(6,173,252,0.10)]
            p-4 md:p-5
          "
        >
          <input
            type="email"
            placeholder={t('form.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-4 py-2.5 text-[15px]
              bg-white/5 border border-white/10 rounded-lg
              text-white placeholder:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:border-transparent
            "
            required
            aria-label={t('form.emailAria')}
          />

          <textarea
            rows={5}
            placeholder={t('form.messagePlaceholder')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="
              w-full px-4 py-2.5 text-[15px]
              bg-white/5 border border-white/10 rounded-lg
              text-white placeholder:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:border-transparent
              resize-y
            "
            required
            aria-label={t('form.messageAria')}
          />

          {/* кнопка по центру */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="
                inline-flex items-center justify-center
                h-11 px-6
                text-[15px] font-semibold
                rounded-lg
                bg-gradient-to-r from-sky-600 to-sky-400
                text-white
                shadow-[0_16px_28px_rgba(6,173,252,0.18)]
                transition-transform hover:scale-[1.02] active:scale-[0.99]
                disabled:opacity-60
              "
            >
              {status === 'sending' ? t('form.sending') : t('form.submit')}
            </button>
          </div>

          {status === 'sent' && (
            <p className="text-center text-green-400 text-sm mt-1">
              {t('form.sent')}
            </p>
          )}
          {status === 'error' && (
            <p className="text-center text-rose-400 text-sm mt-1">
              {t('form.error')}
            </p>
          )}
        </form>
      </section>
    </motion.main>
  );
}
