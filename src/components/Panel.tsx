import React from 'react';
import Image from 'next/image';

const Panel = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="relative w-96 h-96">
        <Image src="/chatting.svg" alt="Chatting" fill priority />
        <p className="text-center text-lg text-stone-600 tracking-wide">
          Let&apos;s chat with your assistant!
        </p>
      </div>
    </div>
  );
};

export default Panel;
