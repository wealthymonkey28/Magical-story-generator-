import React from 'react';
import { Wand2 } from 'lucide-react';

const SplashScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500">
      <div className="text-center text-white animate-pulse">
        <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
          <Wand2 size={48} />
          The Little Wizard's Quill
        </h1>
        <p className="text-xl">Unleashing Magical Stories...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
