import React from 'react';
import AIAvatar from '@/components/AIAvatar';
import { routes } from '@/constants/routes';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const SideMenu = () => {
  return (
    <div className="bg-stone-900 text-stone-200 h-full p-4 space-y-3">
      <div className="flex text-stone-300 items-center">
        <div className="mr-4">
          <AIAvatar />
        </div>
        <h1 className="text-2xl font-bold tracking-wider">Chat App</h1>
      </div>

      <div>
        {routes.map((route) => (
          <Link
            href={route.path}
            key={route.label}
            className="block p-3 text-xl font-medium tracking-wide text-stone-100/50 hover:text-stone-200 hover:bg-stone-100/10 transition rounded-sm"
          >
            <div className="flex items-center">
              <route.Icon className={cn('w-5 h-5 mr-2', route.iconColor)} />
              <p>{route.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div>settings</div>
    </div>
  );
};

export default SideMenu;
