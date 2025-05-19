'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface User {
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('registeredUsers');

    if (stored) {
      setUsers(JSON.parse(stored));
    } else {
      // fallback for first time if no registered users exist
      const defaultUsers: User[] = [
        {
          name: 'Admin User',
          email: 'admin@foodmate.com',
          role: 'admin',
          status: 'offline',
        },
        {
          name: 'Alice Johnson',
          email: 'alice@foodmate.com',
          role: 'user',
          status: 'offline',
        },
        {
          name: 'Bob Smith',
          email: 'bob@foodmate.com',
          role: 'user',
          status: 'offline',
        },
      ];
      localStorage.setItem('registeredUsers', JSON.stringify(defaultUsers));
      setUsers(defaultUsers);
    }
  }, []);

  return (
    <main className="h-[100%] overflow-auto p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <Card key={index} className="bg-white/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-800">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Status:</strong> {user.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

