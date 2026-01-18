import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Play, Clock, Eye, ChevronRight, Zap, BookOpen, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VideoCard } from '@/components/explore/VideoCard';
import { VideoPlayerModal } from '@/components/explore/VideoPlayerModal';
import { ShortsPlayerModal } from '@/components/explore/ShortsPlayerModal';
// --- DUMMY DATA (We will fetch this from DB later) ---
const shortsData = [
  { id: 1, title: 'What is Article 21?', views: '1.2k', color: 'from-pink-500 to-rose-500' },
  { id: 2, title: 'Stop Cyberbullying!', views: '3.4k', color: 'from-purple-500 to-indigo-500' },
  { id: 3, title: 'Right to Education 📚', views: '5k', color: 'from-yellow-400 to-orange-500' },
  { id: 4, title: 'Child Helpline 1098', views: '900', color: 'from-green-400 to-emerald-500' },
  { id: 5, title: 'Be Internet Awesome', views: '2.1k', color: 'from-blue-400 to-cyan-500' },
];

const videoCategories = [
  {
    id: 'rights',
    title: 'Fundamental Rights 101',
    icon: <BookOpen className="w-5 h-5 text-white" />,
    gradient: 'from-blue-500 to-cyan-500',
    videos: [
      { id: 101, title: 'Right to Equality Explained', duration: '5:20', views: '12k', thumbnail: '⚖️' },
      { id: 102, title: 'Freedom of Speech (Article 19)', duration: '8:45', views: '8.5k', thumbnail: '🗣️' },
      { id: 103, title: 'No More Child Labor', duration: '6:10', views: '15k', thumbnail: '🚫' },
      { id: 104, title: 'Understanding the Constitution', duration: '12:00', views: '22k', thumbnail: '📜' },
    ]
  },
  {
    id: 'cyber',
    title: 'Cyber Safety & Digital Laws',
    icon: <Shield className="w-5 h-5 text-white" />,
    gradient: 'from-emerald-500 to-teal-500',
    videos: [
      { id: 201, title: 'Staying Safe Online', duration: '4:30', views: '5k', thumbnail: '🔒' },
      { id: 202, title: 'Report Cyber Crimes', duration: '7:15', views: '3k', thumbnail: '👮' },
      { id: 203, title: 'What is Data Privacy?', duration: '9:00', views: '10k', thumbnail: '💾' },
      { id: 204, title: 'Gaming Safely', duration: '5:45', views: '18k', thumbnail: '🎮' },
    ]
  }
];

// --- COMPONENTS ---

// 1. Shorts Card (Vertical)
const ShortsCard = ({ item ,onClick }) => (
  <div 
  onClick={onClick}
  className="min-w-[160px] h-[280px] rounded-xl relative overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all hover:scale-105">
    {/* Background Placeholder (Video Thumbnail) */}
    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
    
    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent">
      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
        <Play className="w-4 h-4 text-white fill-white" />
      </div>
      <h3 className="text-white font-bold text-sm leading-tight mb-1">{item.title}</h3>
      <p className="text-white/70 text-xs flex items-center gap-1">
        <Eye className="w-3 h-3" /> {item.views}
      </p>
    </div>
  </div>
);



// --- MAIN PAGE ---
export default function Explore() {
  const navigate = useNavigate();
const [selectedVideo, setSelectedVideo] = useState(null);
const [selectedShort, setSelectedShort] = useState(null);
  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in space-y-10">
        
        {/* Page Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg">
            <Play className="w-6 h-6 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Explore & Learn</h1>
            <p className="text-muted-foreground">Watch quick bites or deep dive into legal topics.</p>
          </div>
        </div>

        {/* SECTION 1: Shorts / Quick Bites */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-bold text-foreground">Quick Bites</h2>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {shortsData.map((short) => (
              <ShortsCard key={short.id} item={short} onClick={() => setSelectedShort(short)} />
            ))}
          </div>
        </div>

        {/* SECTION 2: Dynamic Categories (Twitch/YouTube Style) */}
        <div className="space-y-12">
          {videoCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-md`}>
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                </div>
                
                <button 
                  onClick={() => navigate(`/explore/${category.id}`)}
                  className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Show All <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Videos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.videos.map((video) => (
                  <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} />
                ))}
                
              </div>
            </div>
          ))}
        </div>
       
        
        
      </div>
      {selectedVideo && (
          <VideoPlayerModal 
            video={selectedVideo} 
            onClose={() => setSelectedVideo(null)} 
          />
        )}
      {selectedShort && (
          <ShortsPlayerModal 
            short={selectedShort} 
            onClose={() => setSelectedShort(null)} 
          />
        )}
    </DashboardLayout>
  );
}