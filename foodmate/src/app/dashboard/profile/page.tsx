'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export default function UserProfilePage() {
  const [user, setUser] = useState<{ email: string; name: string; password: string } | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setFormData({ name: parsed.name || '', email: parsed.email, password: parsed.password || '' });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = () => {
    setUser(formData);
    localStorage.setItem('user', JSON.stringify(formData));

    const allUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const updated = allUsers.map((u: any) =>
      u.email === user?.email ? { ...u, ...formData } : u
    );
    localStorage.setItem('registeredUsers', JSON.stringify(updated));

    setEditing(false);
  };

  if (!user) return null;

  return (
    <main className="h-full p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <User />
        My Profile
      </h1>

      <Card className="bg-white/30 backdrop-blur-md max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editing}
	      className="border border-gray-400"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="border border-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
	      className="border border-gray-400"
              disabled={!editing}
              placeholder="••••••••"
            />
          </div>

          {editing ? (
            <Button onClick={handleUpdate} className="w-full">
              Save Changes
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setEditing(true)} className="w-full">
              Edit Profile
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

