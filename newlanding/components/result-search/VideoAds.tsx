import React, { useEffect, useRef, useState } from 'react';

interface VideoAdsProps {
  videos: string[]; // Liste des URLs des vidéos
}

const VideoAds: React.FC<VideoAdsProps> = ({ videos }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let newIndex = 0;

      // Trouver l'index de la vidéo actuellement visible
      videoRefs.current.forEach((video, index) => {
        if (video) {
          const rect = video.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            newIndex = index;
          }
        }
      });

      if (newIndex !== currentVideoIndex) {
        // Mettre en pause la vidéo précédente
        if (videoRefs.current[currentVideoIndex]) {
          videoRefs.current[currentVideoIndex]?.pause();
        }
        // Lire la nouvelle vidéo
        if (videoRefs.current[newIndex]) {
          videoRefs.current[newIndex]?.play();
        }
        setCurrentVideoIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentVideoIndex]);

  return (
    <div className="flex flex-col space-y-4">
      {videos.map((video, index) => (
        <div key={index} className="w-full h-96 flex items-center justify-center">
          <video
            ref={(el: HTMLVideoElement | null) => {
              if (el) {
                videoRefs.current[index] = el;
              }
            }}
            src={video}
            className="w-full h-full object-cover rounded-md"
            muted
            loop
            controls
            playsInline
          />
        </div>
      ))}
    </div>
  );
};

export default VideoAds;