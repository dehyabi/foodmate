'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Mock data fetch – Replace with actual API call
    const fetchUsers = async () => {
      const mockUsers: User[] = [
        { id: 1, name: 'Alice Johnson', email: 'alice@foodmate.com', role: 'user' },
        { id: 2, name: 'Bob Smith', email: 'bob@foodmate.com', role: 'user' },
        { id: 3, name: 'Admin User', email: 'admin@foodmate.com', role: 'admin' },
      ];
      setUsers(mockUsers);
    };

    fetchUsers();
  }, []);

  return (
    <main className="h-[100%] overflow-auto p-6 bg-white/30 backdrop-blur-md rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="bg-white/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-800">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

