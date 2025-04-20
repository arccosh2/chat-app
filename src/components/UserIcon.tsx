'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAppSelector } from '@/lib/hooks';

const UserIcon = () => {
  const photoURL = useAppSelector((state) => state.auth.currentUser?.photoURL);
  const profileImage = photoURL ?? undefined;

  return (
    <Avatar>
      <AvatarImage src={profileImage} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserIcon;
