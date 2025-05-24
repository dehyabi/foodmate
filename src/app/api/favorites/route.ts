import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const STORAGE_PATH = path.join(process.cwd(), 'grpc-server/mock/favorites.json');

export async function GET() {
  try {
    const data = await fs.readFile(STORAGE_PATH, 'utf-8');
    const favorites = JSON.parse(data);
    return NextResponse.json(favorites);
  } catch (error: any) {
    console.error('Failed to load favorites:', error);
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
  }
}

