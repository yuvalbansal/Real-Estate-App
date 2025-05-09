// app/layout.tsx
'use client';

import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <header className="bg-blue-600 text-white p-6 text-center shadow-md">
          <h1 className="text-3xl font-bold">
            <Link href="/">Real Estate Hub</Link>
          </h1>
        </header>
        {children}
      </body>
    </html>
  );
}
