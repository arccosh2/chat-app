'use client';

import { Button } from '@/components/ui/button';
import { fetchCurrentUser } from '@/lib/features/auth/authSlice';
import { auth, provider } from '@/lib/firebase/firebaseClient';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        router.push('/chat');
        dispatch(fetchCurrentUser());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!currentUser) return;

    router.push('/chat');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return <Button onClick={handleClick}>login</Button>;
};

export default LoginPage;
