"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingCart, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductById, Product } from "@/data/products";
import Image from "next/image";

interface WishlistItem {
  id: number;
  productId: number;
  dateAdded: string;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const router = useRouter();

  // Mock fetch wishlist data
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated && !isLoading) {
      router.push("/login?redirect=/wishlist");
      return;
    }

    const fetchWishlist = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockWishlist: WishlistItem[] = [
          { id: 1, productId: 1, dateAdded: "2023-12-01T10:30:00Z" },
          { id: 2, productId: 3, dateAdded: "2023-12-05T15:45:00Z" },
          { id: 3, productId: 5, dateAdded: "2023-12-10T09:15:00Z" },
        ];

        setWishlistItems(mockWishlist);
        const productsData = mockWishlist
          .map((item) => {
            const product = getProductById(item.productId);
            return product as Product;
          })
          .filter(Boolean);

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router, isLoading]);

  const handleRemoveFromWishlist = (wishlistItemId: number) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== wishlistItemId)
    );
    setProducts((prevProducts) =>
      prevProducts.filter(
        (product) =>
          !wishlistItems.find(
            (item) =>
              item.id === wishlistItemId && item.productId === product.id
          )
      )
    );
  };

  const handleAddToCart = (product: Product) => {
    const selectedSize = product.sizes[0];
    const selectedFlavor =
      product.flavors.find((f) => f.isAvailable) || product.flavors[0];

    addItem(product, 1, selectedSize, selectedFlavor);

    const wishlistItem = wishlistItems.find(
      (item) => item.productId === product.id
    );
    if (wishlistItem) {
      handleRemoveFromWishlist(wishlistItem.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (!isAuthenticated && !isLoading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Sign In to View Your Wishlist
          </h1>
          <p className="text-gray-600 mb-8">
            Please sign in to view and manage your wishlist items.
          </p>
          <Button
            onClick={() => router.push("/login?redirect=/wishlist")}
            className="w-full"
          >
            Sign In
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-black hover:text-gray-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="mt-2 text-gray-600">
            {products.length > 0
              ? `You have ${products.length} ${
                  products.length === 1 ? "product" : "products"
                } in your wishlist`
              : "Your wishlist is empty"}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : products.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product) => {
              const wishlistItem = wishlistItems.find(
                (item) => item.productId === product.id
              );
              return (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <div className="relative">
                    <div className="h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          width={100}
                          height={100}
                          src={product.images[0].src}
                          alt={product.images[0].alt || product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <p>No Image Available</p>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() =>
                          wishlistItem &&
                          handleRemoveFromWishlist(wishlistItem.id)
                        }
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="h-5 w-5 text-black" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col">
                    <div className="mb-4">
                      <Link
                        href={`/products/${product.slug}`}
                        className="hover:text-gray-700"
                      >
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex items-center mr-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? "text-black"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 15.585l-6.172 3.245 1.179-6.874-5-4.867 6.9-1.002L10 0l3.093 6.087 6.9 1.002-5 4.867 1.179 6.874z"
                                />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            ({product.reviewCount})
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Added on{" "}
                          {formatDate(
                            wishlistItem?.dateAdded || new Date().toISOString()
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 flex-grow">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description.length > 120
                          ? product.description.substring(0, 120) + "..."
                          : product.description}
                      </p>
                    </div>

                    <div className="flex items-end justify-between mt-auto">
                      <div className="text-lg font-bold text-gray-900">
                        {product.salePrice ? (
                          <>
                            <span className="text-black">
                              ₹{product.salePrice.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ₹{product.price.toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <span>₹{product.price.toLocaleString()}</span>
                        )}
                      </div>
                      {product.stock > 0 ? (
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="text-sm"
                          size="sm"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                        </Button>
                      ) : (
                        <div className="text-sm text-gray-700 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" /> Out of Stock
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-lg p-8 text-center"
          >
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You don&apos;t have any items in your wishlist yet. Browse our
              products and add your favorites.
            </p>
            <Link href="/products">
              <Button className="px-6">Browse Products</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
