import React from 'react';
import MobileSideMenu from './MobileSideMenu';
import UserIcon from './UserIcon';

const Navigation = () => {
  return (
    <div className="flex items-center p-5">
      <MobileSideMenu />

      <div className="w-full flex justify-end">
        <UserIcon />
      </div>
    </div>
  );
};

export default Navigation;
