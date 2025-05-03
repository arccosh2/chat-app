'use client';

import React, { useEffect, useState } from 'react';
import AIAvatar from '@/components/AIAvatar';
import { menus } from '@/constants/menus';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Ellipsis } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseClient';
import { useAppSelector } from '@/lib/hooks';

type ChatType = 'chat';

interface ChatRoom {
  id: string;
  user_id: string;
  type: ChatType;
  first_message: string;
  last_updated: Timestamp;
}

const SideMenu = () => {
  const pathName = usePathname();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'chats'),
      where('user_id', '==', currentUser?.uid),
      orderBy('last_updated', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchChatRooms = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        user_id: doc.data().user_id,
        type: doc.data().type,
        first_message: doc.data().first_message,
        last_updated: doc.data().last_updated,
      }));

      setChatRooms(fetchChatRooms);
    });

    return () => unsubscribe();
  }, [currentUser?.uid]);

  return (
    <div className="bg-stone-900 text-stone-200 h-full p-4 space-y-3 flex flex-col">
      <Link href="/" className="flex text-stone-300 items-center py-2">
        <div className="mr-4">
          <AIAvatar />
        </div>
        <h1 className="text-2xl font-bold tracking-wider">Chat App</h1>
      </Link>

      <div>
        {menus.map((menu) => (
          <Link
            href={menu.path}
            key={menu.label}
            className={cn(
              'block p-3 text-xl font-medium tracking-wide text-stone-200 hover:bg-stone-100/10 transition rounded-sm',
              pathName.startsWith(menu.path) && 'bg-stone-100/10'
            )}
          >
            <div className="flex items-center">
              <menu.Icon className={cn('w-5 h-5 mr-2', 'text-yellow-600')} />
              <p>{menu.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-1 flex-col overflow-hidden space-y-1">
        <h2 className="text-xl font-bold px-2 py-3">Threads</h2>
        <div className="overflow-auto">
          {chatRooms.map((chatRoom) => (
            <Link
              key={chatRoom.id}
              href={`/${chatRoom.type}/${chatRoom.id}`}
              className={cn(
                'block py-2 px-4  text-xl font-medium tracking-wide text-stone-200 hover:bg-stone-100/10 transition rounded-sm',
                pathName === `/${chatRoom.type}/${chatRoom.id}` &&
                  'bg-stone-100/10'
              )}
            >
              <div className="flex items-center justify-between">
                <p className="truncate">{chatRoom.first_message}</p>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>削除</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>settings</div>
    </div>
  );
};

export default SideMenu;
