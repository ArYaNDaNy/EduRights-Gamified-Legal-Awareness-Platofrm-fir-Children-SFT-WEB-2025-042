import React, { useState, useRef } from 'react';
import { X, ThumbsUp, ThumbsDown, Maximize, Minimize } from 'lucide-react';

export const VideoPlayerModal = ({ video, onClose }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef(null); // Reference to the video container

  if (!video) return null;

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  // 🖥️ FULL SCREEN LOGIC
  const toggleFullScreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await playerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-card w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-border flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* 1. Video Player Area with Ref */}
        <div 
          ref={playerRef} 
          className="aspect-video bg-black relative flex items-center justify-center group"
        >
          {/* Placeholder Content */}
          <div className="text-center">
            <div className="text-6xl mb-4">{video.thumbnail}</div>
            <p className="text-white/60">Video Player</p>
          </div>

          {/* Controls Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
             {/* Close Button (Only show if NOT fullscreen) */}
             {!isFullscreen && (
               <div className="flex justify-end">
                 <button onClick={onClose} className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full">
                   <X className="w-5 h-5" />
                 </button>
               </div>
             )}

             {/* Bottom Controls */}
             <div className="flex justify-end mt-auto">
                <button 
                  onClick={toggleFullScreen}
                  className="p-2 text-white hover:bg-white/20 rounded-md transition-colors"
                >
                  {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
                </button>
             </div>
          </div>
        </div>

        {/* 2. Info Bar (Hidden in fullscreen) */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{video.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {video.views} views • Uploaded 2 days ago
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-muted rounded-full p-1 border border-border">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${liked ? 'bg-primary text-primary-foreground' : 'hover:bg-background text-muted-foreground'}`}
                >
                  <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  <span className="text-sm font-medium">Like</span>
                </button>
                <div className="w-px h-6 bg-border mx-1"></div>
                <button 
                  onClick={handleDislike}
                  className={`px-4 py-2 rounded-full transition-colors ${disliked ? 'bg-destructive/10 text-destructive' : 'hover:bg-background text-muted-foreground'}`}
                >
                  <ThumbsDown className={`w-4 h-4 ${disliked ? 'fill-current' : ''}`} />
                </button>
              </div>
              {/* ❌ Share button removed as requested */}
            </div>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-xl text-sm text-foreground/80 leading-relaxed">
            <p>
              In this video, we explore the legal concepts behind <strong>{video.title}</strong>. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};