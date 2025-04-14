"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Rahul Sharma",
      location: "Delhi",
      image: "/images/testimonials/1.jpg",
      rating: 5,
      text: "I've tried many protein supplements over the years, but VitaBoost's Premium Whey is by far the best. Great taste, mixes well, and I've seen significant improvement in my recovery time.",
      product: "Premium Whey Protein",
    },
    {
      name: "Priya Patel",
      location: "Mumbai",
      image: "/images/testimonials/2.jpg",
      rating: 5,
      text: "As a fitness instructor, I'm very particular about the supplements I recommend. VitaBoost's quality is unmatched. My clients and I have experienced great results with their products.",
      product: "BCAA Recovery Formula",
    },
    {
      name: "Amit Singh",
      location: "Bangalore",
      image: "/images/testimonials/3.jpg",
      rating: 4,
      text: "The Pre-Workout Complex gives me the perfect energy boost for my morning workouts without any jitters or crash. Clean ingredients and great value for money.",
      product: "Pre-Workout Complex",
    },
    {
      name: "Kavita Desai",
      location: "Pune",
      image: "/images/testimonials/4.jpg",
      rating: 5,
      text: "I switched to VitaBoost's Plant Protein after trying several other brands. It tastes amazing and doesn't have that chalky texture. Plus, it's easy on my sensitive stomach.",
      product: "Plant Protein",
    },
  ];

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            What Our Customers Say
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Don't just take our word for it. Here's what people who use our
            products have to say.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8 relative"
        >
          <div className="bg-gray-50 rounded-xl p-8 md:p-12 shadow-sm">
            <div className="absolute -top-4 -left-2 md:-left-4 text-black/10">
              <Quote className="h-16 w-16" />
            </div>

            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 ${
                    activeIndex === index ? "block" : "hidden"
                  }`}
                >
                  <div className="text-gray-700 mb-6 text-lg italic">
                    "{testimonial.text}"
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                        <span className="text-gray-500 font-medium">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center">
                          <span>{testimonial.location}</span>
                          <span className="hidden sm:inline mx-1">•</span>
                          <span>{testimonial.product}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeIndex === index ? "bg-black" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">4.8/5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">10,000+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">96%</div>
            <div className="text-sm text-gray-600">Recommend Us</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">5,000+</div>
            <div className="text-sm text-gray-600">Verified Reviews</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
