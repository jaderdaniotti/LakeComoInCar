import { NextResponse } from 'next/server';
import { keepSupabaseAlive } from '@/src/lib/db/keepAlive';

export async function GET() {
  await keepSupabaseAlive();

  // 204: no content, avoids any output to the user/browser UI.
  return new NextResponse(null, { status: 204 });
}

