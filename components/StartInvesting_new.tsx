import React from 'react';
import { Button } from '@/components/ui/button';

export default function StartInvesting() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
          Ready to Start Earning?
        </h2>
        <p className="text-lg sm:text-xl mb-8">
          Stake your TON tokens now and unlock passive income with our secure platform.
        </p>
        <Button className="bg-white text-blue-600 hover:bg-gray-100">
          Start Investing
        </Button>
      </div>
    </section>
  );
}
