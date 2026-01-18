import React,{useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { VideoCard } from '@/components/explore/VideoCard'; // Import the shared component
import { ArrowLeft, BookOpen, Shield } from 'lucide-react';
import { VideoPlayerModal } from '@/components/explore/VideoPlayerModal';

// --- TEMPORARY DATA (Ideally this comes from a shared data file or API) ---
// We replicate it here just for the demo to work immediately
const allCategories = {
  rights: {
    title: 'Fundamental Rights 101',
    description: 'Learn about the core rights that protect every citizen.',
    icon: <BookOpen className="w-6 h-6 text-white" />,
    gradient: 'from-blue-500 to-cyan-500',
    videos: [
      { id: 101, title: 'Right to Equality Explained', duration: '5:20', views: '12k', thumbnail: '⚖️' },
      { id: 102, title: 'Freedom of Speech (Article 19)', duration: '8:45', views: '8.5k', thumbnail: '🗣️' },
      { id: 103, title: 'No More Child Labor', duration: '6:10', views: '15k', thumbnail: '🚫' },
      { id: 104, title: 'Understanding the Constitution', duration: '12:00', views: '22k', thumbnail: '📜' },
      // Added more videos to show the "Grid" effect
      { id: 105, title: 'Right to Life (Article 21)', duration: '4:20', views: '10k', thumbnail: '❤️' },
      { id: 106, title: 'Cultural & Educational Rights', duration: '7:30', views: '5k', thumbnail: '🏫' },
    ]
  },
  cyber: {
    title: 'Cyber Safety & Digital Laws',
    description: 'Stay safe online and understand digital laws.',
    icon: <Shield className="w-6 h-6 text-white" />,
    gradient: 'from-emerald-500 to-teal-500',
    videos: [
       { id: 201, title: 'Staying Safe Online', duration: '4:30', views: '5k', thumbnail: '🔒' },
       { id: 202, title: 'Report Cyber Crimes', duration: '7:15', views: '3k', thumbnail: '👮' },
       // ... add more if needed
    ]
  }
};

export default function CategoryView() {
  const { categoryId } = useParams(); // 👈 This grabs 'rights' or 'cyber' from the URL
  const navigate = useNavigate();

  const category = allCategories[categoryId];  
  const [selectedVideo, setSelectedVideo] = useState(null);
  // Handle case where category doesn't exist
  if (!category) {
    return (
        <DashboardLayout>
            <div className="p-8 text-center">
                <h2 className="text-xl">Category not found</h2>
                <button onClick={() => navigate('/explore')} className="text-primary mt-4">Go Back</button>
            </div>
        </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        {/* Back Button & Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/explore')} 
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </button>

          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{category.title}</h1>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </div>
        </div>

        {/* The Full Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.videos.map((video) => (
            // ✅ REUSING THE SAME COMPONENT
            <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} />
          ))}
        </div>
        {selectedVideo && (
          <VideoPlayerModal 
            video={selectedVideo} 
            onClose={() => setSelectedVideo(null)} 
          />
        )}
      </div>
    </DashboardLayout>
  );
}