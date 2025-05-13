'use client';

import '../styles/globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ReactNode, useRef, useEffect, useState } from 'react';

interface User {
  ID: number;
  Name: string;
  Email: string;
  'Account Type': string;
}

export default function BuyerLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isActive = (href: string) => pathname === href;

  const linkBase = 'block px-4 py-2 rounded';
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
        <nav className="bg-blue-500 text-white px-6 py-3 flex justify-center gap-6 shadow-sm">
          <div className="flex gap-6">
            <Link
              href="/register-buyer"
              className={`${linkBase} ${
                isActive('/register-buyer') ? activeLink : hoverEffect
              }`}
            >
              I am a Buyer
            </Link>
            <Link
              href="/register-seller"
              className={`${linkBase} ${
                isActive('/register-seller') ? activeLink : hoverEffect
              }`}
            >
              I am a Seller
            </Link>
            <Link
              href="/property"
              className={`${linkBase} ${
                isActive('/property') ? activeLink : hoverEffect
              }`}
            >
              Buy Property
            </Link>
            <Link
              href="/bids"
              className={`${linkBase} ${
                isActive('/bids') ? activeLink : hoverEffect
              }`}
            >
              See Your Bids
            </Link>
            <Link
              href="/investments"
              className={`${linkBase} ${
                isActive('/investments') ? activeLink : hoverEffect
              }`}
            >
              My Investments
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            {user ? (
              <>
                <button
                  className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-gray-200"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  Profile
                </button>
                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-64 bg-white text-black border rounded shadow-lg z-50 p-4"
                  >
                    <div className="space-y-1">
                      <p>
                        <strong>ID:</strong> {user.ID}
                      </p>
                      <p>
                        <strong>Name:</strong> {user.Name}
                      </p>
                      <p>
                        <strong>Email:</strong> {user.Email}
                      </p>
                      <p>
                        <strong>Account Type:</strong>
                        {user['Account Type'] === 'buyer'
                          ? ' Buyer'
                          : user['Account Type'] === 'individual'
                          ? ' Individual Owner'
                          : user['Account Type'] === 'builder'
                          ? ' Builder/Colonizer'
                          : ''}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        localStorage.removeItem('user');
                        setUser(null);
                        setShowDropdown(false);
                        router.push('/login');
                      }}
                      className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* <button
                  className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-gray-200"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  Profile
                </button>
                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-64 bg-white text-black border rounded shadow-lg z-50 p-4"
                  >
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        router.push('/login');
                      }}
                      className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                      Register
                    </button>
                  </div>
                )} */}
              </>
            )}
          </div>
        </nav>

        <main className="p-6 max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
