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

      <form className="space-y-4 bg-white border border-gray-200 p-4 rounded-xl">
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
