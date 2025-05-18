'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      router.push('/login');
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
    } catch (err) {
      console.error('Invalid user data in localStorage');
      localStorage.removeItem('user');
      router.push('/login');
    }
  }, [router]);

  if (!user) return null; // loading state

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-60 backdrop-blur-sm"
        style={{ backgroundImage: "url('/bg-foodmate.webp')" }}
      />

      {/* Dashboard Card */}
      <Card className="w-full max-w-xl bg-white/30 backdrop-blur-md border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Welcome, {user.email}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-800 text-lg">
            You are logged in as <strong>{user.role}</strong>.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

