'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, LogOut } from 'lucide-react';
import { SidebarNav } from '@/components/sidebar-nav';

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isUser, setIsUser] = useState<boolean | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const parsed = JSON.parse(userData);
    if (parsed.role !== 'user') {
      router.push('/login');
    } else {
      setIsUser(true);
    }
  }, [router]);

  if (isUser === null) return null; // Loading state

  const handleLogout = () => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedUser) return;

    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    const updatedUsers = users.map((user: any) =>
      user.email === loggedUser.email ? { ...user, status: 'offline' } : user
    );

    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="relative min-h-screen flex">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-60 backdrop-blur-sm"
        style={{ backgroundImage: "url('/bg-foodmate.webp')" }}
      />

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white/30 backdrop-blur-md border-r border-white/20 p-6">
        <h2 className="text-xl font-bold mb-6">User Panel</h2>
        <SidebarNav />
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-auto text-red-500 hover:text-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Sidebar Toggle (Mobile) */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 bg-white/80 p-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu />
      </button>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden">
          <div className="w-64 h-full bg-white/80 backdrop-blur-md p-6 shadow-lg">
            <SidebarNav />
            <button
              className="mt-6 text-red-500"
              onClick={() => {
                setSidebarOpen(false);
                handleLogout();
              }}
            >
              <LogOut size={18} className="inline mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

