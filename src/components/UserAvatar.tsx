import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAppSelector } from '@/lib/hooks';

const UserAvatar = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const profileImage = currentUser?.photoURL ? currentUser.photoURL : undefined;

  return (
    <Avatar>
      <AvatarImage src={profileImage} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
