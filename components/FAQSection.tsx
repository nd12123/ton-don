"use cleint" //by hand

import React from 'react';
import Image from 'next/image';

import qIcon from '@/assets/FAQ/Ton 3d 1.png';
import aIcon from '@/assets/FAQ/faq a.svg';

const faqs = [
  {
    question: 'What is TON Staking and how does it work?',
    answer: 'TON Staking allows you to lock up your TON tokens in our smart contract to earn passive rewards according to the selected APR plan.',
  },
  {
    question: 'Is my principal at risk?',
    answer: 'No, your principal is secure in the smart contract; only the earned rewards are subject to network performance.',
  },
  {
    question: 'How can I withdraw my rewards?',
    answer: 'You can claim your rewards at any time via the dashboard or by interacting with the withdraw function in the contract.',
  },
  {
    question: 'Are there any fees?',
    answer: 'There are minimal network transaction fees; no additional platform fees are charged for staking or withdrawing.',
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 bg-bg-light dark:bg-bg-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-12 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {faqs.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-center mb-2">
                <Image src={qIcon} alt="Question" width={24} height={24} />
                <h3 className="ml-2 text-xl font-semibold dark:text-white">
                  {item.question}
                </h3>
              </div>
              <div className="flex items-start text-gray-700 dark:text-gray-300">
                <Image src={aIcon} alt="Answer" width={24} height={24} />
                <p className="ml-2">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
