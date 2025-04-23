'use client';

import React, { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAppSelector } from '@/lib/hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { auth } from '@/lib/firebase/firebaseClient';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

const UserIcon = () => {
  const router = useRouter();

  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const profileImage = currentUser?.photoURL ?? undefined;

  const handleClick = () => {
    signOut(auth)
      .then(() => {
        router.push('/login');
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={profileImage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3">
        <DropdownMenuLabel>{currentUser?.displayName}</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleClick}>ログアウト</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserIcon;
