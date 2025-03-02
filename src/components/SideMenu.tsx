import React from 'react';
import AIAvatar from '@/components/AIAvatar';

const SideMenu = () => {
  return (
    <div className="bg-stone-900 text-stone-200 h-full p-4">
      <div className="flex text-stone-300 items-center">
        <div className="mr-4">
          <AIAvatar />
        </div>
        <h1 className="text-xl font-bold tracking-wider">Chat App</h1>
      </div>
      <div>chat area</div>
      <div>settings</div>
    </div>
  );
};

export default SideMenu;
