"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const DealSection = () => {
  const deals = [
    {
      id: 1,
      name: "Premium Whey Protein",
      originalPrice: 2999,
      discountedPrice: 2399,
      image: "/images/products/whey-protein.jpg",
      rating: 4.9,
      reviews: 120,
      badge: "BEST SELLER",
    },
    {
      id: 2,
      name: "Pre-Workout Energy Booster",
      originalPrice: 1899,
      discountedPrice: 1519,
      image: "/images/products/pre-workout.jpg",
      rating: 4.7,
      reviews: 84,
      badge: "20% OFF",
    },
    {
      id: 3,
      name: "BCAA Recovery Formula",
      originalPrice: 1499,
      discountedPrice: 1199,
      image: "/images/products/bcaa.jpg",
      rating: 4.8,
      reviews: 96,
      badge: "POPULAR",
    },
    {
      id: 4,
      name: "Plant Protein Complex",
      originalPrice: 2499,
      discountedPrice: 1999,
      image: "/images/products/plant-protein.jpg",
      rating: 4.6,
      reviews: 72,
      badge: "20% OFF",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 mb-3">
            SPECIAL OFFER
          </span>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Deals For You
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Limited time offer - Save 20% on all protein supplements this week
          </p>
        </motion.div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {deals.map((deal, index) => (
                <CarouselItem
                  key={deal.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group h-full"
                  >
                    <div className="relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="inline-block px-2 py-1 bg-black text-white text-xs font-semibold rounded">
                          {deal.badge}
                        </span>
                      </div>
                      <div className="w-32 h-32 flex items-center justify-center">
                        <div className="text-center text-gray-400 text-xs">
                          Product Image
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white rounded-full p-2 shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <ShoppingCart className="h-5 w-5 text-gray-700" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <Link href={`/products/${deal.id}`} className="block">
                        <h3 className="font-medium text-gray-900 mb-1 group-hover:text-black transition-colors">
                          {deal.name}
                        </h3>
                      </Link>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400 mr-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(deal.rating)
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          ({deal.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-gray-400 line-through text-sm mr-2">
                            ₹{deal.originalPrice}
                          </span>
                          <span className="font-bold text-black">
                            ₹{deal.discountedPrice}
                          </span>
                        </div>
                        <span className="text-green-600 text-xs font-medium">
                          20% Off
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2">
              <CarouselNext className="bg-white shadow border border-gray-200" />
            </div>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2">
              <CarouselPrevious className="bg-white shadow border border-gray-200" />
            </div>
          </Carousel>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center text-black font-medium hover:text-gray-700 transition-colors"
          >
            View All Products <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DealSection;
