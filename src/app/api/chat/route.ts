import { NextResponse } from 'next/server';

export async function POST(request: Request, response: Response) {
  const { prompt } = await request.json();
  console.log(prompt);
  return NextResponse.json({ message: 'success' });
}
