'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Home,
  Users,
  Utensils,
  ClipboardList,
  Heart,
  User as UserIcon,
} from 'lucide-react';
import clsx from 'clsx';

interface User {
  email: string;
  role: 'admin' | 'user';
}

export function SidebarNav() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    try {
      const parsed: User = JSON.parse(storedUser);
      setUser(parsed);
    } catch (err) {
      console.error('Invalid user data in localStorage');
    }
  }, []);

  if (!user) return null;

  const adminNavItems = [
    { href: '/admin/dashboard', icon: <Home />, label: 'Dashboard' },
    { href: '/admin/users', icon: <Users />, label: 'Users' },
    { href: '/admin/restaurants', icon: <Utensils />, label: 'Restaurants' },
    { href: '/admin/orders', icon: <ClipboardList />, label: 'Orders' },
  ];

  const userNavItems = [
    { href: '/dashboard', icon: <Home />, label: 'Dashboard' },
    { href: '/dashboard/restaurants', icon: <Utensils />, label: 'Restaurants' },
    { href: '/dashboard/orders', icon: <ClipboardList />, label: 'My Orders' },
    { href: '/dashboard/favorites', icon: <Heart />, label: 'Favorites' },
    { href: '/dashboard/profile', icon: <UserIcon />, label: 'Profile' },
  ];

  const navItems = user.role === 'admin' ? adminNavItems : userNavItems;

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

