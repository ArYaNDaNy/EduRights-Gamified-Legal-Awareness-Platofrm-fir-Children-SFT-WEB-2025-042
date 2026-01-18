import React, { useState } from 'react';
import { X, ThumbsUp, ThumbsDown, Play } from 'lucide-react';

export const ShortsPlayerModal = ({ short, onClose }) => {
  const [liked, setLiked] = useState(false);

  if (!short) return null;

  return (
    // ✨ CHANGED: bg-black/80 + backdrop-blur-md creates the "Blur" effect
    <div 
      className="fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      
      {/* Close Button (Top Left) */}
      <button 
        onClick={onClose}
        className="absolute top-6 left-6 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all z-50 group border border-white/10"
      >
        <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Main Video Container 
          - Mobile: Full Screen
          - Desktop: Phone Shape
      */}
      <div 
        className="relative w-full h-full md:w-[450px] md:h-[95vh] md:rounded-3xl bg-gray-900 overflow-hidden shadow-2xl flex flex-col justify-center border border-white/10"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* Video Placeholder */}
        <div className={`absolute inset-0 bg-gradient-to-br ${short.color} flex items-center justify-center`}>
            {/* Pulsing Play Icon */}
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse">
                <Play className="w-10 h-10 text-white fill-white ml-2" />
            </div>
            
            {/* Scanlines Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20"></div>
        </div>

        {/* Top Shadow Gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />

        {/* --- RIGHT SIDE ACTIONS --- */}
        <div className="absolute bottom-24 right-4 flex flex-col gap-6 items-center z-20">
            {/* Profile Pic */}
            <div className="w-12 h-12 rounded-full border-2 border-white bg-yellow-500 mb-2 overflow-hidden shadow-lg">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${short.id}`} alt="User" className="w-full h-full" />
            </div>

            {/* Like */}
            <div className="flex flex-col items-center gap-1">
                <button 
                    onClick={() => setLiked(!liked)}
                    className={`p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all active:scale-90 ${liked ? 'text-red-500' : 'text-white'}`}
                >
                    <ThumbsUp className={`w-8 h-8 ${liked ? 'fill-current' : ''}`} />
                </button>
                <span className="text-white text-xs font-bold drop-shadow-md">{liked ? '1.3k' : '1.2k'}</span>
            </div>

            {/* Dislike */}
            <button className="p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white active:scale-90">
                <ThumbsDown className="w-8 h-8" />
            </button>
        </div>

        {/* --- BOTTOM INFO OVERLAY --- */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 bg-gradient-to-t from-black via-black/60 to-transparent text-white z-10">
            <div className="flex items-center gap-3 mb-3">
                <h3 className="font-bold text-base text-yellow-400">@EduRightsOfficial</h3>
            </div>
            
            <h2 className="text-lg font-bold leading-tight mb-2 pr-16">{short.title}</h2>
            
            <div className="flex flex-wrap gap-2 text-sm text-gray-300 font-medium">
                 <span className="bg-white/10 px-2 py-0.5 rounded">#LegalRights</span>
                 <span className="bg-white/10 px-2 py-0.5 rounded">#Education</span>
            </div>

            <div className="mt-4 flex items-center gap-2 opacity-80">
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center animate-spin-slow">
                   <span className="text-black text-[8px]">🎵</span>
                </div>
                <p className="text-xs truncate max-w-[200px]">Original Sound - Legal Awareness Campaign 2024</p>
            </div>
        </div>

      </div>
    </div>
  );
};