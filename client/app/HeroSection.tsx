"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  ChevronRight,
  ChevronLeft,
  ShoppingCart,
  Heart,
  Plus,
  ArrowUpRight,
} from "lucide-react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sliderRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track mouse position for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;

    const { left, top, width, height } =
      sliderRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    setMousePosition({ x, y });
  };

  // Play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Video autoplay failed:", err);
      });
    }
  }, []);

  // Auto rotate slides
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovering]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const slides = [
    {
      title: "Premium Quality Supplements",
      subtitle: "SPECIAL OFFER",
      description:
        "Scientifically formulated supplements for maximum results with pure, high-quality ingredients.",
      cta: "Shop Now",
      link: "/products/proteins",
      product: {
        name: "Premium Whey Protein",
        description: "Pure protein for maximum results",
        originalPrice: 2999,
        discountPrice: 2399,
        rating: 4.9,
        reviews: 125,
      },
      image: "/images/hero-1.jpg",
      accent: "bg-blue-600",
      accentText: "text-blue-600",
      accentLight: "bg-blue-100",
      gradientFrom: "from-blue-50",
      gradientTo: "to-blue-100",
      tag: "BEST SELLER",
    },
    {
      title: "Boost Your Performance",
      subtitle: "NEW ARRIVAL",
      description:
        "Advanced pre-workout formula to enhance energy, focus, and performance during training.",
      cta: "Explore",
      link: "/products/performance",
      product: {
        name: "Pre-Workout Complex",
        description: "Enhanced energy and focus",
        originalPrice: 1899,
        discountPrice: 1519,
        rating: 4.7,
        reviews: 98,
      },
      image: "/images/hero-2.jpg",
      accent: "bg-red-600",
      accentText: "text-red-600",
      accentLight: "bg-red-100",
      gradientFrom: "from-red-50",
      gradientTo: "to-red-100",
      tag: "TRENDING",
    },
    {
      title: "Scientifically Formulated",
      subtitle: "PREMIUM QUALITY",
      description:
        "Pure ingredients with no fillers, artificial colors or preservatives for optimal health benefits.",
      cta: "Learn More",
      link: "/about",
      product: {
        name: "BCAA 2:1:1 Formula",
        description: "Faster recovery and muscle growth",
        originalPrice: 1699,
        discountPrice: 1359,
        rating: 4.8,
        reviews: 112,
      },
      image: "/images/hero-3.jpg",
      accent: "bg-emerald-600",
      accentText: "text-emerald-600",
      accentLight: "bg-emerald-100",
      gradientFrom: "from-emerald-50",
      gradientTo: "to-emerald-100",
      tag: "POPULAR",
    },
  ];

  return (
    <section
      className="relative min-h-[85vh] overflow-hidden flex items-center"
      ref={sliderRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {/* Reduced opacity overlay */}
        <div className="absolute inset-0 bg-black/15 z-10"></div>

        {/* Reduced opacity gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-tr ${slides[currentSlide].gradientFrom} ${slides[currentSlide].gradientTo} z-20 opacity-30`}
          animate={{ opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        ></motion.div>

        {/* Improved video display */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: "brightness(1.1) contrast(1.1)" }}
        >
          <source src="/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Lighter transparent overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-0"></div>

      <div className="container mx-auto px-4 relative z-10 py-12 md:py-16">
        {/* Slides Progress Bar */}
        <div className="absolute left-4 top-4 h-1 bg-white/20 w-[calc(100%-2rem)]">
          <motion.div
            className={`h-full ${slides[currentSlide].accent}`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 6,
              ease: "linear",
              repeat: isHovering ? 0 : 1,
              repeatType: "reverse",
            }}
            key={currentSlide}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mt-6">
          {/* Text Content */}
          <div>
            <AnimatePresence mode="wait">
              {slides.map(
                (slide, index) =>
                  currentSlide === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <motion.div
                        className={`mb-8 rounded-full ${slide.accent} inline-flex px-1.5 py-1.5`}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="bg-white rounded-full px-5 py-1.5 flex items-center">
                          <motion.span
                            className="inline-block w-2 h-2 rounded-full mr-2"
                            animate={{
                              background: [
                                "rgb(239, 68, 68)", // red-500 color
                                "rgba(255,255,255,0.8)",
                                "rgb(239, 68, 68)",
                              ],
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <span className="font-semibold text-sm text-gray-900">
                            {slide.subtitle}
                          </span>
                        </div>
                      </motion.div>

                      <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {slide.title}
                      </motion.h1>

                      <motion.p
                        className="text-lg md:text-xl text-white/90 mb-8 max-w-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        {slide.description}
                      </motion.p>

                      <motion.div
                        className="flex flex-wrap gap-4 items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <Link
                          href={slide.link}
                          className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full ${slide.accent} text-white px-8 py-4 font-medium transition-all duration-300`}
                        >
                          <span className="relative z-10 flex items-center">
                            {slide.cta}
                            <motion.span
                              className="ml-2"
                              initial={{ x: 0 }}
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ArrowRight className="h-5 w-5" />
                            </motion.span>
                          </span>
                          <motion.span
                            className="absolute inset-0 bg-black bg-opacity-30"
                            initial={{ x: "100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.4 }}
                          />
                        </Link>

                        <Link
                          href="/products"
                          className="relative inline-flex items-center justify-center px-6 py-4 font-medium text-white transition-all duration-300 group"
                        >
                          <span className="flex items-center">
                            View All Products
                            <motion.div
                              className="ml-2 bg-white/20 backdrop-blur-sm p-1.5 rounded-full"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ArrowUpRight className="h-4 w-4" />
                            </motion.div>
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                        </Link>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex items-center mt-12 text-sm text-white/80"
                      >
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-current text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="ml-2">
                          Trusted by 10,000+ customers
                        </span>
                      </motion.div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          {/* Product Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {slides.map(
                (slide, index) =>
                  currentSlide === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                      style={{
                        transform: `perspective(1000px) rotateY(${
                          mousePosition.x * 8
                        }deg) rotateX(${-mousePosition.y * 8}deg)`,
                        transformStyle: "preserve-3d",
                        transition: isHovering
                          ? "none"
                          : "transform 0.5s ease-out",
                      }}
                    >
                      {/* Glass card */}
                      <div className="relative rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-1">
                        {/* Inner content with white background */}
                        <div className="bg-white rounded-xl p-6 shadow-inner relative">
                          {/* Decorative elements */}
                          <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white shadow-lg border-4 border-white flex items-center justify-center text-white z-10">
                            <div
                              className={`absolute inset-0 rounded-full ${slide.accent}`}
                            ></div>
                            <Plus
                              className="w-6 h-6 relative z-10"
                              strokeWidth={3}
                            />
                          </div>

                          {/* Top tag */}
                          <div className="absolute -top-3 left-6 z-10">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${slide.accent} shadow-md`}
                            >
                              <motion.span
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="mr-1.5 w-1.5 h-1.5 rounded-full bg-white"
                              />
                              {slide.tag}
                            </span>
                          </div>

                          {/* Main product info */}
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-6 mb-6">
                              {/* Product image with 3D effect */}
                              <div className="w-40 h-40 relative flex-shrink-0">
                                <motion.div
                                  className={`absolute inset-0 rounded-full bg-gradient-to-br from-white ${slide.gradientTo} shadow-lg`}
                                  style={{
                                    transformStyle: "preserve-3d",
                                    transform: `rotateY(${
                                      mousePosition.x * 15
                                    }deg) rotateX(${-mousePosition.y * 15}deg)`,
                                    boxShadow:
                                      "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <motion.div
                                    className="absolute inset-0 rounded-full overflow-hidden"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <div
                                      className={`absolute inset-0 rounded-full ${slide.accentLight} opacity-60`}
                                    ></div>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span
                                        className={`font-bold text-4xl ${slide.accentText}`}
                                      >
                                        {slide.product.name.charAt(0)}
                                      </span>
                                    </div>

                                    {/* Motion particles */}
                                    <motion.div
                                      className="absolute h-full w-full"
                                      animate={{ rotate: 360 }}
                                      transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear",
                                      }}
                                    >
                                      {[...Array(5)].map((_, i) => (
                                        <motion.div
                                          key={i}
                                          className={`absolute h-2 w-2 rounded-full ${slide.accent}`}
                                          style={{
                                            top: `${Math.random() * 100}%`,
                                            left: `${Math.random() * 100}%`,
                                            opacity: Math.random() * 0.5 + 0.2,
                                          }}
                                          animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.3, 0.6, 0.3],
                                          }}
                                          transition={{
                                            duration: 2 + Math.random() * 2,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            delay: Math.random() * 2,
                                          }}
                                        />
                                      ))}
                                    </motion.div>
                                  </motion.div>
                                </motion.div>

                                {/* Reflective surface */}
                                <motion.div
                                  className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-32 h-3 rounded-full bg-black/10 blur-sm"
                                  animate={{
                                    width: isHovering ? 30 : 32,
                                    opacity: isHovering ? 0.15 : 0.1,
                                  }}
                                />
                              </div>

                              <div className="flex-1">
                                <h3 className="font-bold text-xl mb-2 text-gray-900">
                                  {slide.product.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3">
                                  {slide.product.description}
                                </p>

                                <div className="flex mb-3">
                                  {[1, 2, 3, 4, 5].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(slide.product.rating)
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-xs text-gray-500 ml-2">
                                    ({slide.product.reviews})
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

                            {/* Price and button */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-gray-400 line-through text-sm">
                                  ₹{slide.product.originalPrice}
                                </span>
                                <div className="relative">
                                  <span className="text-gray-900 font-bold text-2xl">
                                    ₹{slide.product.discountPrice}
                                  </span>
                                  <motion.span
                                    className="absolute -right-14 -top-3 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-md font-medium"
                                    initial={{ rotate: -5 }}
                                    animate={{ rotate: [0, 5, 0] }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                    }}
                                  >
                                    SAVE{" "}
                                    {Math.round(
                                      (1 -
                                        slide.product.discountPrice /
                                          slide.product.originalPrice) *
                                        100
                                    )}
                                    %
                                  </motion.span>
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <motion.button
                                  className={`${slide.accent} text-white p-3 rounded-full shadow-md flex items-center justify-center`}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <ShoppingCart className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                  className="bg-gray-100 p-3 rounded-full shadow-md flex items-center justify-center text-gray-700"
                                  whileHover={{
                                    scale: 1.1,
                                    backgroundColor: "#f9f9f9",
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Heart className="h-5 w-5" />
                                </motion.button>
                              </div>
                            </div>
                          </div>

                          {/* Bottom features */}
                          <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
                            <div className="flex items-center justify-center rounded-lg border border-gray-100 py-2 bg-gray-50 text-gray-700">
                              <span>Free Shipping</span>
                            </div>
                            <div className="flex items-center justify-center rounded-lg border border-gray-100 py-2 bg-gray-50 text-gray-700">
                              <span>No Fillers</span>
                            </div>
                            <div className="flex items-center justify-center rounded-lg border border-gray-100 py-2 bg-gray-50 text-gray-700">
                              <span>100% Pure</span>
                            </div>
                          </div>

                          {/* Radial glow effect */}
                          <div
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: isHovering
                                ? `radial-gradient(circle at ${
                                    50 + mousePosition.x * 50
                                  }% ${
                                    50 + mousePosition.y * 50
                                  }%, rgba(255,255,255,0.8), transparent)`
                                : "none",
                            }}
                          />
                        </div>
                      </div>

                      {/* Floating abstract elements - outside the card */}
                      <motion.div
                        className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full ${slide.accent} opacity-20 blur-xl`}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                      <motion.div
                        className={`absolute -top-10 -left-10 w-24 h-24 rounded-full ${slide.accent} opacity-20 blur-xl`}
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: 1,
                        }}
                      />
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between">
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="group relative"
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? `${slides[index].accent}`
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
                {currentSlide === index && (
                  <motion.span
                    className="absolute -inset-1 rounded-full border-2 border-white/50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  />
                )}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/80 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                  {slides[index].subtitle}
                </span>
              </button>
            ))}
          </div>

          <div className="flex space-x-2">
            <motion.button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30 hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30 hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
