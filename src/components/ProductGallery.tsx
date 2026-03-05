import { useState, useRef, useCallback } from "react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && activeIndex < images.length - 1) {
          setActiveIndex((i) => i + 1);
        } else if (diff < 0 && activeIndex > 0) {
          setActiveIndex((i) => i - 1);
        }
      }
    },
    [activeIndex, images.length]
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        className="aspect-[3/4] overflow-hidden bg-secondary relative cursor-grab"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[activeIndex]}
          alt={`${name} - view ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        {/* Dot indicators on mobile */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
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
            onClick={() => setActiveIndex(i)}
            className={`aspect-square overflow-hidden border-2 transition-colors ${
              i === activeIndex ? "border-gold" : "border-transparent hover:border-muted-foreground/30"
            }`}
          >
            <img
              src={img}
              alt={`${name} - thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
