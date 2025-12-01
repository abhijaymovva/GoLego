import React, { ReactNode } from 'react';
import Link from 'next/link';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 text-gray-900">
      <header className="flex-none h-16 bg-white border-b border-gray-200 flex items-center px-6 justify-between z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold text-blue-600">GOLEGO</Link>
          <nav className="flex gap-4 text-sm font-medium text-gray-600">
            <Link href="/sandbox" className="hover:text-blue-600">Sandbox</Link>
            <Link href="/challenge" className="hover:text-blue-600">Challenges</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {/* User auth placeholder */}
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>
    </div>
  );
}

