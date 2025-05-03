'use client';
import React, { useEffect, useState } from 'react';
import AIAvatar from './AIAvatar';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseClient';
import UserAvatar from './UserAvatar';
import Panel from './Panel';

interface ChatMessagesProps {
  chatRoomId?: string;
}

type Sender = 'user' | 'assistant';

interface Message {
  id: string;
  content: string;
  type: string;
  created_at: Timestamp;
  sender: Sender;
}

const ChatMessages = ({ chatRoomId }: ChatMessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!chatRoomId) return;

    const q = query(
      collection(db, 'chats', chatRoomId, 'messages'),
      orderBy('created_at', 'asc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        content: doc.data().content,
        type: doc.data().type,
        created_at: doc.data().created_at,
        sender: doc.data().sender,
      }));

      setMessages(fetchMessages);
    });

    return () => unsubscribe();
  }, [chatRoomId]);

  if (!chatRoomId) return <Panel />;

  return (
    <div className="flex-1 p-6 space-y-4 overflow-auto">
      {messages.map((message) => (
        <div key={message.id} className="flex gap-4">
          {message.sender === 'user' ? <UserAvatar /> : <AIAvatar />}

          <div>
            <div className="bg-stone-100 rounded-xl p-4 shadow-md break-all whitespace-pre-wrap">
              <p>{message.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
