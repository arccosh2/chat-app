import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const AIAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="/ai-logo.svg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default AIAvatar;
