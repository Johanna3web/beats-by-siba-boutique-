import { useState, useRef, useCallback } from "react";
import { Play } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
  video?: string;
}

const ProductGallery = ({ images, name, video }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalSlides = images.length + (video ? 1 : 0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && activeIndex < totalSlides - 1) {
          setActiveIndex((i) => i + 1);
          if (activeIndex + 1 === images.length && video) setShowVideo(true);
          else setShowVideo(false);
        } else if (diff < 0 && activeIndex > 0) {
          setActiveIndex((i) => i - 1);
          setShowVideo(false);
        }
      }
    },
    [activeIndex, totalSlides, images.length, video]
  );

  const selectSlide = (index: number) => {
    setActiveIndex(index);
    setShowVideo(index === images.length && !!video);
  };

  const isVideoSlide = showVideo && activeIndex === images.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Main image / video */}
      <div
        className="aspect-[3/4] overflow-hidden bg-secondary relative cursor-grab"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {isVideoSlide ? (
          <video
            src={video}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={images[activeIndex]}
            alt={`${name} - view ${activeIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        )}
        {/* Dot indicators on mobile */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => selectSlide(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === activeIndex ? "bg-gold" : "bg-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => selectSlide(i)}
            className={`aspect-square overflow-hidden border-2 transition-colors ${
              i === activeIndex && !showVideo ? "border-gold" : "border-transparent hover:border-muted-foreground/30"
            }`}
          >
            <img
              src={img}
              alt={`${name} - thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
        {video && (
          <button
            onClick={() => selectSlide(images.length)}
            className={`aspect-square overflow-hidden border-2 transition-colors relative bg-secondary ${
              showVideo ? "border-gold" : "border-transparent hover:border-muted-foreground/30"
            }`}
          >
            <video src={video} className="w-full h-full object-cover" muted />
            <div className="absolute inset-0 flex items-center justify-center bg-primary/30">
              <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
