import React from 'react';
import { Play, Eye, Clock } from 'lucide-react';

export const VideoCard = ({ video , onClick}) => (
  <div 
  onClick={onClick}
  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer flex flex-col h-full">
    {/* Thumbnail */}
    <div className="h-40 bg-muted relative flex items-center justify-center text-4xl group-hover:bg-muted/80 transition-colors">
      {video.thumbnail}
      <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
        {video.duration}
      </span>
      {/* Play Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
          <Play className="w-5 h-5 text-primary fill-primary ml-1" />
        </div>
      </div>
    </div>
    
    {/* Content */}
    <div className="p-3 flex flex-col flex-grow">
      <h3 className="font-semibold text-foreground line-clamp-2 leading-tight mb-2 group-hover:text-primary transition-colors">
        {video.title}
      </h3>
      <div className="mt-auto flex items-center text-xs text-muted-foreground gap-3">
        <span className="flex items-center gap-1">
          <Eye className="w-3 h-3" /> {video.views}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> {video.uploaded || '2 days ago'}
        </span>
      </div>
    </div>
  </div>
);