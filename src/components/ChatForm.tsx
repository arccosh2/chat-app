'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Textarea } from './ui/textarea';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { z } from 'zod';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseClient';
import { useAppSelector } from '@/lib/hooks';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Props {
  chatRoomId?: string;
}

const ChatForm = ({ chatRoomId }: Props) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const formSchema = z.object({
    prompt: z.string().min(1, {
      message: 'Prompt is required',
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values.prompt);

    try {
      let chatRoomRef;
      let isNewChat = false;

      if (!chatRoomId) {
        const newChatDocRef = await addDoc(collection(db, 'chats'), {
          first_message: values.prompt,
          last_updated: serverTimestamp(),
          type: 'chat',
          user_id: currentUser?.uid,
        });

        chatRoomRef = doc(db, 'chats', newChatDocRef.id);
        isNewChat = true;
      } else {
        chatRoomRef = doc(db, 'chats', chatRoomId);
      }

      const response = await axios.post('/api/chat', {
        prompt: values.prompt,
        chatRoomId: chatRoomRef.id,
      });

      if (isNewChat) {
        router.push(`/chat/${chatRoomRef.id}`);
      } else {
        // すでにチャットルームがある場合は、last_updatedを更新
        await updateDoc(chatRoomRef, {
          last_updated: serverTimestamp(),
        });
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-2 items-center">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormControl>
                    <Textarea {...field} className="bg-stone-300 rows-1" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button>
              <Send />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChatForm;
