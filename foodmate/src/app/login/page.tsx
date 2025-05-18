'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    setError('');

    // Admin hardcoded login
    if (email === 'admin@foodmate.com' && password === 'admin123') {
      localStorage.setItem('user', JSON.stringify({ email, role: 'admin', status: 'online' }));
      router.push('/admin/dashboard');
      return;
    }

    // User login from registeredUsers in localStorage
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      // Update status to online
      const updatedUsers = users.map(user =>
        user.email === email ? { ...user, status: 'online' } : user
      );
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      localStorage.setItem('user', JSON.stringify({ ...foundUser, status: 'online' }));

      router.push('/dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-60 backdrop-blur-sm"
        style={{ backgroundImage: "url('/bg-foodmate.webp')" }}
      />

      {/* Login Card */}
      <Card className="w-full max-w-sm bg-white/30 backdrop-blur-md shadow-xl border-none outline-none ring-0">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login to FoodMate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <Button className="w-full" onClick={handleLogin}>
            Sign In
          </Button>

          <p className="text-xs text-center text-muted-foreground">
  	Don&apos;t have an account?{' '}
	  <a href="/register" className="text-blue-600 hover:underline">
    	   Register here
           </a>
	</p>

        </CardContent>
      </Card>
    </main>
  );
}

