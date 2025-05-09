'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function BuilderLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const linkBase = 'block px-4 py-2 rounded';
  const activeLink = 'bg-blue-100 font-semibold text-blue-700';
  const hoverEffect = 'hover:bg-gray-200';

  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <nav className="bg-blue-500 text-white px-6 py-3 flex justify-center gap-6 shadow-sm">
          <Link
            href="/builder/express"
            className={`${linkBase} ${
              isActive('/builder/express') ? activeLink : hoverEffect
            }`}
          >
            Express Interest
          </Link>
          <Link
            href="/builder/list"
            className={`${linkBase} ${
              isActive('/builder/list') ? activeLink : hoverEffect
            }`}
          >
            List Your Property
          </Link>
          <Link
            href="/builder/properties"
            className={`${linkBase} ${
              isActive('/builder/properties') ? activeLink : hoverEffect
            }`}
          >
            My Properties
          </Link>
        </nav>

        <main className="p-6 max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
