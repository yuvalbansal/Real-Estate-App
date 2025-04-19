'use client';
import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isBuyActive = pathname.startsWith('/buy');
  const isSellActive = pathname.startsWith('/sell');

  const isActive = (href: string) => pathname === href;

  const linkBase = 'block px-4 py-2';
  const activeLink = 'bg-blue-100 font-semibold text-blue-700';
  const hoverEffect = 'hover:bg-gray-200';

  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <header className="bg-blue-600 text-white p-6 text-center shadow-md">
          <h1 className="text-3xl font-bold">
            <Link href="/">Real Estate Hub</Link>
          </h1>
        </header>

        <nav className="bg-blue-500 text-white px-6 py-3 flex justify-center gap-10 shadow-sm">
          {/* Buy Dropdown */}
          <div className="relative group">
            <div className="px-4 py-2 cursor-pointer hover:bg-blue-400 rounded">
              <Link
                href="/buy"
                className={`block ${
                  isBuyActive ? 'underline font-semibold' : ''
                }`}
              >
                Buy
              </Link>
            </div>
            <div className="absolute left-0 bg-white text-gray-900 shadow-lg mt-1 rounded min-w-[200px] z-10 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 pointer-events-none">
              <Link
                href="/buy/property"
                className={`${linkBase} ${
                  isActive('/buy/property') ? activeLink : hoverEffect
                }`}
              >
                Buy property
              </Link>
              <Link
                href="/buy/bid"
                className={`${linkBase} ${
                  isActive('/buy/bid') ? activeLink : hoverEffect
                }`}
              >
                Bid for property
              </Link>
              <Link
                href="/buy/register"
                className={`${linkBase} ${
                  isActive('/buy/register') ? activeLink : hoverEffect
                }`}
              >
                Register as a Buyer
              </Link>
              <Link
                href="/buy/bids"
                className={`${linkBase} ${
                  isActive('/buy/bids') ? activeLink : hoverEffect
                }`}
              >
                See your Bids
              </Link>
              <Link
                href="/buy/investments"
                className={`${linkBase} ${
                  isActive('/buy/investments') ? activeLink : hoverEffect
                }`}
              >
                My investments
              </Link>
            </div>
          </div>

          {/* Sell Dropdown */}
          <div className="relative group">
            <div className="px-4 py-2 cursor-pointer hover:bg-blue-400 rounded">
              <Link
                href="/sell"
                className={`block ${
                  isSellActive ? 'underline font-semibold' : ''
                }`}
              >
                Sell
              </Link>
            </div>
            <div className="absolute left-0 bg-white text-gray-900 shadow-lg mt-1 rounded min-w-[200px] z-10 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 pointer-events-none">
              <Link
                href="/sell/individual"
                className={`${linkBase} ${
                  isActive('/sell/individual') ? activeLink : hoverEffect
                }`}
              >
                Individual Owner
              </Link>
              <Link
                href="/sell/builder"
                className={`${linkBase} ${
                  isActive('/sell/builder') ? activeLink : hoverEffect
                }`}
              >
                Builder / Colonizer
              </Link>
              <Link
                href="/sell/interest"
                className={`${linkBase} ${
                  isActive('/sell/interest') ? activeLink : hoverEffect
                }`}
              >
                Express interest
              </Link>
              <Link
                href="/sell/list"
                className={`${linkBase} ${
                  isActive('/sell/list') ? activeLink : hoverEffect
                }`}
              >
                List your property
              </Link>
              <Link
                href="/sell/properties"
                className={`${linkBase} ${
                  isActive('/sell/properties') ? activeLink : hoverEffect
                }`}
              >
                My properties
              </Link>
            </div>
          </div>
        </nav>

        <main className="p-6 max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
