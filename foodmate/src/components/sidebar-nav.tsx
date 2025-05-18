'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Utensils, ClipboardList } from 'lucide-react';
import clsx from 'clsx';

export function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/dashboard', icon: <Home />, label: 'Dashboard' },
    { href: '/admin/users', icon: <Users />, label: 'Users' },
    { href: '/admin/restaurants', icon: <Utensils />, label: 'Restaurants' },
    { href: '/admin/orders', icon: <ClipboardList />, label: 'Orders' },
  ];

  return (
    <nav className="flex flex-col space-y-2">
      {navItems.map(({ href, icon, label }) => (
        <Link
          key={href}
          href={href}
          className={clsx(
            'flex items-center px-4 py-2 rounded-3xl hover:bg-white/40 transition',
            pathname === href
              ? 'bg-white/60 font-semibold'
              : 'text-gray-700'
          )}
        >
          <span className="mr-2">{icon}</span>
          {label}
        </Link>
      ))}
    </nav>
  );
}

