import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const STORAGE_PATH = path.join(process.cwd(), 'grpc-server/mock/orders.json');

export async function GET() {
  try {
    const data = await fs.readFile(STORAGE_PATH, 'utf-8');
    const orders = JSON.parse(data);
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error('Failed to load orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

