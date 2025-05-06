import React from 'react';
import ChatMessages from './ChatMessages';
import ChatForm from './ChatForm';

interface ChatRoomProps {
  chatRoomId?: string;
}

const ChatRoom = ({ chatRoomId }: ChatRoomProps) => {
  return (
    <>
      <ChatMessages chatRoomId={chatRoomId} />
      <ChatForm chatRoomId={chatRoomId} />
    </>
  );
};

export default ChatRoom;
