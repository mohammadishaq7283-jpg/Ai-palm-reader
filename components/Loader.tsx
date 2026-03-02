import React from 'react';

export default function Loader({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-mystic-500 rounded-full animate-pulse-slow opacity-50"></div>
        <div className="absolute inset-2 border-4 border-gold-500 rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🔮</span>
        </div>
      </div>
      <p className="text-mystic-100 font-medium animate-pulse">{text}</p>
    </div>
  );
}
