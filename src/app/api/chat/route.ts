import { db } from '@/lib/firebase/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';

export async function POST(request: Request, response: Response) {
  try {
    const { prompt, chatRoomId } = await request.json();

    // メッセージをfirestoreに保存
    await db.collection('chats').doc(chatRoomId).collection('messages').add({
      content: prompt,
      created_at: FieldValue.serverTimestamp(),
      sender: 'user',
      type: 'text',
    });

    return NextResponse.json({ message: 'success' });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
