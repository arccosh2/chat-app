import React from 'react';
import MobileSideMenu from './MobileSideMenu';

const Navigation = () => {
  return (
    <div className="flex items-center p-4">
      <MobileSideMenu />

      <div className="w-full flex justify-end">UserIcon</div>
    </div>
  );
};

export default Navigation;
