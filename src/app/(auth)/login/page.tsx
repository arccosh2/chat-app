'use client';

import { Button } from '@/components/ui/button';
import { auth, provider } from '@/lib/firebase/firebaseClient';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React from 'react';

const LoginPage = () => {
  const router = useRouter();

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        router.push('/chat');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return <Button onClick={handleClick}>login</Button>;
};

export default LoginPage;
