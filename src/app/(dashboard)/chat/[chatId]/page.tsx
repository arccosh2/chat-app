'use client';
import ChatRoom from '@/components/ChatRoom';
import React from 'react';

interface Props {
  params: Promise<{
    chatId: string;
  }>;
}

const ChatRoomPage = ({ params }: Props) => {
  const { chatId } = React.use(params);
  return <ChatRoom chatRoomId={chatId} />;
};

export default ChatRoomPage;
