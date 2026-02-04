
import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950">
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-purple-900 opacity-20"></div>
        {/* Spinning Gradient Ring */}
        <div className="absolute inset-0 rounded-full border-t-4 border-indigo-500 animate-spin"></div>
        {/* Inner Pulsing Core */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 animate-pulse flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          <span className="text-white font-bold text-xl font-orbitron">N</span>
        </div>
      </div>
      <div className="mt-8 text-center">
        <h1 className="text-2xl font-orbitron font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
          NeuralPhone
        </h1>
        <p className="text-slate-400 text-sm tracking-widest mt-2">INITIALIZING FUTURE...</p>
      </div>
    </div>
  );
};

export default Preloader;
