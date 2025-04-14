"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Star, Heart } from "lucide-react";

const FeaturedProductsSection = () => {
  const products = [
    {
      id: 1,
      name: "Premium Whey Protein",
      category: "Proteins",
      price: 2399,
      rating: 4.9,
      reviews: 120,
      image: "/images/products/whey-protein.jpg",
      tag: "Best Seller",
    },
    {
      id: 2,
      name: "Creatine Monohydrate",
      category: "Performance",
      price: 1299,
      rating: 4.8,
      reviews: 98,
      image: "/images/products/creatine.jpg",
      tag: "Popular",
    },
    {
      id: 3,
      name: "BCAA 2:1:1 Formula",
      category: "Performance",
      price: 1199,
      rating: 4.7,
      reviews: 85,
      image: "/images/products/bcaa.jpg",
      tag: "Top Rated",
    },
    {
      id: 4,
      name: "Daily Multivitamin",
      category: "Vitamins",
      price: 899,
      rating: 4.8,
      reviews: 112,
      image: "/images/products/multivitamin.jpg",
      tag: "Essential",
    },
    {
      id: 5,
      name: "Omega-3 Fish Oil",
      category: "Wellness",
      price: 799,
      rating: 4.6,
      reviews: 76,
      image: "/images/products/omega.jpg",
      tag: "",
    },
    {
      id: 6,
      name: "Pre-Workout Complex",
      category: "Performance",
      price: 1499,
      rating: 4.7,
      reviews: 94,
      image: "/images/products/pre-workout.jpg",
      tag: "Energy",
    },
    {
      id: 7,
      name: "Plant Protein",
      category: "Proteins",
      price: 1999,
      rating: 4.5,
      reviews: 68,
      image: "/images/products/plant-protein.jpg",
      tag: "Vegan",
    },
    {
      id: 8,
      name: "ZMA Sleep Support",
      category: "Wellness",
      price: 999,
      rating: 4.6,
      reviews: 72,
      image: "/images/products/zma.jpg",
      tag: "Recovery",
    },
  ];

  const categories = ["All", "Proteins", "Performance", "Vitamins", "Wellness"];

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
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Featured Products
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-8">
            Discover our top-rated supplements, designed to help you reach your
            health and fitness goals
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group"
            >
              <div className="relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                {product.tag && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="inline-block px-2 py-1 bg-black text-white text-xs font-semibold rounded">
                      {product.tag}
                    </span>
                  </div>
                )}
                <div className="w-32 h-32 flex items-center justify-center">
                  <div className="text-center text-gray-400 text-xs">
                    Product Image
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <button className="bg-white rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link
                    href={`/products/${product.id}`}
                    className="bg-white rounded-full p-2 shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform mx-1"
                  >
                    <ShoppingCart className="h-4 w-4 text-gray-700" />
                  </Link>
                </div>
              </div>

              <div className="p-4">
                <div className="text-xs text-gray-500 mb-1">
                  {product.category}
                </div>
                <Link href={`/products/${product.id}`} className="block">
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-black transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating) ? "fill-current" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">
                    ({product.reviews})
                  </span>
                </div>
                <div className="font-bold text-black">₹{product.price}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-black rounded-md hover:bg-gray-800"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
