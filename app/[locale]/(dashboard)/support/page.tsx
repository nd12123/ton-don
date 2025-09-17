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
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl w-full mx-auto px-4 py-10"
    >
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>

      <p className="text-gray-700 mb-4 text-sm">{t('intro')}</p>

      <ul className="text-sm text-blue-600 space-y-2 mb-6">
        <li>
          Email:{' '}
          <a href="mailto:support@tonstake.app" className="hover:underline">
            support@tonstake.app
          </a>
        </li>
        <li>
          Telegram:{' '}
          <a href="https://t.me/tonstake" target="_blank" className="hover:underline">
            @tonstake
          </a>
        </li>
      </ul>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 p-4 rounded-xl"
      >
        <input
          type="email"
          placeholder={t('form.emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 text-sm bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          required
          aria-label={t('form.emailAria')}
        />
        <textarea
          rows={4}
          placeholder={t('form.messagePlaceholder')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 text-sm bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          required
          aria-label={t('form.messageAria')}
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-md"
        >
          {status === 'sending' ? t('form.sending') : t('form.submit')}
        </button>
      </form>

      {status === 'sent' && (
        <p className="mt-2 text-green-600 text-sm">{t('form.sent')}</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-red-600 text-sm">{t('form.error')}</p>
      )}
    </motion.main>
  );
}

/*
"use client";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl w-full mx-auto px-4 py-10"
    >
      <h1 className="text-2xl font-bold mb-6">Поддержка</h1>

      <p className="text-gray-700 mb-4 text-sm">
        Если у вас возникли вопросы, вы можете связаться с нами:
      </p>

      <ul className="text-sm text-blue-600 space-y-2 mb-6">
        <li>
          Email:{" "}
          <a href="mailto:support@tonstake.app" className="hover:underline">
            support@tonstake.app
          </a>
        </li>
        <li>
          Telegram:{" "}
          <a
            href="https://t.me/tonstake"
            target="_blank"
            className="hover:underline"
          >
            @tonstake
          </a>
        </li>
        <li>
          Discord: <span className="text-gray-500">Coming soon</span>
        </li>
      </ul>

      <form className="space-y-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 p-4 rounded-xl">
        <input
          type="email"
          placeholder="Ваш email"
          className="w-full px-4 py-2 text-sm bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          rows={4}
          placeholder="Ваше сообщение"
          className="w-full px-4 py-2 text-sm bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Отправить
        </button>
      </form>
    </motion.main>
  );
}
*/