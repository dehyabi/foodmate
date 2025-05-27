'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

type UserType = {
  email: string;
  password: string;
  role?: string;
  status?: string;
  name?: string;
};

const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginForm = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    const { email, password } = data;
    setError('');

    // Admin login (hardcoded)
    if (email === 'admin@foodmate.com' && password === 'admin123') {
      localStorage.setItem('user', JSON.stringify({ email, role: 'admin', status: 'online' }));
      router.push('/admin/dashboard');
      return;
    }

    // Registered users login
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = users.find((user: UserType) => user.email === email && user.password === password);

    if (foundUser) {
      const updatedUsers = users.map((user: UserType) =>
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

      <Card className="w-full max-w-sm bg-white/30 backdrop-blur-md shadow-xl border-none outline-none ring-0">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login to FoodMate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} autoComplete="email" />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            Don&apos;t have an account?{' '}
            <a href="/foodmate/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

