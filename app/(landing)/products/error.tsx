'use client';

import { useEffect } from 'react';
import Container from '@/components/shared/Container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-[#F5F3EE] min-h-screen py-24 flex items-center justify-center">
      <Container className="text-center">
        <h2 className="text-3xl font-serif mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-8">{error.message || "Failed to load products."}</p>
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm"
        >
          Try again
        </button>
      </Container>
    </div>
  );
}
