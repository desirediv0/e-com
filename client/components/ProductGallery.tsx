"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

const ProductGallery = ({ images, alt }: ProductGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Move to next image
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  // Move to previous image
  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle mouse move when zoomed
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageContainerRef.current) return;

    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect();

    // Calculate position as percentage
    const x = Math.max(0, Math.min(1, (e.clientX - left) / width));
    const y = Math.max(0, Math.min(1, (e.clientY - top) / height));

    setZoomPosition({ x, y });
  };

  // Toggle zoom
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Generate placeholder image
  const generatePlaceholder = (index: number) => {
    const colors = [
      "bg-gray-100",
      "bg-gray-200",
      "bg-gray-300",
      "bg-blue-50",
      "bg-indigo-50",
    ];
    return (
      <div
        className={`${
          colors[index % colors.length]
        } w-full h-full flex items-center justify-center`}
      >
        <span className="text-gray-500 text-lg">Image {index + 1}</span>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <div
        ref={imageContainerRef}
        className="relative overflow-hidden aspect-square rounded-lg mb-4 bg-white"
        onMouseMove={handleMouseMove}
        onClick={toggleZoom}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative w-full h-full ${
              isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
          >
            {images[activeImageIndex] ? (
              <div className="w-full h-full relative">
                {isZoomed ? (
                  /* Zoomed view */
                  <div
                    className="absolute w-[200%] h-[200%] transition-transform duration-100"
                    style={{
                      transform: `translate(${-zoomPosition.x * 100}%, ${
                        -zoomPosition.y * 100
                      }%)`,
                    }}
                  >
                    <Image
                      src={images[activeImageIndex]}
                      alt={`${alt} - image ${activeImageIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                      priority={activeImageIndex === 0}
                    />
                  </div>
                ) : (
                  /* Normal view */
                  <Image
                    src={images[activeImageIndex]}
                    alt={`${alt} - image ${activeImageIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "contain" }}
                    priority={activeImageIndex === 0}
                  />
                )}
              </div>
            ) : (
              /* Placeholder */
              generatePlaceholder(activeImageIndex)
            )}
          </motion.div>
        </AnimatePresence>

        {/* Zoom indicator */}
        <motion.button
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
        >
          {isZoomed ? (
            <ZoomOut className="h-5 w-5 text-gray-700" />
          ) : (
            <ZoomIn className="h-5 w-5 text-gray-700" />
          )}
        </motion.button>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </motion.button>
            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </motion.button>
          </>
        )}

        {/* Image number indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {activeImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {images.map((image, index) => (
            <motion.button
              key={index}
              className={`w-20 h-20 rounded border-2 overflow-hidden flex-shrink-0
                ${
                  index === activeImageIndex
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"
                }`}
              onClick={() => setActiveImageIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {image ? (
                <Image
                  src={image}
                  alt={`${alt} - thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              ) : (
                generatePlaceholder(index)
              )}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
