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

type FormData = {
  name: string;
  email: string;
  password: string;
};

type User = FormData & {
  role: string;
  status: string;
};

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .string()
    .email('Invalid email')
    .refine((val) => val !== 'admin@foodmate.com', {
      message: 'This email is reserved.',
    }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: FormData) => {
    const existingUsers: User[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    const emailExists = existingUsers.some((user: User) => user.email === data.email);
    if (emailExists) {
      alert('Email is already registered.');
      return;
    }

    const updatedUsers = [
      ...existingUsers,
      { ...data, role: 'user', status: 'online' },
    ];

    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify({ ...data, role: 'user', status: 'online' }));
    router.push('/dashboard');
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6">

      <Card className="w-full max-w-sm bg-white/30 backdrop-blur-md shadow-xl border-none outline-none ring-0">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register to FoodMate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name')} autoComplete="name" />
              {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register('email')} autoComplete="email" />
              {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password.message}</p>
              )}
            </div>

            <Button className="w-full" type="submit">
              Register
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            Already have an account?{' '}
            <a href="/foodmate/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

