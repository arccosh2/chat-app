'use client';

import React from 'react';
import AIAvatar from '@/components/AIAvatar';
import { routes } from '@/constants/routes';
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

const SideMenu = () => {
  const pathName = usePathname();

  return (
    <div className="bg-stone-900 text-stone-200 h-full p-4 space-y-3 flex flex-col">
      <Link href="/" className="flex text-stone-300 items-center py-2">
        <div className="mr-4">
          <AIAvatar />
        </div>
        <h1 className="text-2xl font-bold tracking-wider">Chat App</h1>
      </Link>

      <div>
        {routes.map((route) => (
          <Link
            href={route.path}
            key={route.label}
            className={cn(
              'block p-3 text-xl font-medium tracking-wide text-stone-200 hover:bg-stone-100/10 transition rounded-sm',
              pathName.startsWith(route.path) && 'bg-stone-100/10'
            )}
          >
            <div className="flex items-center">
              <route.Icon className={cn('w-5 h-5 mr-2', 'text-yellow-600')} />
              <p>{route.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-1 flex-col overflow-hidden space-y-1">
        <h2 className="text-xl font-bold px-2 py-3">Threads</h2>
        <div className="overflow-auto">
          <Link
            href={'#'}
            className={cn(
              'block p-4 text-xl font-medium tracking-wide text-stone-200 hover:bg-stone-100/10 transition rounded-sm'
            )}
          >
            <div className="flex items-center justify-between">
              <p className="truncate">Message</p>
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
        </div>
      </div>

      <div>settings</div>
    </div>
  );
};

export default SideMenu;
